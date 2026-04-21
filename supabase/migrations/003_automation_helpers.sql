create or replace function public.queue_followups(_lead_id bigint)
returns void
language plpgsql
as $$
begin
  insert into public.automation_jobs (lead_id, job_type, run_at, state, attempts)
  values
    (_lead_id, 'd1', now() + interval '1 day', 'queued', 0),
    (_lead_id, 'd3', now() + interval '3 day', 'queued', 0),
    (_lead_id, 'd7', now() + interval '7 day', 'queued', 0)
  on conflict (lead_id, job_type) do nothing;
end;
$$;
