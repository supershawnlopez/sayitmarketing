import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('out');
const release = JSON.parse(await readFile(path.join(root, 'release.json'), 'utf8'));
const englishPaths = ['/', '/about/', '/events/', '/messages/', '/give/', '/contact/',
  ...['worship-services', 'youth-ministry', 'childrens-ministry', 'prayer-meetings',
    'community-outreach', 'bible-classes'].map(slug => `/ministries/${slug}/`)];
const paths = [...englishPaths, ...englishPaths.map(route => route === '/' ? '/es/' : `/es${route}`)];
const assets = new Set();
for (const route of paths) {
  const html = await readFile(path.join(root, route, 'index.html'), 'utf8');
  if (release.noIndex) assert.match(html, /content="noindex, nofollow"/);
  const spanish = route.startsWith('/es/');
  assert.match(html, new RegExp(`<html\\b[^>]*lang="${spanish ? 'es' : 'en'}"`), `Wrong document language: ${route}`);
  const languageLink = html.match(/<a\b[^>]*class="[^"]*language-link[^"]*"[^>]*>/)?.[0];
  assert.ok(languageLink, `Missing language switch: ${route}`);
  const target = languageLink.match(/href="([^"]+)"/)?.[1];
  const counterpart = spanish ? (route === '/es/' ? '/' : route.slice(3)) : (route === '/' ? '/es' : `/es${route}`);
  const normalize = value => value.replace(/\/$/, '') || '/';
  assert.equal(normalize(target), normalize(`${release.basePath}${counterpart}`), `Wrong language target: ${route}`);
  if (route.startsWith('/es/')) {
    assert.match(html, /<main\b[^>]*lang="es"/, `Missing Spanish content language: ${route}`);
    assert.match(html, /hrefLang="en"|hreflang="en"/, `Missing English alternative: ${route}`);
    assert.match(html, /hrefLang="es"|hreflang="es"/, `Missing Spanish alternative: ${route}`);
    assert.ok(!html.includes('Estamos preparando recursos en espanol'), `Placeholder Spanish content: ${route}`);
  }
  for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    const url = match[1].replaceAll('&amp;', '&');
    if (!url.startsWith('/')) continue;
    if (release.basePath) assert.ok(url.startsWith(release.basePath + '/'), `Unprefixed asset: ${url}`);
    const relative = decodeURIComponent(url.split(/[?#]/)[0].slice(release.basePath.length));
    let target = path.resolve(root, '.' + relative);
    assert.ok(target === root || target.startsWith(root + path.sep));
    const info = await stat(target);
    if (info.isDirectory()) target = path.join(target, 'index.html');
    assert.ok((await stat(target)).isFile(), `Missing ${url}`);
    assets.add(url);
  }
}
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
assert.ok(robots.includes(`${release.siteOrigin}${release.basePath}/sitemap.xml`));
if (release.noIndex) assert.match(robots, /Disallow: \//);
const sitemap = await readFile(path.join(root, 'sitemap.xml'), 'utf8');
for (const route of paths) {
  const suffix = route === '/' ? '/' : route.slice(0, -1);
  assert.ok(sitemap.includes(`${release.siteOrigin}${release.basePath}${suffix}`));
}
console.log(`Verified ${paths.length} pages, ${assets.size} local links/assets, robots and sitemap (${release.basePath || 'standalone root'}).`);
