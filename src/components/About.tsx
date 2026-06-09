import { GraduationCap, Brain, Baby } from 'lucide-react'
import mariaCamilaFace from '../assets/images/MariaCamilaFace.webp'
import SectionWrapper from './SectionWrapper'

export default function About() {
  return (
    <SectionWrapper id="about" className="bg-sky-white py-24 md:py-32">
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
            <p className="text-sun-ink font-semibold text-xs uppercase tracking-[0.2em] mb-3">
              Sobre mí
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold text-text-primary mb-6 tracking-tight">
              Hola, soy{' '}
              <span className="text-sky-deep">María Camila</span>
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Psicóloga apasionada por el bienestar emocional y el crecimiento personal.
                Mi enfoque combina la calidez humana con el rigor profesional, creando un
                espacio seguro donde puedas sentirte escuchado y acompañado.
              </p>
              <p>
                Creo firmemente en el proceso orgánico de la terapia: cada persona tiene
                las herramientas para sanar, y mi labor es guiarte a descubrirlas.
              </p>
              <p>
                Titulada con enfoque en terapia cognitivo-conductual y atención a la
                diversidad. Con experiencia en acompañamiento individual, infantil y familiar.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <span className="inline-flex items-center gap-2 bg-sky-pale/60 text-sky-deep text-sm font-medium px-4 py-2 rounded-full">
                <GraduationCap className="w-4 h-4" strokeWidth={2} />
                Psicóloga Titulada
              </span>
              <span className="inline-flex items-center gap-2 bg-sky-pale/60 text-sky-deep text-sm font-medium px-4 py-2 rounded-full">
                <Brain className="w-4 h-4" strokeWidth={2} />
                TCC
              </span>
              <span className="inline-flex items-center gap-2 bg-sky-pale/60 text-sky-deep text-sm font-medium px-4 py-2 rounded-full">
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
