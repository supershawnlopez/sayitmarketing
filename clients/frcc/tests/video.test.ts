import { test } from 'node:test';
import assert from 'node:assert/strict';
import { safeMediaUrl, youtubeVideoId } from '../lib/video.ts';

test('external recording links allow secure destinations only', () => {
  assert.equal(safeMediaUrl('https://vimeo.com/123'), 'https://vimeo.com/123');
  for (const url of [
    'data:text/html,example',
    'javascript:alert(1)',
    'http://example.com',
    'https://user:password@example.com',
    '',
    null,
  ])
    assert.equal(safeMediaUrl(url), null);
});

test('recognizes supported YouTube recording links', () => {
  const id = 'dQw4w9WgXcQ';
  for (const url of [
    `https://www.youtube.com/watch?v=${id}&t=3`,
    `https://youtu.be/${id}?si=share`,
    `https://www.youtube.com/live/${id}`,
    `https://www.youtube.com/shorts/${id}`,
    `https://www.youtube-nocookie.com/embed/${id}`,
  ])
    assert.equal(youtubeVideoId(url), id);
});

test('does not embed untrusted hosts or incomplete video identifiers', () => {
  for (const url of [
    'https://youtube.com.evil.test/watch?v=dQw4w9WgXcQ',
    'https://www.youtube.com/@FRCC',
    'https://www.youtube.com/playlist?list=PLabc',
    'https://www.youtube.com/watch?v=short',
    'javascript:alert(1)',
    'http://www.youtube.com/watch?v=dQw4w9WgXcQ',
    'not a URL',
  ])
    assert.equal(youtubeVideoId(url), null);
});
