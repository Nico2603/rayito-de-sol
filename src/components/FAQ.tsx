import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { faqItems } from '../data/faq'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <SectionWrapper id="faq" className="bg-sky-pale/50 py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sun font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            Preguntas frecuentes
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
            FAQ
          </h2>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-border-light overflow-hidden transition-shadow duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium text-text-primary pr-4">{item.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sun text-xl shrink-0"
                >
                  +
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
                    <div className="px-6 pb-5 text-text-secondary leading-relaxed">
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
