'use client'

import { useEffect, useRef } from 'react'
import { useCanvasMousePosition } from '../hooks/useMousePosition'
import { useTheme } from '../context/ThemeContext'
import {
  getParticleConfig,
  createParticles,
  updateParticles,
  type Particle,
} from '../lib/particles'

const SMOOTHING = 0.12

export default function InteractiveSparkles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useCanvasMousePosition()
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const dimsRef = useRef({ w: 0, h: 0 })
  const { theme } = useTheme()
  const themeRef = useRef(theme)

  useEffect(() => {
    themeRef.current = theme
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMouseDevice = window.matchMedia('(pointer: fine)').matches

    // ── Modo estático (reduced-motion o touch) ──
    if (isReduced || !isMouseDevice) {
      const staticSparkles = Array.from({ length: 14 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        alpha: Math.random() * 0.5 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        phase: Math.random() * Math.PI * 2,
      }))

      const renderStatic = () => {
        if (!canvas || !ctx) return
        const w = (dimsRef.current.w = canvas.width = canvas.offsetWidth)
        const h = (dimsRef.current.h = canvas.height = canvas.offsetHeight)
        ctx.clearRect(0, 0, w, h)

        const dark = document.documentElement.classList.contains('dark')
        const baseColor = dark ? '255, 238, 186' : '255, 212, 37'
        const glowMult = dark ? 0.25 : 0.12

        staticSparkles.forEach((s) => {
          const flicker = 0.5 + 0.5 * Math.sin(Date.now() * s.speed + s.phase)
          const x = (s.x / 100) * w
          const y = (s.y / 100) * h
          const alpha = s.alpha * flicker
          const size = s.size * (0.8 + 0.4 * flicker)

          ctx.beginPath()
          ctx.arc(x, y, size * 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${baseColor}, ${alpha * glowMult})`
          ctx.fill()

          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${baseColor}, ${alpha})`
          ctx.fill()
        })

        rafRef.current = requestAnimationFrame(renderStatic)
      }

      renderStatic()
      return () => cancelAnimationFrame(rafRef.current)
    }

    // ── Modo interactivo (mouse) ──
    const resize = () => {
      if (!canvas) return
      dimsRef.current.w = canvas.width = canvas.offsetWidth
      dimsRef.current.h = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let cfg = getParticleConfig(document.documentElement.classList.contains('dark'))
    particlesRef.current = createParticles(dimsRef.current.w, dimsRef.current.h, cfg)

    const smoothMouse = { x: -1000, y: -1000 }

    const animate = () => {
      if (!canvas || !ctx) return

      cfg = getParticleConfig(document.documentElement.classList.contains('dark'))

      const raw = mouseRef.current
      smoothMouse.x += (raw.x - smoothMouse.x) * SMOOTHING
      smoothMouse.y += (raw.y - smoothMouse.y) * SMOOTHING

      updateParticles(
        particlesRef.current,
        cfg,
        smoothMouse.x,
        smoothMouse.y,
        dimsRef.current.w,
        dimsRef.current.h,
        ctx,
      )

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [mouseRef])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  )
}
