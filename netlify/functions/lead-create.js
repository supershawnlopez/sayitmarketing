const { json, isSpam, scoreLead, tagForScore, supabase } = require("./_shared");

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";

async function sendLeadNotification(payload, lead) {
  if (!RESEND_API_KEY) return;
  const name    = payload.full_name    || "Unknown";
  const biz     = payload.business_name || "—";
  const phone   = payload.mobile_phone  || "—";
  const email   = payload.email         || "—";
  const service = payload.service_interest || "—";
  const budget  = payload.budget_range     || "—";
  const plan    = payload.monthly_plan_interest || "—";
  const page    = payload.landing_page  || "—";
  const heard   = payload.heard_about_us || "—";
  const notes   = payload.notes         || "—";
  const tag     = lead.tag  || "—";
  const score   = lead.score != null ? lead.score : "—";

  const lines = [
    `<b>Name:</b> ${name}`,
    `<b>Business:</b> ${biz}`,
    `<b>Phone:</b> <a href="tel:${phone.replace(/\D/g,"")}">${phone}</a>`,
    `<b>Email:</b> ${email}`,
    `<b>Service interest:</b> ${service}`,
    `<b>Budget:</b> ${budget}`,
    `<b>Plan interest:</b> ${plan}`,
    `<b>Heard about us:</b> ${heard}`,
    `<b>Lead score:</b> ${score} · tag: ${tag}`,
    `<b>Page:</b> ${page}`,
    `<b>Notes:</b><br><pre style="font-size:0.85em;background:#f4f4f4;padding:8px;border-radius:6px;">${notes}</pre>`,
  ].join("<br>");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Say It Marketing Leads <hello@sayitmarketing.com>",
      to: ["shawnlopez@me.com"],
      subject: `🔔 New lead — ${name}${biz !== "—" ? " · " + biz : ""}`,
      html: `<p style="font-family:sans-serif;line-height:1.7">${lines}</p>`
    })
  });
}

function cleanString(value, max = 500) {
  return String(value || "").trim().slice(0, max);
}

function normalizePathHistory(payload) {
  if (!Array.isArray(payload.page_path_history)) return [];
  return payload.page_path_history
    .slice(0, 40)
    .map((item, index) => ({
      page_url: cleanString(item.page_url, 900) || null,
      page_path: cleanString(item.page_path, 300) || null,
      page_title: cleanString(item.page_title, 180) || null,
      visited_at: cleanString(item.visited_at, 80) || null,
      sequence: index + 1
    }))
    .filter((item) => item.page_url || item.page_path);
}

async function snapshotLeadPath(lead, payload) {
  const sessionId = cleanString(payload.tracking_session_id, 80);
  if (!lead?.id || !sessionId) return;

  let pathRows = [];
  try {
    const visitsRes = await supabase(
      `site_visits?select=id,created_at,page_url,page_path,page_title&session_id=eq.${encodeURIComponent(sessionId)}&order=created_at.asc&limit=40`,
      { method: "GET" }
    );
    if (visitsRes.ok) {
      const visits = await visitsRes.json();
      pathRows = visits.map((visit, index) => ({
        lead_id: lead.id,
        session_id: sessionId,
        site_visit_id: visit.id,
        visited_at: visit.created_at,
        page_url: visit.page_url || null,
        page_path: visit.page_path || null,
        page_title: visit.page_title || null,
        sequence: index + 1
      }));
    }
  } catch (err) {
    console.error("[lead-path] visit lookup failed:", err);
  }

  if (!pathRows.length) {
    pathRows = normalizePathHistory(payload).map((item) => ({
      lead_id: lead.id,
      session_id: sessionId,
      site_visit_id: null,
      visited_at: item.visited_at,
      page_url: item.page_url,
      page_path: item.page_path,
      page_title: item.page_title,
      sequence: item.sequence
    }));
  }

  if (!pathRows.length) return;

  try {
    const insertRes = await supabase("lead_page_paths", {
      method: "POST",
      body: JSON.stringify(pathRows)
    });
    if (!insertRes.ok) console.error("[lead-path] insert failed:", await insertRes.text());
  } catch (err) {
    console.error("[lead-path] insert error:", err);
  }
}

function getLegacyLeadRecord(record) {
  const {
    utm_content,
    utm_term,
    tracking_session_id,
    first_landing_page,
    last_page_path,
    heard_about_us,
    ...legacy
  } = record;
  return legacy;
}

async function insertLeadRecord(record) {
  const insertRes = await supabase("leads", {
    method: "POST",
    body: JSON.stringify(record)
  });
  if (insertRes.ok) return insertRes;

  const errorText = await insertRes.text();
  const canRetryLegacy = [
    "utm_content",
    "utm_term",
    "tracking_session_id",
    "first_landing_page",
    "last_page_path",
    "heard_about_us"
  ].some((column) => errorText.includes(column));

  if (!canRetryLegacy) {
    console.error("[lead-create] insert failed:", errorText);
    return insertRes;
  }

  console.warn("[lead-create] retrying with legacy attribution columns:", errorText);
  return supabase("leads", {
    method: "POST",
    body: JSON.stringify(getLegacyLeadRecord(record))
  });
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true }, event, "public");
  }
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" }, event, "public");
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON payload" }, event, "public");
  }

  if (!payload.full_name || !payload.email) {
    return json(400, { error: "full_name and email are required" }, event, "public");
  }

  const spam = isSpam(payload);
  const score = scoreLead(payload);
  const tag = tagForScore(score, spam);
  const now = new Date().toISOString();
  const dedupeSince = new Date(Date.now() - 10 * 60 * 1000).toISOString();
  const normalizedEmail = String(payload.email).toLowerCase();
  const normalizedPhone = String(payload.mobile_phone || "").trim();

  if (spam) {
    return json(202, { accepted: true, spam: true }, event, "public");
  }

  const record = {
    lead_type: String(payload.lead_type || "quote").toLowerCase(),
    status: "new",
    score,
    tag,
    is_spam: spam,
    spam_reason: spam ? "honeypot" : null,
    full_name: payload.full_name,
    business_name: payload.business_name || null,
    email: normalizedEmail,
    mobile_phone: payload.mobile_phone || null,
    service_interest: payload.service_interest || null,
    monthly_plan_interest: payload.monthly_plan_interest || null,
    budget_range: payload.budget_range || null,
    timeline: payload.timeline || null,
    primary_goal: payload.primary_goal || null,
    preferred_contact: payload.preferred_contact || null,
    website_url: payload.website_url || null,
    notes: payload.notes || null,
    utm_source: payload.utm_source || null,
    utm_medium: payload.utm_medium || null,
    utm_campaign: payload.utm_campaign || null,
    utm_content: payload.utm_content || null,
    utm_term: payload.utm_term || null,
    landing_page: payload.landing_page || null,
    first_landing_page: payload.first_landing_page || payload.landing_page || null,
    last_page_path: payload.last_page_path || null,
    referrer: payload.referrer || null,
    heard_about_us: payload.heard_about_us || null,
    tracking_session_id: payload.tracking_session_id || null,
    consent_sms_email: Boolean(payload.consent_sms_email),
    consent_at: payload.consent_sms_email ? now : null,
    consent_ip: event.headers["x-forwarded-for"] || null,
    status_updated_at: now
  };

  try {
    const dedupeRes = await supabase(
      `leads?select=id,tag,score,status&email=eq.${encodeURIComponent(normalizedEmail)}&created_at=gte.${encodeURIComponent(dedupeSince)}&order=created_at.desc&limit=1`,
      { method: "GET" }
    );
    if (dedupeRes.ok) {
      const existing = await dedupeRes.json();
      if (existing.length > 0) {
        const lead = existing[0];
        return json(200, { id: lead.id, tag: lead.tag, score: lead.score, status: lead.status, duplicate: true }, event, "public");
      }
    }

    if (normalizedPhone) {
      const phoneDedupeRes = await supabase(
        `leads?select=id,tag,score,status&mobile_phone=eq.${encodeURIComponent(normalizedPhone)}&created_at=gte.${encodeURIComponent(dedupeSince)}&order=created_at.desc&limit=1`,
        { method: "GET" }
      );
      if (phoneDedupeRes.ok) {
        const existingByPhone = await phoneDedupeRes.json();
        if (existingByPhone.length > 0) {
          const lead = existingByPhone[0];
          return json(200, { id: lead.id, tag: lead.tag, score: lead.score, status: lead.status, duplicate: true }, event, "public");
        }
      }
    }

    const insertRes = await insertLeadRecord(record);
    if (!insertRes.ok) {
      return json(500, { error: "Could not save lead" }, event, "public");
    }
    const rows = await insertRes.json();
    const lead = rows[0];

    await snapshotLeadPath(lead, payload);

    sendLeadNotification(payload, lead).catch(function(err) {
      console.error("[lead-notify] Resend error:", err);
    });

    if (!lead.is_spam) {
      const jobs = ["d1", "d3", "d7"].map((jobType, idx) => {
        const runAt = new Date(Date.now() + [86400000, 259200000, 604800000][idx]).toISOString();
        return { lead_id: lead.id, job_type: jobType, run_at: runAt, state: "queued", attempts: 0 };
      });
      await supabase("automation_jobs", { method: "POST", body: JSON.stringify(jobs), headers: { Prefer: "resolution=merge-duplicates" } });
    }

    return json(201, {
      id: lead.id,
      tag: lead.tag,
      score: lead.score,
      status: lead.status
    }, event, "public");
  } catch (err) {
    return json(500, { error: "Unhandled error" }, event, "public");
  }
};
