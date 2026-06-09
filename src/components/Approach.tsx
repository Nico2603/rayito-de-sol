import SectionWrapper from './SectionWrapper'
import { approachValues } from '../data/approach'

export default function Approach() {
  return (
    <SectionWrapper id="approach" className="py-24 md:py-32" style={{ backgroundColor: 'var(--color-bg-secondary)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="font-semibold text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-accent-label)' }}>
            Filosofía
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            Mi enfoque
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {approachValues.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="rounded-2xl p-8 border transition-all duration-300 group hover:shadow-lg"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  borderColor: 'var(--color-border-light)',
                }}
              >
                <div className="w-14 h-14 rounded-xl bg-sun/10 flex items-center justify-center mb-5 group-hover:bg-sun/20 transition-colors duration-300">
                  <Icon className="w-7 h-7" strokeWidth={1.75} style={{ color: 'var(--color-accent-icon)' }} />
                </div>
                <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--color-text-primary)' }}>{item.title}</h3>
                <p className="leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
