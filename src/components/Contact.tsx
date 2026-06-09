import { MapPin, Mail, ArrowRight } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import WhatsAppIcon from './icons/WhatsAppIcon'
import { WHATSAPP_PHONE_DISPLAY, WHATSAPP_URL } from '../constants/social'

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Info */}
          <div>
            <p className="font-semibold text-xs uppercase tracking-[0.2em] mb-3" style={{ color: 'var(--color-accent-label)' }}>
              Contacto
            </p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold mb-6 tracking-tight" style={{ color: 'var(--color-text-primary)' }}>
              Agenda tu{' '}
              <span style={{ color: 'var(--color-accent-highlight)' }}>primera sesión</span>
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              Da el primer paso hacia tu bienestar. Escríbeme y te responderé a la brevedad para
              coordinar una cita.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sun/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" strokeWidth={1.75} style={{ color: 'var(--color-accent-icon)' }} />
                </div>
                <div>
                  <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Ubicación</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>Pereira, Colombia</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sun/10 flex items-center justify-center shrink-0">
                  <WhatsAppIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>WhatsApp</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{WHATSAPP_PHONE_DISPLAY}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sun/10 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" strokeWidth={1.75} style={{ color: 'var(--color-accent-icon)' }} />
                </div>
                <div>
                  <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>Email</p>
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>hola@rayitodesol.com</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 mt-8 bg-sun text-[#1A1A2E] font-semibold px-8 py-4 rounded-full hover:bg-sun-soft transition-all duration-300 shadow-lg shadow-sun/30"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>Escríbeme por WhatsApp</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
            </a>
          </div>

          {/* Form */}
          <div className="rounded-2xl p-8 border shadow-sm" style={{
            backgroundColor: 'var(--color-bg-card)',
            borderColor: 'var(--color-border-light)',
          }}>
            <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>Envíame un mensaje</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-sky-cerulean focus:ring-2 focus:ring-sky-cerulean/10 transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-bg-primary)',
                    borderColor: 'var(--color-border-light)',
                    color: 'var(--color-text-primary)',
                  }}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-sky-cerulean focus:ring-2 focus:ring-sky-cerulean/10 transition-all duration-200"
                  style={{
                    backgroundColor: 'var(--color-bg-primary)',
                    borderColor: 'var(--color-border-light)',
                    color: 'var(--color-text-primary)',
                  }}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-primary)' }}>
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Cuéntame brevemente cómo puedo ayudarte..."
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-sky-cerulean focus:ring-2 focus:ring-sky-cerulean/10 transition-all duration-200 resize-none"
                  style={{
                    backgroundColor: 'var(--color-bg-primary)',
                    borderColor: 'var(--color-border-light)',
                    color: 'var(--color-text-primary)',
                  }}
                />
              </div>
              <button
                type="submit"
                className="w-full font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: 'var(--color-btn-secondary-bg)', color: 'var(--color-btn-secondary-text)' }}
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
