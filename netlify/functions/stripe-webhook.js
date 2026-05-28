const crypto = require("crypto");
const { json, supabase } = require("./_shared");

const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";
const STRIPE_PLACEHOLDER_MODE = (process.env.STRIPE_PLACEHOLDER_MODE || "false").toLowerCase() === "true";
const SIG_TOLERANCE_SECONDS = Number(process.env.STRIPE_SIG_TOLERANCE_SECONDS || 300);
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

function parseStripeSignatureHeader(signatureHeader) {
  const parts = String(signatureHeader || "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  const parsed = { t: null, v1: [] };
  for (const part of parts) {
    const [k, v] = part.split("=");
    if (!k || !v) continue;
    if (k === "t") parsed.t = v;
    if (k === "v1") parsed.v1.push(v);
  }
  return parsed;
}

function timingSafeEqualHex(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  return crypto.timingSafeEqual(Buffer.from(a, "utf8"), Buffer.from(b, "utf8"));
}

function verifyStripeSignature(rawBody, signatureHeader, secret) {
  if (!secret || !signatureHeader) return false;
  const parsed = parseStripeSignatureHeader(signatureHeader);
  if (!parsed.t || !parsed.v1.length) return false;

  const ts = Number(parsed.t);
  if (!Number.isFinite(ts)) return false;
  const age = Math.abs(Math.floor(Date.now() / 1000) - ts);
  if (age > SIG_TOLERANCE_SECONDS) return false;

  const signedPayload = `${parsed.t}.${rawBody}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex");

  return parsed.v1.some((sig) => timingSafeEqualHex(expected, sig));
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

  // Last-resort fallback: create a lead from checkout email so payment/order records can still be tied.
  if (!leadId && customerEmail) {
    const createLeadRes = await supabase("leads", {
      method: "POST",
      body: JSON.stringify({
        full_name: customerEmail.split("@")[0] || "Stripe Customer",
        business_name: null,
        email: String(customerEmail).toLowerCase(),
        mobile_phone: null,
        service_interest: packageName || "Website",
        monthly_plan_interest: null,
        budget_range: null,
        timeline: null,
        preferred_contact: "email",
        notes: `Auto-created from Stripe checkout session ${checkoutSessionId || "unknown"}`,
        lead_type: "checkout",
        status: "contacted",
        score: 0,
        tag: "warm",
        is_spam: false,
        created_at: new Date().toISOString(),
        status_updated_at: new Date().toISOString()
      })
    });
    if (createLeadRes.ok) {
      const createdRows = await createLeadRes.json();
      if (createdRows.length > 0) {
        leadId = Number(createdRows[0].id || 0);
      }
    }
  }

  if (!leadId) {
    return { ok: false, reason: "unable_to_resolve_or_create_lead", email: customerEmail || null };
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

async function sendOwnerSummaryEmail(session) {
  if (!RESEND_API_KEY) return;
  const name    = session?.customer_details?.name  || 'Unknown';
  const email   = session?.customer_details?.email || 'Unknown';
  const amount  = ((Number(session?.amount_total  || 0)) / 100).toFixed(2);
  const social  = session?.metadata?.social_setup       || 'unknown';
  const ads     = session?.metadata?.google_ads         || 'unknown';
  const budget  = session?.metadata?.google_ads_budget  || 'none';
  const proposal = session?.metadata?.proposal          || 'unknown';

  const lines = [
    `<b>Client:</b> ${name} (${email})`,
    `<b>Total charged:</b> $${amount}`,
    `<b>Proposal:</b> ${proposal}`,
    `<b>SEO On the Map:</b> yes — $199/mo`,
    `<b>Social Media Setup:</b> ${social === 'yes' ? 'YES — $250 one-time' : 'No'}`,
    `<b>Google Ads:</b> ${ads === 'yes' ? `YES — budget ${budget}` : 'No'}`,
  ].join('<br>');

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Say It Marketing Payments <hello@sayitmarketing.com>',
      to: ['shawnlopez@me.com'],
      subject: `💳 New payment — ${name} — $${amount}`,
      html: `<p>${lines}</p><p>Check Stripe for full details.</p>`
    })
  });
}

async function sendWelcomeEmail(toEmail, toName) {
  if (!RESEND_API_KEY) {
    console.error('[welcome-email] RESEND_API_KEY not set');
    return;
  }
  const firstName = toName ? toName.split(' ')[0] : 'there';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Say It Marketing <hello@sayitmarketing.com>',
      to: [toEmail],
      subject: "You're in! We'll be in touch soon.",
      html: `<p>Hey ${firstName},</p><p>Payment went through — you're all set!</p><p>We'll call or text you within 24 hours to get everything going.</p><p>Talk soon,<br><br>Say It Marketing<br>(520) 222-6308</p>`
    })
  });
  if (!res.ok) {
    const err = await res.json();
    console.error('[welcome-email] Resend error:', JSON.stringify(err));
  }
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, { ok: true });
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  if (process.env.NODE_ENV === "production" && STRIPE_PLACEHOLDER_MODE) {
    return json(500, { error: "Unsafe Stripe placeholder mode in production" });
  }
  if (!STRIPE_WEBHOOK_SECRET) {
    return json(500, { error: "Stripe webhook secret not configured" });
  }

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

  const verified = verifyStripeSignature(rawBody, signatureHeader, STRIPE_WEBHOOK_SECRET);
  if (!verified) {
    return json(401, { error: "Signature verification failed" });
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
    const customerEmail = session?.customer_details?.email;
    const customerName = session?.customer_details?.name;
    if (customerEmail) await sendWelcomeEmail(customerEmail, customerName);
    await sendOwnerSummaryEmail(session);
    return json(200, { ok: true, event: eventType, result });
  }

  if (eventType === "checkout.session.expired" || eventType === "checkout.session.async_payment_failed") {
    const result = await upsertOrderAndPayment(session, "abandoned");
    return json(200, { ok: true, event: eventType, result });
  }

  return json(200, { ok: true, event: eventType, ignored: true });
};
