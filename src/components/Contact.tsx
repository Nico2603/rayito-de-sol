import SectionWrapper from './SectionWrapper'

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="bg-gradient-to-b from-sky-white to-sky-pale py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Info */}
          <div>
            <p className="text-sun font-semibold text-xs uppercase tracking-[0.2em] mb-3">
              Contacto
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">
              Agenda tu{' '}
              <span className="text-sky-deep">primera sesión</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Da el primer paso hacia tu bienestar. Escríbeme y te responderé a la brevedad para
              coordinar una cita.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sun/10 flex items-center justify-center text-xl shrink-0">
                  📍
                </div>
                <div>
                  <p className="font-medium text-text-primary">Ubicación</p>
                  <p className="text-text-secondary text-sm">Bogotá, Colombia</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sun/10 flex items-center justify-center text-xl shrink-0">
                  💬
                </div>
                <div>
                  <p className="font-medium text-text-primary">WhatsApp</p>
                  <p className="text-text-secondary text-sm">+57 300 000 0000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sun/10 flex items-center justify-center text-xl shrink-0">
                  📧
                </div>
                <div>
                  <p className="font-medium text-text-primary">Email</p>
                  <p className="text-text-secondary text-sm">hola@rayitodesol.com</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/573000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-8 bg-sun text-text-primary font-semibold px-8 py-4 rounded-full hover:bg-sun-soft transition-all duration-300 shadow-lg shadow-sun/30"
            >
              <span>Escríbeme por WhatsApp</span>
              <span>→</span>
            </a>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 border border-border-light shadow-sm">
            <h3 className="text-xl font-semibold text-text-primary mb-6">Envíame un mensaje</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full bg-sky-white border border-border-light rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-sky-cerulean focus:ring-2 focus:ring-sky-cerulean/10 transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  className="w-full bg-sky-white border border-border-light rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-sky-cerulean focus:ring-2 focus:ring-sky-cerulean/10 transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1.5">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Cuéntame brevemente cómo puedo ayudarte..."
                  className="w-full bg-sky-white border border-border-light rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-sky-cerulean focus:ring-2 focus:ring-sky-cerulean/10 transition-all duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-deep text-white font-semibold px-8 py-4 rounded-xl hover:bg-sky-deep/90 transition-all duration-300"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
