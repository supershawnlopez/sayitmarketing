import Link from 'next/link';
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
      <img
        className="page-intro-photo"
        src={image.src}
        alt={image.alt}
        style={{ objectPosition: image.position }}
        fetchPriority="high"
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
    <section className="visit-details-band" aria-label="Visit information">
      <div className="visit-details-inner">
        <div className="visit-details-services">
          <h2 className="visit-details-heading">Join us this week</h2>
          <ul className="visit-details-schedule">
            {church.serviceTimes.map((service) => (
              <li className="visit-details-service" key={service.day + service.time}>
                <span className="visit-details-day">{service.day}</span>
                <strong className="visit-details-time">{service.time}</strong>
              </li>
            ))}
          </ul>
          <Link className="visit-details-link" href="/contact#service-times">
            Service details
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <a className="visit-details-location" href={church.mapUrl}>
          <MapPin size={22} aria-hidden="true" />
          <span className="visit-details-location-copy">
            <span className="visit-details-address">{church.address}</span>
            <span className="visit-details-map-label">
              Get directions
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </span>
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
