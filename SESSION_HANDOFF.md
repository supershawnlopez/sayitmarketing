# SESSION_HANDOFF.md — Say It Marketing
### Current truth for the next AI session
*Last updated: August 27, 2026*

---

## Where We Left Off

Shawn wants Say It Marketing to catch up to the operating style used on Found and Blue Luna Events:

- clear `BRIEF.md` startup instructions
- active `TASKS.md` board
- current handoff file
- decision records
- Apple-style team review before product, design, copy, architecture, or tracking changes

This session created the missing handoff/decision docs, updated the active task board, built the first approved Trade Show Displays hub, made the print/display path visible from the main site navigation, upgraded the main print page hero/panels after Shawn's review, made print category quote links feel context-aware on the quote page, and completed the approved three-pillar homepage/nav pass around custom websites, custom apps, and print/displays.

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

3. **WSDisplay-approved image replacement**
   - Current print hero/panel images are local generated placeholders: `assets/print-hero-premium.jpg` and `assets/print-display-booth.jpg`.
   - Replace them with approved supplier/product images once Shawn provides downloaded ZIP folders or exact files.

4. **Blue Luna-style tracking**
   - Implemented in repo: `assets/visit-tracker.js`, `/api/track`, `/api/traffic`, `/admin/traffic.html`, `site_visits`, `lead_page_paths`, preserved UTM/session fields, and `heard_about_us` on the quote/audit forms.
   - `lead-create.js` snapshots page paths into `lead_page_paths` when the tracking schema exists and falls back safely if the migration has not been applied yet.
   - Supabase migration file: `supabase/migrations/005_tracking_reporting.sql`.
   - Remote migration not applied yet because the local Supabase CLI only listed the `SPA MAMBO` project, not a Say It project. Do not apply this migration to SPA MAMBO.

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

1. Open `print-services.html` and `trade-show-displays.html` on iPhone at 375px width or real phone.
2. Confirm both pages feel like Say It, not WSDisplay.
3. Tap a print category button and confirm the quote page headline/form header says the exact request, such as `Menus & Service Sheets Quote`.
4. Confirm the print quote page lands at the top, prioritizes `Fill Out Print Quote`, with `Text Details` second and phone as a small link.
5. Tap `Text Details` from business cards, flyers, menus, and signs contexts and confirm the SMS draft names the matching print item and says Say It, not Found.
6. Tap `Browse Display Catalog` on the trade show page and confirm it opens the non-branded catalog cleanly.
7. Search the pages for obvious print/display terms and make sure the copy sounds human.

When reviewing the three-pillar pass:

1. Share `https://sayitmarketing.com/` by text and confirm the preview title says `Custom Websites, Apps & Print | Say It Marketing`.
2. Confirm the preview image uses the real Say It logo, says `Look ready everywhere.`, and shows the website/app/print-display visual composition.
3. Confirm the small share-sheet/site icon is a blue icon-only message bubble based on Fav1, not the old orange favicon and not the full wordmark.
4. Open the homepage on iPhone and confirm the first service choice is clearly `Custom Websites`, `Custom Apps`, and `Print & Displays`.
5. Tap `Apps` in the nav and confirm `custom-apps.html` feels like a real Say It service page.
6. Tap `Start An App Quote` and confirm the quote page headline says `Custom App Quote`.
7. Tap a website quote link and confirm the quote page headline says `Custom Website Quote`.

When tracking is deployed:

1. Open a tagged test link.
2. Submit a test lead.
3. Confirm `/admin/traffic.html` shows the right source and page path.
4. Confirm `/admin/leads.html` shows the lead's service and source.

---

## Next Best Move

Start with the remaining tracking deployment dependency:

**Apply `supabase/migrations/005_tracking_reporting.sql` to the correct Say It Supabase project, then live-test `/api/track`, `/api/traffic`, `/admin/traffic.html`, and a real form submission.**

The display hub, print page upgrade, three-pillar architecture pass, and tracking code are repo-ready. The full traffic report needs the correct Supabase project schema applied before it can collect visit/path data.
