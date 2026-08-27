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

**Phase 2: Print/Display Growth + Tracking**

Goal:
- Turn print and trade show displays into a Say It-owned SEO/AEO/GEO revenue channel
- Borrow the Blue Luna reporting pattern so Shawn can see which pages and channels create leads
- Keep the WSDisplay/ExhibitBook resource useful without making the customer feel handed off

Exit criteria:
1. Say It branded trade show display hub is live-ready and linked from print services
2. Display/print SEO page plan is defined with first support pages queued
3. Session/UTM/referral tracking implementation is scoped for the static Netlify/Supabase stack
4. Admin traffic report spec mirrors the useful Blue Luna report: leads by channel, pages that led to leads, and top lead paths

---

## NOW (MAX 3)

1. Build Say It branded Trade Show Displays hub
- Owner: Steve + Jony + Phil + Angela + Marcus
- Status: Done and linked (August 27, 2026)
- Notes: Created `trade-show-displays.html`, linked from `print-services.html`, added sitemap entry, used ExhibitBook as secondary catalog link, routed quote interest through Say It, exposed the print/display branch in the main navigation as `Print & Displays`, and upgraded the main print page hero/category panels after Shawn's review.

2. Scope Blue Luna-style tracking/reporting for Say It
- Owner: Priya + Craig + Phil
- Status: Ready for implementation plan
- Notes: Port the concept, not the Next.js code directly. Say It is static HTML + Netlify Functions + Supabase. Need `site_visits`, `/api/track`, `assets/visit-tracker.js`, UTM/session preservation, referral question, and `/admin/traffic.html`.

3. Define first display/print SEO support pages
- Owner: Phil + Angela
- Status: Ready for content architecture
- Notes: Candidate pages should use exact buyer terms: `banner-stands.html`, `custom-table-covers.html`, `custom-canopy-tents.html`, `step-and-repeat-backdrops.html`, `trade-show-booth-displays.html`.

---

## NEXT

1. Implement tracking schema and visit tracker after display hub ships
2. Add “Where did you hear about us?” to quote/audit/display forms
3. Build `/admin/traffic.html` report
4. Validate Stripe webhook with real signed test event — deferred from Phase 1

---

## BLOCKED

- None currently

---

## BACKLOG

1. Weekly KPI instrumentation pass (lead -> sale funnel visibility)
2. Structured data expansion (`sameAs`, serviceArea, geo, openingHours)
3. Portfolio/testimonials expansion with proof assets
4. SLA/response-time messaging A/B copy pass
5. WSDisplay reseller asset audit: identify approved images/catalog copy that can be used on Say It pages
6. Branded reseller catalog/subdomain inquiry with WSDisplay/ExhibitBook
7. Phase 1 archive cleanup: preserve completed hardening tasks and keep current board focused

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
