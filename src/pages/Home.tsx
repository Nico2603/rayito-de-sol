import { Helmet } from 'react-helmet-async'
import { SITE_URL } from '../constants/social'
import Hero from '../components/Hero'
import About from '../components/About'
import Approach from '../components/Approach'
import Services from '../components/Services'
import FAQ from '../components/FAQ'
import InstagramFeed from '../components/InstagramFeed'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Rayito de Sol - Psicología | Bienestar Emocional</title>
        <meta name="description" content="Espacio seguro de acompañamiento psicológico. Terapia online y presencial en Bogotá con calidez y profesionalismo." />
        <meta property="og:title" content="Rayito de Sol - Psicología | Bienestar Emocional" />
        <meta property="og:description" content="Acompañamiento psicológico con calidez, profesionalismo y compromiso. Agenda tu primera sesión." />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:image" content={`${SITE_URL}/logo.webp`} />
        <meta name="twitter:image" content={`${SITE_URL}/logo.webp`} />
        <meta name="twitter:title" content="Rayito de Sol - Psicología" />
        <meta name="twitter:description" content="Espacio seguro para tu bienestar emocional." />
      </Helmet>

      <main>
        <Hero />
        <About />
        <Approach />
        <Services />
        <FAQ />
        <InstagramFeed />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
