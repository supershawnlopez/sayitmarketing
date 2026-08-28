# Print & Display SEO Support Pages
### Say It Marketing content architecture
*Created: August 28, 2026*

---

## Purpose

Build product-specific print/display pages that help a business owner choose the right display piece and request a quote through Say It Marketing.

These pages support Phase 2 by turning trade show displays and business print into a Say It-owned SEO/AEO/GEO channel. They should reinforce the existing public branches:

- Websites
- Apps
- Print & Displays

---

## Team Direction

**Phil:** Use exact buyer terms. People search for a product, deadline, and location, not a generic category.

**Angela:** Every page needs one low-pressure quote path. The visitor should know what to ask for without needing supplier vocabulary.

**Steve:** Keep the page simple enough to understand in five seconds. Do not build a catalog wall.

**Jony:** Reuse the clean print/display visual system. The page should feel premium and guided, not dense.

**Craig:** Keep pages static, fast, and consistent with the existing HTML/CSS/JS structure.

**Priya:** No new backend is needed. Use the existing quote form context and traffic tracking.

**Marcus:** Each support page should link back to `trade-show-displays.html` and `print-services.html`, and quote links should pass item context to `get-quote.html`.

**Chris:** Design mobile-first. The page must scan well at 375px with clear tap targets and no crowded comparison tables.

---

## First Page Cluster

Build these pages in this order:

1. `banner-stands.html` — live
2. `custom-table-covers.html` — approved and pushed, pending live deploy verification
3. `step-and-repeat-backdrops.html` — next
4. `custom-canopy-tents.html`
5. `trade-show-booth-displays.html`

This order starts with the simplest, highest-intent portable event product and grows into more complex event setups.

---

## Page Template

Each support page should use the same structure:

1. Hero
   - Eyebrow: `Print & Displays`
   - H1 uses the exact product term and local/national reach
   - One short paragraph explaining the buyer outcome
   - Primary CTA: `Request A Quote`
   - Secondary CTA: `View Trade Show Displays`

2. Quick Fit
   - Three compact use cases
   - Example: trade shows, lobbies, check-in tables
   - Keep this practical, not decorative

3. What To Know Before Ordering
   - Sizes, material choices, artwork/proofing, turnaround, and reuse
   - Written as buyer guidance, not supplier specs

4. How Say It Helps
   - Choose the right product
   - Prepare or review artwork
   - Coordinate proofing
   - Order around the event date

5. FAQ
   - 3 to 5 questions written for search and AI answers
   - Include Tucson/Arizona/nationwide language where natural

6. Final CTA
   - One primary quote link
   - A quiet secondary link back to the display hub

---

## Quote Link Rules

Use the existing quote flow. Do not create separate forms.

Recommended links:

- `banner-stands.html` -> `get-quote.html?service=print&item=banner-stands`
- `custom-table-covers.html` -> `get-quote.html?service=print&item=table-covers`
- `step-and-repeat-backdrops.html` -> `get-quote.html?service=print&item=backdrops`
- `custom-canopy-tents.html` -> `get-quote.html?service=print&item=canopy-tents`
- `trade-show-booth-displays.html` -> `get-quote.html?service=print&item=booth-kits`

If a new item label is added, update `assets/lead-form.js` so the quote page headline, form header, SMS draft, and hidden service value all match the visitor's intent.

---

## SEO Targets

Use exact product terms in titles, H1s, meta descriptions, internal links, and FAQ questions.

Primary page targets:

- `banner stands`
- `retractable banner stands`
- `custom table covers`
- `printed table throws`
- `step and repeat backdrops`
- `event photo backdrops`
- `custom canopy tents`
- `printed pop up tents`
- `trade show booth displays`
- `trade show booth kits`

Local modifiers:

- Tucson
- Arizona
- Phoenix
- nationwide delivery

Do not overstuff location terms. Use them where they help the buyer understand service coverage.

---

## Internal Linking

Every page should link to:

- `trade-show-displays.html`
- `print-services.html`
- `get-quote.html?service=print&item=...`

The display hub should later link back to these support pages once at least two pages are live, so the hub does not become a dead directory with only one child.

---

## Content Rules

Do:

- Explain what the product is good for
- Tell the buyer what information to send
- Keep Say It as the guide and quote owner
- Mention design/proofing help
- Keep the supplier catalog secondary
- Include `assets/visit-tracker.js`
- Add each published page to `sitemap.xml`

Do not:

- Copy supplier product descriptions
- Make ExhibitBook the primary CTA
- Add pricing unless Shawn approves specific margins
- Add a separate form
- Add dependencies or a framework
- Publish pages without mobile QA

---

## First Page Recommendation

Start with `banner-stands.html`.

Reason:

- It is the easiest product for a small business owner to understand.
- Local SERP results show multiple Tucson competitors targeting banner stands directly.
- It works as a low-cost entry point into larger display orders.
- It naturally cross-links to table covers, backdrops, and booth kits later.

Approved first-page angle:

> Custom banner stands for Tucson and Arizona businesses that need a clean, portable display for events, lobbies, check-ins, and trade shows.

Primary CTA:

> Request A Banner Stand Quote

Secondary CTA:

> View Trade Show Displays
