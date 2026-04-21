const { json, supabase } = require("./_shared");

function getAdminKey(event) {
  return event.headers["x-admin-key"] || event.headers["X-Admin-Key"] || "";
}

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, { ok: true });
  if (event.httpMethod !== "GET") return json(405, { error: "Method not allowed" });

  if (getAdminKey(event) !== process.env.ADMIN_API_KEY) {
    return json(401, { error: "Unauthorized" });
  }

  const params = new URLSearchParams(event.queryStringParameters || {});
  const page = Math.max(1, Number(params.get("page") || 1));
  const pageSize = Math.min(100, Math.max(1, Number(params.get("page_size") || 25)));
  const status = (params.get("status") || "").toLowerCase().trim();
  const tag = (params.get("tag") || "").toLowerCase().trim();
  const leadType = (params.get("lead_type") || "").toLowerCase().trim();
  const q = (params.get("q") || "").trim();

  let query = `leads?select=id,created_at,lead_type,status,score,tag,full_name,business_name,email,mobile_phone&order=created_at.desc&limit=${pageSize}&offset=${(page - 1) * pageSize}`;
  if (status) query += `&status=eq.${encodeURIComponent(status)}`;
  if (tag) query += `&tag=eq.${encodeURIComponent(tag)}`;
  if (leadType) query += `&lead_type=eq.${encodeURIComponent(leadType)}`;
  if (q) query += `&or=(full_name.ilike.*${encodeURIComponent(q)}*,email.ilike.*${encodeURIComponent(q)}*,business_name.ilike.*${encodeURIComponent(q)}*)`;

  try {
    const [itemsRes, totalRes] = await Promise.all([
      supabase(query, { method: "GET" }),
      supabase("leads?select=id", { method: "GET", headers: { Prefer: "count=exact", Range: "0-0" } })
    ]);

    if (!itemsRes.ok) return json(500, { error: "Failed pipeline query", detail: await itemsRes.text() });
    const total = Number(totalRes.headers.get("content-range")?.split("/")[1] || 0);
    const items = await itemsRes.json();

    const summaryRes = await supabase("leads?select=tag", { method: "GET" });
    const summaryRows = summaryRes.ok ? await summaryRes.json() : [];
    const summary = { total: summaryRows.length, new: 0, hot: 0, warm: 0, cold: 0, spam: 0 };
    for (const row of summaryRows) {
      if (row.tag && summary[row.tag] !== undefined) summary[row.tag] += 1;
    }
    const newRes = await supabase("leads?select=id&status=eq.new", { method: "GET" });
    if (newRes.ok) summary.new = (await newRes.json()).length;

    return json(200, { items, page, page_size: pageSize, total, summary });
  } catch (err) {
    return json(500, { error: "Unhandled error", detail: err.message });
  }
};
