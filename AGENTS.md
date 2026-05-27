# AGENTS.md
### Multi-agent execution playbook for Say It Marketing
### Use this with BRIEF.md, PROJECT.md, and CHANGELOG.md

---

## PURPOSE

This file defines how AI agents collaborate on this repo without stepping on each other, missing revenue priorities, or creating rework.

`BRIEF.md` = rules and session protocol with Shawn  
`PROJECT.md` = project intelligence and business context  
`AGENTS.md` = execution map (who does what, in what order, with what handoff)

---

## CORE RULES

1. Revenue first: every task must support lead capture, sales, or recurring revenue.
2. Approval first: no file changes, deploy-impacting actions, or config changes without Shawn approval.
3. Stay in lane: each agent owns a specific scope.
4. No silent handoffs: always document what changed, what is pending, and what is next.
5. No duplicate work: check CHANGELOG and current git diff before starting.

---

## AGENT ROSTER

### 1) Business Agent
Owns:
- Offer clarity, pricing logic, recurring revenue pathways, upsell flow

Outputs:
- Priority-ranked business recommendations
- Revenue impact estimate per recommendation

Done when:
- Each key page has a clear path to a paid action
- Recurring option is visible where relevant

### 2) UX Agent
Owns:
- Friction reduction, CTA clarity, page flow, form completion rate

Outputs:
- Conversion blockers with severity and exact file references
- Proposed copy/flow fixes in plain language

Done when:
- Primary CTA is obvious and consistent
- No dead-end flow or misleading CTA language

### 3) UI Agent
Owns:
- Semantic HTML, component structure, responsive behavior

Outputs:
- Clean markup and interaction updates aligned with existing design system

Done when:
- Mobile (375px) and desktop render correctly
- No structural regressions

### 4) Design Agent
Owns:
- Visual hierarchy, typography, spacing, accessibility, brand consistency

Outputs:
- Design adjustments using existing brand constraints

Done when:
- Buttons are pill-shaped
- Outfit font and approved colors are respected
- Touch targets are usable

### 5) Function Agent
Owns:
- Netlify functions, Supabase interactions, Stripe server flows, automation jobs

Outputs:
- Robust backend changes with clear error handling

Done when:
- No broken API paths
- Proper status codes and safe fallbacks
- No secrets exposed client-side

### 6) Security Agent
Owns:
- Secret safety, input validation, webhook integrity, abuse/rate limits

Outputs:
- Risk-ranked findings and hardening patches

Done when:
- Critical auth paths are verified
- Public endpoints have abuse controls
- Sensitive errors are not leaked to clients

### 7) SEO Agent
Owns:
- Crawl/index hygiene, metadata quality, schema, sitemap completeness

Outputs:
- Technical SEO fixes with file-level actions

Done when:
- Revenue pages are indexable/discoverable
- Non-public pages are blocked appropriately

---

## STANDARD WORKFLOW (DEFAULT)

1. Read `BRIEF.md` -> `PROJECT.md` -> `CHANGELOG.md` -> `AGENTS.md`
2. Summarize: completed, pending, next priority
3. Identify which agent roles are needed
4. Run focused audit or implementation by role
5. Merge findings into one priority list (Critical -> High -> Medium -> Low)
6. Ask Shawn for approval before edits
7. Execute approved changes
8. Update `CHANGELOG.md` with completed/pending/next

---

## HANDOFF FORMAT (MANDATORY)

When one agent hands to another, use this exact structure:

1. Scope completed
2. Files touched
3. Risks found
4. Pending decisions from Shawn
5. Next best action

---

## PRIORITY MODEL

- Critical: can lose money, break payments/leads, or create security risk now
- High: directly impacts conversion or trust
- Medium: meaningful optimization, not immediate blocker
- Low: polish or future improvement

Always fix Critical before new feature work unless Shawn explicitly overrides.

---

## DEFINITION OF DONE (SESSION)

A session is done only when:

1. Approved work is complete
2. Basic verification is complete (or clearly reported if not run)
3. `CHANGELOG.md` is updated
4. Shawn is told:
   - what was done
   - what is still pending
   - what should happen next

---

## CHANGE CONTROL

Update this file only when one of these changes:

1. Agent roles or responsibilities
2. Handoff process
3. Priority model
4. Definition of done

If unchanged, do not edit it.

