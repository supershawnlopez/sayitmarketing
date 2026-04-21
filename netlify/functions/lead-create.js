const { json, isSpam, scoreLead, tagForScore, supabase } = require("./_shared");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return json(200, { ok: true });
  }
  if (event.httpMethod !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON payload" });
  }

  if (!payload.full_name || !payload.email) {
    return json(400, { error: "full_name and email are required" });
  }

  const spam = isSpam(payload);
  const score = scoreLead(payload);
  const tag = tagForScore(score, spam);
  const now = new Date().toISOString();

  const record = {
    lead_type: String(payload.lead_type || "quote").toLowerCase(),
    status: "new",
    score,
    tag,
    is_spam: spam,
    spam_reason: spam ? "honeypot" : null,
    full_name: payload.full_name,
    business_name: payload.business_name || null,
    email: String(payload.email).toLowerCase(),
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
    landing_page: payload.landing_page || null,
    referrer: payload.referrer || null,
    consent_sms_email: Boolean(payload.consent_sms_email),
    consent_at: payload.consent_sms_email ? now : null,
    consent_ip: event.headers["x-forwarded-for"] || null,
    status_updated_at: now
  };

  try {
    const insertRes = await supabase("leads", {
      method: "POST",
      body: JSON.stringify(record)
    });
    if (!insertRes.ok) {
      const detail = await insertRes.text();
      return json(500, { error: "Could not save lead", detail });
    }
    const rows = await insertRes.json();
    const lead = rows[0];

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
    });
  } catch (err) {
    return json(500, { error: "Unhandled error", detail: err.message });
  }
};
