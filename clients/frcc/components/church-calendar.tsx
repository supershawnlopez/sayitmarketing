'use client';

import { useEffect, useId, useState } from 'react';
import { addMonths, format, isSameMonth, startOfMonth } from 'date-fns';
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  List,
  MapPin,
  RotateCcw,
} from 'lucide-react';
import { church } from '@/lib/church-content';
import type { ChurchEvent } from '@/lib/church-updates';
import { serviceTimes } from '@/lib/service-times';
import {
  CALENDAR_TIME_ZONE,
  calendarDate,
  calendarEvents,
  eventIcal,
  externalEventUrl,
  monthDays,
  phoenixDateKey,
  type CalendarEvent,
} from '@/lib/calendar';

const dateLabel = new Intl.DateTimeFormat('en-US', {
  timeZone: CALENDAR_TIME_ZONE,
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});
const timeLabel = new Intl.DateTimeFormat('en-US', {
  timeZone: CALENDAR_TIME_ZONE,
  hour: 'numeric',
  minute: '2-digit',
});
const weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function downloadEvent(event: CalendarEvent) {
  const url = URL.createObjectURL(
    new Blob([eventIcal(event, church.address)], {
      type: 'text/calendar;charset=utf-8',
    }),
  );
  const link = document.createElement('a');
  link.href = url;
  link.download = `${event.slug.replace(/[^a-z0-9-]/gi, '-')}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function ChurchCalendar({
  events,
  initialNow,
}: {
  events: ChurchEvent[];
  initialNow: string;
}) {
  const id = useId();
  const [today, setToday] = useState(() => phoenixDateKey(initialNow));
  const [cutoff, setCutoff] = useState(initialNow);
  const [month, setMonth] = useState(() => startOfMonth(calendarDate(today)));
  const [mode, setMode] = useState<'list' | 'month'>('list');
  const [selected, setSelected] = useState<string | null>(null);
  // Static hosting must initialize to the visitor's current Tucson date, not build day.
  useEffect(() => {
    const initialize = setTimeout(() => {
      const now = new Date().toISOString();
      const key = phoenixDateKey(now);
      setToday(key);
      setCutoff(now);
      setMonth(startOfMonth(calendarDate(key)));
    }, 0);
    const clock = setInterval(() => {
      const now = new Date().toISOString();
      setToday(phoenixDateKey(now));
      setCutoff(now);
    }, 60_000);
    return () => {
      clearTimeout(initialize);
      clearInterval(clock);
    };
  }, []);
  const days = monthDays(month);
  const items = calendarEvents(month, events, serviceTimes);
  const visible = items.filter((event) => {
    const day = phoenixDateKey(event.startAt);
    if (mode === 'month' && selected) return day === selected;
    const end =
      event.endAt && Date.parse(event.endAt) > Date.parse(event.startAt)
        ? event.endAt
        : event.startAt;
    return (
      isSameMonth(calendarDate(day), month) &&
      (!isSameMonth(month, calendarDate(today)) ||
        Date.parse(end) >= Date.parse(cutoff))
    );
  });
  const changeMonth = (delta: number) => {
    setMonth((value) => startOfMonth(addMonths(value, delta)));
    setSelected(null);
  };
  const goToday = () => {
    const now = new Date().toISOString();
    const key = phoenixDateKey(now);
    setToday(key);
    setCutoff(now);
    setMonth(startOfMonth(calendarDate(key)));
    setSelected(mode === 'month' ? key : null);
  };

  return (
    <div className="church-calendar">
      <p className="body-copy calendar-timezone">
        All times are Tucson time (MST).
      </p>
      <div className="calendar-toolbar">
        <h3 id={`${id}-month`} aria-live="polite">
          {format(month, 'MMMM yyyy')}
        </h3>
        <nav className="calendar-navigation" aria-label="Calendar navigation">
          <button
            type="button"
            className="icon-button"
            aria-label="Previous month"
            title="Previous month"
            onClick={() => changeMonth(-1)}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label="Go to today"
            title="Today"
            onClick={goToday}
          >
            <RotateCcw size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label="Next month"
            title="Next month"
            onClick={() => changeMonth(1)}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </nav>
        <fieldset className="calendar-view-switch" aria-label="Calendar view">
          <button
            type="button"
            aria-pressed={mode === 'list'}
            aria-controls={`${id}-content`}
            onClick={() => {
              setMode('list');
              setSelected(null);
            }}
          >
            <List size={18} aria-hidden="true" /> List
          </button>
          <button
            type="button"
            aria-pressed={mode === 'month'}
            aria-controls={`${id}-content`}
            onClick={() => setMode('month')}
          >
            <CalendarDays size={18} aria-hidden="true" /> Month
          </button>
        </fieldset>
      </div>
      <div id={`${id}-content`}>
        {mode === 'month' && (
          <table className="calendar-grid" aria-labelledby={`${id}-month`}>
            <thead>
              <tr>
                {weekdays.map((day) => (
                  <th key={day} scope="col">
                    <abbr title={day}>{day.slice(0, 3)}</abbr>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: days.length / 7 }, (_, week) => (
                <tr key={week}>
                  {days.slice(week * 7, week * 7 + 7).map((day) => {
                    const key = format(day, 'yyyy-MM-dd');
                    const daily = items.filter(
                      (event) => phoenixDateKey(event.startAt) === key,
                    );
                    return (
                      <td
                        key={key}
                        className={`calendar-cell${!isSameMonth(day, month) ? ' calendar-cell-outside' : ''}`}
                      >
                        <button
                          type="button"
                          className="calendar-day"
                          aria-current={key === today ? 'date' : undefined}
                          aria-pressed={selected === key}
                          aria-controls={`${id}-events`}
                          aria-label={`${format(day, 'EEEE, MMMM d, yyyy')}, ${daily.length} gathering${daily.length === 1 ? '' : 's'}`}
                          onClick={() => setSelected(key)}
                        >
                          <span className="calendar-day-number">
                            {format(day, 'd')}
                          </span>
                          {daily.map((event) => (
                            <span
                              className="calendar-day-event"
                              key={event.slug + event.startAt}
                            >
                              {event.title}
                              <span className="calendar-day-time">
                                {' '}
                                {timeLabel.format(new Date(event.startAt))}
                              </span>
                            </span>
                          ))}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="calendar-agenda" id={`${id}-events`}>
          <h4 className="calendar-agenda-title" aria-live="polite">
            {mode === 'month' && selected
              ? format(calendarDate(selected), 'EEEE, MMMM d')
              : `Gatherings in ${format(month, 'MMMM')}`}
          </h4>
          {mode === 'month' && selected && (
            <button
              type="button"
              className="text-link"
              onClick={() => setSelected(null)}
            >
              Show month’s gatherings
            </button>
          )}
          {visible.length ? (
            <ul className="updates-list calendar-event-list">
              {visible.map((event) => {
                const url = externalEventUrl(event.url);
                const validEnd =
                  event.endAt &&
                  Date.parse(event.endAt) > Date.parse(event.startAt)
                    ? event.endAt
                    : null;
                return (
                  <li
                    className="update-item calendar-event"
                    key={event.slug + event.startAt}
                  >
                    <details className="calendar-event-details">
                      <summary className="calendar-event-summary">
                        <span className="eyebrow">
                          {event.recurring
                            ? 'Weekly gathering'
                            : event.ministry || 'Church event'}
                        </span>
                        <span className="calendar-event-title">
                          {event.title}
                        </span>
                        <span className="calendar-event-date">
                          <time dateTime={event.startAt}>
                            {dateLabel.format(new Date(event.startAt))} ·{' '}
                            {timeLabel.format(new Date(event.startAt))}
                          </time>
                        </span>
                        <span className="calendar-details-hint">
                          View details
                        </span>
                      </summary>
                      <div className="calendar-event-body">
                        <p className="body-copy">
                          <Clock size={18} aria-hidden="true" />{' '}
                          {timeLabel.format(new Date(event.startAt))}
                          {validEnd && (
                            <>
                              {' '}
                              –{' '}
                              <time dateTime={validEnd}>
                                {phoenixDateKey(validEnd) !==
                                  phoenixDateKey(event.startAt) &&
                                  `${dateLabel.format(new Date(validEnd))} · `}
                                {timeLabel.format(new Date(validEnd))}
                              </time>
                            </>
                          )}{' '}
                          (Tucson time)
                        </p>
                        <p className="body-copy">
                          <MapPin size={18} aria-hidden="true" />{' '}
                          {event.location || church.address}
                        </p>
                        {event.description && (
                          <p className="body-copy">{event.description}</p>
                        )}
                        <div className="calendar-event-actions">
                          <a
                            className="text-link"
                            href={
                              event.location &&
                              event.location !== church.address
                                ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`
                                : church.mapUrl
                            }
                          >
                            Get directions{' '}
                            <ArrowUpRight size={18} aria-hidden="true" />
                          </a>
                          <button
                            type="button"
                            className="text-link"
                            onClick={() => downloadEvent(event)}
                            aria-label={`Add ${event.title} to your calendar`}
                          >
                            <Download size={18} aria-hidden="true" /> Add to
                            calendar
                          </button>
                          {url && (
                            <a
                              className="text-link"
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Event details{' '}
                              <span className="sr-only">
                                for {event.title} (opens in a new tab)
                              </span>
                              <ArrowUpRight size={18} aria-hidden="true" />
                            </a>
                          )}
                        </div>
                      </div>
                    </details>
                  </li>
                );
              })}
            </ul>
          ) : (
            <output className="empty-state">
              {selected
                ? 'No gatherings are scheduled for this day. Choose another date to explore.'
                : 'No more gatherings are listed for this month. Explore next month for upcoming weekly services.'}
            </output>
          )}
        </div>
      </div>
    </div>
  );
}
