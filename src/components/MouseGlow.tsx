'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useSpringMousePosition } from '../hooks/useMousePosition'
import { useTheme } from '../context/ThemeContext'

/**
 * Resplandor radial que sigue el cursor con física spring.
 * Se adapta al tema: día → rayos de sol, noche → resplandor lunar/luciérnagas.
 */
export default function MouseGlow() {
  const shouldReduceMotion = useReducedMotion()
  const { x, y } = useSpringMousePosition({ stiffness: 80, damping: 25 })
  const { theme } = useTheme()

  if (shouldReduceMotion) return null

  const isDark = theme === 'dark'

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        width: '70vmax',
        height: '70vmax',
        background: isDark
          ? 'radial-gradient(circle, rgba(255,220,120,0.18) 0%, rgba(255,200,80,0.08) 25%, rgba(255,180,60,0.03) 50%, transparent 72%)'
          : 'radial-gradient(circle, rgba(255,212,37,0.12) 0%, rgba(255,229,102,0.06) 30%, rgba(255,212,37,0.02) 55%, transparent 72%)',
        borderRadius: '50%',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  )
}
