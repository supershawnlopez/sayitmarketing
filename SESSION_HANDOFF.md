# SESSION_HANDOFF.md — Say It Marketing
### Current truth for the next AI session
*Last updated: August 28, 2026*

---

## Where We Left Off

Shawn wants Say It Marketing to catch up to the operating style used on Found and Blue Luna Events:

- clear `BRIEF.md` startup instructions
- active `TASKS.md` board
- current handoff file
- decision records
- Apple-style team review before product, design, copy, architecture, or tracking changes

This session created the missing handoff/decision docs, updated the active task board, built the first approved Trade Show Displays hub, made the print/display path visible from the main site navigation, upgraded the main print page hero/panels after Shawn's review, made print category quote links feel context-aware on the quote page, completed the approved three-pillar homepage/nav pass around custom websites, custom apps, and print/displays, and completed the first Say It traffic-tracking backend setup.

Latest continuation:
- Pulled latest `main`; repo was already current at `52c78cf`.
- Fresh Supabase connector access is working.
- Confirmed Supabase organization `SAYIT` (`cvwuerqyenegvjynczww`) and project `website` (`hclptwixokdjtvtdgyfw`) are visible.
- Confirmed live migrations `005_tracking_reporting` and `tracking_reporting_indexes` are present.
- Verified live `/api/track` still stores events: `201 {"id":6,"stored":true}`.
- Added `docs/print-display-seo-support-pages.md` to define the first print/display SEO support-page cluster.
- Added `banner-stands.html` as the first product-specific print/display SEO support page.
- Added `banner-stands.html` to `sitemap.xml`.
- Replaced the original generic event-room imagery on `banner-stands.html` with two local banner-stand-specific compressed assets: `assets/banner-stands-hero.jpg` and `assets/banner-stands-booth.jpg`.
- Polished `banner-stands.html` after Shawn's desktop review: added action buttons to the "Before Ordering" section, centered the "How Say It Helps" process cards on desktop, and changed "Buying Help" into a clearer FAQ section for human readers and SEO/AEO support.
- Polished `banner-stands.html` after Shawn's screenshot review: fixed the full process-card row centering and added CSS chevrons to FAQ rows so they read as clickable.
- Shawn approved the local `banner-stands.html` page and asked Codex to push it.
- Pushed commit `070db94 Add banner stands SEO support page` to `origin/main`.
- Verified live page after Netlify deploy: `https://sayitmarketing.com/banner-stands.html` returned `200`.
- Verified live banner stand image assets returned `200`: `assets/banner-stands-hero.jpg` and `assets/banner-stands-booth.jpg`.
- Added `custom-table-covers.html` locally as the second product-specific print/display SEO support page.
- Generated and compressed two local table-cover-specific images: `assets/table-covers-hero.jpg` and `assets/table-covers-detail.jpg`.
- Added `custom-table-covers.html` to `sitemap.xml`.
- Updated `trade-show-displays.html` so the completed Banner Stands and Table Covers cards link to their support pages.
- Shawn approved local `custom-table-covers.html` and asked Codex to push it.
- Pushed commit `6f42139 Add custom table covers SEO support page` to `origin/main`.
- Verified live page after Netlify deploy: `https://sayitmarketing.com/custom-table-covers.html` returned `200`.
- Verified clean Netlify URL: `https://sayitmarketing.com/custom-table-covers` returned `200`.
- Verified live table cover image assets returned `200`: `assets/table-covers-hero.jpg` and `assets/table-covers-detail.jpg`.
- Verified `trade-show-displays.html` now links to the completed support pages through clean URLs `/banner-stands` and `/custom-table-covers`.
- Fixed the tablet-width spotlight layout on `custom-table-covers.html` and `banner-stands.html` so the image stacks above the "Before Ordering" copy instead of overlapping it.
- Updated `PROJECT.md` with the live banner stands and table covers pages.
- Updated `TASKS.md` so the next `NOW` item is building `step-and-repeat-backdrops.html`.

Important Supabase access note:
- Fresh Codex sessions can now use the Supabase connector for Say It.
- This session successfully connected to Supabase organization `SAYIT` (`cvwuerqyenegvjynczww`) and project `website` (`hclptwixokdjtvtdgyfw`).
- Future Supabase work should still begin by confirming it can see `SAYIT -> website` before making database changes.

---

## Current Business Direction

Say It is expanding the print offer into a real SEO/AEO/GEO traffic and order engine.

Immediate opportunity:
- Use ExhibitBook/WSDisplay as the behind-the-scenes reseller catalog and asset source.
- Keep the public experience looking like Say It, not a supplier handoff.
- Add Blue Luna-style attribution and traffic reporting so Shawn can see which pages and channels create leads.
- Replace generated print/display placeholders with WSDisplay-approved product images when Shawn provides exact image folders.

Team recommendation already discussed:
- Do not scrape supplier content blindly.
- Do not make a raw iframe the main experience.
- Build a Say It-owned display hub with curated categories, rewritten copy, approved WSDisplay assets, and a catalog button.
- Use `Print & Displays` in navigation and `Business Print & Trade Show Displays` for fuller page/homepage language.
- Keep Found off the public Say It offer; use it only as a sister-company referral after qualification.
- Main `print-services.html` hero should feel premium like the trade show page, with stronger imagery and buyer-focused category panels.
- Print category quote links may use the same quote form, but the quote page must visibly confirm the exact item request on arrival.
- Print quote traffic should push visitors toward the form first, then text; phone calls should be available but not prominent.
- Do not send print category buttons to `#quote-form`; it feels broken on mobile. Land at the top of the quote page and let the contextual hero guide visitors down.
- `Text Details` on print quote pages must open an item-specific Say It SMS draft. Never leave it as a bare SMS link that can expose a stale Found/domain message.
- Say It's public homepage and nav now use three branches: `Websites`, `Apps`, and `Print & Displays`.
- Homepage OG should avoid redundancy: title says `Custom Websites, Apps & Print | Say It Marketing`, description explains the offer, and image says `Look ready everywhere.` with the real Say It logo and visual website/app/print-display composition.
- Favicon/apple-touch/share-sheet icon is a separate icon-only system: blue field with white message bubble, no words, based on Shawn's Fav1 asset.
- Supporting services such as SEO, social, ads, hosting, and monthly care should stay below the main branches.

---

## Open Items

1. **Trade Show Displays page**
   - Live page: `trade-show-displays.html`.
   - Linked from `print-services.html`.
   - Linked from the main public navigation through `Print & Displays`.
   - Added to `sitemap.xml`.
   - Includes FAQ/schema-ready copy for Arizona, Tucson, Phoenix, and nationwide display orders.
   - Needs future support pages for individual product categories.

2. **Display/print SEO support pages**
   - Candidate pages: banner stands, table covers, canopy tents, step-and-repeat backdrops, trade show booths.
   - Each page should answer buyer questions and route to one quote CTA.
   - Architecture is now defined in `docs/print-display-seo-support-pages.md`.
   - Recommended build order: `banner-stands.html`, `custom-table-covers.html`, `step-and-repeat-backdrops.html`, `custom-canopy-tents.html`, `trade-show-booth-displays.html`.
   - First page built locally: `banner-stands.html`.
   - Second page built locally: `custom-table-covers.html`.
   - Banner stands page imagery now shows actual retractable banner stands instead of generic event-room stock photos.
   - Latest polish adds the missing CTA in the mid-page guidance block and presents buying questions as an FAQ.
   - Screenshot polish fixed the desktop process row alignment and added clickable-row chevrons to the FAQ.
   - Banner stands live deploy verified after GitHub push.
   - `custom-table-covers.html` was pushed and live-verified.

3. **WSDisplay-approved image replacement**
   - Current print hero/panel images are local generated placeholders: `assets/print-hero-premium.jpg` and `assets/print-display-booth.jpg`.
   - Replace them with approved supplier/product images once Shawn provides downloaded ZIP folders or exact files.

4. **Blue Luna-style tracking**
   - Implemented in repo and applied live: `assets/visit-tracker.js`, `/api/track`, `/api/traffic`, `/admin/traffic.html`, `site_visits`, `lead_page_paths`, preserved UTM/session fields, and `heard_about_us` on the quote/audit forms.
   - `lead-create.js` snapshots page paths into `lead_page_paths` and falls back safely if a future environment is missing the tracking schema.
   - Supabase project: organization `SAYIT` (`cvwuerqyenegvjynczww`), project `website` (`hclptwixokdjtvtdgyfw`), status reported as `ACTIVE_HEALTHY`, Postgres `17.6`.
   - Applied migrations on live Supabase: `005_tracking_reporting` and `tracking_reporting_indexes`.
   - Repo migration files: `supabase/migrations/005_tracking_reporting.sql` and `supabase/migrations/20260828064426_tracking_reporting_indexes.sql`.
   - Follow-up commit pushed: `ccfe11f Add tracking reporting index migration`.
   - Live verification after Supabase setup: `/api/track` returns `201 {"id":3,"stored":true}`.
   - Fresh verification on August 28, 2026: `/api/track` returns `201 {"id":6,"stored":true}`, and the matching `site_visits` row is visible in Supabase.
   - `/api/traffic` correctly returns `401 Unauthorized` without the admin key.
   - Current long-running session cannot directly inspect Supabase anymore because its connector session is stale; use a fresh Supabase-connected task for database changes.

5. **Existing critical item**
   - Stripe webhook signed-event validation is still deferred from earlier sessions.

6. **Three pillar review**
   - Homepage now leads with custom websites, custom apps, and print/displays.
   - Public nav now shows `Websites`, `Apps`, and `Print & Displays`.
   - New page: `custom-apps.html`.
   - Quote page now responds to `?service=website`, `?service=custom-app`, and `?service=print`.
   - New icon files are wired sitewide: `apple-touch-icon`, 32/16 PNG favicons, root `favicon.ico`, and `site.webmanifest`.

---

## Shawn Test Steps After Next Implementation

When reviewing print/display pages:

1. Open `print-services.html`, `trade-show-displays.html`, `banner-stands.html`, and local `custom-table-covers.html` on iPhone at 375px width or real phone.
2. Confirm both pages feel like Say It, not WSDisplay.
3. Tap a print category button and confirm the quote page headline/form header says the exact request, such as `Menus & Service Sheets Quote`.
4. Confirm the print quote page lands at the top, prioritizes `Fill Out Print Quote`, with `Text Details` second and phone as a small link.
5. Tap `Text Details` from business cards, flyers, menus, and signs contexts and confirm the SMS draft names the matching print item and says Say It, not Found.
6. Tap `Browse Display Catalog` on the trade show page and confirm it opens the non-branded catalog cleanly.
7. From `banner-stands.html`, tap `Request A Banner Stand Quote` and confirm the quote page headline/form header says `Banner Stands Quote`.
8. From `custom-table-covers.html`, tap `Request A Table Cover Quote` and confirm the quote page headline/form header says `Table Covers Quote`.
9. Tap `Text Details` on the banner stand and table cover quote pages and confirm the SMS draft says Say It and names the right item.
10. On iPad/tablet width, confirm the "Before Ordering" spotlight image stacks above the copy without covering the headline, list, or buttons.
11. Search the pages for obvious print/display terms and make sure the copy sounds human.

When reviewing the three-pillar pass:

1. Share `https://sayitmarketing.com/` by text and confirm the preview title says `Custom Websites, Apps & Print | Say It Marketing`.
2. Confirm the preview image uses the real Say It logo, says `Look ready everywhere.`, and shows the website/app/print-display visual composition.
3. Confirm the small share-sheet/site icon is a blue icon-only message bubble based on Fav1, not the old orange favicon and not the full wordmark.
4. Open the homepage on iPhone and confirm the first service choice is clearly `Custom Websites`, `Custom Apps`, and `Print & Displays`.
5. Tap `Apps` in the nav and confirm `custom-apps.html` feels like a real Say It service page.
6. Tap `Start An App Quote` and confirm the quote page headline says `Custom App Quote`.
7. Tap a website quote link and confirm the quote page headline says `Custom Website Quote`.

When reviewing tracking:

1. Open a tagged test link.
2. Submit a test lead.
3. Confirm `/admin/traffic.html` shows the right source and page path.
4. Confirm `/admin/leads.html` shows the lead's service and source.
5. If Supabase access is needed, first confirm the connector can list `SAYIT -> website` (`hclptwixokdjtvtdgyfw`).

---

## Next Best Move

Start `step-and-repeat-backdrops.html` using the approved support-page pattern.

Suggested prompt for the next task:

```text
We are working in C:\Users\SuperShawn\Documents\GitHub\sayitmarketing.

Read BRIEF.md, AGENTS.md, TASKS.md, and SESSION_HANDOFF.md.

Start `step-and-repeat-backdrops.html` using `docs/print-display-seo-support-pages.md` and the approved support-page pattern.
```

The display hub, print page upgrade, three-pillar architecture pass, OG/icon work, traffic-tracking backend, first display/print support-page architecture, live `banner-stands.html` page, and live `custom-table-covers.html` page are complete. The next open growth task is building `step-and-repeat-backdrops.html`.
