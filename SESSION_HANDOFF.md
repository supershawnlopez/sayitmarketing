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

This session created the missing handoff/decision docs, updated the active task board, and built the first approved Trade Show Displays hub page locally.

---

## Current Business Direction

Say It is expanding the print offer into a real SEO/AEO/GEO traffic and order engine.

Immediate opportunity:
- Review and publish the Say It branded `trade-show-displays.html` page.
- Use ExhibitBook/WSDisplay as the behind-the-scenes reseller catalog and asset source.
- Keep the public experience looking like Say It, not a supplier handoff.
- Add Blue Luna-style attribution and traffic reporting so Shawn can see which pages and channels create leads.

Team recommendation already discussed:
- Do not scrape supplier content blindly.
- Do not make a raw iframe the main experience.
- Build a Say It-owned display hub with curated categories, rewritten copy, approved WSDisplay assets, and a catalog button.

---

## Open Items

1. **Trade Show Displays page**
   - Created locally: `trade-show-displays.html`.
   - Linked from `print-services.html`.
   - Added to `sitemap.xml`.
   - Includes FAQ/schema-ready copy for Arizona, Tucson, Phoenix, and nationwide display orders.
   - Needs Shawn visual/content review before push/deploy.

2. **Display/print SEO support pages**
   - Candidate pages: banner stands, table throws, canopy tents, step-and-repeat backdrops, trade show booths.
   - Each page should answer buyer questions and route to one quote CTA.

3. **Blue Luna-style tracking**
   - Add session-based visit tracking.
   - Preserve UTM source/medium/campaign/content/term.
   - Add “Where did you hear about us?” to Say It forms.
   - Build admin traffic report showing leads by channel, marketing pages viewed, pages that led to leads, and top lead paths.

4. **Existing critical item**
   - Stripe webhook signed-event validation is still deferred from earlier sessions.

---

## Shawn Test Steps After Next Implementation

When the trade show display page is built:

1. Open it on iPhone at 375px width or real phone.
2. Confirm it feels like Say It, not WSDisplay.
3. Tap `Browse Display Catalog` and confirm it opens the non-branded catalog cleanly.
4. Tap `Request A Display Quote` and confirm the quote path is obvious.
5. Search the page for obvious Tucson/display terms and make sure the copy sounds human.

When tracking is built:

1. Open a tagged test link.
2. Submit a test lead.
3. Confirm the admin traffic report shows the right source and page path.

---

## Next Best Move

Start with `TASKS.md` NEXT item #1:

**Scope Blue Luna-style tracking/reporting for Say It.**

The display hub is built locally. Tracking comes right after so future traffic and print/display campaigns are measurable.
