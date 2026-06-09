import SectionWrapper from './SectionWrapper'
import { services } from '../data/services'

export default function Services() {
  return (
    <SectionWrapper id="services" className="py-24 md:py-32" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="font-semibold text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-accent-label)' }}>
            ¿Qué ofrezco?
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mb-4 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
            Servicios
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--color-text-secondary)' }}>
            Acompañamiento psicológico adaptado a tus necesidades
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group rounded-2xl p-6 border transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-bg-card)',
                  borderColor: 'var(--color-border-light)',
                }}
              >
                <div className="w-12 h-12 rounded-xl bg-sun/10 flex items-center justify-center mb-4 group-hover:bg-sun/20 transition-colors duration-300">
                  <Icon className="w-6 h-6" strokeWidth={1.75} style={{ color: 'var(--color-accent-icon)' }} />
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--color-text-primary)' }}>{service.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
