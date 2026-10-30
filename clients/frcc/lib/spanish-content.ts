import { ministries } from '@/lib/church-content';
import { heroImages, ministryHero, type HeroImage } from '@/lib/hero-images';

type MinistryTranslation = Pick<
  (typeof ministries)[number],
  'title' | 'body' | 'detail' | 'visitorNote'
>;

const ministryTranslations: Record<string, MinistryTranslation> = {
  'worship-services': {
    title: 'Servicios de adoración',
    body: 'Reúnete con la familia de FRCC para adorar, aprender de la Biblia, orar y animarnos unos a otros.',
    detail:
      'La adoración reúne a nuestra familia de fe para acercarnos a Dios, reflexionar sobre la Biblia y animarnos unos a otros.',
    visitorNote:
      '¿Planeas tu primera visita? Comunícate con la iglesia para conocer los detalles actuales de las reuniones y resolver tus dudas antes de venir.',
  },
  'youth-ministry': {
    title: 'Ministerio de jóvenes',
    body: 'Acompañamos a los jóvenes para que crezcan en fe, amistad y propósito dentro de nuestra comunidad de fe.',
    detail:
      'El ministerio de jóvenes ofrece a los estudiantes un espacio para explorar la fe y formar amistades dentro de la comunidad de la iglesia.',
    visitorNote:
      'Los jóvenes y sus familias pueden comunicarse con la iglesia para preguntar por las oportunidades actuales y cómo participar.',
  },
  'childrens-ministry': {
    title: 'Ministerio de niños',
    body: 'Un espacio acogedor donde los niños aprenden de Dios de una manera adecuada para su edad.',
    detail:
      'El ministerio de niños apoya a las familias mientras los pequeños comienzan a descubrir la Biblia y a conocer el amor de Dios.',
    visitorNote:
      'Los padres y cuidadores pueden comunicarse con la iglesia para conocer las opciones actuales para los niños y saber qué esperar antes de su visita.',
  },
  'prayer-meetings': {
    title: 'Reuniones de oración',
    body: 'Un espacio para orar juntos, buscar la guía de Dios y apoyarnos unos a otros.',
    detail:
      'Al orar juntos, presentamos nuestras preocupaciones y nuestra gratitud ante Dios mientras nos cuidamos unos a otros en la fe.',
    visitorNote:
      'Comunícate con la iglesia para preguntar cómo unirte a la oración o compartir una petición.',
  },
  'community-outreach': {
    title: 'Servicio a la comunidad',
    body: 'Servimos a Tucson con compasión, ayuda práctica y el amor de Cristo.',
    detail:
      'El servicio a la comunidad expresa nuestra fe al cuidar de nuestros vecinos y servir a Tucson con compasión.',
    visitorNote:
      '¿Te gustaría servir junto a la iglesia? Comunícate con nosotros para conocer las necesidades actuales y las maneras de ayudar.',
  },
  'bible-classes': {
    title: 'Clases de Biblia',
    body: 'Oportunidades para estudiar la Biblia y profundizar juntos en la fe.',
    detail:
      'Estudiar la Biblia juntos nos da un espacio para reflexionar sobre las Escrituras, compartir preguntas y conectar la fe con la vida diaria.',
    visitorNote:
      'Comunícate con la iglesia para conocer las oportunidades actuales de estudio y preguntar cómo participar.',
  },
};

export const spanishMinistries = ministries.map((ministry) => ({
  ...ministry,
  ...ministryTranslations[ministry.slug],
}));

const heroAlts: Record<string, string> = {
  [heroImages.bible.alt]: 'Una Biblia abierta durante la lectura',
  [heroImages.welcome.alt]:
    'Manos levantadas en adoración sobre un fondo suavemente desenfocado',
  [heroImages.community.alt]:
    'Una silueta con los brazos abiertos en la cálida luz del atardecer',
  [heroImages.prayer.alt]:
    'La silueta de una mano levantada frente a luces cálidas desenfocadas',
  [heroImages.events.alt]: 'Manos abiertas levantadas en adoración',
  [heroImages.teaching.alt]: 'Manos junto a una Biblia abierta',
};

export function spanishHero(image: HeroImage): HeroImage {
  return { ...image, alt: heroAlts[image.alt] ?? image.alt };
}

export function spanishMinistryHero(slug: string): HeroImage {
  return spanishHero(ministryHero(slug));
}

export const spanishDays: Record<string, string> = {
  Sunday: 'Domingo',
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miércoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sábado',
};
