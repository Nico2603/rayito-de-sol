import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Footer from '../components/Footer'
import SeoHelmet from '../components/SeoHelmet'
import { GUIDE_SLUGS } from '../constants/seo-routes'
import { buildWhatsappBookingUrl } from '../constants/social'
import { getGuiaBySlug } from '../data/guias/content'
import { trackWhatsappClick } from '../lib/analytics'
import { buildArticleStructuredData } from '../lib/structured-data'

export default function GuiaPage() {
  const { slug } = useParams<{ slug: string }>()

  if (!slug || !GUIDE_SLUGS.includes(slug as (typeof GUIDE_SLUGS)[number])) {
    return <Navigate to="/" replace />
  }

  const guia = getGuiaBySlug(slug)
  if (!guia) return <Navigate to="/" replace />

  const breadcrumbs = [
    { name: 'Inicio', path: '/' },
    { name: 'Guías', path: '/guias/como-saber-si-necesito-terapia' },
    { name: guia.title.split('|')[0]?.trim() ?? guia.title, path: guia.path },
  ]

  const structuredData = buildArticleStructuredData(
    guia.path,
    guia.title,
    guia.description,
    guia.faq,
    breadcrumbs,
    guia.datePublished,
    guia.dateModified,
  )

  const whatsappUrl = buildWhatsappBookingUrl(`guia ${guia.slug}`)

  return (
    <>
      <SeoHelmet
        title={guia.title}
        description={guia.description}
        canonicalPath={guia.path}
        ogType="article"
        keywords={guia.keywords}
        structuredData={structuredData}
      />

      <main className="pt-28">
        <article className="bg-[var(--color-bg-primary)] py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: 'var(--color-accent-label)' }}
            >
              Guía clínica · Rayito de Sol
            </p>
            <h1
              className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {guia.title.split('|')[0]?.trim()}
            </h1>
            <p
              className="direct-answer mt-6 text-lg leading-relaxed font-medium"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {guia.directAnswer}
            </p>

            {guia.sections.map((section) => (
              <section key={section.heading} className="guia-section mt-10">
                <h2
                  className="mb-4 text-2xl font-semibold tracking-tight"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {section.heading}
                </h2>
                <div className="space-y-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <section className="mt-12">
              <h2
                className="mb-6 text-2xl font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                Preguntas frecuentes
              </h2>
              <div className="space-y-4">
                {guia.faq.map((item) => (
                  <div
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
                    <p className="faq-answer mt-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <div
              className="mt-12 rounded-2xl border p-6"
              style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border-light)' }}
            >
              <p className="mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                ¿Quieres acompañamiento personalizado? Agenda una valoración inicial con María Camila en
                Pereira o por terapia online en Colombia.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsappClick('guia_cta')}
                className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3 font-semibold text-[#1A1A2E] transition-all duration-300 hover:bg-sun-soft"
              >
                Agendar por WhatsApp
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </a>
            </div>

            <nav className="mt-10 flex flex-wrap gap-4 text-sm">
              <Link to="/terapia-ansiedad-pereira" className="text-[var(--color-accent-label)] hover:underline">
                Terapia para ansiedad
              </Link>
              <Link to="/psicologia-infantil-pereira" className="text-[var(--color-accent-label)] hover:underline">
                Psicología infantil
              </Link>
              <Link to="/terapia-online-colombia" className="text-[var(--color-accent-label)] hover:underline">
                Terapia online
              </Link>
              <Link to="/sobre-maria-camila" className="text-[var(--color-accent-label)] hover:underline">
                Sobre María Camila
              </Link>
            </nav>
          </div>
        </article>
      </main>

      <Footer />
    </>
  )
}
