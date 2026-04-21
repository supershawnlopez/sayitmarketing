create table if not exists public.orders (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  lead_id bigint not null references public.leads(id) on delete cascade,
  package_name text,
  plan_type text,
  amount numeric(12,2) not null default 0,
  currency text not null default 'USD',
  checkout_session_id text unique,
  order_state text not null default 'pending',
  customer_email text
);

create table if not exists public.payments (
  id bigint generated always as identity primary key,
  recorded_at timestamptz not null default now(),
  lead_id bigint not null references public.leads(id) on delete cascade,
  checkout_session_id text,
  payment_status text not null,
  amount numeric(12,2) not null default 0,
  currency text not null default 'USD',
  provider text not null default 'stripe'
);

create table if not exists public.stripe_events (
  id bigint generated always as identity primary key,
  event_id text not null unique,
  event_type text not null,
  payload jsonb not null,
  processed_at timestamptz not null default now()
);

create index if not exists idx_orders_lead_id on public.orders (lead_id);
create index if not exists idx_payments_lead_id on public.payments (lead_id);
create index if not exists idx_stripe_events_type on public.stripe_events (event_type);

alter table public.orders enable row level security;
alter table public.payments enable row level security;
alter table public.stripe_events enable row level security;

drop policy if exists deny_public_orders on public.orders;
create policy deny_public_orders on public.orders for all to anon using (false) with check (false);

drop policy if exists deny_public_payments on public.payments;
create policy deny_public_payments on public.payments for all to anon using (false) with check (false);

drop policy if exists deny_public_stripe_events on public.stripe_events;
create policy deny_public_stripe_events on public.stripe_events for all to anon using (false) with check (false);
