import { RootLayout, siteMetadata } from '@/components/site-root-layout';

export const metadata = siteMetadata;

export default function EnglishLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <RootLayout locale="en">{children}</RootLayout>;
}
