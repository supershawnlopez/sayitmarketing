# 30-Day Execution Plan

## Outcome Target
Move from design prototype to operating revenue system with lead capture, automation, and organic growth foundation.

## Week 1: System Foundation
1. Finalize page architecture and copy framework
2. Scaffold backend (`FastAPI`, `Postgres`, `Redis`, worker/scheduler)
3. Implement `POST /api/leads` + validation + spam controls
4. Create lead scoring/tags (`hot/warm/cold/spam`)
5. Add first two forms (`Get Quote`, `Free Audit`)

## Week 2: Revenue + Comms Wiring
1. Connect Stripe webhook lifecycle
2. Build quote/order/subscription tables + state updates
3. Implement autoresponder and D1/D3/D7 jobs
4. Configure SES (SPF, DKIM, DMARC)
5. Configure Twilio Toll-Free verification and consent logging

## Week 3: SEO/AEO/GEO Rollout
1. Launch core pages: home, packages, monthly, social, print, quote, audit, contact, thank-you, results
2. Add schema (`Organization`, `LocalBusiness`, `Service`, `Offer`, `FAQPage`, `BreadcrumbList`)
3. Add sitemap, robots, canonical, OG/Twitter metadata
4. Add local intent content blocks and FAQs
5. Track conversion events end-to-end

## Week 4: Optimization
1. Add trust stack (proof/results/testimonials)
2. Add recommended bundle path (website + hosting + care)
3. Reduce friction in forms and CTA hierarchy
4. Deploy daily owner digest
5. Review weekly KPIs and tighten bottlenecks

## KPI Dashboard (Weekly)
- lead volume by source
- hot/warm/cold distribution
- form-to-quote rate
- quote-to-payment rate
- package attach rate (hosting/care)
- average gross margin
- churn (monthly plans)
- fulfillment hours per client

## Go/No-Go Gates
- Go to paid traffic only after:
1. forms + follow-ups + payment events work reliably
2. baseline SEO/AEO/GEO assets are live
3. conversion tracking is accurate
4. fulfillment capacity is stable

