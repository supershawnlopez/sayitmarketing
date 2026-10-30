import Link from 'next/link';
import { ArrowUpRight, Clock3, MapPin, Phone } from 'lucide-react';
import { church } from '@/lib/church-content';
import { Eyebrow, PageIntro, PageShell } from '@/components/site-shell';
import { ServiceTimes } from '@/components/service-times';
import { heroImages } from '@/lib/hero-images';
import { localizedMetadata } from '@/lib/localized-metadata';

export const metadata = localizedMetadata('/contact', 'en', 'Visit & Contact | FRCC Tucson', 'Plan your visit to FRCC Tucson. Find our address, phone number, and service times.');

export default function ContactPage() {
  return (
    <PageShell>
      <main id="main">
        <PageIntro
          eyebrow="Visit & connect"
          image={heroImages.community}
          title="We’d love to meet you."
          body="Planning a visit, looking for a church home, or just have a question? Let’s connect."
        />
        <section className="section-space">
          <div className="container contact-layout">
            <div>
              <Eyebrow>Come as you are</Eyebrow>
              <h2>
                Your next step
                <br />
                starts here.
              </h2>
              <p className="body-copy">
                You don’t need to have everything figured out before walking
                through the doors. Call us with your questions about services,
                children’s ministry, or getting involved.
              </p>
              <a
                className="button button-dark"
                href={'tel:' + church.phone.replace(/\D/g, '')}
              >
                Call the church
                <Phone size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="contact-details">
              <a href={church.mapUrl}>
                <MapPin size={22} aria-hidden="true" />
                <div>
                  <h3>Find us in Tucson</h3>
                  <p>{church.address}</p>
                  <span className="text-link">
                    Get directions
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </div>
              </a>
              <a href={'tel:' + church.phone.replace(/\D/g, '')}>
                <Phone size={22} aria-hidden="true" />
                <div>
                  <h3>Give us a call</h3>
                  <p>{church.phone}</p>
                </div>
              </a>
              <div className="contact-row">
                <Clock3 size={22} aria-hidden="true" />
                <div>
                  <h3>Gather with us</h3>
                  <Link className="text-link" href="#service-times">
                    View service times
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ServiceTimes />
        <section className="contact-prayer">
          <div className="container welcome-layout">
            <div>
              <Eyebrow>Prayer & encouragement</Eyebrow>
              <h2>
                You don’t have to
                <br />
                carry it alone.
              </h2>
            </div>
            <div>
              <p className="lead-copy">We’d be glad to pray with you.</p>
              <p className="body-copy">
                For prayer or a conversation with the church, please give us a
                call.
              </p>
              <a
                className="text-link"
                href={'tel:' + church.phone.replace(/\D/g, '')}
              >
                Call FRCC
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
