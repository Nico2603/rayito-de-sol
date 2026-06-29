import { Helmet } from 'react-helmet-async'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Footer from '../components/Footer'
import { buildWhatsappBookingUrl, SITE_URL } from '../constants/social'
import { trackWhatsappClick } from '../lib/analytics'

const pageTitle = 'Terapia para ansiedad en Pereira | Rayito de Sol'
const pageDescription =
  'Terapia psicológica para ansiedad, estrés y burnout en Pereira. Agenda tu primera sesión con enfoque clínico y acompañamiento cercano.'

const warningSignals = [
  'Pensamientos repetitivos o sensación de alerta constante.',
  'Cansancio mental, dificultad para descansar o dormir.',
  'Bloqueo para tomar decisiones y sensación de saturación.',
  'Irritabilidad, culpa o miedo que interfiere en tu día a día.',
]

const processSteps = [
  'Valoración inicial para entender síntomas, detonantes y objetivos.',
  'Plan terapéutico personalizado con herramientas de regulación emocional.',
  'Seguimiento semanal para consolidar cambios sostenibles.',
]

const topicFaq = [
  {
    question: '¿La terapia para ansiedad también ayuda con burnout laboral?',
    answer:
      'Sí. En consulta trabajamos ansiedad y agotamiento laboral de forma integrada, priorizando regulación emocional, límites y hábitos de recuperación.',
  },
  {
    question: '¿Cuántas sesiones necesito para empezar a sentir cambios?',
    answer:
      'Cada proceso es distinto, pero muchas personas reportan mayor claridad y alivio en las primeras semanas cuando hay continuidad terapéutica.',
  },
]

export default function TerapiaAnsiedadPereira() {
  const whatsappUrl = buildWhatsappBookingUrl('pagina ansiedad pereira')

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <link rel="canonical" href={`${SITE_URL}/terapia-ansiedad-pereira`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`${SITE_URL}/terapia-ansiedad-pereira`} />
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
              Terapia psicológica en Pereira
            </p>
            <h1
              className="font-display text-4xl font-semibold tracking-tight md:text-6xl"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Terapia para ansiedad y burnout laboral
            </h1>
            <p
              className="mt-5 text-lg leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Si sientes que la ansiedad está afectando tu energía, tu concentración o tus
              relaciones, podemos trabajar un proceso estructurado para recuperar estabilidad
              emocional y bienestar.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsappClick('topic_page')}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-sun px-7 py-4 font-semibold text-[#1A1A2E] transition-all duration-300 hover:bg-sun-soft"
            >
              Agendar por WhatsApp
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
                Señales de alerta comunes
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
                ¿Cómo trabajamos en consulta?
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
              Preguntas frecuentes sobre ansiedad
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
