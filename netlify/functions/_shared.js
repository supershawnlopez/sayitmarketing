const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const DEFAULT_PUBLIC_ORIGINS = [
  "https://sayitmarketing.com",
  "https://www.sayitmarketing.com",
  "http://localhost:8888",
  "http://localhost:3000"
];

function getAllowedPublicOrigins() {
  const raw = String(process.env.ALLOWED_PUBLIC_ORIGINS || "").trim();
  if (!raw) return DEFAULT_PUBLIC_ORIGINS;
  return raw
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

function resolveOrigin(event, scope) {
  const origin = (event?.headers?.origin || event?.headers?.Origin || "").trim();
  if (scope === "admin") return "null";
  const allowed = getAllowedPublicOrigins();
  if (!origin) return allowed[0] || "https://sayitmarketing.com";
  if (allowed.includes(origin)) return origin;
  return allowed[0] || "https://sayitmarketing.com";
}

function json(statusCode, body, event = null, scope = "public") {
  const origin = resolveOrigin(event, scope);
  const allowHeaders = scope === "admin"
    ? "Content-Type, X-Admin-Key"
    : "Content-Type, Authorization";
  const allowMethods = scope === "admin"
    ? "GET, POST, PATCH, OPTIONS"
    : "POST, OPTIONS";
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Headers": allowHeaders,
      "Access-Control-Allow-Methods": allowMethods,
      Vary: "Origin"
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
