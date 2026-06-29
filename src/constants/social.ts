export const SITE_URL = 'https://rayitodesolpsico.com'

export const INSTAGRAM_USERNAME = 'rayitodesol.psico'
export const INSTAGRAM_URL = 'https://www.instagram.com/rayitodesol.psico/'
export const INSTAGRAM_HANDLE = `@${INSTAGRAM_USERNAME}`

export const LINKEDIN_URL = 'https://www.linkedin.com/in/maria-camila-alzate-calzada/'

export const WHATSAPP_PHONE_E164 = '573107506153'
export const WHATSAPP_PHONE_DISPLAY = '+57 310 750 6153'
export const WHATSAPP_DEFAULT_MESSAGE = 'Quiero consultar disponibilidad'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`
export const WHATSAPP_BOOKING_MESSAGE = 'Hola, quiero agendar mi primera sesión psicológica'
export function buildWhatsappBookingUrl(source: string): string {
  const message = `${WHATSAPP_BOOKING_MESSAGE}. Llegué desde: ${source}`
  return `https://wa.me/${WHATSAPP_PHONE_E164}?text=${encodeURIComponent(message)}`
}
export const WHATSAPP_BOOKING_URL = buildWhatsappBookingUrl('sitio web')

export const CONTACT_EMAIL = 'psico.camilaa@gmail.com'
export const GOOGLE_MAPS_URL = 'https://maps.google.com/?q=Carrera+12+%231-28+Pereira+Risaralda'
export const GOOGLE_REVIEW_URL = 'https://g.page/r/Cf1Qj7bN8tXNEBM/review'
