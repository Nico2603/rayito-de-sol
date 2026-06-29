import { Link } from 'react-router-dom'
import { ArrowRight, GraduationCap, Brain, Baby, BadgeCheck } from 'lucide-react'
import mariaCamilaFace from '../assets/images/MariaCamilaFace.webp'
import Footer from '../components/Footer'
import SeoHelmet from '../components/SeoHelmet'
import {
  PROFESSIONAL_ALUMNI,
  PROFESSIONAL_CREDENTIALS,
  PROFESSIONAL_DESCRIPTION,
  PROFESSIONAL_FULL_NAME,
  PROFESSIONAL_JOB_TITLE,
  PROFESSIONAL_KNOWS_ABOUT,
} from '../constants/credentials'
import { buildWhatsappBookingUrl } from '../constants/social'
import { aboutIntroFollow, aboutIntroLead } from '../data/approach'
import { trackWhatsappClick } from '../lib/analytics'
import { buildPersonPageStructuredData } from '../lib/structured-data'

const pageTitle = 'Sobre María Camila Alzate Calzada | Psicóloga en Pereira'
const pageDescription =
  'María Camila Alzate Calzada, psicóloga clínica en Pereira con enfoque TCC. Formación en Universidad Católica de Pereira. Terapia para ansiedad, infantil y online en Colombia.'

const breadcrumbs = [
  { name: 'Inicio', path: '/' },
  { name: 'Sobre María Camila', path: '/sobre-maria-camila' },
]

const structuredData = buildPersonPageStructuredData(pageTitle, pageDescription, breadcrumbs)

export default function SobreMariaCamila() {
  const whatsappUrl = buildWhatsappBookingUrl('pagina sobre maria camila')

  return (
    <>
      <SeoHelmet
        title={pageTitle}
        description={pageDescription}
        canonicalPath="/sobre-maria-camila"
        structuredData={structuredData}
      />

      <main id="about-pro" className="pt-28">
        <section className="bg-[var(--color-bg-primary)] py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 md:grid-cols-2 md:items-center lg:px-8">
            <div className="relative">
              <img
                src={mariaCamilaFace}
                alt={`${PROFESSIONAL_FULL_NAME}, psicóloga clínica en Pereira, Colombia`}
                className="w-full h-auto object-cover [mask-image:linear-gradient(to_top,transparent_0%,black_10%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,black_10%)]"
                loading="eager"
              />
            </div>

            <div>
              <p
                className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: 'var(--color-accent-label)' }}
              >
                Profesional · Rayito de Sol
              </p>
              <h1
                className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {PROFESSIONAL_FULL_NAME}
              </h1>
              <p className="mt-2 text-lg font-medium" style={{ color: 'var(--color-accent-highlight)' }}>
                {PROFESSIONAL_JOB_TITLE} · Pereira, Risaralda
              </p>
              <p
                className="direct-answer mt-6 text-lg leading-relaxed"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {PROFESSIONAL_DESCRIPTION}
              </p>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-bg-secondary)] py-16 md:py-20">
          <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Enfoque y trayectoria
            </h2>
            <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {aboutIntroLead}
            </p>
            <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {aboutIntroFollow}
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                style={{ backgroundColor: 'var(--color-accent-badge-bg)', color: 'var(--color-accent-badge-text)' }}
              >
                <GraduationCap className="h-4 w-4" strokeWidth={2} />
                Psicóloga titulada
              </span>
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                style={{ backgroundColor: 'var(--color-accent-badge-bg)', color: 'var(--color-accent-badge-text)' }}
              >
                <Brain className="h-4 w-4" strokeWidth={2} />
                TCC
              </span>
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium"
                style={{ backgroundColor: 'var(--color-accent-badge-bg)', color: 'var(--color-accent-badge-text)' }}
              >
                <Baby className="h-4 w-4" strokeWidth={2} />
                Atención infantil
              </span>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-bg-primary)] py-16 md:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 font-display text-3xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Formación y credenciales
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3" style={{ color: 'var(--color-text-secondary)' }}>
                <BadgeCheck className="mt-1 h-5 w-5 shrink-0" style={{ color: 'var(--color-accent-icon)' }} />
                <span>
                  <strong style={{ color: 'var(--color-text-primary)' }}>Título profesional:</strong>{' '}
                  Psicología — {PROFESSIONAL_ALUMNI.name}
                </span>
              </li>
              {PROFESSIONAL_CREDENTIALS.map((credential) => (
                <li
                  key={credential.category}
                  className="flex items-start gap-3"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  <BadgeCheck className="mt-1 h-5 w-5 shrink-0" style={{ color: 'var(--color-accent-icon)' }} />
                  <span>
                    <strong style={{ color: 'var(--color-text-primary)' }}>{credential.category}:</strong>{' '}
                    {credential.issuer}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="mb-3 mt-10 text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
              Áreas de conocimiento clínico
            </h3>
            <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {PROFESSIONAL_KNOWS_ABOUT.join(', ')}.
            </p>

            <div className="mt-10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsappClick('about_page')}
                className="inline-flex items-center gap-2 rounded-full bg-sun px-7 py-4 font-semibold text-[#1A1A2E] transition-all duration-300 hover:bg-sun-soft"
              >
                Agendar valoración inicial
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </a>
            </div>

            <nav className="mt-10 flex flex-wrap gap-4 text-sm">
              <Link to="/terapia-ansiedad-pereira" className="hover:underline" style={{ color: 'var(--color-accent-label)' }}>
                Terapia para ansiedad
              </Link>
              <Link to="/psicologia-infantil-pereira" className="hover:underline" style={{ color: 'var(--color-accent-label)' }}>
                Psicología infantil
              </Link>
              <Link to="/guias/como-saber-si-necesito-terapia" className="hover:underline" style={{ color: 'var(--color-accent-label)' }}>
                Guías de bienestar
              </Link>
            </nav>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
