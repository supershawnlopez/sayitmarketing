# System Architecture

## Goal
Run a custom, low-cost revenue system on `GitHub + Netlify + Supabase` with Stripe events and automated follow-up.

## Stack
- Frontend: static pages deployed on Netlify
- API layer: Netlify Functions (`/netlify/functions`)
- Database: Supabase Postgres
- Scheduling: Supabase cron / scheduled function runner
- Payments: Stripe Payment Links + webhook function
- Email/SMS adapters: provider modules (SES/Brevo/Resend + Twilio)

## Request Flow
1. User submits form on static page
2. Netlify function validates + scores lead
3. Function writes to Supabase `leads`
4. Function queues follow-up rows in `automation_jobs`
5. Scheduled automation runner processes due jobs and logs `message_logs`
6. Stripe webhook function updates lifecycle state and triggers onboarding flow

## Core Tables
- `leads`
- `automation_jobs`
- `message_logs`
- `site_visits`
- `lead_page_paths`

## Core Endpoints (MVP)
- `POST /api/leads`
- `POST /api/track`
- `GET /api/pipeline`
- `GET /api/traffic`
- `PATCH /api/leads/:id/status`
- `POST /api/webhooks/stripe` (next phase)
- `POST /api/automation/run` (internal/admin)

## Guardrails
- Honeypot + required-field validation
- Admin key on protected endpoints
- SMS consent tracking (`consent_sms_email`, `consent_at`, `consent_ip`)
- Session attribution tracking (`tracking_session_id`, UTM fields, referrer, landing page, page path)
- Manual source question (`heard_about_us`) to catch referrals, DMs, and offline sources
- `spam` tag only from explicit spam checks
- Idempotent follow-up job queue (`unique lead_id + job_type`)
