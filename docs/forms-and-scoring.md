# Forms And Scoring

## Form Inventory
1. Checkout-ready form (`/start-now`)
2. Project quote form (`/get-quote`)
3. Free website audit form (`/free-website-audit`)
4. Social setup form (`/social-media-services`)
5. Support form (`/support`)
6. Contact lite form (global footer)

## Required Common Fields
- `full_name`
- `email`
- `mobile_phone` (recommended/required on high-intent forms)
- `service_interest`
- `timeline`
- `consent_sms_email` (explicit)
- hidden attribution: `utm_source`, `utm_medium`, `utm_campaign`, `referrer`, `landing_page`
- honeypot field

## Lead Scoring
Start at `0`, then:
- budget `2500+`: `+30`
- budget `1000-2500`: `+20`
- timeline `asap`: `+25`
- timeline `2-4 weeks`: `+15`
- website + monthly interest: `+20`
- checkout-ready form: `+30`
- phone + consent: `+10`
- missing key fields: `-15`
- spam signal: `-100`

## Tags
- `hot`: `>=70`
- `warm`: `40-69`
- `cold`: `1-39`
- `spam`: `<=0`

## Routing Rules
- `hot`: immediate email + immediate text + 24h reminder
- `warm`: immediate email + 2h text + nurture
- `cold`: immediate email + 3-touch nurture
- `spam`: block and log

## Anti-Spam
- honeypot
- per-IP rate limit
- server validation
- optional CAPTCHA only if abuse increases

