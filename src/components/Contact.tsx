import { MapPin, Mail, ArrowRight } from 'lucide-react'
import SectionWrapper from './SectionWrapper'
import WhatsAppIcon from './icons/WhatsAppIcon'
import { WHATSAPP_URL } from '../constants/social'
import {
  CONTACT_SECTION_LABEL,
  CONTACT_HEADING_START,
  CONTACT_HEADING_ACCENT,
  CONTACT_SUBCOPY,
  contactInfoItems,
  FORM_TITLE,
  FORM_SUBMIT_TEXT,
  FORM_SENDING_TEXT,
  FORM_PHONE_LABEL,
  FORM_PHONE_PLACEHOLDER,
  WHATSAPP_CTA_TEXT,
} from '../data/contact'
import { useContactForm } from '../hooks/useContactForm'

const inputStyle = {
  backgroundColor: 'var(--color-bg-primary)',
  borderColor: 'var(--color-border-light)',
  color: 'var(--color-text-primary)',
} as const

const errorStyle = { color: '#DC2626' } as const

export default function Contact() {
  const {
    fields,
    errors,
    isSubmitting,
    successMessage,
    errorMessage,
    updateField,
    handleSubmit,
  } = useContactForm()

  return (
    <SectionWrapper id="contact" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Info */}
          <div>
            <p
              className="font-semibold text-xs uppercase tracking-[0.2em] mb-3"
              style={{ color: 'var(--color-accent-label)' }}
            >
              {CONTACT_SECTION_LABEL}
            </p>
            <h2
              className="font-display text-3xl md:text-5xl font-semibold mb-6 tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {CONTACT_HEADING_START}
              <span style={{ color: 'var(--color-accent-highlight)' }}>
                {CONTACT_HEADING_ACCENT}
              </span>
            </h2>
            <p
              className="text-lg leading-relaxed mb-8"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {CONTACT_SUBCOPY}
            </p>

            <div className="space-y-4">
              {contactInfoItems.map((item) => {
                const iconEl =
                  item.icon === 'whatsapp' ? (
                    <WhatsAppIcon className="w-6 h-6" />
                  ) : item.icon === 'map-pin' ? (
                    <MapPin
                      className="w-5 h-5"
                      strokeWidth={1.75}
                      style={{ color: 'var(--color-accent-icon)' }}
                    />
                  ) : (
                    <Mail
                      className="w-5 h-5"
                      strokeWidth={1.75}
                      style={{ color: 'var(--color-accent-icon)' }}
                    />
                  )

                const valueContent = item.href ? (
                  <a
                    href={item.href}
                    target={item.icon === 'whatsapp' ? '_blank' : undefined}
                    rel={item.icon === 'whatsapp' ? 'noopener noreferrer' : undefined}
                    className="text-sm hover:underline transition-colors duration-200"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                    {item.value}
                  </p>
                )

                return (
                  <div key={item.icon} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-sun/10 flex items-center justify-center shrink-0">
                      {iconEl}
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                        {item.title}
                      </p>
                      {valueContent}
                    </div>
                  </div>
                )
              })}
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 mt-8 bg-sun text-[#1A1A2E] font-semibold px-8 py-4 rounded-full hover:bg-sun-soft transition-all duration-300 shadow-lg shadow-sun/30"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>{WHATSAPP_CTA_TEXT}</span>
              <ArrowRight
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </a>
          </div>

          {/* Form */}
          <div
            className="rounded-2xl p-8 border shadow-sm"
            style={{
              backgroundColor: 'var(--color-bg-card)',
              borderColor: 'var(--color-border-light)',
            }}
          >
            <h3 className="text-xl font-semibold mb-6" style={{ color: 'var(--color-text-primary)' }}>
              {FORM_TITLE}
            </h3>
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <input
                type="checkbox"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  autoComplete="name"
                  value={fields.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  placeholder="Tu nombre"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-sky-cerulean focus:ring-2 focus:ring-sky-cerulean/10 transition-all duration-200"
                  style={inputStyle}
                />
                {errors.name ? (
                  <p id="name-error" className="mt-1.5 text-sm" style={errorStyle} role="alert">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Correo electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="tu@correo.com"
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-sky-cerulean focus:ring-2 focus:ring-sky-cerulean/10 transition-all duration-200"
                  style={inputStyle}
                />
                {errors.email ? (
                  <p id="email-error" className="mt-1.5 text-sm" style={errorStyle} role="alert">
                    {errors.email}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {FORM_PHONE_LABEL}
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={fields.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  aria-invalid={errors.phone ? true : undefined}
                  aria-describedby={errors.phone ? 'phone-error' : undefined}
                  placeholder={FORM_PHONE_PLACEHOLDER}
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-sky-cerulean focus:ring-2 focus:ring-sky-cerulean/10 transition-all duration-200"
                  style={inputStyle}
                />
                {errors.phone ? (
                  <p id="phone-error" className="mt-1.5 text-sm" style={errorStyle} role="alert">
                    {errors.phone}
                  </p>
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  minLength={10}
                  value={fields.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  aria-invalid={errors.message ? true : undefined}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  placeholder="Cuéntame brevemente cómo puedo ayudarte..."
                  className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:border-sky-cerulean focus:ring-2 focus:ring-sky-cerulean/10 transition-all duration-200 resize-none"
                  style={inputStyle}
                />
                {errors.message ? (
                  <p id="message-error" className="mt-1.5 text-sm" style={errorStyle} role="alert">
                    {errors.message}
                  </p>
                ) : null}
              </div>
              {successMessage ? (
                <p
                  className="text-sm rounded-xl px-4 py-3"
                  style={{
                    backgroundColor: 'var(--color-accent-badge-bg)',
                    color: 'var(--color-accent-badge-text)',
                  }}
                  role="status"
                >
                  {successMessage}
                </p>
              ) : null}
              {errorMessage ? (
                <p
                  className="text-sm rounded-xl px-4 py-3"
                  style={{
                    backgroundColor: 'rgba(220, 38, 38, 0.08)',
                    color: '#DC2626',
                  }}
                  role="alert"
                >
                  {errorMessage}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: 'var(--color-btn-secondary-bg)',
                  color: 'var(--color-btn-secondary-text)',
                }}
              >
                {isSubmitting ? FORM_SENDING_TEXT : FORM_SUBMIT_TEXT}
              </button>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
