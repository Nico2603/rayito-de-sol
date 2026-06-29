import {
  CONTACT_EMAIL,
  GOOGLE_MAPS_URL,
  GOOGLE_REVIEW_URL,
  INSTAGRAM_URL,
  SITE_URL,
  WHATSAPP_BOOKING_URL,
  WHATSAPP_PHONE_E164,
} from '../constants/social'
import {
  SEO_AREA_SERVED,
  SEO_LATITUDE,
  SEO_LOCALITY,
  SEO_LONGITUDE,
  SEO_OPENING_HOURS,
  SEO_OG_IMAGE,
  SEO_POSTAL_CODE,
  SEO_PRICE_RANGE,
  SEO_SERVICE_CATALOG,
  SEO_SITE_NAME,
  SEO_STREET_ADDRESS,
} from '../constants/seo'
import { faqItems } from '../data/faq'

interface TopicFaqItem {
  question: string
  answer: string
}

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
        image: SEO_OG_IMAGE,
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
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer support',
            telephone,
            email: CONTACT_EMAIL,
            availableLanguage: ['es-CO'],
            areaServed: 'CO',
          },
        ],
        hasMap: GOOGLE_MAPS_URL,
        areaServed: SEO_AREA_SERVED.map((area) => ({
          '@type': 'Place',
          name: area,
        })),
        openingHoursSpecification: SEO_OPENING_HOURS.map((schedule) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: `https://schema.org/${schedule.dayOfWeek}`,
          opens: schedule.opens,
          closes: schedule.closes,
        })),
        geo: {
          '@type': 'GeoCoordinates',
          latitude: SEO_LATITUDE,
          longitude: SEO_LONGITUDE,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Servicios de psicología',
          itemListElement: SEO_SERVICE_CATALOG.map((service) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              description: service.description,
            },
          })),
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: SEO_STREET_ADDRESS,
          postalCode: SEO_POSTAL_CODE,
          addressLocality: SEO_LOCALITY.city,
          addressRegion: SEO_LOCALITY.region,
          addressCountry: SEO_LOCALITY.country,
        },
        sameAs: [INSTAGRAM_URL, GOOGLE_MAPS_URL, GOOGLE_REVIEW_URL, WHATSAPP_BOOKING_URL],
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

export function buildTopicStructuredData(
  slug: string,
  title: string,
  description: string,
  faq: TopicFaqItem[],
) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}${slug}#webpage`,
        url: `${SITE_URL}${slug}`,
        name: title,
        description,
        inLanguage: 'es-CO',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#business` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${SITE_URL}${slug}#faq`,
        mainEntity: faq.map((item) => ({
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
