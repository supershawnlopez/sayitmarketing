export type ServiceTime = {
  gathering: string;
  day: string;
  time: string;
};

// Owner-supplied working schedule; church confirmation is still pending.
export const serviceTimes: ServiceTime[] = [
  { gathering: 'Sunday gathering', day: 'Sunday', time: '10 a.m.' },
  { gathering: 'Midweek gathering', day: 'Wednesday', time: '7 p.m.' },
];
