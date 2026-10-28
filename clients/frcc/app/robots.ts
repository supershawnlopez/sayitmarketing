import type { MetadataRoute } from 'next';
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: process.env.NEXT_PUBLIC_BASE_PATH
      ? { userAgent: '*', disallow: '/' }
      : { userAgent: '*', allow: '/' },
    sitemap: 'https://frcctucson.org/sitemap.xml',
  };
}
