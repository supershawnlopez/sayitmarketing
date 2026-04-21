const { json, supabase } = require("./_shared");

function getAdminKey(event) {
  return event.headers["x-admin-key"] || event.headers["X-Admin-Key"] || "";
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, { ok: true });
  if (event.httpMethod !== "PATCH") return json(405, { error: "Method not allowed" });
  if (getAdminKey(event) !== process.env.ADMIN_API_KEY) return json(401, { error: "Unauthorized" });

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return json(400, { error: "Invalid JSON payload" });
  }

  const path = event.path || "";
  const match = path.match(/\/api\/leads\/(\d+)\/status$/);
  const leadId = match ? Number(match[1]) : 0;
  if (!leadId || !payload.status) return json(400, { error: "lead id and status are required" });

  const update = {
    status: String(payload.status).toLowerCase().trim(),
    status_updated_at: new Date().toISOString()
  };

  try {
    const res = await supabase(`leads?id=eq.${leadId}`, {
      method: "PATCH",
      body: JSON.stringify(update)
    });
    if (!res.ok) return json(500, { error: "Failed to update lead", detail: await res.text() });
    const rows = await res.json();
    return json(200, rows[0] || { updated: true });
  } catch (err) {
    return json(500, { error: "Unhandled error", detail: err.message });
  }
};
