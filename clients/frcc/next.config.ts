import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  ...(process.env.FRCC_STATIC_EXPORT === '1'
    ? { output: 'export' as const, trailingSlash: true, images: { unoptimized: true } }
    : {
        async redirects() {
          return [{ source: '/contact-us', destination: '/contact', permanent: true }];
        },
      }),
};

export default nextConfig;
