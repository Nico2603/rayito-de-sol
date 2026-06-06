import SectionWrapper from './SectionWrapper'

export default function InstagramFeed() {
  return (
    <SectionWrapper id="instagram" className="bg-sky-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sun font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            Redes
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
            Sígueme en Instagram
          </h2>
          <p className="text-text-secondary text-lg">
            Contenido sobre bienestar emocional, tips y reflexiones
          </p>
        </div>

        {/* Placeholder for Instagram embed */}
        <div className="bg-sky-pale/30 rounded-2xl border-2 border-dashed border-border-light p-12 text-center">
          <div className="text-5xl mb-4">📸</div>
          <p className="text-text-secondary font-medium mb-2">Instagram Feed</p>
          <p className="text-text-secondary text-sm">
            Aquí irá el embed de Instagram o la cuadrícula de posts.
          </p>
          <a
            href="https://instagram.com/rayitodesol.psicologia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-sky-deep font-medium hover:text-sun transition-colors duration-200 underline underline-offset-4"
          >
            @rayitodesol.psicologia →
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
