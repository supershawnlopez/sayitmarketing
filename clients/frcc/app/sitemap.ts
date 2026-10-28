import type { MetadataRoute } from 'next';
import { ministries } from '@/lib/church-content';
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    '/',
    '/about',
    '/contact',
    '/events',
    '/messages',
    '/give',
    '/es',
    ...ministries.map((ministry) => '/ministries/' + ministry.slug),
  ].map((path) => ({ url: 'https://frcctucson.org' + path }));
}
