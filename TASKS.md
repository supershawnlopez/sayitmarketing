# TASKS.md
### Execution board for Say It Marketing
### Single source of truth for active work

---

## OPERATING RULES

1. Only one active phase at a time.
2. Max 3 tasks in `NOW`.
3. New ideas go to `BACKLOG`, not `NOW`.
4. If a critical issue appears, pause and re-rank `NOW`.
5. Update this file before ending a session.

---

## CURRENT PHASE

**Phase 1: Hardening + Conversion Leak Fixes**

Goal:
- Protect revenue paths (payments + leads)
- Remove obvious conversion friction
- Tighten crawl/index hygiene

Exit criteria:
1. Stripe webhook verification is validated with real Stripe test event
2. Public/admin function boundaries hardened (CORS + auth posture improvements)
3. Lead duplication/race risks reduced
4. Top CTA flow leaks fixed and verified

---

## NOW (MAX 3)

1. Validate Stripe webhook with real signed test event
- Owner: Function + Security Agent
- Status: ⚠️ Deferred — endpoint + secret now wired (2026-05-28), but CLI test not yet run
- Notes: Stripe endpoint created, whsec_ secret set in Netlify. Next step: install Stripe CLI → run `stripe trigger checkout.session.completed` → confirm 200 in Netlify function logs. OR wait for next real payment and verify logs.

2. Tighten function boundary security
- Owner: Security Agent
- Status: Done (May 1, 2026)
- Notes: CORS is now endpoint-scoped and admin responses are sanitized

3. Add lead/job duplication guards
- Owner: Function Agent
- Status: Done (May 1, 2026)
- Notes: Added lead dedupe window + spam drop behavior + queued-job claim step before processing

---

## NEXT

1. Convert quote form from fake 4-step into real step flow (or simplify UI)
2. Fix thank-you CTA to direct phone intent (`tel:`)
3. Add Open Graph/Twitter metadata on core money pages
4. Add Privacy/Terms pages and link sitewide footer
5. Harden checkout return URL allowlist in `create-checkout-session.js` (Done: May 1, 2026)

---

## BLOCKED

- None currently

---

## BACKLOG

1. Weekly KPI instrumentation pass (lead -> sale funnel visibility)
2. Structured data expansion (`sameAs`, serviceArea, geo, openingHours)
3. Portfolio/testimonials expansion with proof assets
4. SLA/response-time messaging A/B copy pass

---

## SESSION UPDATE TEMPLATE

Use this at session end:

```md
### Session Update (YYYY-MM-DD)
- Done:
  - ...
- Moved to NEXT:
  - ...
- Added to BACKLOG:
  - ...
- Blockers:
  - ...
```

