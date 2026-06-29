import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Lenis from 'lenis'
import GoogleAnalytics from './components/GoogleAnalytics'
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import PoliticaPrivacidad from './pages/PoliticaPrivacidad'
import PsicologiaInfantilPereira from './pages/PsicologiaInfantilPereira'
import TerapiaAnsiedadPereira from './pages/TerapiaAnsiedadPereira'
import { ThemeProvider } from './context/ThemeContext'

export default function App() {
  const location = useLocation()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return

    const target = location.hash
    const scrollToSection = () => {
      const element = document.querySelector(target)
      if (!element) return false
      element.scrollIntoView({ behavior: 'smooth' })
      return true
    }

    if (scrollToSection()) return

    const timeout = window.setTimeout(() => {
      scrollToSection()
    }, 160)

    return () => window.clearTimeout(timeout)
  }, [location.hash, location.pathname])

  return (
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/terapia-ansiedad-pereira" element={<TerapiaAnsiedadPereira />} />
        <Route
          path="/psicologia-infantil-pereira"
          element={<PsicologiaInfantilPereira />}
        />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
      </Routes>
      <FloatingWhatsAppButton />
      <GoogleAnalytics />
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  )
}
