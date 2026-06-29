import { Quote, Star } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import { trackReviewClick } from '../lib/analytics'
import { GOOGLE_REVIEW_CTA_TEXT, GOOGLE_REVIEW_CTA_URL } from '../data/contact'
import { testimonials } from '../data/testimonials'

export default function Testimonials() {
  return (
    <SectionWrapper
      id="testimonios"
      className="py-24 md:py-32"
      style={{ backgroundColor: 'var(--color-bg-primary)' }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: 'var(--color-accent-label)' }}
          >
            Confianza real
          </p>
          <h2
            className="font-display text-3xl font-semibold tracking-tight md:text-5xl"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Testimonios de pacientes
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.initials}
              className="rounded-2xl border p-6"
              style={{
                backgroundColor: 'var(--color-bg-card)',
                borderColor: 'var(--color-border-light)',
              }}
            >
              <Quote
                className="mb-4 h-5 w-5"
                strokeWidth={1.75}
                style={{ color: 'var(--color-accent-icon)' }}
              />
              <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                "{testimonial.quote}"
              </p>
              <p
                className="mt-4 text-sm font-semibold"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {testimonial.initials}
              </p>
              <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                {testimonial.context}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <a
            href={GOOGLE_REVIEW_CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackReviewClick('testimonials')}
            className="inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3 font-semibold text-[#1A1A2E] transition-all duration-300 hover:bg-sun-soft"
          >
            <Star className="h-4 w-4" strokeWidth={2} />
            {GOOGLE_REVIEW_CTA_TEXT}
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
