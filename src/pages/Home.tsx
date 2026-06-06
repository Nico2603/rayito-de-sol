import { Helmet } from 'react-helmet-async'
import Hero from '../components/Hero'

function Home() {
  return (
    <>
      <Helmet>
        <title>Rayito de Sol - Psicología</title>
        <meta
          name="description"
          content="Espacio seguro de acompañamiento psicológico. Terapia online y presencial con calidez y profesionalismo."
        />
      </Helmet>

      <main>
        <Hero />
      </main>
    </>
  )
}

export default Home
