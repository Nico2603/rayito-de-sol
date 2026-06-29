import { Helmet } from 'react-helmet-async'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Footer from '../components/Footer'
import { buildWhatsappBookingUrl, SITE_URL } from '../constants/social'
import { trackWhatsappClick } from '../lib/analytics'

const pageTitle = 'Psicología infantil en Pereira | Rayito de Sol'
const pageDescription =
  'Atención psicológica infantil en Pereira para niñas y niños desde los 4 años, con acompañamiento para familias y cuidadores.'

const warningSignals = [
  'Cambios de conducta frecuentes, irritabilidad o tristeza prolongada.',
  'Dificultades para expresar emociones o regular frustración.',
  'Problemas de adaptación escolar y social.',
  'Somatizaciones frecuentes: dolor de barriga, dolor de cabeza o alteraciones de sueño.',
]

const processSteps = [
  'Entrevista inicial con cuidadores para comprender el contexto familiar y escolar.',
  'Sesiones terapéuticas adaptadas por edad, con juego y recursos expresivos.',
  'Retroalimentación periódica para fortalecer estrategias en casa.',
]

const topicFaq = [
  {
    question: '¿Desde qué edad atiendes en psicología infantil?',
    answer:
      'Atiendo niñas y niños desde los 4 años, ajustando metodología y objetivos al momento evolutivo de cada paciente.',
  },
  {
    question: '¿Los padres participan en el proceso?',
    answer:
      'Sí. El acompañamiento a madres, padres o cuidadores es clave para consolidar avances y mantener coherencia entre casa, colegio y consulta.',
  },
]

export default function PsicologiaInfantilPereira() {
  const whatsappUrl = buildWhatsappBookingUrl('pagina psicologia infantil pereira')

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${SITE_URL}/psicologia-infantil-pereira`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`${SITE_URL}/psicologia-infantil-pereira`} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
      </Helmet>

      <main className="pt-28">
        <section className="bg-[var(--color-bg-primary)] py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: 'var(--color-accent-label)' }}
            >
              Atención psicológica infantil en Pereira
            </p>
            <h1
              className="font-display text-4xl font-semibold tracking-tight md:text-6xl"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Psicología infantil con acompañamiento familiar
            </h1>
            <p
              className="mt-5 text-lg leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Acompaño procesos emocionales y de conducta en infancia con un enfoque respetuoso,
              cercano y basado en evidencia, involucrando activamente a la familia.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsappClick('topic_page')}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-sun px-7 py-4 font-semibold text-[#1A1A2E] transition-all duration-300 hover:bg-sun-soft"
            >
              Agendar valoración inicial
              <ArrowRight className="h-5 w-5" strokeWidth={2} />
            </a>
          </div>
        </section>

        <section className="bg-[var(--color-bg-secondary)] py-16 md:py-20">
          <div className="mx-auto grid max-w-5xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
            <article
              className="rounded-2xl border p-6"
              style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border-light)' }}
            >
              <h2
                className="mb-4 text-xl font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                ¿Cuándo consultar?
              </h2>
              <ul className="space-y-3">
                {warningSignals.map((item) => (
                  <li key={item} className="flex items-start gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0"
                      strokeWidth={2}
                      style={{ color: 'var(--color-accent-icon)' }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
            <article
              className="rounded-2xl border p-6"
              style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border-light)' }}
            >
              <h2
                className="mb-4 text-xl font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Proceso terapéutico
              </h2>
              <ul className="space-y-3">
                {processSteps.map((item) => (
                  <li key={item} className="flex items-start gap-2" style={{ color: 'var(--color-text-secondary)' }}>
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0"
                      strokeWidth={2}
                      style={{ color: 'var(--color-accent-icon)' }}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="bg-[var(--color-bg-primary)] py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2
              className="mb-6 font-display text-3xl font-semibold tracking-tight md:text-4xl"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Preguntas frecuentes sobre atención infantil
            </h2>
            <div className="space-y-4">
              {topicFaq.map((item) => (
                <article
                  key={item.question}
                  className="rounded-xl border p-5"
                  style={{
                    backgroundColor: 'var(--color-bg-card)',
                    borderColor: 'var(--color-border-light)',
                  }}
                >
                  <h3 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                    {item.question}
                  </h3>
                  <p className="mt-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
