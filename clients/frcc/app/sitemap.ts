import type { MetadataRoute } from 'next';
import { ministries } from '@/lib/church-content';
import { siteUrl } from '@/lib/site-config';
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const englishPaths = [
    '/',
    '/about',
    '/contact',
    '/events',
    '/messages',
    '/give',
    ...ministries.map((ministry) => '/ministries/' + ministry.slug),
  ];
  return englishPaths.flatMap((path) => {
    const spanishPath = path === '/' ? '/es' : `/es${path}`;
    const languages = { en: siteUrl(path), es: siteUrl(spanishPath) };
    return [path, spanishPath].map((localizedPath) => ({
      url: siteUrl(localizedPath),
      alternates: { languages },
    }));
  });
}
