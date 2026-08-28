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
4. Session/UTM/referral tracking is live on the static Netlify/Supabase stack
5. Admin traffic report mirrors the useful Blue Luna report: leads by channel, pages that led to leads, and top lead paths

---

## NOW (MAX 3)

1. Complete first display/print SEO support-page cluster
- Owner: Phil + Angela + Marcus + Chris
- Status: Done and live-verified (August 28, 2026)
- Notes: Built the first support-page cluster: `banner-stands.html`, `custom-table-covers.html`, `step-and-repeat-backdrops.html`, `custom-canopy-tents.html`, and `trade-show-booth-displays.html`. Shawn reviewed and approved the live pages. All use the approved support-page pattern, product-specific imagery, quote context, tracking script, sitemap entries, and display hub links.

2. Add service/page filtering to the admin traffic report
- Owner: Priya + Angela + Phil
- Status: Done locally (August 28, 2026)
- Notes: Added date range, service, page/path, and page-family filters to `/admin/traffic.html`; added visible Leads By Service and Visits By Device sections; updated `/api/traffic` filtering without a new database migration. Local function syntax and mocked filtered-report checks passed. Pending push/live deploy verification.

3. Validate Stripe webhook with real signed test event
- Owner: Priya + Craig
- Status: Deferred from Phase 1
- Notes: Confirm the webhook rejects unsigned/fake payloads and accepts a real signed Stripe test event before relying on payment automation.

---

## RECENTLY COMPLETED

1. Admin traffic report filtering
- Owner: Priya + Angela + Phil + Craig
- Status: Done locally (August 28, 2026)
- Notes: `/admin/traffic.html` now supports date range, service, page/path, and page-family filters, including the display-support family for the new print/display SEO pages. `/api/traffic` now filters leads and visits server-side and returns available service options, Leads By Service, Visits By Device, Top Pageviews, Pages That Led To Leads, and Recent Lead Paths from the filtered data.

1. Display/print SEO support-page architecture
- Owner: Phil + Angela + Steve + Jony + Craig + Priya + Marcus + Chris
- Status: Done locally (August 28, 2026)
- Notes: Added `docs/print-display-seo-support-pages.md` with the first page cluster, reusable page structure, quote link rules, SEO targets, internal linking, and first-page recommendation.

2. First display/print SEO support page build
- Owner: Phil + Angela + Marcus + Chris
- Status: Approved by Shawn and pushed (August 28, 2026)
- Notes: Added `banner-stands.html`, compressed local banner stand imagery, FAQ chevrons, centered process cards, quote CTAs, and sitemap entry. Pending live Netlify deploy verification.

3. Second display/print SEO support page build
- Owner: Phil + Angela + Marcus + Chris
- Status: Done and live-verified (August 28, 2026)
- Notes: Added `custom-table-covers.html`, compressed local table cover imagery, sitemap entry, and hub links from `trade-show-displays.html`. Live page and clean URL returned `200`. Spotlight layout now uses explicit left/right columns, a capped media column, reset `figure` margins, and mobile-only stacking.

4. Third display/print SEO support page build
- Owner: Phil + Angela + Marcus + Chris
- Status: Done and live-verified (August 28, 2026)
- Notes: Added `step-and-repeat-backdrops.html`, compressed local backdrop imagery, product-specific quote context, sitemap entry, and display hub link from `trade-show-displays.html`. Shawn approved, page was pushed, and live page/assets returned `200`.

5. Fourth display/print SEO support page build
- Owner: Phil + Angela + Marcus + Chris
- Status: Done and live-verified (August 28, 2026)
- Notes: Added `custom-canopy-tents.html`, compressed local canopy imagery, product-specific quote context, sitemap entry, and display hub link from `trade-show-displays.html`. Shawn approved, page was pushed, and live page/assets returned `200`.

6. Fifth display/print SEO support page build
- Owner: Phil + Angela + Marcus + Chris
- Status: Done and live-verified (August 28, 2026)
- Notes: Added `trade-show-booth-displays.html`, compressed local booth display imagery, product-specific quote context, sitemap entry, and display hub link from `trade-show-displays.html`. Shawn approved the live page; page, clean URL, assets, tracking, and quote context were verified.

1. Three pillar architecture pass
- Owner: Steve + Jony + Phil + Angela + Marcus
- Status: Done and visually approved (August 27, 2026)
- Notes: Homepage OG/meta, hero, first service tiles, public nav, `custom-apps.html`, sitemap, quote context, and refreshed share card/icon system now support `Websites`, `Apps`, and `Print & Displays`.

2. Blue Luna-style tracking/reporting for Say It
- Owner: Priya + Craig + Phil
- Status: Done and live-verified (August 28, 2026)
- Notes: Added `site_visits`, `lead_page_paths`, `/api/track`, `/api/traffic`, `assets/visit-tracker.js`, UTM/session preservation, `heard_about_us` form field, path snapshotting, and `/admin/traffic.html`. Applied live to Supabase organization `SAYIT` (`cvwuerqyenegvjynczww`), project `website` (`hclptwixokdjtvtdgyfw`) with migrations `005_tracking_reporting` and `tracking_reporting_indexes`. Pushed follow-up commit `ccfe11f`. Live `/api/track` returned `stored:true`; `/api/traffic` correctly rejects unauthenticated requests. Use a fresh Supabase-connected task for future database changes because this long-running session has stale connector access.

3. Refresh homepage share card and site icons
- Owner: Steve + Jony + Phil + Craig
- Status: Done and pushed (August 27, 2026)
- Notes: Replaced the homepage OG image with a premium three-pillar visual composition, kept the OG image copy to `Look ready everywhere.`, removed duplicate domain/icon clutter inside the image, and replaced favicon/apple-touch/manifest icons with the approved Fav1 blue message-bubble icon.

4. Build Say It branded Trade Show Displays hub
- Owner: Steve + Jony + Phil + Angela + Marcus
- Status: Done and linked (August 27, 2026)
- Notes: Created `trade-show-displays.html`, linked from `print-services.html`, added sitemap entry, used ExhibitBook as secondary catalog link, routed quote interest through Say It, exposed the print/display branch in the main navigation as `Print & Displays`, and upgraded the main print page hero/category panels after Shawn's review.

---

## NEXT

1. Validate Stripe webhook with real signed test event
2. Structured data expansion (`sameAs`, serviceArea, geo, openingHours`)
3. Replace generated print/display imagery with approved WSDisplay assets when available

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
