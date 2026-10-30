# FRCC Tucson — Say It Marketing client

This folder is the complete editable public website for Family Restoration
Community Church. It can be copied into its own Git repository without the Say It
agency website. Ownership and hosting remain with Say It Marketing for this client;
the future Found church product is a separate initiative.

## Work locally

Use Node 24 and `npm ci`, then `npm run dev`. No database, account credentials,
API keys or proprietary hosting SDK are required for the public site. All deployed
photographs live in `public/images`. Google fonts are downloaded during builds and
self-hosted in the resulting site; builds need internet access.

## Portable static build — Netlify and other static hosts

Run `npm run build:static`, then `npm run verify:export`. Upload only `out/`.
The build command works on Windows, macOS and Linux. It explicitly resets the
old `/frcc` preview base path so a standalone project serves from `/`.

Static builds default to noindex until the custom domain is ready. At confirmed
launch set `FRCC_NOINDEX=0` in the hosting build environment and rebuild. When
changing domain set `FRCC_SITE_URL` to the new HTTPS origin before building.
No secrets belong in public environment variables.

For the existing agency preview run `npm run build:preview` and
`npm run verify:export`; this build uses `/frcc`, Say It's origin, and noindex.
Copy only that export to the agency repository's root `frcc/` directory.
Never upload a standalone root export into that preview directory.

## Hosting project settings

| Host | Project settings |
| --- | --- |
| Netlify now | Repository `supershawnlopez/sayitmarketing`; base `clients/frcc`; config `clients/frcc/netlify.toml`; publish `out`; Node 24. Use the correct paid Say It team. |
| Vercel later | Same repository; Root Directory `clients/frcc`; Next.js framework; install `npm ci`; build `npm run build`; default Next.js output. Leave `FRCC_STATIC_EXPORT` and `NEXT_PUBLIC_BASE_PATH` unset. Set `FRCC_SITE_URL` and indexing for the destination. |
| Another static host | Node 24; `npm ci`; `npm run build:static && npm run verify:export`; serve `out` with directory indexes and a real 404 page. |
| Ordinary Node server | `npm ci`; `npm run build`; `npm start`; static-export/base-path flags unset. Put HTTPS in front of the server. |

`netlify.toml` is an adapter, not an application dependency. Vercel uses standard
Next.js detection; no Vercel configuration or account ID is embedded in the app.
Generic static hosts may ignore `_headers` and `_redirects`; configure
`/contact-us` → `/contact/` as a permanent redirect and preserve preview noindex
headers on that host. Do not use a blanket SPA rewrite: these are separate HTML pages.

## Content handoff

- Identity, address, phone, giving link, menu/ministry labels: `lib/church-content.ts`.
- Service schedule: `lib/service-times.ts`.
- Events, recording entries, Facebook and eventual YouTube link: `lib/church-updates.ts`.
- Page content/layouts: `app/` and `components/`.
- English pages: `app/(english)/`; Spanish equivalents: `app/es/`.
- Spanish ministry copy: `lib/spanish-content.ts`; shared navigation/schedule labels: `lib/locale.ts`.
- Local images: `public/images/`; credits: `IMAGE-CREDITS.md`.

Sunday 10 a.m./Wednesday 7 p.m. remain owner-provisional. Correct contact email,
giving URL, and current video destination need church confirmation. The existing
ChurchTrac URL is retained by owner direction. Do not invent events or recordings.
Volunteer editing is planned, not implemented. Future content/auth/data services
must keep exportable church content and documented ownership rather than being
buried in a hosting dashboard. A static host alone cannot execute an admin backend.

Full-width abstract stock heroes are intentional. Use authentic FRCC pictures only
in smaller supporting sections. Never generate or alter people's faces or room
details. The optional photo-preparation script needs the owner's separate source
photo archive; those originals are not required to build or move the website.

## English and Spanish

The language switch opens the equivalent page in the other language. English
URLs stay at the root; Spanish URLs use `/es`. Both languages have complete
home, about, contact, events, messages, giving and six ministry pages. Each has
its own document language, metadata and alternate-language links. Separate root
layouts make language changes a full page navigation, starting at the top.

Update both language copies when changing editorial page content. Addresses,
phone numbers, service times, events and recordings still come from shared
church data. Calendar/message controls are translated; published recordings
and custom event descriptions keep their original language. Translating the
website does not promise Spanish-language services or translate video audio.
No external translation widget, paid API or new account is required.

## Safe transfer order

1. Copy this folder, preserving the lockfile, public images and credits; exclude
   dependencies, generated output and provider account state.
2. Build on the new host and check all pages, images, calendar, message links,
   giving destination, mobile navigation, redirects and social metadata.
3. Add both FRCC domain names to the new host. Use that project's actual DNS targets.
4. Change only website DNS at its authoritative provider. FRCC currently uses
   GoDaddy nameservers after the owner's DNS reset. Preserve MX/TXT/email.
5. Verify HTTPS, apex and www redirects, and enable indexing on the final build.
6. Retire old hosting only after the live site, mail dependencies and backups are checked.

Production site: https://frcctucson.org/ on Netlify project `frcc-tucson`.
The older https://sayitmarketing.com/frcc/ is a separate agency preview and
does not automatically receive client production updates.
