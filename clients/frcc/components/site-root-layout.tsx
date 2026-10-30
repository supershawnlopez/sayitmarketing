import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import '@/app/mobile-refinement.css';
import '@/app/visit-band.css';
import { publicAsset } from '@/lib/public-asset';
import { siteOrigin, siteNoIndex } from '@/lib/site-config';
import type { Locale } from '@/lib/locale';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const siteMetadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: 'FRCC Tucson | Family Restoration Community Church',
  icons: {
    icon: [
      { url: publicAsset('/favicon.svg?v=frcc-1'), type: 'image/svg+xml' },
      {
        url: publicAsset('/frcc-icon-32.png'),
        type: 'image/png',
        sizes: '32x32',
      },
    ],
    shortcut: publicAsset('/favicon.ico?v=frcc-1'),
    apple: {
      url: publicAsset('/frcc-apple-touch-icon.png'),
      sizes: '180x180',
      type: 'image/png',
    },
  },
  robots: siteNoIndex
    ? { index: false, follow: false }
    : { index: true, follow: true },
  description:
    'Family Restoration Community Church is a Tucson church community centered on faith, restoration, worship, and serving families.',
  openGraph: {
    title: 'FRCC Tucson | Family Restoration Community Church',
    description: 'Faith. Family. Restoration. A church home in Tucson.',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: publicAsset('/images/stock-worship-hands.jpg'),
        width: 2400,
        height: 1600,
        alt: 'Hands lifted in worship',
      },
    ],
  },
};

export function RootLayout({
  children,
  locale,
}: Readonly<{
  children: React.ReactNode;
  locale: Locale;
}>) {
  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
