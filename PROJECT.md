# PROJECT.md — Say It Marketing Site Intelligence File
### Read this first. Every AI, every session, every time.
*Last updated: April 2026*

---

## WHO YOU ARE WORKING FOR

**Shawn Lopez** — Owner, Say It Marketing. Tucson, AZ. In business since 1999.
Web design, graphic design, branding, SEO, social media management, hosting, and print brokerage.

Related businesses Shawn owns or manages:
- **BarrioGeek** (barriogeek.com) — Tech/IT services
- **Barrio Builders** (barriobuilders.com) — Construction
- **Blue Luna Events** (bluelunaevents.com) — Events, owned by Monique (Shawn's girlfriend), pro bono

**Communication style:** Direct, conversational, no jargon. Works from iPhone while multitasking. Wants copy-paste ready deliverables and 2–3 clear options — not essays. Responds well to confidence and decisiveness.

---

## THE MISSION

> **This site must make money every single day.**
> Minimum: one lead, one inquiry, one payment — every 24 hours.
> Whether that's $100 or $100,000,000 — the machine never sleeps.

This is not a brochure. This is a **sales and revenue engine** that runs while Shawn sleeps, grooms clients, builds sites, and lives his life. Every page, every button, every word must serve one of these goals:

1. **Capture a lead**
2. **Close a sale**
3. **Start a recurring subscription**
4. **Build trust that leads to #1, #2, or #3**

---

## TECH STACK

| Layer | Tool | Notes |
|---|---|---|
| Hosting | Netlify (Pro) | Master account, all client sites under one roof |
| Code | HTML + CSS + JS | No frameworks. Clean, fast, maintainable |
| CMS | Decap CMS | Only if client needs to edit content |
| Version control | GitHub | `supershawnlopez/sayitmarketing` |
| Database | Supabase | `https://hclptwixokdjtvtdgyfw.supabase.co` |
| Payments | Stripe | Payment links + subscriptions |
| Forms | Netlify Functions → Supabase | Lead capture with scoring + automation queue |
| Email | Google Workspace | hello@sayitmarketing.com |
| Fonts | Outfit (Google Fonts) | Primary font across all pages |
| Domain | sayitmarketing.com | DNS on Namecheap |

**Never add:** Cloudflare, WordPress, paid SSL, custom payment systems, unnecessary npm packages, or any tool that requires ongoing maintenance without a clear revenue reason.

---

## BRAND SYSTEM

```
Primary Blue:   #4BA6DC  — CTAs, links, accents, highlights
Near Black:     #101010  — Dark backgrounds, hero sections
White:          #FFFFFF  — Page backgrounds, reversed text
Light Gray:     #F3F4F4  — Card backgrounds, subtle dividers
```

**Design philosophy:** Steve Jobs / Apple-influenced. Minimal, high contrast, generous white space, premium feel. Every element earns its place. If it doesn't help the user take action or build trust — remove it.

**Button style:** Always pill-shaped (border-radius: 50px). No exceptions.
**Icons:** Flat SVGs only. No emojis as icons.
**Typography:** Outfit font throughout. Bold weight for headlines, regular for body.
**Agency credit:** "Website by Say It Marketing — sayitmarketing.com" in every client site footer.

---

## SITE STRUCTURE — CURRENT PAGES

| File | Purpose | Status |
|---|---|---|
| `index.html` | Homepage — main entry point, hero, services overview | Live |
| `website-design-services.html` | Website design service detail | Live |
| `pricing.html` | Pricing overview — packages + add-ons | Live |
| `monthly-plans.html` | Hosting + care plan recurring subscriptions | Live |
| `local-seo.html` | Local SEO plans (Get Listed / On the Map / Own the Block) | Live |
| `social-media.html` | Social media setup + management plans | Live |
| `portfolio.html` | Client portfolio / work samples | Live |
| `faq.html` | Frequently asked questions | Live |
| `free-website-audit.html` | Lead magnet — free audit offer | Live |
| `get-quote.html` | Main lead capture form | Live |
| `contact.html` | Contact page | Live |
| `print-services.html` | Print + branded merchandise brokerage | Live |
| `thank-you.html` | Post-form submission confirmation | Live |
| `proposals/dogandcat.html` | Client proposal — Eimy Martinez, Dog & Cat Groomer | Live |

**Assets:**
- `assets/site.css` — Full design system, all shared styles
- `assets/nav.js` — Navigation behavior
- `assets/motion.js` — Scroll animations
- `assets/lead-form.js` — Form submission handler
- `assets/stripe-links.js` — All Stripe payment link mappings
- `assets/faq.js` — FAQ accordion

**Backend (Netlify Functions):**
- `netlify/functions/lead-create.js` — Captures leads → Supabase
- `netlify/functions/lead-status-update.js` — Updates lead status
- `netlify/functions/pipeline-list.js` — Lists pipeline leads
- `netlify/functions/automation-runner.js` — Follow-up automation jobs
- `netlify/functions/stripe-webhook.js` — Stripe payment events
- `netlify/functions/_shared.js` — Shared utilities, Supabase client, lead scoring

**Docs:**
- `docs/seo-delivery-sop.md` — Local SEO service delivery playbook
- `docs/30-day-execution-plan.md` — 30-day launch plan
- `docs/stripe-placeholder-setup.md` — Stripe product setup guide
- `docs/system-architecture.md` — Full technical architecture
- (+ others in /docs/)

---

## SERVICES & PRICING

### Website Packages (One-Time)
| Package | Price |
|---|---|
| Get Found (1 page) | $399 |
| Look Pro (3 pages) | $599 |
| Full Launch (5 pages) | $799 |

### Local SEO (Monthly Recurring)
| Plan | Price |
|---|---|
| Get Listed | $99/mo |
| On the Map ★ | $199/mo |
| Own the Block | $299/mo |

### Social Media
| Plan | Price | Type |
|---|---|---|
| Launch Ready | $150 | One-time setup |
| Content Pro | $250 setup + $250/mo | Setup + monthly |
| Done For You | $250 setup + $399/mo | Setup + monthly |

### Hosting (Monthly Recurring)
| Plan | Price |
|---|---|
| Basic | $37.99/mo |
| Pro ★ | $64.99/mo |
| Elite | $99.99/mo |

### Website Care Plans (Monthly Recurring)
| Plan | Price |
|---|---|
| Basic Care | $99/mo |
| Standard Care ★ | $199/mo |
| Advanced Care | $299/mo |

**★ = recommended / most popular tier**

---

## REVENUE MODEL — HOW THIS SITE MAKES MONEY

**Tier 1 — One-time project revenue**
Website builds ($399–$799+), logo/branding, social setup, print orders.
Goal: 3–5 new projects per month.

**Tier 2 — Recurring monthly revenue (THE PRIORITY)**
Hosting + SEO + care plans + social management.
Goal: 20–30 recurring clients at $64.99–$199/mo average = $1,200–$6,000/mo passive.
This is retirement money. Every new client should be converted to at least one recurring plan.

**Tier 3 — Automated lead → sale pipeline**
Form submission → Supabase → scored lead → automated follow-up at day 1, 3, 7 → conversion.
Goal: No lead goes cold. System follows up automatically.

---

## DATABASE — SUPABASE SCHEMA

**Table: `leads`**
Captures every form submission. Key fields:
- `full_name`, `email`, `mobile_phone`, `business_name`
- `service_interest`, `monthly_plan_interest`, `budget_range`
- `score` (0–100), `tag` (hot/warm/cold), `status` (new/contacted/converted/lost)
- `utm_source`, `utm_medium`, `utm_campaign` — tracking where leads come from
- `consent_sms_email` — permission for future marketing

**Table: `automation_jobs`**
Follow-up queue. Each lead gets jobs at day 1, 3, 7 after submission.
- `job_type`, `run_at`, `state` (queued/done/failed)

**Environment variables required in Netlify:**
- `SUPABASE_URL` = `https://hclptwixokdjtvtdgyfw.supabase.co`
- `SUPABASE_SERVICE_ROLE_KEY` = (secret — set in Netlify dashboard only)

---

## VISION & GOALS — WHAT WE'RE BUILDING TOWARD

### In the next 30 days
- [ ] All Stripe payment links created and live (replace all `get-quote.html` fallbacks)
- [ ] Lead form fully functional → Supabase storing every submission
- [ ] Automation follow-up emails triggering at day 1, 3, 7
- [ ] sayitmarketing.com DNS fully switched and stable
- [ ] Eimy Martinez (Dog & Cat Groomer) on recurring SEO plan
- [ ] Google Business Profile for Say It Marketing corrected (currently shows as closed)

### In the next 90 days
- [ ] 10 recurring hosting/SEO clients
- [ ] Client portal — login to see their site stats, invoices, plan details
- [ ] Blog / SEO content section — 2 posts/month targeting Tucson small business searches
- [ ] Testimonials section with real client names and results
- [ ] Portfolio expanded with 5+ live client sites
- [ ] Print catalog — 12 curated products with quote request flow

### Long-term vision
- [ ] 20–30 recurring clients = $1,200–$6,000/mo baseline passive revenue
- [ ] Modular industry template system (Trades, Services, Food, Health, Professional)
- [ ] AI-driven intake → proposal → deposit automated pipeline
- [ ] SMS + email marketing to lead database (own Mailchimp replacement)
- [ ] Shawn working ON the business, not IN it

---

## WHAT NEEDS TO BE DONE BEFORE ANYTHING ELSE

**Priority 1 — Critical (blocking revenue):**
1. Stripe payment links — create real products, replace all `get-quote.html` fallbacks in `stripe-links.js`
2. Lead form → Supabase connection — verify `SUPABASE_SERVICE_ROLE_KEY` is set in Netlify env vars
3. DNS stable — confirm sayitmarketing.com is fully resolving to Netlify

**Priority 2 — High (affects first impressions):**
4. Google Business Profile — fix "closed" status, update address, add photos
5. Portfolio — add 3–5 real client site screenshots with descriptions
6. Testimonials — add 2–3 real client quotes with names

**Priority 3 — Growth (revenue acceleration):**
7. Automation follow-up emails — wire up automation-runner to send actual emails
8. Blog section — first 2 SEO posts targeting Tucson
9. Bundle Stripe link — $199/mo SEO + $250 one-time social in one checkout

---

## AGENT ROLES — FOR MULTI-AGENT WORKFLOWS

When multiple AI agents work on this codebase, assign roles clearly:

### 🎨 Design Agent
Responsible for: Visual design, typography, spacing, color, component aesthetics, mobile responsiveness, accessibility (WCAG AA minimum).
Rules: Never introduce new colors outside the brand system. Always pill buttons. Always SVG icons. Always Outfit font. Minimum 44×44px touch targets.

### ⚙️ Function Agent
Responsible for: Netlify functions, Supabase queries, API integrations, form handling, Stripe webhooks, automation jobs.
Rules: Always use service role key server-side only. Never expose keys client-side. Always handle errors gracefully. Always return proper HTTP status codes.

### 🖥️ UI Agent
Responsible for: HTML structure, component layout, interactive elements, forms, modals, navigation.
Rules: Semantic HTML only. No div soup. Proper ARIA labels. Always test on 375px mobile width first.

### 💡 UX Agent
Responsible for: User flow, conversion optimization, copy tone, CTA placement, friction reduction.
Rules: Every page must have one clear primary action. No dead ends. Every button leads somewhere meaningful. Read the page like a first-time visitor.

### 🍎 Steve Jobs Agent
Responsible for: Simplicity audits. If it doesn't need to be there, remove it. Ask "does this make the product better?" If not — cut it.
Rules: Less is more. White space is not empty — it's intentional. The best design is the one the user doesn't notice because it just works.

### 💼 Business Agent
Responsible for: Revenue alignment, pricing strategy, upsell opportunities, recurring revenue optimization, lead conversion.
Rules: Every page must have a path to revenue. Every new feature must justify its existence with a business case. Recurring revenue beats one-time revenue every time.

### 🔒 Security Agent
Responsible for: Environment variable safety, input sanitization, spam prevention, rate limiting, dependency audits.
Rules: Never commit secrets. Always validate inputs server-side. Always sanitize before inserting to database.

---

## CODING STANDARDS

- **HTML:** Semantic elements only. `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`. No unnecessary wrappers.
- **CSS:** All shared styles in `assets/site.css`. Page-specific styles in `<style>` tags within the page. No inline styles except for dynamic JS.
- **JS:** Vanilla JS only. No jQuery. No frameworks. Keep it readable.
- **Files:** kebab-case filenames. No spaces. No uppercase.
- **Commits:** Clear, descriptive messages. One logical change per commit when possible.
- **Never:** Push API keys, passwords, or secrets to the repo. Use Netlify environment variables.

---

## DEPLOYMENT WORKFLOW

1. Make changes locally or in Claude/Codex
2. Push to `main` branch on GitHub
3. Netlify auto-deploys on every push
4. Check Netlify deploy log for errors
5. Test on mobile (375px) first, then desktop

**Never drag-and-drop to Netlify** — GitHub is the source of truth.

---

## CURRENT CLIENTS ON RECURRING PLANS

| Client | Service | Monthly | Status |
|---|---|---|---|
| Eimy Martinez (Dog & Cat Groomer) | SEO — On the Map | $199/mo | Closing |
| (existing Namecheap hosting clients) | Basic Hosting | varies | Active |

---

## IMPORTANT LINKS

- **GitHub repo:** github.com/supershawnlopez/sayitmarketing
- **Netlify dashboard:** app.netlify.com
- **Supabase dashboard:** app.supabase.com → project: hclptwixokdjtvtdgyfw
- **Stripe dashboard:** dashboard.stripe.com
- **Live site:** sayitmarketing.com
- **Eimy proposal:** sayitmarketing.com/proposals/dogandcat
- **Google Business Profile:** Fix ASAP — currently showing as closed

---

## NOTES FOR AI AGENTS

- Always read this file before making any changes
- When in doubt about design — check `assets/site.css` for existing patterns before creating new ones
- When in doubt about pricing — refer to the pricing table in this file
- When adding a new page — add it to the site structure table above and update `sitemap.xml`
- When touching JS — test for unescaped apostrophes in single-quoted strings (has caused bugs before)
- The `proposals/` folder is for client-specific pages — keep them separate from main site pages
- Shawn communicates via WhatsApp in Tucson Spanglish with some clients — match that tone in client-facing copy when appropriate
- This file should be updated every time a significant change is made to the site
- **ALWAYS update `CHANGELOG.md` at the end of every session** — what was done, what's pending, what's next
- Read `CHANGELOG.md` at the START of every session so you know exactly where things left off
- No session ends without a CHANGELOG update. No exceptions.

---

*This file lives at the root of the sayitmarketing GitHub repo.*
*Every AI working on this project reads this first.*
*Keep it updated. Keep it honest. Keep it focused on revenue.*
