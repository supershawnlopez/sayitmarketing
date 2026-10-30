# Mobile visit band proposal

Local preview proposal only. No production deployment or Git operations were performed.

## Team ownership

An actual design teammate implemented the new stylesheet in the shared workspace, independently owning its typography, spacing, responsive layout, and focus treatment. The integrating engineer implemented `VisitBand`, checked the stylesheet against the markup, and wrote this document. Design task: `01a18a9f-7c9e-74f2-bf3c-88ac2356e39d`.

## Changed paths

- `site/components/site-shell.tsx`: replace only `VisitBand`, plus the import needed to load its stylesheet. All other shell functions are unchanged.
- `site/app/visit-band.css`: new stylesheet owned by the design teammate.
- `docs/mobile-visit-band-proposal.md`: scope, reasoning, and verification.

## Design reasoning

The restored global styles reduce the old band to 10–11px on phones and retain a cramped two-column grid. The proposal uses exclusively `visit-details-*` classes, so those legacy grid and typography rules do not apply. It does not reuse the global container, heading, or text-link classes.

The solid red is `#E02B20`, with white text. Body text is 1.0625rem (17px at the default browser size), times are 1.5rem (24px), and the modest heading is 1.125rem (18px). There are no root font, Dynamic Type, viewport, image, or website scaling changes.

The information order is invitation, service schedule, service details, then address and directions. Days and times are paired in list items; the times carry the strongest emphasis. A divided address block makes location easy to scan without another large heading.

At widths below 56rem the layout becomes one column. At 375px it has 335px of content space; at 320px it has 280px, assuming the normal 16px root size. Each service occupies its own row with day and time aligned at opposite ends. Rows wrap when text needs more room. The address wraps naturally, grid tracks can shrink, and long text can break rather than force horizontal scrolling. There are no fixed content heights or clipped overflow. Increased text size is allowed to increase the band height.

The details link has a minimum 44px target height. The entire address/directions block is a map link. Both links have underlines and explicit keyboard focus treatment.

## Existing content and destinations

- Render `church.serviceTimes` directly: Sunday 10 a.m. and Wednesday 7 p.m.
- Link service details to `/contact#service-times`.
- Render the full `church.address` and link it using `church.mapUrl`.
- Preserve the existing schedule data and its confirmation status; this proposal does not independently verify the schedule.

## Verification and limits

- TypeScript check passed.
- A comparison against the pre-edit shell confirmed all other shell functions are unchanged.
- PostCSS parsed the stylesheet; all 20 selector rules use the `visit-details-*` scope.
- The unmodified `PageIntro` image triggers the existing `next/no-img-element` lint error. It remains untouched per scope.
- CSS review covered the 320px/375px layouts and wrapping behavior with enlarged text. These are structural checks, not rendered browser verification.
- Next.js development startup succeeded. The Browser integration failed to load an installed support module, and a direct local preview request was denied with EACCES. Rendered checks at 320px, 375px, desktop, and 200% text therefore remain outstanding before owner approval.

This proposal is not production approval. No other CSS, faces, images, credentials, or deployment settings were changed by this work.
