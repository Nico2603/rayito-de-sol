import { SITE_URL } from './social'

export const SEO_TITLE =
  'Psicóloga en Pereira | Rayito de Sol — Terapia y Bienestar'

export const SEO_DESCRIPTION =
  'Consultorio psicológico en Pereira, Risaralda. Terapia individual, infantil y online con María Camila. Agenda tu primera sesión con calidez y enfoque clínico.'

export const SEO_KEYWORDS =
  'psicóloga Pereira, terapia psicológica Pereira, terapia ansiedad Pereira, psicología infantil Pereira, psicólogo online Colombia, bienestar emocional'

export const SEO_OG_IMAGE = `${SITE_URL}/og-image.webp`
export const SEO_OG_IMAGE_WIDTH = 1200
export const SEO_OG_IMAGE_HEIGHT = 630
export const SEO_OG_IMAGE_ALT =
  'María Camila — psicóloga en Pereira, consultorio Rayito de Sol'

export const SEO_LOCALITY = {
  city: 'Pereira',
  region: 'Risaralda',
  country: 'CO',
} as const

export const SEO_PRICE_RANGE = 'COP 50.000 - COP 300.000'
export const SEO_LATITUDE = 4.8143
export const SEO_LONGITUDE = -75.6946

export const SEO_AREA_SERVED = [
  'Pereira',
  'Dosquebradas',
  'Santa Rosa de Cabal',
  'Risaralda',
  'Colombia',
] as const

export const SEO_OPENING_HOURS = [
  { dayOfWeek: 'Monday', opens: '08:00', closes: '18:00' },
  { dayOfWeek: 'Tuesday', opens: '08:00', closes: '18:00' },
  { dayOfWeek: 'Wednesday', opens: '08:00', closes: '18:00' },
  { dayOfWeek: 'Thursday', opens: '08:00', closes: '18:00' },
  { dayOfWeek: 'Friday', opens: '08:00', closes: '18:00' },
  { dayOfWeek: 'Saturday', opens: '08:00', closes: '14:00' },
] as const

export const SEO_SERVICE_CATALOG = [
  {
    name: 'Terapia para ansiedad en Pereira',
    description:
      'Acompañamiento psicológico para ansiedad, estrés laboral y agotamiento emocional con enfoque clínico.',
  },
  {
    name: 'Psicología infantil en Pereira',
    description:
      'Atención psicológica para niños con acompañamiento a madres, padres y cuidadores.',
  },
  {
    name: 'Terapia psicológica online en Colombia',
    description:
      'Sesiones virtuales para adultos y familias que buscan flexibilidad y continuidad terapéutica.',
  },
] as const

export const SEO_SITE_NAME = 'Rayito de Sol — Psicología'
