export type Locale = 'en' | 'es';

export function localeFromPathname(pathname: string): Locale {
  return /^\/es(?:\/|$)/.test(pathname) ? 'es' : 'en';
}

/** Localize an internal path while retaining its query and fragment. */
export function localizedHref(path: string, locale: Locale): string {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path)) return path;
  const boundary = path.search(/[?#]/);
  const pathname = boundary < 0 ? path : path.slice(0, boundary);
  const suffix = boundary < 0 ? '' : path.slice(boundary);
  const normalized =
    ('/' + pathname.replace(/^\/+/, ''))
      .replace(/^(?:\/es)+(?=\/|$)/, '')
      .replace(/\/+$/, '') || '/';
  return (
    (locale === 'es'
      ? '/es' + (normalized === '/' ? '' : normalized)
      : normalized) + suffix
  );
}

const spanishLabels: Record<string, string> = {
  Home: 'Inicio',
  About: 'Nosotros',
  Events: 'Eventos',
  Messages: 'Mensajes',
  Give: 'Donar',
  Contact: 'Contacto',
  Sunday: 'Domingo',
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miércoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sábado',
  'Sunday gathering': 'Reunión dominical',
  'Midweek gathering': 'Reunión de entre semana',
  'An open Bible being read': 'Una Biblia abierta durante la lectura',
  'Hands lifted in worship against a softly blurred background':
    'Manos levantadas en adoración ante un fondo suavemente desenfocado',
  'A silhouette with open arms in warm evening light':
    'Una silueta con los brazos abiertos bajo la cálida luz del atardecer',
  'A raised hand silhouetted against softly blurred warm lights':
    'La silueta de una mano levantada ante luces cálidas desenfocadas',
  'Open hands lifted in worship': 'Manos abiertas levantadas en adoración',
  'Hands resting beside an open Bible': 'Manos junto a una Biblia abierta',
};

export function localizedLabel(label: string, locale: Locale): string {
  return locale === 'es' ? (spanishLabels[label] ?? label) : label;
}
