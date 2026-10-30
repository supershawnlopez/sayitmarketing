import { localizedMetadata } from '@/lib/localized-metadata';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { spanishMinistries as ministries } from '@/lib/spanish-content';
import { publicAsset } from '@/lib/public-asset';
import {
  ConnectBand,
  Eyebrow,
  PageIntro,
  PageShell,
  VisitBand,
} from '@/components/site-shell';

export const metadata: Metadata = localizedMetadata(
  '/about',
  'es',
  'Conócenos | FRCC Tucson',
  'Conoce a los pastores Eli y Olivia, nuestra comunidad de fe en Tucson y los seis ministerios de Family Restoration Community Church.',
);

export default function AboutPage() {
  return (
    <PageShell locale="es">
      <main id="main" lang="es">
        <PageIntro
          locale="es"
          eyebrow="Conoce FRCC"
          title="Fe. Familia. Restauración."
          body="Una comunidad de fe en Tucson que crece en la fe, se cuida mutuamente y comparte el amor de Cristo."
        />
        <VisitBand locale="es" />
        <section className="section-space">
          <div className="container welcome-layout">
            <div>
              <Eyebrow>Lo que nos mueve</Eyebrow>
              <h2>
                Una familia de fe.
                <br />
                Un camino compartido.
              </h2>
            </div>
            <div className="welcome-copy">
              <p className="lead-copy">
                La restauración comienza con esperanza.
              </p>
              <p className="body-copy">
                En Family Restoration Community Church, la adoración, las
                enseñanzas de Cristo, la oración y la comunidad son el centro de
                nuestra vida. Deseamos que las personas y las familias
                encuentren ánimo, crezcan en el conocimiento de la Biblia y
                sirvan con compasión.
              </p>
              <p className="body-copy">
                Ya sea que estés explorando la fe o buscando una iglesia donde
                sentirte en casa, nos dará gusto conocerte.
              </p>
              <Link href="/es/contact" className="text-link">
                Conversemos
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <section
          className="leadership-section section-space"
          aria-labelledby="pastors-title"
        >
          <div className="container leadership-layout">
            <Image
              src={publicAsset('/images/frcc-pastors-authentic-v3.webp')}
              alt="Los pastores de FRCC, Eli y Olivia"
              width={480}
              height={270}
              sizes="(max-width: 700px) 100vw, 480px"
              loading="lazy"
            />
            <div>
              <Eyebrow>Conoce a nuestros pastores</Eyebrow>
              <h2 id="pastors-title">Eli &amp; Olivia</h2>
              <p className="lead-copy">
                Te damos una cálida bienvenida a la familia de FRCC.
              </p>
              <p className="body-copy">
                Ven a adorar con nosotros, conoce a nuestros pastores y a las
                personas que han encontrado su hogar en FRCC.
              </p>
              <Link href="/es/contact#service-times" className="text-link">
                Planea tu visita <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <section id="ministries" className="ministry-section section-space">
          <div className="container">
            <Eyebrow>La vida en FRCC</Eyebrow>
            <h2>
              Un espacio para convivir.
              <br />
              Oportunidades para crecer.
            </h2>
            <div className="ministry-list">
              {ministries.map((ministry, index) => (
                <article
                  key={ministry.title}
                  id={
                    index === 0
                      ? 'worship'
                      : index === 4
                        ? 'community'
                        : undefined
                  }
                >
                  <Link
                    className="ministry-link"
                    href={'/es/ministries/' + ministry.slug}
                  >
                    <span className="ministry-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3>{ministry.title}</h3>
                    <p>{ministry.body}</p>
                    <ArrowUpRight
                      className="ministry-arrow"
                      size={22}
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <ConnectBand locale="es" />
      </main>
    </PageShell>
  );
}
