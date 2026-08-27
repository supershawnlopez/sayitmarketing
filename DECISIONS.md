# DECISIONS.md — Say It Marketing
### Approved product, business, data, and architecture decisions
*Created: August 27, 2026*

---

## Purpose

This file records decisions that should not be rediscovered in every session.

Rules:
- Product decisions are owned by Steve.
- Marketing/SEO decisions are owned by Phil.
- Customer journey decisions are owned by Angela.
- Architecture/data decisions are owned by Craig and Priya.
- If a decision changes, add a new entry. Do not silently rewrite history.

---

## 2026-08-27 — ExhibitBook / WSDisplay Catalog Strategy

**Decision:** Build a Say It branded trade show display hub instead of using a raw supplier iframe as the primary experience.

**Context:** Shawn has reseller access to WSDisplay marketing tools, non-branded ExhibitBook catalog resources, product images, editable catalogs, flyer tools, videos, spec sheets, and swatch/order resources.

**Team call:**
- Steve: Clients should feel Say It is guiding the purchase, not sending them away.
- Jony: A raw embedded supplier catalog will not feel as premium as a curated Say It page.
- Phil: SEO/AEO/GEO value must live on `sayitmarketing.com`, not only on an outbound catalog.
- Angela: The browse path is useful, but every path must return to quote/request contact.
- Craig: Scraping supplier pages creates brittle maintenance.
- Priya: Use approved reseller assets and avoid copying long supplier descriptions word-for-word unless explicitly licensed.

**Approved direction:**
- Create `trade-show-displays.html` as a Say It branded page.
- Use ExhibitBook as the full catalog link.
- Use WSDisplay-provided product images/assets where reseller use is permitted.
- Rewrite product/category descriptions in Say It voice.
- Route all purchase interest through Say It quote capture.

---

## 2026-08-27 — Blue Luna Tracking Pattern For Say It

**Decision:** Say It should emulate Blue Luna's traffic report philosophy: leads by channel matter more than raw visits.

**Why:** Blue Luna is getting weekly leads and its report evolved around practical decisions: where did the lead come from, what page helped, and what link should be used next.

**Approved direction:**
- Add session-based visit tracking.
- Preserve UTM parameters for the whole session.
- Ask “Where did you hear about us?” on forms.
- Report pages that led to leads, not only top pageviews.
- Label unclear traffic honestly as “Unknown / Direct / DMs.”

**Not yet implemented:** This is approved as a direction, but code/schema changes still need a scoped implementation pass.
