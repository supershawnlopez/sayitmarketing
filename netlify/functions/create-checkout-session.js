const { json } = require('./_shared');

const STRIPE_SECRET_KEY     = process.env.STRIPE_SECRET_KEY;
const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY;

const PRICES = {
  // LIVE MODE
  seo_pro:      'price_1TRLN5LiXNZOJsPhKZ8NvCJw',  // SEO On the Map $199/mo (live)
  social_setup: 'price_1TOfn9LiXNZOJsPhA7RccCsj',  // Social Setup $250 one-time (live)
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return json(200, {});
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });
  if (!STRIPE_SECRET_KEY || !STRIPE_PUBLISHABLE_KEY) return json(500, { error: 'Stripe not configured' });

  const { social } = JSON.parse(event.body || '{}');

  const params = new URLSearchParams();
  params.append('ui_mode', 'embedded');
  params.append('mode', 'subscription');
  params.append('payment_method_types[0]', 'card');
  params.append('line_items[0][price]', PRICES.seo_pro);
  params.append('line_items[0][quantity]', '1');

  if (social) {
    params.append('line_items[1][price]', PRICES.social_setup);
    params.append('line_items[1][quantity]', '1');
  }

  const origin = event.headers.origin || 'https://sayitmarketing.com';
  params.append('return_url', `${origin}/proposals/dogandcat?payment=complete&session_id={CHECKOUT_SESSION_ID}`);

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
    console.error('[create-checkout-session] Stripe error:', JSON.stringify(session.error));
    return json(400, { error: session.error.message });
  }

  if (!session.client_secret) {
    console.error('[create-checkout-session] No client_secret in response:', JSON.stringify(session));
    return json(500, { error: 'No client_secret returned by Stripe' });
  }

  return json(200, {
    clientSecret: session.client_secret,
    publishableKey: STRIPE_PUBLISHABLE_KEY,
  });
};
