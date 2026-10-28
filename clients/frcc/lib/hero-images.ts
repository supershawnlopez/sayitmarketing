import { publicAsset } from '@/lib/public-asset';

export const heroImages = {
  bible: {
    src: publicAsset('/images/bible-reading.jpg'),
    alt: 'An open Bible being read',
    position: 'center 55%',
  },
  welcome: {
    src: publicAsset('/images/stock-worship-hands.jpg'),
    alt: 'Hands lifted in worship against a softly blurred background',
    position: 'center 58%',
  },
  community: {
    src: publicAsset('/images/frcc-original-bible.jpg'),
    alt: 'A silhouette with open arms in warm evening light',
    position: 'center 55%',
  },
  prayer: {
    src: publicAsset('/images/stock-worship-detail.jpg'),
    alt: 'A raised hand silhouetted against softly blurred warm lights',
    position: 'center 50%',
  },
  events: {
    src: publicAsset('/images/stock-worship-hands.jpg'),
    alt: 'Open hands lifted in worship',
    position: 'center 65%',
  },
  teaching: {
    src: publicAsset('/images/bible-reading.jpg'),
    alt: 'Hands resting beside an open Bible',
    position: 'center 55%',
  },
};

export type HeroImage = { src: string; alt: string; position?: string };

export function ministryHero(slug: string): HeroImage {
  if (slug === 'prayer-meetings') return heroImages.prayer;
  if (slug === 'worship-services') return heroImages.welcome;
  if (slug === 'bible-classes') return heroImages.bible;
  // These service photos do not document a particular youth or outreach program.
  return heroImages.bible;
}
