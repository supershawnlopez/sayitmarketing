# FRCC Tucson — Say It Marketing client

This is the editable Next.js source for Family Restoration Community Church.
The reviewed temporary static export lives at `/frcc/` in this repository and is
served by the existing Say It Marketing deployment. Do not replace the agency root.

## Build the temporary agency preview

Install with `npm ci`. Build with `FRCC_STATIC_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/frcc npm run build`
(PowerShell: set the two environment variables with `$env:NAME='value'` first).
Copy the contents of `out/` into the repository's root `frcc/` directory. Review the
export before committing. The temporary preview is marked noindex.

## Standalone FRCC project and custom domain

Use a separate Netlify project connected to this same repository, base directory
`clients/frcc`, its `netlify.toml`, publish directory `out`, Node 24. Leave
`NEXT_PUBLIC_BASE_PATH` unset. Static export is configured by the build command.
Do not point FRCC at the agency's root homepage. Add `frcctucson.org` and
`www.frcctucson.org` to that dedicated project before editing DNS.

DNS was checked on 2026-10-28: FRCC uses `karl.ns.cloudflare.com` and
`lola.ns.cloudflare.com`; live DNS changes belong in Cloudflare, even if its
registration is at GoDaddy. Existing Jellyfish mail MX records must be retained.
Use the target records shown by the actual FRCC project; no custom-domain assignment
or DNS cutover has been performed yet.

## Content and imagery

Service times and contact details: `lib/church-content.ts` and `lib/service-times.ts`.
Events, recordings and Facebook link: `lib/church-updates.ts`. Calendar initializes
to the current Tucson date in the browser, so it works on static hosting.

Full-width hero backgrounds use abstract stock worship images or existing Bible /
silhouette media. Original FRCC JPEG-derived photos appear only in supporting
sections. Never regenerate faces or room details. Original full-resolution inputs
remain in the owner's FRCC workspace; the optional preparation script is not needed
to build this app. The known broken giving URL is retained by owner request;
contact email and provisional service times still need church confirmation.

Future dashboard/backend work remains a separate phase; default `npm run build`
still builds Next.js when the static-export environment variable is unset.
