const { json } = require('./_shared');

const STRIPE_SECRET_KEY      = process.env.STRIPE_SECRET_KEY;
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;
const SITE_URL = (process.env.SITE_URL || 'https://sayitmarketing.com').replace(/\/$/, '');
const ALLOWED_RETURN_ORIGINS = (process.env.ALLOWED_RETURN_ORIGINS || 'https://sayitmarketing.com,https://www.sayitmarketing.com')
  .split(',').map(v => v.trim().replace(/\/$/, '')).filter(Boolean);

const PRICES = {
  keep_fresh:  'price_1TbsKHLiXNZOJsPhG4li3HVY', // Keep It Fresh  $149/mo
  stay_active: 'price_1TbsKLLiXNZOJsPhqci7kLZT', // Stay Active    $249/mo
  always_on:   'price_1TbsKPLiXNZOJsPhPNlAHNB1', // Always On      $399/mo
  video_addon: 'price_1TbsUsLiXNZOJsPh1MvT15YY', // Video & TikTok Add-On $75/mo
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return json(200, {});
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  if (!STRIPE_SECRET_KEY || !STRIPE_PUBLISHABLE_KEY) return json(500, { error: 'Stripe not configured' });

  const { plan, videoAddon } = JSON.parse(event.body || '{}');
  const priceId = PRICES[plan];
  if (!priceId) return json(400, { error: 'Invalid plan' });

  const requestOrigin = (event.headers.origin || event.headers.Origin || '').trim().replace(/\/$/, '');
  const returnOrigin  = ALLOWED_RETURN_ORIGINS.includes(requestOrigin) ? requestOrigin : SITE_URL;

  const params = new URLSearchParams();
  params.append('ui_mode', 'embedded');
  params.append('mode', 'subscription');
  params.append('payment_method_types[0]', 'card');
  params.append('line_items[0][price]', priceId);
  params.append('line_items[0][quantity]', '1');
  if (videoAddon) {
    params.append('line_items[1][price]', PRICES.video_addon);
    params.append('line_items[1][quantity]', '1');
  }
  params.append('metadata[plan]', plan);
  params.append('metadata[video_addon]', videoAddon ? 'yes' : 'no');
  params.append('metadata[source]', 'social-media-page');
  params.append('return_url', `${returnOrigin}/thank-you.html?payment=complete&session_id={CHECKOUT_SESSION_ID}`);

  const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${STRIPE_SECRET_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const session = await res.json();

  if (session.error) {
    console.error('[create-social-checkout] Stripe error:', JSON.stringify(session.error));
    return json(400, { error: session.error.message });
  }

  if (!session.client_secret) {
    console.error('[create-social-checkout] No client_secret:', JSON.stringify(session));
    return json(500, { error: 'No client_secret returned by Stripe' });
  }

  return json(200, {
    clientSecret: session.client_secret,
    publishableKey: STRIPE_PUBLISHABLE_KEY,
  });
};
