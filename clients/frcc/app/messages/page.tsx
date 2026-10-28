import Image from 'next/image';
import type { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Messages | FRCC Tucson',
  description:
    'Sermons and teaching from Family Restoration Community Church in Tucson.',
};

export default function MessagesPage() {
  const channel = safeMediaUrl(channelUrl);
  const facebook = safeMediaUrl(facebookUrl);
  return (
    <PageShell>
      <main id="main">
        <PageIntro
          eyebrow="Grow in faith"
          title="Messages"
          body="Scripture, encouragement, and a faith that grows through everyday life."
          image={heroImages.teaching}
        />
        <section className="section-space" aria-labelledby="messages-title">
          <div className="container">
            <div className="updates-header messages-heading">
              <div>
                <Eyebrow>From the Word</Eyebrow>
                <h2 id="messages-title">Sermons &amp; teaching</h2>
              </div>
              {channel && (
                <a
                  href={channel}
                  className="button button-dark"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch on YouTube
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              )}
            </div>
            {messages.length > 0 ? (
              <MessagesLibrary messages={messages} />
            ) : (
              <div className="messages-welcome">
                <Image
                  src={publicAsset('/images/frcc-teaching-authentic-v3.webp')}
                  alt="Pastor Eli teaching beside the pulpit at FRCC"
                  width={781}
                  height={530}
                  sizes="(max-width: 700px) 100vw, 50vw"
                />
                <div>
                  <Video size={28} aria-hidden="true" />
                  <h3>Growing together in the Word.</h3>
                  <p>
                    Connect with FRCC on Facebook for posts and updates from
                    our church family. Looking for a particular message?
                    Contact us and we’ll help you find it.
                  </p>
                  {facebook && (
                    <a href={facebook} className="button button-dark" target="_blank" rel="noopener noreferrer">
                      Visit FRCC on Facebook
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  )}
                  <div className="messages-service-times">
                    {church.serviceTimes.map((service) => (
                      <p key={service.day}>
                        <strong>{service.day}</strong>
                        <span>{service.time}</span>
                      </p>
                    ))}
                  </div>
                  <Link href="/contact#service-times" className="text-link">
                    Join us at FRCC
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </Link>
                  {channel && (
                    <a
                      href={channel}
                      className="text-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit our YouTube channel
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
        <ConnectBand />
      </main>
    </PageShell>
  );
}
