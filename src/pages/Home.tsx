import SeoHelmet from '../components/SeoHelmet'
import {
  SEO_DESCRIPTION,
  SEO_TITLE,
} from '../constants/seo'
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
      <SeoHelmet
        title={SEO_TITLE}
        description={SEO_DESCRIPTION}
        canonicalPath="/"
        structuredData={structuredData}
      />

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
