# Migration Target Architecture

## Platform Direction
- Source control: GitHub
- Deploy: Netlify
- Data: Supabase
- Payments: Stripe
- Messaging: Email provider + Twilio (next phase)

## Runtime Layout
- Static pages in repo root
- Netlify functions under `/netlify/functions`
- Supabase schema in `/supabase/migrations`
- Admin UI in `/admin`

## API Map
- `POST /api/leads` -> `lead-create.js`
- `GET /api/pipeline` -> `pipeline-list.js`
- `PATCH /api/leads/:id/status` -> `lead-status-update.js`
- `POST /api/automation/run` -> `automation-runner.js`

## Notes
- Keep legacy FastAPI backend temporarily for rollback.
- Remove legacy backend only after serverless parity is tested in production.
