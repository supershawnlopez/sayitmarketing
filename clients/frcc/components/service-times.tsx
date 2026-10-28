import { Clock3 } from 'lucide-react';
import { Eyebrow } from '@/components/site-shell';
import { serviceTimes } from '@/lib/service-times';

export function ServiceTimes() {
  return (
    <section
      id="service-times"
      className="service-times-section section-space"
      aria-labelledby="service-times-title"
    >
      <div className="container welcome-layout">
        <div>
          <Eyebrow>Gather at FRCC</Eyebrow>
          <h2 id="service-times-title">Service times</h2>
          <p className="body-copy">
            Worship, grow, and connect with our church family in Tucson.
          </p>
        </div>
        {serviceTimes.length > 0 ? (
          <ul className="service-schedule">
            {serviceTimes.map((service) => (
              <li key={service.gathering + service.day + service.time}>
                <h3>{service.gathering}</h3>
                <p>
                  {service.day} <span>{service.time}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="schedule-pending">
            <Clock3 size={26} aria-hidden="true" />
            <div>
              <h3>Schedule to be confirmed</h3>
              <p>
                Current service days and times will be listed here once
                confirmed by the church.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
