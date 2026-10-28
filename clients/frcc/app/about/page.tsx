import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ministries } from '@/lib/church-content';
import { publicAsset } from '@/lib/public-asset';
import {
  ConnectBand,
  Eyebrow,
  PageIntro,
  PageShell,
  VisitBand,
} from '@/components/site-shell';

export default function AboutPage() {
  return (
    <PageShell>
      <main id="main">
        <PageIntro
          eyebrow="Get to know FRCC"
          title="Faith. Family. Restoration."
          body="A Tucson church community growing in faith, caring for one another, and sharing the love of Christ."
        />
        <VisitBand />
        <section className="section-space">
          <div className="container welcome-layout">
            <div>
              <Eyebrow>Our heart</Eyebrow>
              <h2>
                A church family.
                <br />A shared journey.
              </h2>
            </div>
            <div className="welcome-copy">
              <p className="lead-copy">Restoration begins with hope.</p>
              <p className="body-copy">
                Family Restoration Community Church is centered on worship, the
                teachings of Christ, prayer, and community. We want people and
                families to find encouragement, grow in Scripture, and serve
                with compassion.
              </p>
              <p className="body-copy">
                Whether you’re exploring faith or looking for a church home,
                we’d love to get to know you.
              </p>
              <Link href="/contact" className="text-link">
                Start a conversation
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <section className="leadership-section section-space" aria-labelledby="pastors-title">
          <div className="container leadership-layout">
            <Image src={publicAsset('/images/frcc-pastors-authentic-v3.webp')} alt="FRCC pastors Eli and Olivia" width={480} height={270} sizes="(max-width: 700px) 100vw, 480px" loading="lazy" />
            <div>
              <Eyebrow>Meet our pastors</Eyebrow>
              <h2 id="pastors-title">Eli &amp; Olivia</h2>
              <p className="lead-copy">A warm welcome to the FRCC church family.</p>
              <p className="body-copy">Come worship with us, meet our pastors, and get to know the people who call FRCC home.</p>
              <Link href="/contact#service-times" className="text-link">
                Plan your visit <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <section id="ministries" className="ministry-section section-space">
          <div className="container">
            <Eyebrow>Life at FRCC</Eyebrow>
            <h2>
              Room to connect.
              <br />
              Ways to grow.
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
                    href={'/ministries/' + ministry.slug}
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
        <ConnectBand />
      </main>
    </PageShell>
  );
}
