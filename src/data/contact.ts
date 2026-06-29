import { CONTACT_EMAIL, WHATSAPP_PHONE_DISPLAY, WHATSAPP_URL } from '../constants/social'

export const CONTACT_SECTION_LABEL = 'Contacto'
export const CONTACT_HEADING_START = 'Agenda tu '
export const CONTACT_HEADING_ACCENT = 'primera sesión'
export const CONTACT_SUBCOPY =
  'Da el primer paso hacia tu bienestar. Escríbeme y te responderé a la brevedad para coordinar una cita.'

export interface ContactInfoItem {
  icon: 'map-pin' | 'whatsapp' | 'mail'
  title: string
  value: string
  href?: string
}

export const contactInfoItems: ContactInfoItem[] = [
  { icon: 'map-pin', title: 'Ubicación', value: 'Pereira, Colombia' },
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
export const WHATSAPP_CTA_TEXT = 'Escríbeme por WhatsApp'
export const FORM_SUCCESS_MESSAGE = 'Tu mensaje fue enviado. Te responderé pronto.'
export const FORM_ERROR_MESSAGE =
  'No pudimos enviar tu mensaje. Intenta de nuevo o escríbeme por WhatsApp.'
