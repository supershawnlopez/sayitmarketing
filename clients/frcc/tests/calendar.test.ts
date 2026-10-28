import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  calendarDate,
  calendarEvents,
  eventIcal,
  monthDays,
  phoenixDateKey,
} from '../lib/calendar.ts';

const schedule = [
  { gathering: 'Sunday gathering', day: 'Sunday', time: '10 a.m.' },
  { gathering: 'Midweek gathering', day: 'Wednesday', time: '7 p.m.' },
];

test('weekly gatherings retain Tucson wall-clock time across daylight-saving changes', () => {
  const events = calendarEvents(calendarDate('2026-11-01'), [], schedule);
  assert.ok(events.length > 8);
  for (const event of events) {
    assert.equal(event.startAt.endsWith('-07:00'), true);
    assert.match(
      event.startAt,
      event.title === 'Sunday gathering' ? /T10:00:00/ : /T19:00:00/,
    );
  }
  assert.equal(phoenixDateKey('2026-11-02T02:00:00Z'), '2026-11-01');
});

test('calendar has complete weeks and preserves real custom events', () => {
  const month = calendarDate('2026-10-01');
  assert.equal(monthDays(month).length % 7, 0);
  const event = {
    slug: 'test-only',
    title: 'Test fixture',
    startAt: '2026-10-30T18:30:00-07:00',
  };
  assert.ok(
    calendarEvents(month, [event], schedule).some(
      (entry) => entry.slug === event.slug,
    ),
  );
  assert.equal(
    calendarEvents(month, [{ ...event, startAt: 'invalid' }], []).length,
    0,
  );
});

test('calendar downloads escape user text and use UTC event instants', () => {
  const result = eventIcal(
    {
      slug: 'test',
      title: 'Prayer, thanks; community',
      startAt: '2026-10-28T19:00:00-07:00',
      description: 'Line one\nLine two',
    },
    'Tucson',
  );
  assert.match(result, /DTSTART:20261029T020000Z/);
  assert.ok(result.includes('SUMMARY:Prayer\\, thanks\\; community'));
  assert.ok(result.includes('DESCRIPTION:Line one\\nLine two'));
  assert.ok(result.endsWith('END:VCALENDAR\r\n'));
});
