const crypto = require("crypto");
const { json, supabase } = require("./_shared");

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const STRIPE_PLACEHOLDER_MODE = (process.env.STRIPE_PLACEHOLDER_MODE || "true").toLowerCase() === "true";

function verifySignature(rawBody, signatureHeader, secret) {
  // Placeholder-compatible HMAC verification for local/mock testing.
  // Real Stripe verification should be switched to stripe.webhooks.constructEvent once Stripe SDK is added.
  if (!secret || !signatureHeader) return false;
  const digest = crypto.createHmac("sha256", secret).update(rawBody, "utf8").digest("hex");
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signatureHeader));
}

async function eventSeen(eventId) {
  const res = await supabase(`stripe_events?select=id&event_id=eq.${encodeURIComponent(eventId)}&limit=1`, {
    method: "GET"
  });
  if (!res.ok) return false;
  const rows = await res.json();
  return rows.length > 0;
}

async function logEvent(eventId, eventType, payload) {
  await supabase("stripe_events", {
    method: "POST",
    body: JSON.stringify({
      event_id: eventId,
      event_type: eventType,
      payload,
      processed_at: new Date().toISOString()
    })
  });
}

async function upsertOrderAndPayment(session, state) {
  const metadataLeadId = Number(session?.metadata?.lead_id || 0);
  const packageName = session?.metadata?.package || null;
  const planType = session?.metadata?.plan_type || null;
  const amount = Number(session?.amount_total || 0) / 100;
  const currency = (session?.currency || "usd").toUpperCase();
  const checkoutSessionId = session?.id || null;
  const customerEmail = session?.customer_details?.email || null;
  const paymentStatus = session?.payment_status || null;
  let leadId = metadataLeadId;

  // Fallback for Payment Links / sessions that don't include lead_id metadata:
  // find the most recent non-spam lead by customer email.
  if (!leadId && customerEmail) {
    const lookupRes = await supabase(
      `leads?select=id,status,is_spam,created_at&email=eq.${encodeURIComponent(
        String(customerEmail).toLowerCase()
      )}&is_spam=eq.false&order=created_at.desc&limit=1`,
      { method: "GET" }
    );
    if (lookupRes.ok) {
      const rows = await lookupRes.json();
      if (rows.length > 0) {
        leadId = Number(rows[0].id || 0);
      }
    }
  }

  if (!leadId) {
    return { ok: false, reason: "missing lead_id metadata" };
  }

  const orderPayload = {
    lead_id: leadId,
    package_name: packageName,
    plan_type: planType,
    amount,
    currency,
    checkout_session_id: checkoutSessionId,
    order_state: state,
    customer_email: customerEmail,
    updated_at: new Date().toISOString()
  };

  const orderRes = await supabase(`orders?checkout_session_id=eq.${encodeURIComponent(checkoutSessionId)}`, {
    method: "PATCH",
    body: JSON.stringify(orderPayload)
  });

  let patchedRows = [];
  if (orderRes.ok) {
    try {
      patchedRows = await orderRes.json();
    } catch {
      patchedRows = [];
    }
  }

  if (!orderRes.ok || patchedRows.length === 0) {
    await supabase("orders", {
      method: "POST",
      body: JSON.stringify({
        ...orderPayload,
        created_at: new Date().toISOString()
      })
    });
  }

  await supabase("payments", {
    method: "POST",
    body: JSON.stringify({
      lead_id: leadId,
      checkout_session_id: checkoutSessionId,
      payment_status: paymentStatus,
      amount,
      currency,
      provider: "stripe",
      recorded_at: new Date().toISOString()
    })
  });

  const leadStatus = state === "paid" ? "won" : "contacted";
  await supabase(`leads?id=eq.${leadId}`, {
    method: "PATCH",
    body: JSON.stringify({ status: leadStatus, status_updated_at: new Date().toISOString() })
  });

  if (state === "paid") {
    const jobs = [
      {
        lead_id: leadId,
        job_type: "post_payment_onboarding",
        run_at: new Date(Date.now() + 5 * 60000).toISOString(),
        state: "queued",
        attempts: 0
      },
      {
        lead_id: leadId,
        job_type: "upsell_hosting_care",
        run_at: new Date(Date.now() + 24 * 60 * 60000).toISOString(),
        state: "queued",
        attempts: 0
      }
    ];
    await supabase("automation_jobs", {
      method: "POST",
      body: JSON.stringify(jobs),
      headers: { Prefer: "resolution=merge-duplicates" }
    });
  } else {
    await supabase("automation_jobs", {
      method: "POST",
      body: JSON.stringify({
        lead_id: leadId,
        job_type: "checkout_recovery",
        run_at: new Date(Date.now() + 6 * 60 * 60000).toISOString(),
        state: "queued",
        attempts: 0
      }),
      headers: { Prefer: "resolution=merge-duplicates" }
    });
  }

  return { ok: true };
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, { ok: true });
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  const rawBody = event.body || "";
  let payload;
  try {
    payload = JSON.parse(rawBody || "{}");
  } catch {
    return json(400, { error: "Invalid JSON payload" });
  }

  const signatureHeader =
    event.headers["stripe-signature"] ||
    event.headers["Stripe-Signature"] ||
    event.headers["x-stripe-placeholder-signature"] ||
    "";

  const verified = verifySignature(rawBody, signatureHeader, STRIPE_WEBHOOK_SECRET);
  if (!verified && !STRIPE_PLACEHOLDER_MODE) {
    return json(401, { error: "Signature verification failed" });
  }

  if (!STRIPE_WEBHOOK_SECRET && STRIPE_PLACEHOLDER_MODE) {
    // Placeholder mode expected until Stripe is configured.
    // Accept event JSON directly.
  }

  const eventId = payload.id || `placeholder-${Date.now()}`;
  const eventType = payload.type || "unknown";
  const session = payload.data?.object || {};

  if (await eventSeen(eventId)) {
    return json(200, { ok: true, duplicate: true });
  }

  await logEvent(eventId, eventType, payload);

  if (eventType === "checkout.session.completed") {
    const result = await upsertOrderAndPayment(session, "paid");
    return json(200, { ok: true, event: eventType, result });
  }

  if (eventType === "checkout.session.expired" || eventType === "checkout.session.async_payment_failed") {
    const result = await upsertOrderAndPayment(session, "abandoned");
    return json(200, { ok: true, event: eventType, result });
  }

  return json(200, { ok: true, event: eventType, ignored: true });
};
