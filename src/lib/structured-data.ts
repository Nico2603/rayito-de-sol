import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  SITE_URL,
  WHATSAPP_PHONE_E164,
} from '../constants/social'
import {
  SEO_LOCALITY,
  SEO_OG_IMAGE,
  SEO_POSTAL_CODE,
  SEO_PRICE_RANGE,
  SEO_SITE_NAME,
  SEO_STREET_ADDRESS,
} from '../constants/seo'
import { faqItems } from '../data/faq'

export function buildHomeStructuredData() {
  const telephone = `+${WHATSAPP_PHONE_E164}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: SEO_SITE_NAME,
        url: SITE_URL,
        inLanguage: 'es-CO',
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'María Camila',
        jobTitle: 'Psicóloga',
        url: SITE_URL,
        email: CONTACT_EMAIL,
        telephone,
        worksFor: { '@id': `${SITE_URL}/#business` },
      },
      {
        '@type': 'MedicalBusiness',
        '@id': `${SITE_URL}/#business`,
        name: 'Rayito de Sol',
        description:
          'Consultorio psicológico en Pereira, Risaralda. Terapia individual, infantil y online.',
        url: SITE_URL,
        image: SEO_OG_IMAGE,
        telephone,
        email: CONTACT_EMAIL,
        priceRange: SEO_PRICE_RANGE,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SEO_STREET_ADDRESS,
          postalCode: SEO_POSTAL_CODE,
          addressLocality: SEO_LOCALITY.city,
          addressRegion: SEO_LOCALITY.region,
          addressCountry: SEO_LOCALITY.country,
        },
        sameAs: [INSTAGRAM_URL],
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}/#faq`,
        mainEntity: faqItems.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      },
    ],
  }
}
