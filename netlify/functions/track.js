const { json, supabase } = require("./_shared");

function cleanString(value, max = 500) {
  return String(value || "").trim().slice(0, max);
}

function cleanInt(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return Math.max(0, Math.round(number));
}

function getIp(event) {
  return cleanString(event.headers["x-forwarded-for"] || "").split(",")[0] || null;
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, { ok: true }, event, "public");
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" }, event, "public");

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON payload" }, event, "public");
  }

  const sessionId = cleanString(payload.session_id, 80);
  if (!sessionId) return json(400, { error: "session_id is required" }, event, "public");

  const record = {
    session_id: sessionId,
    event_type: cleanString(payload.event_type || "page_view", 40).toLowerCase(),
    page_url: cleanString(payload.page_url, 900) || null,
    page_path: cleanString(payload.page_path, 300) || null,
    page_title: cleanString(payload.page_title, 180) || null,
    landing_page: cleanString(payload.landing_page, 900) || null,
    referrer: cleanString(payload.referrer, 900) || null,
    utm_source: cleanString(payload.utm_source, 120) || null,
    utm_medium: cleanString(payload.utm_medium, 120) || null,
    utm_campaign: cleanString(payload.utm_campaign, 180) || null,
    utm_content: cleanString(payload.utm_content, 180) || null,
    utm_term: cleanString(payload.utm_term, 180) || null,
    service_context: cleanString(payload.service_context, 140) || null,
    device_type: cleanString(payload.device_type, 40) || null,
    viewport_width: cleanInt(payload.viewport_width),
    user_agent: cleanString(event.headers["user-agent"] || payload.user_agent, 900) || null,
    ip_address: getIp(event)
  };

  try {
    const res = await supabase("site_visits", {
      method: "POST",
      body: JSON.stringify(record)
    });
    if (!res.ok) return json(202, { accepted: true, stored: false }, event, "public");
    const rows = await res.json();
    return json(201, { id: rows[0]?.id || null, stored: true }, event, "public");
  } catch {
    return json(202, { accepted: true, stored: false }, event, "public");
  }
};
