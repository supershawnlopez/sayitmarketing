import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site-config';

// Both languages share a route shape, with Spanish under /es.
export function localizedMetadata(
  path: string,
  locale: 'en' | 'es',
  title: string,
  description: string,
): Metadata {
  const english = siteUrl(path);
  const spanish = siteUrl(path === '/' ? '/es' : `/es${path}`);
  return {
    title,
    description,
    alternates: {
      canonical: locale === 'es' ? spanish : english,
      languages: { en: english, es: spanish, 'x-default': english },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: locale === 'es' ? 'es_US' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_US',
      images: [{
        url: siteUrl('/images/stock-worship-hands.jpg'),
        width: 2400,
        height: 1600,
        alt: locale === 'es' ? 'Manos levantadas en adoración' : 'Hands lifted in worship',
      }],
    },
  };
}
