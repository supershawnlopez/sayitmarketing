import { ArrowUpRight, Phone } from 'lucide-react';
import { church } from '@/lib/church-content';
import { heroImages } from '@/lib/hero-images';
import { localizedMetadata } from '@/lib/localized-metadata';
import {
  ConnectBand,
  Eyebrow,
  PageIntro,
  PageShell,
} from '@/components/site-shell';

export const metadata = localizedMetadata('/give', 'en', 'Give | FRCC Tucson', 'Support the ministry of Family Restoration Community Church and families in Tucson.');

export default function GivePage() {
  return (
    <PageShell>
      <main id="main">
        <PageIntro
          eyebrow="Generosity at FRCC"
          image={heroImages.prayer}
          title="Give with a grateful heart."
          body="Thank you for supporting the ministry of Family Restoration Community Church and helping us serve families in Tucson."
        />
        <section className="section-space">
          <div className="container giving-layout">
            <div>
              <Eyebrow>Supporting the ministry</Eyebrow>
              <h2>
                Faith in action.
                <br />
                Love in our city.
              </h2>
              <p className="body-copy">
                We’re grateful for every person who gives, serves, and prays
                alongside our church family.
              </p>
            </div>
            <div className="giving-panel">
              <Eyebrow>Ways to give</Eyebrow>
              <h3>Online giving</h3>
              <p>Continue to FRCC’s ChurchTrac giving page.</p>
              <p className="giving-notice">
                Our current online giving link is not working. Please call FRCC
                for giving information.
              </p>
              <a
                className="button button-dark"
                href={church.givingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open ChurchTrac
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a
                className="text-link"
                href={'tel:' + church.phone.replace(/\D/g, '')}
              >
                <Phone size={17} aria-hidden="true" />
                {church.phone}
              </a>
            </div>
          </div>
        </section>
        <ConnectBand />
      </main>
    </PageShell>
  );
}
