const { json, supabase } = require("./_shared");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, { ok: true }, event, "admin");
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" }, event, "admin");
  if ((event.headers["x-admin-key"] || "") !== process.env.ADMIN_API_KEY) return json(401, { error: "Unauthorized" }, event, "admin");

  try {
    const now = new Date().toISOString();
    const jobsRes = await supabase(
      `automation_jobs?select=id,lead_id,job_type,run_at,state&state=eq.queued&run_at=lte.${encodeURIComponent(now)}&limit=50`,
      { method: "GET" }
    );
    if (!jobsRes.ok) return json(500, { error: "Could not load jobs" }, event, "admin");

    const jobs = await jobsRes.json();
    let processed = 0;
    for (const job of jobs) {
      const claimRes = await supabase(`automation_jobs?id=eq.${job.id}&state=eq.queued`, {
        method: "PATCH",
        body: JSON.stringify({ state: "processing", attempts: 1, updated_at: now })
      });
      if (!claimRes.ok) continue;
      const claimed = await claimRes.json();
      if (!claimed.length) continue;

      await supabase("message_logs", {
        method: "POST",
        body: JSON.stringify({
          lead_id: job.lead_id,
          channel: "email",
          template_key: job.job_type,
          scheduled_for: job.run_at,
          sent_at: now,
          delivery_status: "queued"
        })
      });
      await supabase(`automation_jobs?id=eq.${job.id}`, {
        method: "PATCH",
        body: JSON.stringify({ state: "completed", attempts: 1, updated_at: now })
      });
      processed += 1;
    }
    return json(200, { processed, scanned: jobs.length }, event, "admin");
  } catch (err) {
    return json(500, { error: "Unhandled error" }, event, "admin");
  }
};
