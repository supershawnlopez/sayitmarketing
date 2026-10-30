import type { Metadata } from 'next';
import { RootLayout, siteMetadata } from '@/components/site-root-layout';
import { publicAsset } from '@/lib/public-asset';

export const metadata: Metadata = {
  ...siteMetadata,
  title: 'FRCC Tucson | Iglesia Family Restoration Community Church',
  description:
    'Family Restoration Community Church es una comunidad de fe en Tucson dedicada a la restauración, la adoración y el servicio a las familias.',
  openGraph: {
    ...siteMetadata.openGraph,
    title: 'FRCC Tucson | Iglesia Family Restoration Community Church',
    description:
      'Fe. Familia. Restauración. Tu familia de la iglesia en Tucson.',
    locale: 'es_US',
    images: [
      {
        url: publicAsset('/images/stock-worship-hands.jpg'),
        width: 2400,
        height: 1600,
        alt: 'Manos levantadas en adoración',
      },
    ],
  },
};

export default function SpanishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootLayout locale="es">{children}</RootLayout>;
}
