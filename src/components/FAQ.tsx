import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import { faqItems } from '../data/faq'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <SectionWrapper id="faq" className="py-24 md:py-32" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-semibold text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-accent-label)' }}>
            Preguntas frecuentes
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            FAQ
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
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
