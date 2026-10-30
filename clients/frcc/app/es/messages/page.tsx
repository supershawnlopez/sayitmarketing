import { spanishDays } from '@/lib/spanish-content';
import { spanishHero } from '@/lib/spanish-content';
import { localizedMetadata } from '@/lib/localized-metadata';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Video } from 'lucide-react';
import {
  ConnectBand,
  Eyebrow,
  PageIntro,
  PageShell,
} from '@/components/site-shell';
import { MessagesLibrary } from '@/components/messages-library';
import { channelUrl, facebookUrl, messages } from '@/lib/church-updates';
import { heroImages } from '@/lib/hero-images';
import { church } from '@/lib/church-content';
import { safeMediaUrl } from '@/lib/video';
import { publicAsset } from '@/lib/public-asset';

export const metadata: Metadata = localizedMetadata(
  '/messages',
  'es',
  'Mensajes | FRCC Tucson',
  'Sermones y enseñanzas de Family Restoration Community Church en Tucson.',
);

export default function MessagesPage() {
  const channel = safeMediaUrl(channelUrl);
  const facebook = safeMediaUrl(facebookUrl);
  return (
    <PageShell locale="es">
      <main id="main" lang="es">
        <PageIntro
          locale="es"
          eyebrow="Crece en la fe"
          title="Mensajes"
          body="Biblia, ánimo y una fe que crece en la vida diaria."
          image={spanishHero(heroImages.teaching)}
        />
        <section className="section-space" aria-labelledby="messages-title">
          <div className="container">
            <div className="updates-header messages-heading">
              <div>
                <Eyebrow>De la Palabra</Eyebrow>
                <h2 id="messages-title">Sermones y enseñanzas</h2>
              </div>
              {channel && (
                <a
                  href={channel}
                  className="button button-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ver en YouTube
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}
            </div>
            {messages.length > 0 ? (
              <MessagesLibrary messages={messages} locale="es" />
            ) : (
              <div className="messages-welcome">
                <Image
                  src={publicAsset('/images/frcc-teaching-authentic-v3.webp')}
                  alt="El pastor Eli enseñando junto al púlpito de FRCC"
                  width={781}
                  height={530}
                  sizes="(max-width: 700px) 100vw, 50vw"
                />
                <div>
                  <Video size={28} aria-hidden="true" />
                  <h3>Crecemos juntos en la Palabra.</h3>
                  <p>
                    Sigue a FRCC en Facebook para ver publicaciones y novedades
                    de nuestra familia de fe. ¿Buscas un mensaje en particular?
                    Comunícate con nosotros y te ayudaremos a encontrarlo.
                  </p>
                  {facebook && (
                    <a
                      href={facebook}
                      className="button button-dark"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visita FRCC en Facebook
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  )}
                  <div className="messages-service-times">
                    {church.serviceTimes.map((service) => (
                      <p key={service.day}>
                        <strong>
                          {spanishDays[service.day] ?? service.day}
                        </strong>
                        <span>{service.time}</span>
                      </p>
                    ))}
                  </div>
                  <Link href="/es/contact#service-times" className="text-link">
                    Acompáñanos en FRCC
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                  {channel && (
                    <a
                      href={channel}
                      className="text-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visita nuestro canal de YouTube
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
        <ConnectBand locale="es" />
      </main>
    </PageShell>
  );
}
