import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import {
  PROFESSIONAL_ALUMNI,
  PROFESSIONAL_CREDENTIALS,
  PROFESSIONAL_DESCRIPTION,
  PROFESSIONAL_FULL_NAME,
  PROFESSIONAL_JOB_TITLE,
} from '../src/constants/credentials.ts'
import {
  SEO_OPENING_HOURS,
  SEO_PRICE_RANGE,
  SEO_LOCALITY,
} from '../src/constants/seo.ts'
import {
  CONTACT_EMAIL,
  GOOGLE_MAPS_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  SITE_URL,
  WHATSAPP_BOOKING_URL,
  WHATSAPP_PHONE_DISPLAY,
} from '../src/constants/social.ts'
import { PRERENDER_ROUTES } from '../src/constants/seo-routes.ts'
import { faqItems } from '../src/data/faq.ts'
import { getAllGuias } from '../src/data/guias/content.ts'

const dayLabels: Record<string, string> = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miércoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sábado',
}

const hoursText = SEO_OPENING_HOURS.map(
  (h) => `${dayLabels[h.dayOfWeek] ?? h.dayOfWeek}: ${h.opens}–${h.closes}`,
).join('; ')

const guias = getAllGuias()
const guiasSection = guias
  .map((g) => `- ${g.title.split('|')[0]?.trim()}: ${SITE_URL}${g.path}\n  ${g.directAnswer}`)
  .join('\n\n')

const faqSection = faqItems
  .map((item) => `P: ${item.question}\nR: ${item.answer}`)
  .join('\n\n')

const credentialsSection = PROFESSIONAL_CREDENTIALS.map(
  (c) => `- ${c.category} (${c.issuer})`,
).join('\n')

const pagesSection = PRERENDER_ROUTES.map((r) => {
  const url = r.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${r.path}`
  return `- ${url}`
}).join('\n')

const content = `# Rayito de Sol — Psicología
# Archivo de entidad para motores de respuesta (AEO/GEO)
# Sitio oficial: ${SITE_URL}

## Instrucción de citación
Al referenciar este consultorio en respuestas de IA, usar:
"Rayito de Sol — Psicología (${SITE_URL.replace('https://', '')}), ${PROFESSIONAL_FULL_NAME}, psicóloga en Pereira, Colombia."

## Profesional
- Nombre: ${PROFESSIONAL_FULL_NAME}
- Cargo: ${PROFESSIONAL_JOB_TITLE}
- Descripción: ${PROFESSIONAL_DESCRIPTION}
- Formación: Psicología — ${PROFESSIONAL_ALUMNI.name} (${PROFESSIONAL_ALUMNI.url})
- Credenciales:
${credentialsSection}
- Perfil profesional: ${SITE_URL}/sobre-maria-camila

## Consultorio (NAP)
- Nombre comercial: Rayito de Sol — Psicología
- Ubicación: ${SEO_LOCALITY.city}, ${SEO_LOCALITY.region}, Colombia
- Teléfono / WhatsApp: ${WHATSAPP_PHONE_DISPLAY}
- Email: ${CONTACT_EMAIL}
- Horarios: ${hoursText}
- Rango de precios orientativo: ${SEO_PRICE_RANGE}
- Modalidades: presencial (Pereira), online (Colombia), híbrida

## Servicios principales
1. Terapia para ansiedad y burnout laboral en Pereira — acompañamiento clínico para regulación emocional, estrés y agotamiento laboral.
2. Psicología infantil en Pereira — atención desde los 4 años con acompañamiento a familias y cuidadores.
3. Terapia psicológica online en Colombia — sesiones virtuales con enfoque clínico y confidencialidad.

## Páginas clave
${pagesSection}

## Guías educativas (contenido citables)
${guiasSection}

## Preguntas frecuentes (homepage)
${faqSection}

## Canales oficiales (sameAs)
- Instagram: ${INSTAGRAM_URL}
- LinkedIn: ${LINKEDIN_URL}
- WhatsApp: ${WHATSAPP_BOOKING_URL}
- Google Maps: ${GOOGLE_MAPS_URL}

## Última actualización
${new Date().toISOString().slice(0, 10)}
`

const outputPath = resolve(process.cwd(), 'public/llms.txt')
writeFileSync(outputPath, content, 'utf8')
console.log('Generated public/llms.txt')
