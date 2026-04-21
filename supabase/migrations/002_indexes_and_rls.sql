create index if not exists idx_leads_created_at on public.leads (created_at desc);
create index if not exists idx_leads_status on public.leads (status);
create index if not exists idx_leads_tag on public.leads (tag);
create index if not exists idx_leads_email on public.leads (email);
create index if not exists idx_jobs_run_at on public.automation_jobs (run_at);
create index if not exists idx_jobs_state on public.automation_jobs (state);
create index if not exists idx_logs_lead_id on public.message_logs (lead_id);

alter table public.leads enable row level security;
alter table public.automation_jobs enable row level security;
alter table public.message_logs enable row level security;

drop policy if exists deny_public_leads on public.leads;
create policy deny_public_leads on public.leads for all to anon using (false) with check (false);

drop policy if exists deny_public_jobs on public.automation_jobs;
create policy deny_public_jobs on public.automation_jobs for all to anon using (false) with check (false);

drop policy if exists deny_public_logs on public.message_logs;
create policy deny_public_logs on public.message_logs for all to anon using (false) with check (false);
