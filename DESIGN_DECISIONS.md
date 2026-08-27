# DESIGN_DECISIONS.md — Say It Marketing
### Approved visual, UX, and content presentation decisions
*Created: August 27, 2026*

---

## Purpose

This file records design and UX decisions so future sessions do not re-litigate the same calls.

Rules:
- Jony owns visual quality.
- Angela owns customer journey clarity.
- Chris owns mobile behavior.
- If a design direction changes, add a dated entry with the reason.

---

## Current Design System

Say It uses the existing Apple-clean agency style:

- high contrast
- generous whitespace
- simple type hierarchy
- pill-shaped buttons
- direct customer language
- mobile-first layouts
- one clear primary CTA per page

Primary files:
- `assets/site.css`
- static HTML pages in repo root

---

## 2026-08-27 — Trade Show Displays Presentation

**Decision:** The display catalog experience should feel like Say It first, supplier second.

**Approved UX direction:**
- First screen: Say It branded display offer.
- Page structure: clear categories, proof/usage guidance, FAQ, quote CTA.
- Catalog access: secondary button, not the whole page.
- Copy: plain-English buying help, not supplier spec dumping.
- Images: use reseller-approved WSDisplay product imagery when available.

**Do not do:**
- Do not make a plain iframe the hero.
- Do not paste large supplier descriptions into the page.
- Do not show a wall of products before explaining how Say It helps.

---

## 2026-08-27 — Blue Luna Cues To Borrow

**Decision:** Borrow the parts of Blue Luna that are creating local trust and leads, adapted to Say It's business audience.

**Useful cues:**
- Local first line: Tucson / Southern Arizona / nationwide where relevant.
- Specific service pages rather than one generic service list.
- Real visual proof where possible.
- One obvious lead path.
- Plain-English forms with only useful questions.
- Admin report that tells Shawn what to do next, not just what happened.

**Say It adaptation:**
- For print/display pages, lead with business outcomes: look professional at events, get noticed, order without confusion.
- Keep the quote path low pressure: no payment on the first request.
- Make product category pages answer buyer questions for SEO and AI answer engines.

---

## 2026-08-27 — Print Navigation Label

**Decision:** Use `Print & Displays` as the short public navigation label.

**Reason:** It is clear enough for desktop/mobile nav, keeps the door open for everyday print and trade show display orders, and avoids a vague label like `Print Services` that hides the event/display opportunity.

**Applied UX rule:**
- Navigation stays short: `Print & Displays`.
- Homepage and page copy can be more descriptive: `Business Print & Trade Show Displays`.
- Supplier catalog access remains secondary to Say It-owned guidance and quote capture.

---

## 2026-08-27 — Business Print Page Visual Upgrade

**Decision:** The main print page should match the confidence of the trade show page, not feel like a placeholder print list.

**Approved UX direction:**
- Hero headline: lead with readiness and business outcome, not a generic service label.
- Feature panels: split into `Everyday Business Print` and `Events, Signs & Displays`.
- Images: use Say It-owned generated visuals for now; replace with WSDisplay-approved product assets when Shawn provides exact downloads.
- Category CTAs: every button should carry item intent into the quote form instead of all behaving like one generic quote link.
- Quote page: if a visitor arrives from a print category button, the first visible hero/form copy must acknowledge the exact print quote request.
