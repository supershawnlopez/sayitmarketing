import { spanishHero } from '@/lib/spanish-content';
import { localizedMetadata } from '@/lib/localized-metadata';
import type { Metadata } from 'next';
import { ArrowUpRight, Phone } from 'lucide-react';
import { church } from '@/lib/church-content';
import { heroImages } from '@/lib/hero-images';
import {
  ConnectBand,
  Eyebrow,
  PageIntro,
  PageShell,
} from '@/components/site-shell';

export const metadata: Metadata = localizedMetadata(
  '/give',
  'es',
  'Ofrendas | FRCC Tucson',
  'Apoya el ministerio de Family Restoration Community Church y su servicio a las familias de Tucson. Consulta la información sobre ofrendas.',
);

export default function GivePage() {
  return (
    <PageShell locale="es">
      <main id="main" lang="es">
        <PageIntro
          locale="es"
          eyebrow="Generosidad en FRCC"
          image={spanishHero(heroImages.prayer)}
          title="Da con un corazón agradecido."
          body="Gracias por apoyar el ministerio de Family Restoration Community Church y ayudarnos a servir a las familias de Tucson."
        />
        <section className="section-space">
          <div className="container giving-layout">
            <div>
              <Eyebrow>Apoyamos el ministerio</Eyebrow>
              <h2>
                Fe en acción.
                <br />
                Amor por nuestra ciudad.
              </h2>
              <p className="body-copy">
                Agradecemos a cada persona que da, sirve y ora junto a nuestra
                familia de fe.
              </p>
            </div>
            <div className="giving-panel">
              <Eyebrow>Maneras de dar</Eyebrow>
              <h3>Ofrendas en línea</h3>
              <p>Continúa a la página de ofrendas de FRCC en ChurchTrac.</p>
              <p className="giving-notice">
                El enlace actual para dar en línea no funciona. Llama a FRCC
                para obtener información sobre cómo dar.
              </p>
              <a
                className="button button-dark"
                href={church.givingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir ChurchTrac
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a
                className="text-link"
                href={'tel:' + church.phone.replace(/\D/g, '')}
              >
                <Phone size={17} aria-hidden="true" />
                {church.phone}
              </a>
            </div>
          </div>
        </section>
        <ConnectBand locale="es" />
      </main>
    </PageShell>
  );
}
