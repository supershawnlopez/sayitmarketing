const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function json(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Admin-Key",
      "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS"
    },
    body: JSON.stringify(body)
  };
}

function isSpam(payload) {
  return Boolean(payload.website_field && String(payload.website_field).trim());
}

function scoreLead(payload) {
  let score = 0;
  const budget = (payload.budget_range || "").toLowerCase();
  const timeline = (payload.timeline || "").toLowerCase();
  const leadType = (payload.lead_type || "").toLowerCase();
  const service = (payload.service_interest || "").toLowerCase();
  const monthly = (payload.monthly_plan_interest || "").toLowerCase();

  if (budget === "2500+") score += 30;
  if (budget === "1000-2500") score += 20;
  if (timeline === "asap") score += 25;
  if (timeline === "2-4 weeks") score += 15;
  if (leadType === "checkout" || leadType === "start-now") score += 30;
  if (service.includes("website") && monthly.includes("hosting + care")) score += 20;
  if (payload.mobile_phone && payload.consent_sms_email) score += 10;
  if (!payload.budget_range || !payload.timeline) score -= 15;
  return score;
}

function tagForScore(score, spam) {
  if (spam) return "spam";
  if (score >= 70) return "hot";
  if (score >= 40) return "warm";
  return "cold";
}

async function supabase(path, opts = {}) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase env vars missing");
  }
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...opts,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(opts.headers || {})
    }
  });
  return response;
}

module.exports = { json, isSpam, scoreLead, tagForScore, supabase };
