create extension if not exists "pgcrypto";

create table if not exists public.leads (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  lead_type text not null default 'quote',
  status text not null default 'new',
  score integer not null default 0,
  tag text not null default 'cold',
  is_spam boolean not null default false,
  spam_reason text,
  full_name text not null,
  business_name text,
  email text not null,
  mobile_phone text,
  service_interest text,
  monthly_plan_interest text,
  budget_range text,
  timeline text,
  primary_goal text,
  preferred_contact text,
  website_url text,
  notes text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  landing_page text,
  referrer text,
  consent_sms_email boolean not null default false,
  consent_at timestamptz,
  consent_ip text,
  status_updated_at timestamptz not null default now()
);

create table if not exists public.automation_jobs (
  id bigint generated always as identity primary key,
  lead_id bigint not null references public.leads(id) on delete cascade,
  job_type text not null,
  run_at timestamptz not null,
  state text not null default 'queued',
  attempts integer not null default 0,
  last_error text,
  unique (lead_id, job_type)
);

create table if not exists public.message_logs (
  id bigint generated always as identity primary key,
  lead_id bigint not null references public.leads(id) on delete cascade,
  channel text not null,
  template_key text not null,
  scheduled_for timestamptz,
  sent_at timestamptz,
  delivery_status text not null default 'queued',
  provider_id text,
  error text
);
