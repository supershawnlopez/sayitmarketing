import { ArrowUpRight, Phone } from 'lucide-react';
import { church } from '@/lib/church-content';
import { Eyebrow, PageIntro, PageShell } from '@/components/site-shell';

export default function SpanishPage() {
  const days: Record<string, string> = {
    Sunday: 'Domingo',
    Monday: 'Lunes',
    Tuesday: 'Martes',
    Wednesday: 'Miércoles',
    Thursday: 'Jueves',
    Friday: 'Viernes',
    Saturday: 'Sábado',
  };
  return (
    <PageShell>
      <main id="main" lang="es">
        <PageIntro
          eyebrow="Bienvenidos a FRCC"
          title="Fe. Familia. Restauración."
          body="Una comunidad de fe en Tucson. Nos daría mucho gusto conocerle."
        />
        <section className="section-space">
          <div className="container welcome-layout">
            <div>
              <Eyebrow>Visítenos</Eyebrow>
              <h2>
                Hay un lugar
                <br />
                para usted.
              </h2>
              <p className="body-copy">
                Le esperamos para compartir un tiempo de fe y comunidad. Llame a
                la iglesia si tiene preguntas sobre su visita.
              </p>
              <a
                className="button button-dark"
                href={'tel:' + church.phone.replace(/\D/g, '')}
              >
                Llamar a FRCC
                <Phone size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="spanish-details">
              <h3>Family Restoration Community Church</h3>
              <p>{church.address}</p>
              <p>{church.phone}</p>
              <h3>Horarios de servicios</h3>
              {church.serviceTimes.map((service) => (
                <p key={service.gathering + service.day}>
                  {days[service.day] ?? service.day}: {service.time}
                </p>
              ))}
              <a className="text-link" href={church.mapUrl}>
                Cómo llegar
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <h3>Ofrendas</h3>
              <p>
                El enlace actual para dar en línea no funciona. Para obtener
                información sobre cómo dar, llame a FRCC.
              </p>
              <a className="text-link" href={church.givingUrl}>
                Abrir ChurchTrac
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}
