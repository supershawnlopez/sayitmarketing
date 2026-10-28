import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import type { ChurchEvent } from './church-updates';
import type { ServiceTime } from './service-times';

export const CALENDAR_TIME_ZONE = 'America/Phoenix';
export type CalendarEvent = ChurchEvent & { recurring?: boolean };

export function phoenixDateKey(value: Date | string): string {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: CALENDAR_TIME_ZONE,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date(value));
  const part = (type: string) =>
    parts.find((entry) => entry.type === type)?.value;
  return `${part('year')}-${part('month')}-${part('day')}`;
}

// Wall-clock Dates are only for date-fns calendar math, never event instants.
export function calendarDate(key: string): Date {
  const [year, month, day] = key.split('-').map(Number);
  return new Date(year, month - 1, day, 12);
}

export function monthDays(month: Date): Date[] {
  return eachDayOfInterval({
    start: startOfWeek(startOfMonth(month), { weekStartsOn: 0 }),
    end: endOfWeek(endOfMonth(month), { weekStartsOn: 0 }),
  });
}

const weekdays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];
function scheduleTime(value: string): string | null {
  const match = /^(\d{1,2})(?::(\d{2}))?\s*([ap])\.?m\.?$/i.exec(value.trim());
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2] ?? 0);
  if (hour < 1 || hour > 12 || minute > 59) return null;
  return `${String((hour % 12) + (match[3].toLowerCase() === 'p' ? 12 : 0)).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

export function calendarEvents(
  month: Date,
  events: ChurchEvent[],
  schedule: ServiceTime[],
): CalendarEvent[] {
  const days = monthDays(month);
  const first = format(days[0], 'yyyy-MM-dd');
  const last = format(days[days.length - 1], 'yyyy-MM-dd');
  const result: CalendarEvent[] = events.filter((event) => {
    if (!Number.isFinite(Date.parse(event.startAt))) return false;
    const key = phoenixDateKey(event.startAt);
    return key >= first && key <= last;
  });
  for (const service of schedule) {
    const weekday = weekdays.indexOf(service.day.trim().toLowerCase());
    const time = scheduleTime(service.time);
    if (weekday < 0 || !time) continue;
    for (const day of days) {
      if (day.getDay() !== weekday) continue;
      const key = format(day, 'yyyy-MM-dd');
      // Tucson observes MST year-round, including US daylight-saving transitions.
      const startAt = `${key}T${time}:00-07:00`;
      if (
        result.some(
          (event) =>
            event.title === service.gathering &&
            Date.parse(event.startAt) === Date.parse(startAt),
        )
      )
        continue;
      result.push({
        title: service.gathering,
        slug: `weekly-${weekday}-${time.replace(':', '')}-${key}`,
        startAt,
        recurring: true,
      });
    }
  }
  return result.sort(
    (a, b) =>
      Date.parse(a.startAt) - Date.parse(b.startAt) ||
      a.slug.localeCompare(b.slug),
  );
}

export function externalEventUrl(value?: string): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

export function eventIcal(
  event: CalendarEvent,
  location: string,
  now = new Date(),
): string {
  const escape = (value: string) =>
    value
      .replace(/\\/g, '\\\\')
      .replace(/\r\n|\r|\n/g, '\\n')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,');
  const stamp = (value: Date) =>
    value
      .toISOString()
      .replace(/[-:]/g, '')
      .replace(/\.\d{3}/, '');
  const url = externalEventUrl(event.url);
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//FRCC Tucson//Church Calendar//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${encodeURIComponent(event.slug)}-${Date.parse(event.startAt)}@frcctucson.org`,
    `DTSTAMP:${stamp(now)}`,
    `DTSTART:${stamp(new Date(event.startAt))}`,
    ...(event.endAt && Date.parse(event.endAt) > Date.parse(event.startAt)
      ? [`DTEND:${stamp(new Date(event.endAt))}`]
      : []),
    `SUMMARY:${escape(event.title)}`,
    `LOCATION:${escape(event.location || location)}`,
    ...(event.description ? [`DESCRIPTION:${escape(event.description)}`] : []),
    ...(url ? [`URL:${escape(url)}`] : []),
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  // RFC 5545 folds at 75 octets without splitting Unicode characters.
  return (
    lines
      .map((line) => {
        let folded = '';
        let bytes = 0;
        for (const char of line) {
          const size = new TextEncoder().encode(char).length;
          if (bytes + size > 75) {
            folded += '\r\n ';
            bytes = 1;
          }
          folded += char;
          bytes += size;
        }
        return folded;
      })
      .join('\r\n') + '\r\n'
  );
}
