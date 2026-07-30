import {
  CONTACT_EMAIL,
  GOOGLE_MAPS_URL,
  GOOGLE_REVIEW_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  SITE_URL,
  WHATSAPP_BOOKING_URL,
  WHATSAPP_PHONE_E164,
} from '../constants/social'
import {
  PROFESSIONAL_ALUMNI,
  PROFESSIONAL_CREDENTIALS,
  PROFESSIONAL_DESCRIPTION,
  PROFESSIONAL_FULL_NAME,
  PROFESSIONAL_JOB_TITLE,
  PROFESSIONAL_KNOWS_ABOUT,
  PROFESSIONAL_SHORT_NAME,
} from '../constants/credentials'
import {
  SEO_AREA_SERVED,
  SEO_LATITUDE,
  SEO_LOCALITY,
  SEO_LONGITUDE,
  SEO_OPENING_HOURS,
  SEO_OG_IMAGE,
  SEO_PRICE_RANGE,
  SEO_SERVICE_CATALOG,
  SEO_SITE_NAME,
} from '../constants/seo'
import { faqItems } from '../data/faq'

export interface TopicFaqItem {
  question: string
  answer: string
}

export interface BreadcrumbItem {
  name: string
  path: string
}

function personNode() {
  const telephone = `+${WHATSAPP_PHONE_E164}`

  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: PROFESSIONAL_FULL_NAME,
    givenName: PROFESSIONAL_SHORT_NAME,
    jobTitle: PROFESSIONAL_JOB_TITLE,
    description: PROFESSIONAL_DESCRIPTION,
    url: `${SITE_URL}/sobre-maria-camila`,
    image: SEO_OG_IMAGE,
    email: CONTACT_EMAIL,
    telephone,
    worksFor: { '@id': `${SITE_URL}/#business` },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: PROFESSIONAL_ALUMNI.name,
      url: PROFESSIONAL_ALUMNI.url,
    },
    hasCredential: PROFESSIONAL_CREDENTIALS.map((credential) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: credential.category,
      recognizedBy: {
        '@type': 'Organization',
        name: credential.issuer,
      },
    })),
    knowsAbout: [...PROFESSIONAL_KNOWS_ABOUT],
    sameAs: [LINKEDIN_URL, INSTAGRAM_URL],
  }
}

function businessNode() {
  const telephone = `+${WHATSAPP_PHONE_E164}`

  return {
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
      addressLocality: SEO_LOCALITY.city,
      addressRegion: SEO_LOCALITY.region,
      addressCountry: SEO_LOCALITY.country,
    },
    sameAs: [
      INSTAGRAM_URL,
      LINKEDIN_URL,
      GOOGLE_MAPS_URL,
      GOOGLE_REVIEW_URL,
      WHATSAPP_BOOKING_URL,
    ],
  }
}

function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SEO_SITE_NAME,
    url: SITE_URL,
    inLanguage: 'es-CO',
    publisher: { '@id': `${SITE_URL}/#business` },
  }
}

function faqPageNode(id: string, faq: TopicFaqItem[]) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

function breadcrumbNode(path: string, items: BreadcrumbItem[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${path}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path === '/' ? '/' : item.path}`,
    })),
  }
}

function speakableNode(pageUrl: string, cssSelectors: string[]) {
  return {
    '@type': 'WebPage',
    '@id': `${pageUrl}#speakable`,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  }
}

export function buildHomeStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(),
      businessNode(),
      faqPageNode(`${SITE_URL}/#faq`, faqItems),
      speakableNode(`${SITE_URL}/`, ['#hero h1', '#faq h2', '.faq-answer']),
    ],
  }
}

export function buildPersonPageStructuredData(
  title: string,
  description: string,
  breadcrumbs: BreadcrumbItem[],
) {
  const pageUrl = `${SITE_URL}/sobre-maria-camila`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(),
      businessNode(),
      {
        '@type': 'ProfilePage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: 'es-CO',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#person` },
        mainEntity: { '@id': `${SITE_URL}/#person` },
      },
      breadcrumbNode('/sobre-maria-camila', breadcrumbs),
      speakableNode(pageUrl, ['#about-pro h1', '#about-pro .direct-answer']),
    ],
  }
}

export function buildTopicStructuredData(
  slug: string,
  title: string,
  description: string,
  faq: TopicFaqItem[],
  serviceName: string,
  breadcrumbs: BreadcrumbItem[],
) {
  const pageUrl = `${SITE_URL}${slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(),
      businessNode(),
      {
        '@type': 'MedicalWebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: 'es-CO',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#business` },
        mainEntity: {
          '@type': 'Service',
          name: serviceName,
          provider: { '@id': `${SITE_URL}/#person` },
          areaServed: SEO_LOCALITY.city,
        },
        author: { '@id': `${SITE_URL}/#person` },
      },
      faqPageNode(`${pageUrl}#faq`, faq),
      breadcrumbNode(slug, breadcrumbs),
      speakableNode(pageUrl, ['main h1', 'main .direct-answer']),
    ],
  }
}

export function buildArticleStructuredData(
  slug: string,
  title: string,
  description: string,
  faq: TopicFaqItem[],
  breadcrumbs: BreadcrumbItem[],
  datePublished: string,
  dateModified: string,
) {
  const pageUrl = `${SITE_URL}${slug}`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      websiteNode(),
      personNode(),
      businessNode(),
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: title,
        description,
        url: pageUrl,
        inLanguage: 'es-CO',
        datePublished,
        dateModified,
        author: { '@id': `${SITE_URL}/#person` },
        publisher: { '@id': `${SITE_URL}/#business` },
        image: SEO_OG_IMAGE,
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
      },
      {
        '@type': 'MedicalWebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: 'es-CO',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        about: { '@id': `${SITE_URL}/#business` },
      },
      faqPageNode(`${pageUrl}#faq`, faq),
      breadcrumbNode(slug, breadcrumbs),
      speakableNode(pageUrl, ['main h1', 'main .direct-answer', 'main .guia-section h2']),
    ],
  }
}

export function buildHomeStructuredDataJson(): string {
  return JSON.stringify(buildHomeStructuredData(), null, 2)
}
