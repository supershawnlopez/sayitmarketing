alter table public.leads
  add column if not exists utm_content text,
  add column if not exists utm_term text,
  add column if not exists tracking_session_id text,
  add column if not exists first_landing_page text,
  add column if not exists last_page_path text,
  add column if not exists heard_about_us text;

create table if not exists public.site_visits (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  session_id text not null,
  event_type text not null default 'page_view',
  page_url text,
  page_path text,
  page_title text,
  landing_page text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  service_context text,
  device_type text,
  viewport_width integer,
  user_agent text,
  ip_address text
);

create table if not exists public.lead_page_paths (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  lead_id bigint not null references public.leads(id) on delete cascade,
  session_id text not null,
  site_visit_id bigint references public.site_visits(id) on delete set null,
  visited_at timestamptz,
  page_url text,
  page_path text,
  page_title text,
  sequence integer not null default 0
);

create index if not exists idx_leads_tracking_session_id on public.leads (tracking_session_id);
create index if not exists idx_leads_heard_about_us on public.leads (heard_about_us);
create index if not exists idx_site_visits_created_at on public.site_visits (created_at desc);
create index if not exists idx_site_visits_session_id on public.site_visits (session_id);
create index if not exists idx_site_visits_page_path on public.site_visits (page_path);
create index if not exists idx_site_visits_utm_source on public.site_visits (utm_source);
create index if not exists idx_lead_page_paths_lead_id on public.lead_page_paths (lead_id);
create index if not exists idx_lead_page_paths_session_id on public.lead_page_paths (session_id);

alter table public.site_visits enable row level security;
alter table public.lead_page_paths enable row level security;

drop policy if exists deny_public_site_visits on public.site_visits;
create policy deny_public_site_visits on public.site_visits for all to anon using (false) with check (false);

drop policy if exists deny_public_lead_page_paths on public.lead_page_paths;
create policy deny_public_lead_page_paths on public.lead_page_paths for all to anon using (false) with check (false);

grant usage on schema public to anon, authenticated;
grant select, insert on public.site_visits to anon, authenticated;
grant select, insert on public.lead_page_paths to anon, authenticated;
