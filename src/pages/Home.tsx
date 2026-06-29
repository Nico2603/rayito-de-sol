import { Helmet } from 'react-helmet-async'
import {
  SEO_DESCRIPTION,
  SEO_KEYWORDS,
  SEO_OG_IMAGE,
  SEO_OG_IMAGE_ALT,
  SEO_OG_IMAGE_HEIGHT,
  SEO_OG_IMAGE_WIDTH,
  SEO_TITLE,
} from '../constants/seo'
import { SITE_URL } from '../constants/social'
import { buildHomeStructuredData } from '../lib/structured-data'
import Hero from '../components/Hero'
import About from '../components/About'
import Approach from '../components/Approach'
import Services from '../components/Services'
import FAQ from '../components/FAQ'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import InstagramFeed from '../components/InstagramFeed'
import Footer from '../components/Footer'

const structuredData = buildHomeStructuredData()

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{SEO_TITLE}</title>
        <meta name="description" content={SEO_DESCRIPTION} />
        <meta name="keywords" content={SEO_KEYWORDS} />
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="es_CO" />
        <meta property="og:site_name" content="Rayito de Sol — Psicología" />
        <meta property="og:title" content={SEO_TITLE} />
        <meta property="og:description" content={SEO_DESCRIPTION} />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={SEO_OG_IMAGE} />
        <meta property="og:image:width" content={String(SEO_OG_IMAGE_WIDTH)} />
        <meta property="og:image:height" content={String(SEO_OG_IMAGE_HEIGHT)} />
        <meta property="og:image:alt" content={SEO_OG_IMAGE_ALT} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={SEO_TITLE} />
        <meta name="twitter:description" content={SEO_DESCRIPTION} />
        <meta name="twitter:image" content={SEO_OG_IMAGE} />
        <meta name="twitter:image:alt" content={SEO_OG_IMAGE_ALT} />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <main>
        <Hero />
        <About />
        <Approach />
        <Services />
        <FAQ />
        <Testimonials />
        <Contact />
        <InstagramFeed />
        <Footer />
      </main>
    </>
  )
}
