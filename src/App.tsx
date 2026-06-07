import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Navbar from './components/Navbar'
import Home from './pages/Home'

export default function App() {
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

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <SpeedInsights />
    </>
  )
}
