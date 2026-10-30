import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { church, navItems } from '@/lib/church-content';
import { SiteNavigation } from '@/components/site-navigation';
import { heroImages, type HeroImage } from '@/lib/hero-images';

export function Wordmark() {
  return (
    <span className="wordmark">
      <strong>
        FRCC<span className="brand-dot">.</span>
      </strong>
      <span>
        TUCSON
        <br />
        ARIZONA
      </span>
    </span>
  );
}
export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="container header-inner">
        <Link className="brand-link" href="/" aria-label="FRCC Tucson home">
          <Wordmark />
        </Link>
        <SiteNavigation />
      </div>
    </header>
  );
}
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <Link href="/" aria-label="FRCC Tucson home">
            <Wordmark />
          </Link>
          <p className="footer-name">
            Family Restoration
            <br />
            Community Church
          </p>
          <p className="footer-muted">Faith. Family. Restoration.</p>
        </div>
        <div>
          <p className="eyebrow">Come say hello</p>
          <a className="footer-address" href={church.mapUrl}>
            {church.address}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a href={'tel:' + church.phone.replace(/\D/g, '')}>{church.phone}</a>
        </div>
        <nav aria-label="Footer navigation">
          <p className="eyebrow">Find your way</p>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
          <Link href="/es" lang="es">
            Español
          </Link>
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} FRCC Tucson</span>
        <a href="https://sayitmarketing.com" target="_blank" rel="noopener noreferrer">Website by Say It Marketing — sayitmarketing.com</a>
      </div>
    </footer>
  );
}
export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  );
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function SectionHeading({
  eyebrow,
  title,
  body,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="section-heading">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2>{title}</h2>
      {body && <p className="body-copy">{body}</p>}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  body,
  image = heroImages.welcome,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image?: HeroImage;
}) {
  return (
    <section className="page-intro">
      <Image
        className="page-intro-photo"
        src={image.src}
        alt={image.alt}
        style={{ objectPosition: image.position }}
        fetchPriority="high"
        fill
        sizes="100vw"
      />
      <div className="page-intro-shade" />
      <div className="container page-intro-content">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </section>
  );
}
export function VisitBand() {
  return (
    <section className="visit-band" aria-label="Visit information">
      <div className="container visit-inner">
        <div className="visit-intro">
          <Eyebrow>You’re invited</Eyebrow>
          <h2>Join us this week.</h2>
        </div>
        <div className="visit-schedule" aria-label="Service times">
          {church.serviceTimes.map((service) => (
            <Link className="visit-gathering" href="/contact#service-times" key={service.day + service.time}>
              <span className="visit-day">{service.day}</span>
              <strong className="visit-time">{service.time}</strong>
              <ArrowUpRight size={22} aria-hidden="true" />
            </Link>
          ))}
        </div>
        <a className="visit-address" href={church.mapUrl}>
          <MapPin size={24} aria-hidden="true" />
          <span><strong>Find us in Tucson</strong><span>2425 N Huachuca Dr</span><span>Tucson, AZ 85745</span></span>
          <ArrowUpRight size={20} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
export function ConnectBand() {
  return (
    <section className="connect-band">
      <div className="container connect-inner">
        <div>
          <Eyebrow>There is a place for you</Eyebrow>
          <h2>
            Let’s take the next step.
            <br />
            Together.
          </h2>
        </div>
        <Link href="/contact" className="button button-dark">
          Get in touch
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
