import { spanishHero } from '@/lib/spanish-content';
import { localizedMetadata } from '@/lib/localized-metadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, Clock3, MapPin, Phone } from 'lucide-react';
import { church } from '@/lib/church-content';
import { Eyebrow, PageIntro, PageShell } from '@/components/site-shell';
import { ServiceTimes } from '@/components/service-times';
import { heroImages } from '@/lib/hero-images';

export const metadata: Metadata = localizedMetadata(
  '/contact',
  'es',
  'Visítanos y contáctanos | FRCC Tucson',
  'Planea tu visita a Family Restoration Community Church en Tucson. Consulta la dirección, el teléfono y los horarios de nuestras reuniones.',
);

export default function ContactPage() {
  return (
    <PageShell locale="es">
      <main id="main" lang="es">
        <PageIntro
          locale="es"
          eyebrow="Visítanos y conócenos"
          image={spanishHero(heroImages.community)}
          title="Nos dará gusto conocerte."
          body="¿Planeas visitarnos, buscas una iglesia donde sentirte en casa o tienes alguna pregunta? Conversemos."
        />
        <section className="section-space">
          <div className="container contact-layout">
            <div>
              <Eyebrow>Ven tal como eres</Eyebrow>
              <h2>
                Tu siguiente paso
                <br />
                comienza aquí.
              </h2>
              <p className="body-copy">
                No necesitas tener todas las respuestas antes de entrar por
                nuestras puertas. Llámanos si tienes preguntas sobre los
                servicios, el ministerio de niños o cómo participar.
              </p>
              <a
                className="button button-dark"
                href={'tel:' + church.phone.replace(/\D/g, '')}
              >
                Llama a la iglesia
                <Phone size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="contact-details">
              <a href={church.mapUrl}>
                <MapPin size={22} aria-hidden="true" />
                <div>
                  <h3>Encuéntranos en Tucson</h3>
                  <p>{church.address}</p>
                  <span className="text-link">
                    Cómo llegar
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </div>
              </a>
              <a href={'tel:' + church.phone.replace(/\D/g, '')}>
                <Phone size={22} aria-hidden="true" />
                <div>
                  <h3>Llámanos</h3>
                  <p>{church.phone}</p>
                </div>
              </a>
              <div className="contact-row">
                <Clock3 size={22} aria-hidden="true" />
                <div>
                  <h3>Reúnete con nosotros</h3>
                  <Link className="text-link" href="#service-times">
                    Consulta los horarios
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ServiceTimes locale="es" />
        <section className="contact-prayer">
          <div className="container welcome-layout">
            <div>
              <Eyebrow>Oración y ánimo</Eyebrow>
              <h2>
                No tienes que
                <br />
                llevar tus cargas a solas.
              </h2>
            </div>
            <div>
              <p className="lead-copy">Con gusto oraremos contigo.</p>
              <p className="body-copy">
                Si necesitas oración o deseas conversar con alguien de la
                iglesia, llámanos.
              </p>
              <a
                className="text-link"
                href={'tel:' + church.phone.replace(/\D/g, '')}
              >
                Llama a FRCC
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
