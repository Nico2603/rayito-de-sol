'use client'

import { useEffect, useRef } from 'react'
import { useCanvasMousePosition } from '../hooks/useMousePosition'
import { useTheme } from '../context/ThemeContext'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseSize: number
  alpha: number
  targetAlpha: number
  life: number
  maxLife: number
  orbit: number
  orbitSpeed: number
}

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

    // Parámetros según tema
    const getConfig = () => {
      const dark = document.documentElement.classList.contains('dark')
      return dark
        ? {
            // 🌙 Noche: luciérnagas brillantes, más contraste
            count: 60,
            maxDist: 220,
            attraction: 0.05,
            drift: 0.18,
            baseSizeRange: [2, 5] as [number, number],
            alphaRange: [0.35, 0.7] as [number, number],
            glowMult: 0.12,
            colorInner: '255, 248, 214',
            colorOuter: '255, 212, 37',
          }
        : {
            // ☀️ Día: motas de polvo de sol, sutiles
            count: 40,
            maxDist: 180,
            attraction: 0.03,
            drift: 0.10,
            baseSizeRange: [1.5, 3.5] as [number, number],
            alphaRange: [0.15, 0.4] as [number, number],
            glowMult: 0.06,
            colorInner: '255, 248, 214',
            colorOuter: '255, 200, 50',
          }
    }

    let cfg = getConfig()

    // Inicializar partículas
    const particles: Particle[] = []
    for (let i = 0; i < cfg.count; i++) {
      particles.push({
        x: Math.random() * dimsRef.current.w,
        y: Math.random() * dimsRef.current.h,
        vx: 0,
        vy: 0,
        size: Math.random() * (cfg.baseSizeRange[1] - cfg.baseSizeRange[0]) + cfg.baseSizeRange[0],
        baseSize: Math.random() * (cfg.baseSizeRange[1] - cfg.baseSizeRange[0]) + cfg.baseSizeRange[0],
        alpha: Math.random() * (cfg.alphaRange[1] - cfg.alphaRange[0]) + cfg.alphaRange[0],
        targetAlpha: Math.random() * (cfg.alphaRange[1] - cfg.alphaRange[0]) + cfg.alphaRange[0],
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100,
        orbit: Math.random() * Math.PI * 2,
        orbitSpeed: (Math.random() - 0.5) * 0.02,
      })
    }
    particlesRef.current = particles

    // Mouse smoothing (lerp)
    const smoothMouse = { x: -1000, y: -1000 }

    const animate = () => {
      if (!canvas || !ctx) return

      // Re-evaluar config si cambió el tema
      cfg = getConfig()

      const raw = mouseRef.current
      smoothMouse.x += (raw.x - smoothMouse.x) * SMOOTHING
      smoothMouse.y += (raw.y - smoothMouse.y) * SMOOTHING

      const w = dimsRef.current.w
      const h = dimsRef.current.h

      ctx.clearRect(0, 0, w, h)

      particles.forEach((p) => {
        // Movimiento de deriva suave
        p.orbit += p.orbitSpeed
        p.vx += Math.sin(p.orbit) * 0.015
        p.vy -= cfg.drift * 0.01

        // Atracción hacia el mouse
        const dx = smoothMouse.x - p.x
        const dy = smoothMouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < cfg.maxDist && dist > 0) {
          const force = (1 - dist / cfg.maxDist) * cfg.attraction
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force

          // Brillan más cerca del mouse
          const proximity = 1 - dist / cfg.maxDist
          p.targetAlpha = cfg.alphaRange[0] + proximity * (1 - cfg.alphaRange[0])
          p.size = p.baseSize * (1 + proximity * 0.8)

          // Glow extra alrededor de partículas cerca del mouse
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * (4 + proximity * 6), 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${cfg.colorOuter}, ${proximity * cfg.glowMult * 1.5})`
          ctx.fill()
        } else {
          p.life += 0.5
          if (p.life > p.maxLife) {
            p.life = 0
            p.maxLife = 100 + Math.random() * 150
          }
          const lifeRatio = p.life / p.maxLife
          p.targetAlpha = Math.sin(lifeRatio * Math.PI) * (cfg.alphaRange[1] - 0.05) + 0.05
          p.size = p.baseSize * (0.8 + 0.4 * Math.sin(lifeRatio * Math.PI))

          if (dist > cfg.maxDist * 2 && Math.random() < 0.001) {
            p.x = Math.random() * w
            p.y = Math.random() * h * 0.3
          }
        }

        p.vx *= 0.97
        p.vy *= 0.97
        p.alpha += (p.targetAlpha - p.alpha) * 0.05

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 3) {
          p.vx = (p.vx / speed) * 3
          p.vy = (p.vy / speed) * 3
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) { p.x = 0; p.vx *= -0.5 }
        if (p.x > w) { p.x = w; p.vx *= -0.5 }
        if (p.y < 0) { p.y = 0; p.vy *= -0.5 }
        if (p.y > h) { p.y = h; p.vy *= -0.5 }

        const alpha = Math.max(0, Math.min(1, p.alpha))
        if (alpha < 0.01) return

        // Dibujar gradiente radial
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        gradient.addColorStop(0, `rgba(${cfg.colorInner}, ${alpha})`)
        gradient.addColorStop(0.3, `rgba(${cfg.colorOuter}, ${alpha * 0.6})`)
        gradient.addColorStop(1, `rgba(${cfg.colorOuter}, 0)`)
        ctx.fillStyle = gradient
        ctx.fill()

        // Punto central brillante
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.7})`
        ctx.fill()
      })

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
