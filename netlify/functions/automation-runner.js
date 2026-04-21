const { json, supabase } = require("./_shared");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return json(200, { ok: true });
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });
  if ((event.headers["x-admin-key"] || "") !== process.env.ADMIN_API_KEY) return json(401, { error: "Unauthorized" });

  try {
    const now = new Date().toISOString();
    const jobsRes = await supabase(
      `automation_jobs?select=id,lead_id,job_type,run_at,state&state=eq.queued&run_at=lte.${encodeURIComponent(now)}&limit=50`,
      { method: "GET" }
    );
    if (!jobsRes.ok) return json(500, { error: "Could not load jobs", detail: await jobsRes.text() });

    const jobs = await jobsRes.json();
    for (const job of jobs) {
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
        body: JSON.stringify({ state: "completed", attempts: 1 })
      });
    }
    return json(200, { processed: jobs.length });
  } catch (err) {
    return json(500, { error: "Unhandled error", detail: err.message });
  }
};
