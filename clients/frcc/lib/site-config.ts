// Hosting configuration stays outside church content and UI components.
export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const siteOrigin = new URL(
  process.env.FRCC_SITE_URL ||
    (siteBasePath ? 'https://sayitmarketing.com' : 'https://frcctucson.org'),
).origin;
export const siteNoIndex = process.env.FRCC_NOINDEX === '1' || Boolean(siteBasePath) ||
  (Boolean(process.env.VERCEL_ENV) && process.env.VERCEL_ENV !== 'production') ||
  (Boolean(process.env.CONTEXT) && process.env.CONTEXT !== 'production');
export const siteUrl = (path: string) => `${siteOrigin}${siteBasePath}${path}`;
