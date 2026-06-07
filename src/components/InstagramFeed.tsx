import { Camera, ArrowRight } from 'lucide-react'
import SectionWrapper from './SectionWrapper'

export default function InstagramFeed() {
  return (
    <SectionWrapper id="instagram" className="bg-sky-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sun-ink font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            Redes
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-text-primary mb-4 tracking-tight">
            Sígueme en Instagram
          </h2>
          <p className="text-text-secondary text-lg">
            Contenido sobre bienestar emocional, tips y reflexiones
          </p>
        </div>

        {/* Placeholder for Instagram embed */}
        <div className="bg-sky-pale/30 rounded-2xl border-2 border-dashed border-border-light p-12 text-center">
          <div className="w-16 h-16 rounded-2xl bg-sun/10 flex items-center justify-center mx-auto mb-4">
            <Camera className="w-8 h-8 text-sky-deep" strokeWidth={1.75} />
          </div>
          <p className="text-text-secondary font-medium mb-2">Instagram Feed</p>
          <p className="text-text-secondary text-sm">
            Aquí irá el embed de Instagram o la cuadrícula de posts.
          </p>
          <a
            href="https://instagram.com/rayitodesol.psicologia"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 mt-6 text-sky-deep font-medium hover:text-sun-ink transition-colors duration-200 underline underline-offset-4"
          >
            @rayitodesol.psicologia
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
