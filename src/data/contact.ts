export const CONTACT_SECTION_LABEL = 'Contacto'
export const CONTACT_HEADING_START = 'Agenda tu '
export const CONTACT_HEADING_ACCENT = 'primera sesión'
export const CONTACT_SUBCOPY =
  'Da el primer paso hacia tu bienestar. Escríbeme y te responderé a la brevedad para coordinar una cita.'

export interface ContactInfoItem {
  icon: 'map-pin' | 'whatsapp' | 'mail'
  title: string
  value: string
}

export const contactInfoItems: ContactInfoItem[] = [
  { icon: 'map-pin', title: 'Ubicación', value: 'Pereira, Colombia' },
  { icon: 'whatsapp', title: 'WhatsApp', value: '+57 321 648 0414' },
  { icon: 'mail', title: 'Email', value: 'hola@rayitodesol.com' },
]

export const FORM_TITLE = 'Envíame un mensaje'

export const FORM_SUBMIT_TEXT = 'Enviar mensaje'
export const WHATSAPP_CTA_TEXT = 'Escríbeme por WhatsApp'
