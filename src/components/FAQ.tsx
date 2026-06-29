import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import { buildWhatsappBookingUrl } from '../constants/social'
import { faqItems } from '../data/faq'
import { getAllGuias } from '../data/guias/content'
import { trackWhatsappClick } from '../lib/analytics'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const faqWhatsappUrl = buildWhatsappBookingUrl('faq')
  const guias = getAllGuias()

  return (
    <SectionWrapper id="faq" className="py-24 md:py-32" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-semibold text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-accent-label)' }}>
            Preguntas frecuentes
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            Preguntas sobre terapia psicológica
          </h2>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border overflow-hidden transition-shadow duration-300 hover:shadow-md"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border-light)',
              }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="font-medium pr-4" style={{ color: 'var(--color-text-primary)' }}>{item.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 135 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                  style={{ color: 'var(--color-accent-icon)' }}
                >
                  <Plus className="w-5 h-5" strokeWidth={2} />
                </motion.span>
              </button>
              <div
                id={`faq-answer-${i}`}
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  openIndex === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-75'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-5 leading-relaxed faq-answer" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h3 className="mb-4 text-center font-display text-2xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
            Preguntas por tema
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/terapia-ansiedad-pereira"
              className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-sun/10"
              style={{ borderColor: 'var(--color-border-light)', color: 'var(--color-text-secondary)' }}
            >
              Ansiedad y burnout
            </Link>
            <Link
              to="/psicologia-infantil-pereira"
              className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-sun/10"
              style={{ borderColor: 'var(--color-border-light)', color: 'var(--color-text-secondary)' }}
            >
              Psicología infantil
            </Link>
            <Link
              to="/terapia-online-colombia"
              className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-sun/10"
              style={{ borderColor: 'var(--color-border-light)', color: 'var(--color-text-secondary)' }}
            >
              Terapia online
            </Link>
            {guias.slice(0, 3).map((guia) => (
              <Link
                key={guia.slug}
                to={guia.path}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-sun/10"
                style={{ borderColor: 'var(--color-border-light)', color: 'var(--color-text-secondary)' }}
              >
                {guia.title.split('|')[0]?.trim()}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center rounded-2xl border p-6" style={{ backgroundColor: 'var(--color-bg-card)', borderColor: 'var(--color-border-light)' }}>
          <p className="text-base mb-4" style={{ color: 'var(--color-text-secondary)' }}>
            ¿No viste tu pregunta? Escríbeme y te ayudo a definir el mejor siguiente paso para tu proceso.
          </p>
          <a
            href={faqWhatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsappClick('faq_cta')}
            className="inline-flex items-center rounded-full bg-sun px-6 py-3 font-semibold text-[#1A1A2E] transition-all duration-300 hover:bg-sun-soft"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
