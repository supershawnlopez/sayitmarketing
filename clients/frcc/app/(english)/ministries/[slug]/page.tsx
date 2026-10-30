import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { ministries } from '@/lib/church-content';
import { ServiceTimes } from '@/components/service-times';
import { publicAsset } from '@/lib/public-asset';
import { ministryHero } from '@/lib/hero-images';
import { localizedMetadata } from '@/lib/localized-metadata';
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

  return localizedMetadata(`/ministries/${slug}`, 'en', `${ministry.title} | FRCC Tucson`, ministry.body);
}

export default async function MinistryPage({ params }: MinistryPageProps) {
  const { slug } = await params;
  const ministry = getMinistry(slug);

  return (
    <PageShell>
      <main id="main">
        <PageIntro
          eyebrow="Life at FRCC"
          image={ministryHero(ministry.slug)}
          title={ministry.title}
          body={ministry.body}
        />
        <section className="ministry-detail section-space">
          <div className="container welcome-layout">
            <div>
              <Eyebrow>Faith and community</Eyebrow>
              <h2>A place to connect.</h2>
              <Link href="/about#ministries" className="text-link">
                <ArrowLeft size={18} aria-hidden="true" />
                Back to all ministries
              </Link>
            </div>
            <div className="welcome-copy">
              <p className="body-copy">{ministry.detail}</p>
              <p className="body-copy">{ministry.visitorNote}</p>
              <Link href="/contact" className="text-link">
                Contact us about {ministry.title}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        {ministry.slug === 'worship-services' && <ServiceTimes />}
        {ministry.slug === 'worship-services' && (
          <section className="container worship-gallery" aria-label="Worship at FRCC">
            {['frcc-events-authentic-v3', 'frcc-contact-authentic-v3'].map((photo) => (
              <Image key={photo} src={publicAsset(`/images/${photo}.webp`)} alt="The church family gathered in prayer and worship at FRCC" width={1080} height={495} sizes="(max-width: 700px) 100vw, 50vw" loading="lazy" />
            ))}
          </section>
        )}
        <section className="section-space" aria-labelledby="other-ministries">
          <div className="container welcome-layout">
            <div>
              <Eyebrow>Keep exploring</Eyebrow>
              <h2 id="other-ministries">Other ways to grow.</h2>
            </div>
            <nav className="welcome-copy" aria-label="Other ministries">
              {ministries
                .filter((entry) => entry.slug !== ministry.slug)
                .map((entry) => (
                  <p key={entry.slug} className="body-copy">
                    <Link
                      href={`/ministries/${entry.slug}`}
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
        <ConnectBand />
      </main>
    </PageShell>
  );
}
