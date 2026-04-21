# Automation Flows

## Primary Flow
1. `POST /api/leads` creates lead in Supabase
2. Lead scoring sets tag (`hot/warm/cold/spam`)
3. Non-spam leads enqueue `d1/d3/d7` rows in `automation_jobs`
4. `automation-runner` processes due jobs
5. Outbound attempts are written to `message_logs`
6. Stripe webhook (next phase) updates lead lifecycle and triggers onboarding/upsell

## Current Event Names
- `lead_form_start`
- `lead_form_submit`
- `cta_click`
- `plan_select`
- `stripe_checkout_start`
- `stripe_checkout_complete`

## Queue Rules
- Unique queue key: `(lead_id, job_type)`
- Skip jobs for `won/lost/spam`
- SMS only if consent exists
- Record every send attempt in `message_logs`

## Messaging Rules
- Primary operational channels: email and text
- Text requires explicit consent
- STOP/opt-out handling required before SMS goes live
- Keep templates short and action-focused

## Daily Digest (next phase)
Single summary output:
- new leads by tag
- overdue follow-up jobs
- failed message attempts
- quote/payment status counts
