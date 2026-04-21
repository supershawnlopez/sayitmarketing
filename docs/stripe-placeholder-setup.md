# Stripe Placeholder Setup

## Purpose
Allow webhook and lifecycle flow to be built now, before live Stripe credentials are configured.

## Environment Variables
- `STRIPE_WEBHOOK_SECRET=whsec_placeholder_until_live`
- `STRIPE_PLACEHOLDER_MODE=true`

## Current Behavior
- `/api/webhooks/stripe` accepts JSON payloads in placeholder mode.
- Event idempotency is enforced via `stripe_events.event_id`.
- Supported event types:
  - `checkout.session.completed`
  - `checkout.session.expired`
  - `checkout.session.async_payment_failed`
- On completion, system updates `orders`, `payments`, lead status, and queues:
  - `post_payment_onboarding`
  - `upsell_hosting_care`
- On expired/failed, system queues:
  - `checkout_recovery`

## Required Metadata In Stripe (later)
When creating live Payment Links/sessions, include:
- `lead_id`
- `package`
- `plan_type`

## Test Payload (placeholder mode)
POST to `/api/webhooks/stripe`:

```json
{
  "id": "evt_test_001",
  "type": "checkout.session.completed",
  "data": {
    "object": {
      "id": "cs_test_001",
      "amount_total": 59900,
      "currency": "usd",
      "payment_status": "paid",
      "customer_details": { "email": "demo@example.com" },
      "metadata": {
        "lead_id": "1",
        "package": "Look Pro",
        "plan_type": "website"
      }
    }
  }
}
```

## Switch To Live Stripe
1. Set `STRIPE_PLACEHOLDER_MODE=false`
2. Set real `STRIPE_WEBHOOK_SECRET`
3. Replace placeholder signature verifier with official Stripe SDK verification in function
