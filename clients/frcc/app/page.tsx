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

export default function Home() {
  return (
    <PageShell>
      <main id="main">
        <section className="home-hero" aria-labelledby="home-title">
          <Image
            className="hero-photo"
            src={church.heroImage}
            alt="Hands lifted in worship against a softly blurred background"
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
                  A place to belong.
                  <br />A community to grow with.
                </p>
                <Link className="button button-brand" href="/contact">
                  Plan your visit
                  <ArrowUpRight size={19} aria-hidden="true" />
                </Link>
              </div>
              <a
                href="#welcome"
                className="hero-scroll"
                aria-label="Discover FRCC"
              >
                <ArrowDown size={23} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
        <VisitBand />
        <section id="welcome" className="welcome-section section-space">
          <div className="container welcome-layout">
            <div>
              <Eyebrow>Faith. Family. Restoration.</Eyebrow>
              <h2>
                You don’t have to
                <br />
                do life alone.
              </h2>
            </div>
            <div className="welcome-copy">
              <p className="lead-copy">
                There’s something special about finding a church family.
              </p>
              <p className="body-copy">
                At Family Restoration Community Church, we gather to worship,
                grow in faith, and care for one another. Wherever you are in
                your journey, you’re welcome to take your next step with us.
              </p>
              <Link href="/about" className="text-link">
                Get to know FRCC
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <section className="community-section">
          <div className="container">
            <div className="section-topline">
              <div>
                <Eyebrow>Life together</Eyebrow>
                <h2>
                  Find your people.
                  <br />
                  Grow in your faith.
                </h2>
              </div>
              <Link className="text-link" href="/about#ministries">
                Explore our ministries
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            </div>
            <div className="story-grid">
              <Link href="/ministries/worship-services" className="photo-story">
                <div className="story-image">
                  <Image
                    src={publicAsset('/images/frcc-teaching-authentic-v3.webp')}
                    alt="Pastor Eli teaching beside the original pulpit and projection screen"
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
                  <span className="eyebrow">Worship &amp; the Word</span>
                  <h3>A faith that grows.</h3>
                  <p>
                    Worship, Scripture, and encouragement for everyday life.
                  </p>
                </div>
              </Link>
              <Link
                href="/about"
                className="photo-story"
              >
                <div className="story-image">
                  <Image
                    src={publicAsset('/images/frcc-community-authentic-v3.webp')}
                    alt="Members of the FRCC church family praying together"
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
                  <span className="eyebrow">Family &amp; community</span>
                  <h3>Better, together.</h3>
                  <p>
                    Build friendships and find ways to serve our Tucson
                    community.
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>
        <nav
          className="container updates-links"
          aria-label="Stay connected with FRCC"
        >
          <Link href="/events">
            <div>
              <Eyebrow>Life together</Eyebrow>
              <h2>Events</h2>
              <p>See what is happening and find a gathering.</p>
            </div>
            <ArrowUpRight size={26} aria-hidden="true" />
          </Link>
          <Link href="/messages">
            <div>
              <Eyebrow>Sermons &amp; teaching</Eyebrow>
              <h2>Messages</h2>
              <p>A place for teaching from the FRCC church family.</p>
            </div>
            <ArrowUpRight size={26} aria-hidden="true" />
          </Link>
        </nav>
        <section className="prayer-band">
          <div className="container prayer-layout">
            <Eyebrow>We are here for you</Eyebrow>
            <div>
              <h2>
                Sometimes the next
                <br />
                step is a conversation.
              </h2>
              <p>
                Have a question, need prayer, or want to know more about
                visiting? We’d love to hear from you.
              </p>
              <Link href="/contact" className="button button-light">
                Connect with us
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        <ConnectBand />
      </main>
    </PageShell>
  );
}
