import {
  buildWhatsappBookingUrl,
  CONTACT_EMAIL,
  GOOGLE_MAPS_URL,
  GOOGLE_REVIEW_URL,
  WHATSAPP_PHONE_DISPLAY,
  WHATSAPP_URL,
} from '../constants/social'

export const CONTACT_SECTION_LABEL = 'Contacto'
export const CONTACT_HEADING_START = 'Agenda tu '
export const CONTACT_HEADING_ACCENT = 'primera sesión'
export const CONTACT_SUBCOPY =
  'Da el primer paso hacia tu bienestar. Escríbeme y te responderé a la brevedad para coordinar una cita.'

export interface ContactInfoItem {
  icon: 'map-pin' | 'whatsapp' | 'mail' | 'clock'
  title: string
  value: string
  href?: string
}

export const contactInfoItems: ContactInfoItem[] = [
  {
    icon: 'map-pin',
    title: 'Consultorio presencial',
    value: 'Carrera 12 #1-28, sector La Circunvalar, La Rebeca, Psicoartes, Pereira',
    href: GOOGLE_MAPS_URL,
  },
  {
    icon: 'clock',
    title: 'Horario',
    value: 'Lunes a viernes: 8:00 a.m. - 6:00 p.m. | Sábados: 8:00 a.m. - 2:00 p.m.',
  },
  {
    icon: 'whatsapp',
    title: 'WhatsApp',
    value: WHATSAPP_PHONE_DISPLAY,
    href: WHATSAPP_URL,
  },
  {
    icon: 'mail',
    title: 'Email',
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
]

export const FORM_TITLE = 'Envíame un mensaje'

export const FORM_SUBMIT_TEXT = 'Enviar mensaje'
export const FORM_SENDING_TEXT = 'Enviando…'
export const FORM_PHONE_LABEL = 'Teléfono'
export const FORM_PHONE_PLACEHOLDER = '310 750 6153'
export const WHATSAPP_CTA_TEXT = 'Agendar por WhatsApp'
export const WHATSAPP_PRIMARY_URL = buildWhatsappBookingUrl('seccion contacto')
export const GOOGLE_REVIEW_CTA_TEXT = 'Dejar reseña en Google'
export const GOOGLE_REVIEW_CTA_URL = GOOGLE_REVIEW_URL
export const FORM_SUCCESS_MESSAGE = 'Tu mensaje fue enviado. Te responderé pronto.'
export const FORM_SUCCESS_TITLE = '¡Gracias por contactarme!'
export const FORM_SUCCESS_TRUST =
  'Aprecio que hayas dado este paso y confíes en mí para acompañarte.'
export const FORM_SUCCESS_RESPONSE = 'Te responderé cuanto antes para coordinar tu cita.'
export const FORM_SUCCESS_GREETING = (name: string) =>
  name ? `Gracias, ${name}.` : 'Tu mensaje llegó con éxito.'
export const FORM_SUCCESS_ANOTHER = 'Enviar otro mensaje'
export const FORM_ERROR_MESSAGE =
  'No pudimos enviar tu mensaje. Intenta de nuevo o escríbeme por WhatsApp.'
