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

---

## 2026-08-27 — Say It Service Branches And Print Wording

**Decision:** Say It's main public offer should be organized around three primary business branches: custom websites, custom apps, and print. Found is not advertised as a Say It service.

**Team call:**
- Steve: Say It should feel like the premium custom agency. Found is a fallback when a prospect is not a fit for custom work.
- Phil: Use buyer/search language for print: `Print & Displays` in navigation, `Business Print & Trade Show Displays` on the homepage, and exact SEO terms on support pages.
- Angela: The print path must be visible from the main navigation, not buried inside add-ons.
- Craig/Marcus: Link the existing print destination before building new page architecture.

**Approved direction:**
- Main navigation label: `Print & Displays`.
- Homepage branch/chip label: `Business Print & Trade Show Displays`.
- Print page title/H1 language: `Business Printing & Trade Show Displays`.
- Display SEO support terms: banner stands, table covers, backdrops, canopy tents, booth kits, signs, and trade show booth displays.
- Found may be offered only after qualification as a sister-company referral when Say It is not the right fit.

---

## 2026-08-27 — Three Pillar Public Architecture

**Decision:** Say It's public homepage and navigation should present three primary branches: custom websites, custom apps, and print/displays.

**Context:** Shawn approved moving Say It away from a generic website/design/add-on list and toward a clearer business structure that matches what the company now sells.

**Approved direction:**
- Homepage OG/meta and first-screen copy should say `Custom Websites, Apps, Print & Displays`.
- Public navigation should use `Websites`, `Apps`, and `Print & Displays` as the main service branches.
- Social media, SEO, ads, hosting, and monthly care are supporting services, not the first decision.
- Quote links should preserve branch context with `?service=website`, `?service=custom-app`, or `?service=print`.
- Found remains off the public Say It offer and is only a sister-company fallback after qualification.

---

## 2026-08-28 — Structured Data Fact Safety

**Decision:** Expand Say It structured data only with verified business facts already supported by the repo or Shawn approval.

**Context:** The SEO/AEO/GEO task called for `sameAs`, service-area detail, `geo`, and `openingHours`. The repo confirms Say It's name, phone, email, Tucson/AZ base, nationwide service language, Facebook profile, Instagram profile, founding year, services, and page-level offers. It does not confirm a public street address, public office hours, or exact map coordinates.

**Team call:**
- Phil: Add structured data that helps search and AI answer engines understand the business and service pages.
- Craig: Keep JSON-LD consistent across public pages and avoid conflicting page-by-page business identities.
- Marcus: Apply this only to public sales/service pages, not admin or private proposal pages.
- Priya: Do not publish unverified hours, street-level location details, or coordinates.
- Steve: Invisible metadata is fine if it makes the site clearer without adding page clutter.

**Approved direction:**
- Add consistent `LocalBusiness` / `ProfessionalService`, `WebSite`, `WebPage`, service, offer, and FAQ schema where appropriate.
- Include verified `sameAs` links for Facebook and Instagram.
- Use Tucson, Phoenix, Arizona, and United States as structured `areaServed` where appropriate.
- Shawn approved public availability as Monday-Friday, 9 AM-5 PM, by appointment.
- Add `openingHoursSpecification` and appointment-first policy text.
- Do not add a public street address or `geo` coordinates unless Shawn later confirms a real public location customers can visit.
