import { GraduationCap, Brain, Baby } from 'lucide-react'
import mariaCamilaFace from '../assets/images/MariaCamilaFace.webp'
import { aboutIntroLead, aboutIntroFollow } from '../data/approach'
import SectionWrapper from './SectionWrapper'

export default function About() {
  return (
    <SectionWrapper id="about" className="py-24 md:py-32" style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative">
            <img
              src={mariaCamilaFace}
              alt="María Camila - Psicóloga"
              className="w-full h-auto object-cover [mask-image:linear-gradient(to_top,transparent_0%,black_10%)] [-webkit-mask-image:linear-gradient(to_top,transparent_0%,black_10%)]"
              loading="lazy"
            />
          </div>

          <div>
            <p className="font-semibold text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-accent-label)' }}>
              Sobre mí
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Hola, soy{' '}
              <span style={{ color: 'var(--color-accent-highlight)' }}>María Camila</span>
            </h2>
            <div className="space-y-4 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              <p>{aboutIntroLead}</p>
              <p>{aboutIntroFollow}</p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <span className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-badge-bg)', color: 'var(--color-accent-badge-text)' }}>
                <GraduationCap className="w-4 h-4" strokeWidth={2} />
                Psicóloga Titulada
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-badge-bg)', color: 'var(--color-accent-badge-text)' }}>
                <Brain className="w-4 h-4" strokeWidth={2} />
                TCC
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--color-accent-badge-bg)', color: 'var(--color-accent-badge-text)' }}>
                <Baby className="w-4 h-4" strokeWidth={2} />
                Atención Infantil
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
