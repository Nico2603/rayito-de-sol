import SectionWrapper from './SectionWrapper'
import { approachValues } from '../data/approach'

export default function Approach() {
  return (
    <SectionWrapper id="approach" className="bg-sky-pale/50 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sun-ink font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            Filosofía
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-text-primary mb-4 tracking-tight">
            Mi enfoque
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Así concibo el acompañamiento psicológico
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {approachValues.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-8 border border-border-light hover:shadow-lg hover:border-sky-soft/30 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-xl bg-sun/10 flex items-center justify-center mb-5 group-hover:bg-sun/20 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-sky-deep" strokeWidth={1.75} />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">{item.title}</h3>
                <p className="text-text-secondary leading-relaxed">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
