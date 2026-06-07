import SectionWrapper from './SectionWrapper'
import { services } from '../data/services'

export default function Services() {
  return (
    <SectionWrapper id="services" className="bg-sky-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sun-ink font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            ¿Qué ofrezco?
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-text-primary mb-4 tracking-tight">
            Servicios
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Acompañamiento psicológico adaptado a tus necesidades
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="group bg-white rounded-2xl p-6 border border-border-light hover:shadow-lg hover:border-sky-soft/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-sun/10 flex items-center justify-center mb-4 group-hover:bg-sun/20 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-sky-deep" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{service.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
