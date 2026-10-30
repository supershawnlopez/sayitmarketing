import { localizedMetadata } from '@/lib/localized-metadata';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { church } from '@/lib/church-content';
import { publicAsset } from '@/lib/public-asset';
import {
  ConnectBand,
  Eyebrow,
  PageShell,
  VisitBand,
} from '@/components/site-shell';

export const metadata: Metadata = localizedMetadata(
  '/',
  'es',
  'Inicio | FRCC Tucson',
  'Conoce Family Restoration Community Church en Tucson: una familia de fe para adorar, crecer y servir juntos.',
);

export default function Home() {
  return (
    <PageShell locale="es">
      <main id="main" lang="es">
        <section className="home-hero" aria-labelledby="home-title">
          <Image
            className="hero-photo"
            src={church.heroImage}
            alt="Manos levantadas en adoración sobre un fondo suavemente desenfocado"
            fetchPriority="high"
            width={2400}
            height={1600}
            sizes="100vw"
          />
          <div className="hero-shade" />
          <div className="container hero-content">
            <p className="eyebrow">Family Restoration Community Church</p>
            <h1 id="home-title">
              FRCC
              <span className="hero-title-line">
                TUCSON<span className="brand-text">.</span>
              </span>
            </h1>
            <div className="hero-bottom">
              <div>
                <p className="hero-welcome">
                  Un lugar para ti.
                  <br />
                  Una comunidad para crecer juntos.
                </p>
                <Link className="button button-brand" href="/es/contact">
                  Planea tu visita
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
              </div>
              <a
                href="#welcome"
                className="hero-scroll"
                aria-label="Descubre FRCC"
              >
                <ArrowDown size={23} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <VisitBand locale="es" />
        <section id="welcome" className="welcome-section section-space">
          <div className="container welcome-layout">
            <div>
              <Eyebrow>Fe. Familia. Restauración.</Eyebrow>
              <h2>
                No tienes que
                <br />
                vivir la vida a solas.
              </h2>
            </div>
            <div className="welcome-copy">
              <p className="lead-copy">
                Encontrar una familia de fe tiene algo especial.
              </p>
              <p className="body-copy">
                En Family Restoration Community Church nos reunimos para adorar,
                crecer en la fe y cuidarnos unos a otros. Dondequiera que estés
                en tu camino, te invitamos a dar el siguiente paso con nosotros.
              </p>
              <Link href="/es/about" className="text-link">
                Conoce FRCC
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <section className="community-section">
          <div className="container">
            <div className="section-topline">
              <div>
                <Eyebrow>Compartimos la vida</Eyebrow>
                <h2>
                  Encuentra tu comunidad.
                  <br />
                  Crece en tu fe.
                </h2>
              </div>
              <Link className="text-link" href="/es/about#ministries">
                Explora nuestros ministerios
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </div>
            <div className="story-grid">
              <Link
                href="/es/ministries/worship-services"
                className="photo-story"
              >
                <div className="story-image">
                  <Image
                    src={publicAsset('/images/frcc-teaching-authentic-v3.webp')}
                    alt="El pastor Eli enseñando junto al púlpito original y la pantalla de proyección"
                    loading="lazy"
                    width={781}
                    height={530}
                    sizes="(max-width: 700px) 100vw, 50vw"
                  />
                  <span className="image-arrow">
                    <ArrowUpRight size={24} aria-hidden="true" />
                  </span>
                </div>
                <div className="story-caption">
                  <span className="eyebrow">Adoración y Palabra</span>
                  <h3>Una fe que crece.</h3>
                  <p>Adoración, Biblia y ánimo para la vida diaria.</p>
                </div>
              </Link>
              <Link href="/es/about" className="photo-story">
                <div className="story-image">
                  <Image
                    src={publicAsset(
                      '/images/frcc-community-authentic-v3.webp',
                    )}
                    alt="Miembros de la familia de FRCC orando juntos"
                    loading="lazy"
                    width={540}
                    height={360}
                    sizes="(max-width: 700px) 100vw, 50vw"
                  />
                  <span className="image-arrow">
                    <ArrowUpRight size={24} aria-hidden="true" />
                  </span>
                </div>
                <div className="story-caption">
                  <span className="eyebrow">Familia y comunidad</span>
                  <h3>Juntos es mejor.</h3>
                  <p>
                    Forma amistades y encuentra maneras de servir a nuestra
                    comunidad de Tucson.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
        <nav
          className="container updates-links"
          aria-label="Mantente en contacto con FRCC"
        >
          <Link href="/es/events">
            <div>
              <Eyebrow>Compartimos la vida</Eyebrow>
              <h2>Eventos</h2>
              <p>Entérate de lo que sucede y encuentra una reunión.</p>
            </div>
            <ArrowUpRight size={26} aria-hidden="true" />
          </Link>
          <Link href="/es/messages">
            <div>
              <Eyebrow>Sermones y enseñanzas</Eyebrow>
              <h2>Mensajes</h2>
              <p>Un espacio para las enseñanzas de nuestra familia de FRCC.</p>
            </div>
            <ArrowUpRight size={26} aria-hidden="true" />
          </Link>
        </nav>
        <section className="prayer-band">
          <div className="container prayer-layout">
            <Eyebrow>Estamos aquí para ti</Eyebrow>
            <div>
              <h2>
                A veces el siguiente
                <br />
                paso es una conversación.
              </h2>
              <p>
                ¿Tienes alguna pregunta, necesitas oración o quieres saber más
                antes de visitarnos? Nos dará gusto escucharte.
              </p>
              <Link href="/es/contact" className="button button-light">
                Comunícate con nosotros
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <ConnectBand locale="es" />
      </main>
    </PageShell>
  );
}
