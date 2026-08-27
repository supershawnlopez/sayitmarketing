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

This session created the missing handoff/decision docs, updated the active task board, built the first approved Trade Show Displays hub, made the print/display path visible from the main site navigation, and upgraded the main print page hero/panels after Shawn's review.

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
   - Add session-based visit tracking.
   - Preserve UTM source/medium/campaign/content/term.
   - Add “Where did you hear about us?” to Say It forms.
   - Build admin traffic report showing leads by channel, marketing pages viewed, pages that led to leads, and top lead paths.

5. **Existing critical item**
   - Stripe webhook signed-event validation is still deferred from earlier sessions.

---

## Shawn Test Steps After Next Implementation

When reviewing print/display pages:

1. Open `print-services.html` and `trade-show-displays.html` on iPhone at 375px width or real phone.
2. Confirm both pages feel like Say It, not WSDisplay.
3. Tap a print category button and confirm the quote form preselects `Business Print & Trade Show Displays`.
4. Tap `Browse Display Catalog` on the trade show page and confirm it opens the non-branded catalog cleanly.
5. Search the pages for obvious print/display terms and make sure the copy sounds human.

When tracking is built:

1. Open a tagged test link.
2. Submit a test lead.
3. Confirm the admin traffic report shows the right source and page path.

---

## Next Best Move

Start with `TASKS.md` NOW item #2:

**Scope Blue Luna-style tracking/reporting for Say It.**

The display hub and print page upgrade are live-ready. Tracking comes next so future traffic and print/display campaigns are measurable.
