import { spawnSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';

const agencyPreview = process.argv.includes('--agency-preview');
const basePath = agencyPreview ? '/frcc' : '';
const noIndex = agencyPreview || process.env.FRCC_NOINDEX !== '0';
const env = {
  ...process.env,
  FRCC_STATIC_EXPORT: '1',
  NEXT_PUBLIC_BASE_PATH: basePath,
  FRCC_SITE_URL: agencyPreview ? 'https://sayitmarketing.com' :
    (process.env.FRCC_SITE_URL || 'https://frcctucson.org'),
  FRCC_NOINDEX: noIndex ? '1' : '0',
};
const build = spawnSync(process.execPath, ['node_modules/next/dist/bin/next', 'build', '--webpack'], {
  env, stdio: 'inherit',
});
if (build.error) throw build.error;
if (build.status !== 0) process.exit(build.status || 1);
await mkdir('out', { recursive: true });
// These files travel with the static artifact; generic servers may ignore them.
await writeFile('out/_redirects', `${basePath}/contact-us ${basePath}/contact/ 301\n`);
await writeFile('out/_headers', `/*\n  X-Content-Type-Options: nosniff\n${noIndex ? '  X-Robots-Tag: noindex, nofollow\n' : ''}`);
await writeFile('out/release.json', JSON.stringify({
  project: 'frcc-tucson', format: 'static', basePath,
  siteOrigin: new URL(env.FRCC_SITE_URL).origin, noIndex,
  builtAt: new Date().toISOString(),
}, null, 2) + '\n');
