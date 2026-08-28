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
- Make Say It's public offer clear around three branches: custom websites, custom apps, and print/displays
- Turn print and trade show displays into a Say It-owned SEO/AEO/GEO revenue channel
- Borrow the Blue Luna reporting pattern so Shawn can see which pages and channels create leads
- Keep the WSDisplay/ExhibitBook resource useful without making the customer feel handed off

Exit criteria:
1. Homepage, nav, and quote path clearly reflect Websites / Apps / Print & Displays
2. Say It branded trade show display hub is live-ready and linked from print services
3. Display/print SEO page plan is defined with first support pages queued
4. Session/UTM/referral tracking implementation is scoped for the static Netlify/Supabase stack
5. Admin traffic report spec mirrors the useful Blue Luna report: leads by channel, pages that led to leads, and top lead paths

---

## NOW (MAX 3)

1. Scope Blue Luna-style tracking/reporting for Say It
- Owner: Priya + Craig + Phil
- Status: Implemented in repo; pending Say It Supabase migration application and live verification
- Notes: Added `site_visits`, `lead_page_paths`, `/api/track`, `/api/traffic`, `assets/visit-tracker.js`, UTM/session preservation, `heard_about_us` form field, path snapshotting, and `/admin/traffic.html`. Supabase CLI currently exposes only the SPA MAMBO project, so the Say It tracking migration was not applied remotely.

2. Define first display/print SEO support pages
- Owner: Phil + Angela
- Status: Ready for content architecture
- Notes: Candidate pages should use exact buyer terms: `banner-stands.html`, `custom-table-covers.html`, `custom-canopy-tents.html`, `step-and-repeat-backdrops.html`, `trade-show-booth-displays.html`.

---

## RECENTLY COMPLETED

1. Three pillar architecture pass
- Owner: Steve + Jony + Phil + Angela + Marcus
- Status: Done and visually approved (August 27, 2026)
- Notes: Homepage OG/meta, hero, first service tiles, public nav, `custom-apps.html`, sitemap, quote context, and refreshed share card/icon system now support `Websites`, `Apps`, and `Print & Displays`.

2. Refresh homepage share card and site icons
- Owner: Steve + Jony + Phil + Craig
- Status: Done and pushed (August 27, 2026)
- Notes: Replaced the homepage OG image with a premium three-pillar visual composition, kept the OG image copy to `Look ready everywhere.`, removed duplicate domain/icon clutter inside the image, and replaced favicon/apple-touch/manifest icons with the approved Fav1 blue message-bubble icon.

3. Build Say It branded Trade Show Displays hub
- Owner: Steve + Jony + Phil + Angela + Marcus
- Status: Done and linked (August 27, 2026)
- Notes: Created `trade-show-displays.html`, linked from `print-services.html`, added sitemap entry, used ExhibitBook as secondary catalog link, routed quote interest through Say It, exposed the print/display branch in the main navigation as `Print & Displays`, and upgraded the main print page hero/category panels after Shawn's review.

---

## NEXT

1. Apply `supabase/migrations/005_tracking_reporting.sql` to the correct Say It Supabase project
2. Live-test `/api/track`, `/api/traffic`, `/admin/traffic.html`, and a form submission after the migration is applied
3. Validate Stripe webhook with real signed test event — deferred from Phase 1

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
