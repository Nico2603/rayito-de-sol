'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

export default function DayMode() {
  const shouldReduceMotion = useReducedMotion()

  const mouseXRaw = useMotionValue(0.5)
  const mouseYRaw = useMotionValue(0.5)

  const springX = useSpring(mouseXRaw, { stiffness: 40, damping: 25 })
  const springY = useSpring(mouseYRaw, { stiffness: 40, damping: 25 })

  const glowX = useTransform(springX, [0, 1], [-6, 6])
  const glowY = useTransform(springY, [0, 1], [-6, 6])

  const cloudX = useTransform(springX, [0, 1], [-3, 3])
  const cloudY = useTransform(springY, [0, 1], [-2, 2])

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseXRaw.set(e.clientX / window.innerWidth)
      mouseYRaw.set(e.clientY / window.innerHeight)
    }
    const handleLeave = () => {
      mouseXRaw.set(0.5)
      mouseYRaw.set(0.5)
    }
    window.addEventListener('mousemove', handleMouse, { passive: true })
    document.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMouse)
      document.removeEventListener('mouseleave', handleLeave)
    }
  }, [mouseXRaw, mouseYRaw])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* ☀️ Sol difuminado desde el centro */}
      <motion.div
        className="absolute inset-0"
        style={{ x: shouldReduceMotion ? 0 : glowX, y: shouldReduceMotion ? 0 : glowY }}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '80vmax',
            aspectRatio: '1',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,212,37,0.40) 0%, rgba(255,212,37,0.15) 25%, rgba(255,229,102,0.06) 45%, transparent 65%)',
          }}
        />
      </motion.div>

      {/* ⛅ Nubes en U en la parte inferior — con blur + respiración suave */}
      <motion.div
        className="absolute inset-0"
        style={{ x: shouldReduceMotion ? 0 : cloudX, y: shouldReduceMotion ? 0 : cloudY }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-[55%]"
          style={{ filter: 'blur(18px)', animation: 'cloudBreathe 6s ease-in-out infinite' }}
        >
          <svg viewBox="0 0 100 50" preserveAspectRatio="xMidYMax slice" className="w-full h-full" fill="white">
            {/* ── Ala izquierda de la U ── */}
            <ellipse cx="0" cy="50" rx="16" ry="12" opacity="0.70" />
            <ellipse cx="8" cy="44" rx="12" ry="9" opacity="0.55" />
            <ellipse cx="14" cy="38" rx="10" ry="7" opacity="0.40" />
            <ellipse cx="18" cy="33" rx="8" ry="5" opacity="0.25" />

            {/* ── Base inferior de la U ── */}
            <ellipse cx="25" cy="52" rx="14" ry="10" opacity="0.55" />
            <ellipse cx="40" cy="54" rx="16" ry="11" opacity="0.60" />
            <ellipse cx="55" cy="55" rx="18" ry="12" opacity="0.70" />
            <ellipse cx="70" cy="54" rx="16" ry="11" opacity="0.60" />
            <ellipse cx="82" cy="52" rx="14" ry="10" opacity="0.55" />

            {/* ── Ala derecha de la U ── */}
            <ellipse cx="86" cy="33" rx="8" ry="5" opacity="0.25" />
            <ellipse cx="90" cy="38" rx="10" ry="7" opacity="0.40" />
            <ellipse cx="94" cy="44" rx="12" ry="9" opacity="0.55" />
            <ellipse cx="100" cy="50" rx="16" ry="12" opacity="0.70" />

            {/* ── Capa extra de profundidad ── */}
            <ellipse cx="0" cy="58" rx="20" ry="8" opacity="0.35" />
            <ellipse cx="50" cy="60" rx="30" ry="12" opacity="0.40" />
            <ellipse cx="100" cy="58" rx="20" ry="8" opacity="0.35" />
          </svg>
        </div>
      </motion.div>

      <style>{`
        @keyframes cloudBreathe {
          0%, 100% { opacity: 0.85; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
