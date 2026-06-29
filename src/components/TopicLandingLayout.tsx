import type { TopicFaqItem } from '../lib/structured-data'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import Footer from './Footer'
import SeoHelmet from './SeoHelmet'
import { buildWhatsappBookingUrl } from '../constants/social'
import { trackWhatsappClick } from '../lib/analytics'
import { buildTopicStructuredData, type BreadcrumbItem } from '../lib/structured-data'

interface TopicLandingLayoutProps {
  pageTitle: string
  pageDescription: string
  slug: string
  serviceName: string
  breadcrumbs: BreadcrumbItem[]
  eyebrow: string
  h1: string
  lead: string
  whatsappSource: string
  ctaLabel: string
  leftCardTitle: string
  leftCardItems: string[]
  rightCardTitle: string
  rightCardItems: string[]
  faqTitle: string
  faq: TopicFaqItem[]
}

export default function TopicLandingLayout({
  pageTitle,
  pageDescription,
  slug,
  serviceName,
  breadcrumbs,
  eyebrow,
  h1,
  lead,
  whatsappSource,
  ctaLabel,
  leftCardTitle,
  leftCardItems,
  rightCardTitle,
  rightCardItems,
  faqTitle,
  faq,
}: TopicLandingLayoutProps) {
  const whatsappUrl = buildWhatsappBookingUrl(whatsappSource)
  const structuredData = buildTopicStructuredData(
    slug,
    pageTitle,
    pageDescription,
    faq,
    serviceName,
    breadcrumbs,
  )

  return (
    <>
      <SeoHelmet
        title={pageTitle}
        description={pageDescription}
        canonicalPath={slug}
        structuredData={structuredData}
      />

      <main className="pt-28">
        <section className="bg-[var(--color-bg-primary)] py-16 md:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <p
              className="mb-3 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: 'var(--color-accent-label)' }}
            >
              {eyebrow}
            </p>
            <h1
              className="font-display text-4xl font-semibold tracking-tight md:text-6xl"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {h1}
            </h1>
            <p
              className="direct-answer mt-5 text-lg leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {lead}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsappClick('topic_page')}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-sun px-7 py-4 font-semibold text-[#1A1A2E] transition-all duration-300 hover:bg-sun-soft"
            >
              {ctaLabel}
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
              <h2 className="mb-4 text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {leftCardTitle}
              </h2>
              <ul className="space-y-3">
                {leftCardItems.map((item) => (
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
              <h2 className="mb-4 text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                {rightCardTitle}
              </h2>
              <ul className="space-y-3">
                {rightCardItems.map((item) => (
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
              {faqTitle}
            </h2>
            <div className="space-y-4">
              {faq.map((item) => (
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
