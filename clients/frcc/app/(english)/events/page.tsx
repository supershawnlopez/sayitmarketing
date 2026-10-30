import { localizedMetadata } from '@/lib/localized-metadata';
import {
  ConnectBand,
  Eyebrow,
  PageIntro,
  PageShell,
} from '@/components/site-shell';
import { ChurchCalendar } from '@/components/church-calendar';
import { events } from '@/lib/church-updates';
import { heroImages } from '@/lib/hero-images';

export const metadata = localizedMetadata('/events', 'en', 'Events | FRCC Tucson', 'Find upcoming events and regular weekly gatherings at Family Restoration Community Church in Tucson.');

export default function EventsPage() {
  return (
    <PageShell>
      <main id="main">
        <PageIntro
          eyebrow="Life at FRCC"
          image={heroImages.events}
          title="Upcoming events"
          body="Find opportunities to gather, grow in faith, and connect with our church family."
        />
        <section className="section-space" aria-labelledby="events-title">
          <div className="container">
            <div className="updates-header">
              <Eyebrow>Church calendar</Eyebrow>
              <h2 id="events-title">Gather with us</h2>
            </div>
            <ChurchCalendar
              events={events}
              initialNow={new Date().toISOString()}
            />
          </div>
        </section>
        <ConnectBand />
      </main>
    </PageShell>
  );
}
