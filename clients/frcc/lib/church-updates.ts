export type ChurchEvent = {
  title: string;
  slug: string;
  startAt: string;
  endAt?: string;
  location?: string;
  description?: string;
  url?: string;
  ministry?: string;
};

export type ChurchMessage = {
  title: string;
  id: string;
  date?: string;
  speaker?: string;
  videoUrl?: string;
  audioUrl?: string;
  series?: string;
};

// Add only church-confirmed events. Use ISO timestamps with a timezone offset.
export const events: ChurchEvent[] = [];

// Add only confirmed messages and their real recording links.
export const messages: ChurchMessage[] = [];
export const channelUrl: string | null = null;
// Owner-provided Facebook destination; no specific livestream/archive confirmed.
export const facebookUrl = 'https://www.facebook.com/share/1WAMDtBk75/?mibextid=wwXIfr';
