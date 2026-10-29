# FRCC standalone setup and portability

## Owner direction — October 29, 2026

Keep the current paid Netlify plan while finishing FRCC; using included credits
for this work is authorized. Do not downgrade the plan now. Give the client its
own self-contained folder and hosting project under Say It, with a straightforward
path to Vercel or another provider later. No new platform branding is needed to launch.

## Implementation

Editable local source is `site/`. Its publishable copy in the Say It repository is
`clients/frcc/`. The agency review build remains `frcc/` at repository root.
The two build artifacts come from the same source; do not edit exported HTML by hand.

Cross-platform commands explicitly select standalone root or agency subpath.
Host-neutral URL/indexing settings drive metadata, robots and sitemap. Static
exports include portable redirects/headers and a nonsecret release manifest.
The export verifier checks all 13 pages, local linked files, robots and sitemap.
The source README documents Netlify, Vercel, generic static and Node deployment.
Core application content does not depend on Netlify, Supabase, Stripe or Found.

An independent engineering reviewer confirmed the public site is suitable for
static hosting and recommended separating URL/indexing settings, documenting
redirects and retaining a separate backend boundary for future editing. These
recommendations are incorporated. No claim of universally zero-work transfer:
DNS, redirects, domain settings and any future backend still require migration checks.

## Remaining launch dependencies

Correct paid Say It Netlify account access is still needed. The connector returns
only Mealfred and no team list; it cannot create FRCC against the intended billing
allowance. The owner was asked which email owns that account. Do not create the
project under an unrelated account or buy another plan. Browser recovery also
failed because the browser runtime references a missing plugin module; no login
or visual-browser QA was performed in this step.

FRCC's domain still needs a dedicated project's verified target, followed by DNS
cutover at authoritative Cloudflare, preserving mail. No DNS edits, Namecheap
cancellation or Netlify subscription changes have been performed. Correct giving
URL, contact email and church-confirmed service times remain content follow-ups.
