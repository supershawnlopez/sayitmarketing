import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react';
import { church, navItems } from '@/lib/church-content';
import { LanguageSwitch, SiteNavigation } from '@/components/site-navigation';
import { heroImages, type HeroImage } from '@/lib/hero-images';
import { localizedHref, localizedLabel, type Locale } from '@/lib/locale';

type LocaleProps = { locale?: Locale };

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
export function SiteHeader({ locale = 'en' }: LocaleProps = {}) {
  return (
    <header className="site-header" lang={locale}>
      <a className="skip-link" href="#main">
        {locale === 'es' ? 'Saltar al contenido' : 'Skip to content'}
      </a>
      <div className="container header-inner">
        <Link
          className="brand-link"
          href={localizedHref('/', locale)}
          aria-label={
            locale === 'es' ? 'Inicio de FRCC Tucson' : 'FRCC Tucson home'
          }
        >
          <Wordmark />
        </Link>
        <SiteNavigation />
      </div>
    </header>
  );
}
export function SiteFooter({ locale = 'en' }: LocaleProps = {}) {
  return (
    <footer className="site-footer" lang={locale}>
      <div className="container footer-top">
        <div>
          <Link
            href={localizedHref('/', locale)}
            aria-label={
              locale === 'es' ? 'Inicio de FRCC Tucson' : 'FRCC Tucson home'
            }
          >
            <Wordmark />
          </Link>
          <p className="footer-name">
            Family Restoration
            <br />
            Community Church
          </p>
          <p className="footer-muted">
            {locale === 'es'
              ? 'Fe. Familia. Restauración.'
              : 'Faith. Family. Restoration.'}
          </p>
        </div>
        <div>
          <p className="eyebrow">
            {locale === 'es' ? 'Ven a saludarnos' : 'Come say hello'}
          </p>
          <a className="footer-address" href={church.mapUrl}>
            {church.address}
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a href={'tel:' + church.phone.replace(/\D/g, '')}>{church.phone}</a>
        </div>
        <nav
          aria-label={
            locale === 'es'
              ? 'Navegación del pie de página'
              : 'Footer navigation'
          }
        >
          <p className="eyebrow">
            {locale === 'es' ? 'Encuentra tu camino' : 'Find your way'}
          </p>
          {navItems.map((item) => (
            <Link key={item.href} href={localizedHref(item.href, locale)}>
              {localizedLabel(item.label, locale)}
            </Link>
          ))}
          <LanguageSwitch />
        </nav>
      </div>
      <div className="container footer-bottom">
        <span>&copy; {new Date().getFullYear()} FRCC Tucson</span>
        <a
          href="https://sayitmarketing.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {locale === 'es'
            ? 'Sitio web por Say It Marketing'
            : 'Website by Say It Marketing'}{' '}
          — sayitmarketing.com
        </a>
      </div>
    </footer>
  );
}
export function PageShell({
  children,
  locale = 'en',
}: { children: React.ReactNode } & LocaleProps) {
  return (
    <>
      <SiteHeader locale={locale} />
      {children}
      <SiteFooter locale={locale} />
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
  locale = 'en',
}: {
  eyebrow: string;
  title: string;
  body: string;
  image?: HeroImage;
  locale?: Locale;
}) {
  return (
    <section className="page-intro">
      <img
        className="page-intro-photo"
        src={image.src}
        alt={localizedLabel(image.alt, locale)}
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
export function VisitBand({ locale = 'en' }: LocaleProps = {}) {
  return (
    <section
      className="visit-details-band"
      aria-label={
        locale === 'es' ? 'Información para tu visita' : 'Visit information'
      }
    >
      <div className="visit-details-inner">
        <div className="visit-details-services">
          <h2 className="visit-details-heading">
            {locale === 'es' ? 'Acompáñanos esta semana' : 'Join us this week'}
          </h2>
          <ul className="visit-details-schedule">
            {church.serviceTimes.map((service) => (
              <li
                className="visit-details-service"
                key={service.day + service.time}
              >
                <span className="visit-details-day">
                  {localizedLabel(service.day, locale)}
                </span>
                <strong className="visit-details-time">{service.time}</strong>
              </li>
            ))}
          </ul>
          <Link
            className="visit-details-link"
            href={localizedHref('/contact#service-times', locale)}
          >
            {locale === 'es' ? 'Detalles de los servicios' : 'Service details'}
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <a className="visit-details-location" href={church.mapUrl}>
          <MapPin size={22} aria-hidden="true" />
          <span className="visit-details-location-copy">
            <span className="visit-details-address">{church.address}</span>
            <span className="visit-details-map-label">
              {locale === 'es' ? 'Cómo llegar' : 'Get directions'}
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </span>
        </a>
      </div>
    </section>
  );
}
export function ConnectBand({ locale = 'en' }: LocaleProps = {}) {
  return (
    <section className="connect-band">
      <div className="container connect-inner">
        <div>
          <Eyebrow>
            {locale === 'es'
              ? 'Hay un lugar para ti'
              : 'There is a place for you'}
          </Eyebrow>
          <h2>
            {locale === 'es'
              ? 'Demos el siguiente paso.'
              : 'Let’s take the next step.'}
            <br />
            {locale === 'es' ? 'Juntos.' : 'Together.'}
          </h2>
        </div>
        <Link
          href={localizedHref('/contact', locale)}
          className="button button-dark"
        >
          {locale === 'es' ? 'Contáctanos' : 'Get in touch'}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
