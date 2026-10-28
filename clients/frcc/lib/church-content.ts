import { serviceTimes } from '@/lib/service-times';
import { publicAsset } from '@/lib/public-asset';

export const church = {
  name: 'Family Restoration Community Church',
  shortName: 'FRCC Tucson',
  tagline: 'Discover hope, faith, and community in Tucson.',
  address: '2425 N Huachuca Dr, Tucson, AZ 85745',
  phone: '(520) 838-0228',
  email: 'contact-email-to-confirm@frcctucson.org',
  givingUrl: 'https://3493d96f.churchtrac.com/give',
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=2425%20N%20Huachuca%20Dr%2C%20Tucson%2C%20AZ%2085745',
  serviceTimes,
  heroImage: publicAsset('/images/stock-worship-hands.jpg'),
};

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/events', label: 'Events' },
  { href: '/messages', label: 'Messages' },
  { href: '/give', label: 'Give' },
  { href: '/contact', label: 'Contact' },
];

export const ministries = [
  {
    slug: 'worship-services',
    title: 'Worship Services',
    body: 'Gather for worship, Scripture, prayer, and encouragement with the FRCC family.',
    detail:
      'Worship brings the church family together to turn toward God, reflect on Scripture, and encourage one another in faith.',
    visitorNote:
      'Planning your first visit? Contact the church for current gathering details and any questions about attending.',
  },
  {
    slug: 'youth-ministry',
    title: 'Youth Ministry',
    body: 'Helping students grow in faith, friendship, and purpose through church community.',
    detail:
      'Youth ministry offers a way for students to explore faith and build connections within the church community.',
    visitorNote:
      'Students and families can contact the church to ask about current opportunities and how to get involved.',
  },
  {
    slug: 'childrens-ministry',
    title: "Children's Ministry",
    body: 'A welcoming place for children to learn about God in age-appropriate ways.',
    detail:
      'Children’s ministry supports families as children begin discovering Scripture and learning about the love of God.',
    visitorNote:
      'Parents and caregivers can contact the church to ask about current arrangements for children and what to expect before visiting.',
  },
  {
    slug: 'prayer-meetings',
    title: 'Prayer Meetings',
    body: 'A space to pray together, seek guidance, and support one another.',
    detail:
      'Praying together is a way to bring concerns and gratitude before God while caring for one another in faith.',
    visitorNote:
      'Contact the church to ask about joining in prayer or sharing a prayer request.',
  },
  {
    slug: 'community-outreach',
    title: 'Community Outreach',
    body: 'Serving Tucson with compassion, practical care, and the love of Christ.',
    detail:
      'Community outreach expresses faith through care for neighbors and a desire to serve Tucson with compassion.',
    visitorNote:
      'Interested in serving alongside the church? Contact us to learn about current needs and ways to help.',
  },
  {
    slug: 'bible-classes',
    title: 'Bible Classes',
    body: 'Opportunities to study Scripture and grow deeper in faith together.',
    detail:
      'Studying the Bible together offers space to reflect on Scripture, consider questions, and connect faith with everyday life.',
    visitorNote:
      'Contact the church to learn about current study opportunities and ask how to take part.',
  },
];

export const bilingualBasics = {
  welcome: 'Bienvenidos a Family Restoration Community Church.',
  visit:
    'Estamos preparando recursos en espanol para servir mejor a nuestra comunidad.',
  contact:
    'Para informacion actual, llame a la iglesia o visite nuestra pagina de contacto.',
};
