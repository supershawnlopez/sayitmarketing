import { localizedMetadata } from '@/lib/localized-metadata';
import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { spanishMinistries as ministries } from '@/lib/spanish-content';
import { ServiceTimes } from '@/components/service-times';
import { publicAsset } from '@/lib/public-asset';
import { spanishMinistryHero as ministryHero } from '@/lib/spanish-content';
import {
  ConnectBand,
  Eyebrow,
  PageIntro,
  PageShell,
} from '@/components/site-shell';

type MinistryPageProps = {
  params: Promise<{ slug: string }>;
};

function getMinistry(slug: string) {
  const ministry = ministries.find((entry) => entry.slug === slug);
  if (!ministry) notFound();
  return ministry;
}

export function generateStaticParams() {
  return ministries.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: MinistryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const ministry = getMinistry(slug);

  return localizedMetadata(
    `/ministries/${slug}`,
    'es',
    `${ministry.title} | FRCC Tucson`,
    ministry.body,
  );
}

export default async function MinistryPage({ params }: MinistryPageProps) {
  const { slug } = await params;
  const ministry = getMinistry(slug);

  return (
    <PageShell locale="es">
      <main id="main" lang="es">
        <PageIntro
          locale="es"
          eyebrow="La vida en FRCC"
          image={ministryHero(ministry.slug)}
          title={ministry.title}
          body={ministry.body}
        />
        <section className="ministry-detail section-space">
          <div className="container welcome-layout">
            <div>
              <Eyebrow>Fe y comunidad</Eyebrow>
              <h2>Un lugar para convivir.</h2>
              <Link href="/es/about#ministries" className="text-link">
                <ArrowLeft size={18} aria-hidden="true" />
                Volver a todos los ministerios
              </Link>
            </div>
            <div className="welcome-copy">
              <p className="body-copy">{ministry.detail}</p>
              <p className="body-copy">{ministry.visitorNote}</p>
              <Link href="/es/contact" className="text-link">
                Pregunta por este ministerio: {ministry.title}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        {ministry.slug === 'worship-services' && <ServiceTimes locale="es" />}
        {ministry.slug === 'worship-services' && (
          <section
            className="container worship-gallery"
            aria-label="Adoración en FRCC"
          >
            {['frcc-events-authentic-v3', 'frcc-contact-authentic-v3'].map(
              (photo) => (
                <Image
                  key={photo}
                  src={publicAsset(`/images/${photo}.webp`)}
                  alt="La familia de la iglesia reunida en oración y adoración en FRCC"
                  width={1080}
                  height={495}
                  sizes="(max-width: 700px) 100vw, 50vw"
                  loading="lazy"
                />
              ),
            )}
          </section>
        )}
        <section className="section-space" aria-labelledby="other-ministries">
          <div className="container welcome-layout">
            <div>
              <Eyebrow>Sigue explorando</Eyebrow>
              <h2 id="other-ministries">Más maneras de crecer.</h2>
            </div>
            <nav className="welcome-copy" aria-label="Otros ministerios">
              {ministries
                .filter((entry) => entry.slug !== ministry.slug)
                .map((entry) => (
                  <p key={entry.slug} className="body-copy">
                    <Link
                      href={`/es/ministries/${entry.slug}`}
                      className="text-link"
                    >
                      {entry.title}
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </p>
                ))}
            </nav>
          </div>
        </section>
        <ConnectBand locale="es" />
      </main>
    </PageShell>
  );
}
