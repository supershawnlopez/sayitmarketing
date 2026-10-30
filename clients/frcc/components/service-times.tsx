import { Clock3 } from 'lucide-react';
import { Eyebrow } from '@/components/site-shell';
import { serviceTimes } from '@/lib/service-times';
import { localizedLabel, type Locale } from '@/lib/locale';

export function ServiceTimes({ locale = 'en' }: { locale?: Locale } = {}) {
  return (
    <section
      id="service-times"
      className="service-times-section section-space"
      aria-labelledby="service-times-title"
    >
      <div className="container welcome-layout">
        <div>
          <Eyebrow>
            {locale === 'es' ? 'Reunámonos en FRCC' : 'Gather at FRCC'}
          </Eyebrow>
          <h2 id="service-times-title">
            {locale === 'es' ? 'Horarios de servicios' : 'Service times'}
          </h2>
          <p className="body-copy">
            {locale === 'es'
              ? 'Adora, crece y convive con nuestra familia de la iglesia en Tucson.'
              : 'Worship, grow, and connect with our church family in Tucson.'}
          </p>
        </div>
        {serviceTimes.length > 0 ? (
          <ul className="service-schedule">
            {serviceTimes.map((service) => (
              <li key={service.gathering + service.day + service.time}>
                <h3>{localizedLabel(service.gathering, locale)}</h3>
                <p>
                  {localizedLabel(service.day, locale)}{' '}
                  <span>{service.time}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <div className="schedule-pending">
            <Clock3 size={26} aria-hidden="true" />
            <div>
              <h3>
                {locale === 'es'
                  ? 'Horario por confirmar'
                  : 'Schedule to be confirmed'}
              </h3>
              <p>
                {locale === 'es'
                  ? 'Los días y horarios de los servicios se publicarán aquí una vez que la iglesia los confirme.'
                  : 'Current service days and times will be listed here once confirmed by the church.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
