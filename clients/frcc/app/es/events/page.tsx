import { spanishHero } from '@/lib/spanish-content';
import { localizedMetadata } from '@/lib/localized-metadata';
import type { Metadata } from 'next';
import {
  ConnectBand,
  Eyebrow,
  PageIntro,
  PageShell,
} from '@/components/site-shell';
import { ChurchCalendar } from '@/components/church-calendar';
import { events } from '@/lib/church-updates';
import { heroImages } from '@/lib/hero-images';

export const metadata: Metadata = localizedMetadata(
  '/events',
  'es',
  'Eventos | FRCC Tucson',
  'Consulta los próximos eventos y las reuniones semanales de Family Restoration Community Church en Tucson.',
);

export default function EventsPage() {
  return (
    <PageShell locale="es">
      <main id="main" lang="es">
        <PageIntro
          locale="es"
          eyebrow="La vida en FRCC"
          image={spanishHero(heroImages.events)}
          title="Próximos eventos"
          body="Encuentra oportunidades para reunirnos, crecer en la fe y convivir con nuestra familia de la iglesia."
        />
        <section className="section-space" aria-labelledby="events-title">
          <div className="container">
            <div className="updates-header">
              <Eyebrow>Calendario de la iglesia</Eyebrow>
              <h2 id="events-title">Reúnete con nosotros</h2>
            </div>
            <ChurchCalendar
              locale="es"
              events={events}
              initialNow={new Date().toISOString()}
            />
          </div>
        </section>
        <ConnectBand locale="es" />
      </main>
    </PageShell>
  );
}
