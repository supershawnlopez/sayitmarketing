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

function dateFormatter(locale: 'en' | 'es') {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-US' : 'en-US', {
    timeZone: CALENDAR_TIME_ZONE,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
function timeFormatter(locale: 'en' | 'es') {
  return new Intl.DateTimeFormat(locale === 'es' ? 'es-US' : 'en-US', {
    timeZone: CALENDAR_TIME_ZONE,
    hour: 'numeric',
    minute: '2-digit',
  });
}
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
  locale = 'en',
}: {
  events: ChurchEvent[];
  initialNow: string;
  locale?: 'en' | 'es';
}) {
  const text = (english: string, spanish: string) =>
    locale === 'es' ? spanish : english;
  const dateLabel = dateFormatter(locale);
  const timeLabel = timeFormatter(locale);
  // Grid dates represent local wall-clock dates, not event instants.
  const wallDateLabel = (
    day: Date,
    pattern: string,
    options: Intl.DateTimeFormatOptions,
  ) =>
    locale === 'es'
      ? new Intl.DateTimeFormat('es-US', options).format(day)
      : format(day, pattern);
  const dayNames =
    locale === 'es'
      ? [
          'domingo',
          'lunes',
          'martes',
          'miércoles',
          'jueves',
          'viernes',
          'sábado',
        ]
      : weekdays;
  const recurringTitles: Record<string, string> = {
    'Sunday gathering': 'Reunión dominical',
    'Midweek gathering': 'Reunión de entre semana',
  };
  // Translate generated schedule labels only; preserve published event content.
  const eventTitle = (event: CalendarEvent) =>
    locale === 'es' && event.recurring
      ? (recurringTitles[event.title] ?? event.title)
      : event.title;
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
        {text(
          'All times are Tucson time (MST).',
          'Todos los horarios corresponden a la hora de Tucson (MST).',
        )}
      </p>
      <div className="calendar-toolbar">
        <h3 id={`${id}-month`} aria-live="polite">
          {wallDateLabel(month, 'MMMM yyyy', {
            month: 'long',
            year: 'numeric',
          })}
        </h3>
        <nav
          className="calendar-navigation"
          aria-label={text('Calendar navigation', 'Navegación del calendario')}
        >
          <button
            type="button"
            className="icon-button"
            aria-label={text('Previous month', 'Mes anterior')}
            title={text('Previous month', 'Mes anterior')}
            onClick={() => changeMonth(-1)}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label={text('Go to today', 'Ir a hoy')}
            title={text('Today', 'Hoy')}
            onClick={goToday}
          >
            <RotateCcw size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="icon-button"
            aria-label={text('Next month', 'Mes siguiente')}
            title={text('Next month', 'Mes siguiente')}
            onClick={() => changeMonth(1)}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </nav>
        <fieldset
          className="calendar-view-switch"
          aria-label={text('Calendar view', 'Vista del calendario')}
        >
          <button
            type="button"
            aria-pressed={mode === 'list'}
            aria-controls={`${id}-content`}
            onClick={() => {
              setMode('list');
              setSelected(null);
            }}
          >
            <List size={18} aria-hidden="true" /> {text('List', 'Lista')}
          </button>
          <button
            type="button"
            aria-pressed={mode === 'month'}
            aria-controls={`${id}-content`}
            onClick={() => setMode('month')}
          >
            <CalendarDays size={18} aria-hidden="true" /> {text('Month', 'Mes')}
          </button>
        </fieldset>
      </div>
      <div id={`${id}-content`}>
        {mode === 'month' && (
          <table className="calendar-grid" aria-labelledby={`${id}-month`}>
            <thead>
              <tr>
                {dayNames.map((day) => (
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
                          aria-label={`${wallDateLabel(day, 'EEEE, MMMM d, yyyy', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}, ${daily.length} ${locale === 'es' ? (daily.length === 1 ? 'reunión' : 'reuniones') : `gathering${daily.length === 1 ? '' : 's'}`}`}
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
                              {eventTitle(event)}
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
              ? wallDateLabel(calendarDate(selected), 'EEEE, MMMM d', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })
              : `${text('Gatherings in', 'Reuniones en')} ${wallDateLabel(month, 'MMMM', { month: 'long' })}`}
          </h4>
          {mode === 'month' && selected && (
            <button
              type="button"
              className="text-link"
              onClick={() => setSelected(null)}
            >
              {text('Show month’s gatherings', 'Mostrar las reuniones del mes')}
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
                            ? text('Weekly gathering', 'Reunión semanal')
                            : event.ministry ||
                              text('Church event', 'Evento de la iglesia')}
                        </span>
                        <span className="calendar-event-title">
                          {eventTitle(event)}
                        </span>
                        <span className="calendar-event-date">
                          <time dateTime={event.startAt}>
                            {dateLabel.format(new Date(event.startAt))} ·{' '}
                            {timeLabel.format(new Date(event.startAt))}
                          </time>
                        </span>
                        <span className="calendar-details-hint">
                          {text('View details', 'Ver detalles')}
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
                          {text('(Tucson time)', '(hora de Tucson)')}
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
                            {text('Get directions', 'Cómo llegar')}{' '}
                            <ArrowUpRight size={18} aria-hidden="true" />
                          </a>
                          <button
                            type="button"
                            className="text-link"
                            onClick={() =>
                              downloadEvent({
                                ...event,
                                title: eventTitle(event),
                              })
                            }
                            aria-label={text(
                              `Add ${event.title} to your calendar`,
                              `Agregar ${eventTitle(event)} a tu calendario`,
                            )}
                          >
                            <Download size={18} aria-hidden="true" />{' '}
                            {text('Add to calendar', 'Agregar al calendario')}
                          </button>
                          {url && (
                            <a
                              className="text-link"
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {text('Event details', 'Detalles del evento')}{' '}
                              <span className="sr-only">
                                {text(
                                  `for ${event.title} (opens in a new tab)`,
                                  `de ${eventTitle(event)} (se abre en una pestaña nueva)`,
                                )}
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
                ? text(
                    'No gatherings are scheduled for this day. Choose another date to explore.',
                    'No hay reuniones programadas para este día. Elige otra fecha para explorar.',
                  )
                : text(
                    'No more gatherings are listed for this month. Explore next month for upcoming weekly services.',
                    'No hay más reuniones este mes. Consulta el próximo mes para ver las próximas reuniones semanales.',
                  )}
            </output>
          )}
        </div>
      </div>
    </div>
  );
}
