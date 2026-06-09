# SunMotes — Modo Día Hero Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reemplazar el concepto fallido de nubes+rayos por partículas abstractas cálidas (SunMotes) en el modo día del Hero.

**Architecture:** Componente canvas con bucle requestAnimationFrame (misma arquitectura que InteractiveSparkles). 50-60 partículas cálidas flotando hacia arriba con parallax sutil de mouse. Sin dependencias adicionales.

**Tech Stack:** React 19, Canvas 2D, useCanvasMousePosition hook existente

---

### Task 1: Crear SunMotes.tsx

**Files:**
- Create: `src/components/SunMotes.tsx`
- Reference: `src/components/InteractiveSparkles.tsx` (arquitectura espejo)
- Reference: `src/hooks/useMousePosition.ts` (useCanvasMousePosition)

- [ ] **Step 1: Escribir SunMotes.tsx — estructura + particle system**

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { useCanvasMousePosition } from '../hooks/useMousePosition'

const COLORS = [
  '255, 212, 37',   // #FFD425 oro marca
  '255, 248, 231',  // #FFF8E7 blanco cálido
  '255, 234, 167',  // #FFEAA7 crema
  '255, 245, 214',  // #FFF5D6 dorado claro
]

interface Mote {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
  driftPhase: number
  driftSpeed: number
  floatSpeed: number
}

export default function SunMotes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useCanvasMousePosition()
  const motesRef = useRef<Mote[]>([])
  const rafRef = useRef<number>(0)
  const dimsRef = useRef({ w: 0, h: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMouseDevice = window.matchMedia('(pointer: fine)').matches

    // ── Render loop compartido ──
    const resize = () => {
      if (!canvas) return
      dimsRef.current.w = canvas.width = canvas.offsetWidth
      dimsRef.current.h = canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Inicializar motas (pool estático de 55) ──
    const COUNT = 55
    const motes: Mote[] = Array.from({ length: COUNT }, () => {
      const w = dimsRef.current.w || 1920
      const h = dimsRef.current.h || 1080
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        size: Math.random() * 14 + 4, // 4–18px
        alpha: Math.random() * 0.09 + 0.03, // 0.03–0.12
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        driftPhase: Math.random() * Math.PI * 2,
        driftSpeed: (Math.random() - 0.5) * 0.008,
        floatSpeed: Math.random() * 0.15 + 0.1, // ~0.1–0.25 px/frame
      }
    })
    motesRef.current = motes

    // ── Mouse smoothing ──
    const SMOOTHING = 0.06
    const smoothMouse = { x: -1000, y: -1000 }

    // ── Animación ──
    const animate = () => {
      if (!canvas || !ctx) return
      const w = dimsRef.current.w
      const h = dimsRef.current.h
      const raw = mouseRef.current

      // Smoother más lento (parallax muy sutil)
      smoothMouse.x += (raw.x - smoothMouse.x) * SMOOTHING
      smoothMouse.y += (raw.y - smoothMouse.y) * SMOOTHING

      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < motes.length; i++) {
        const p = motes[i]

        // Movimiento ascendente lento con deriva sinusoidal
        p.driftPhase += p.driftSpeed
        p.vy = -p.floatSpeed
        p.vx = Math.sin(p.driftPhase) * 0.12

        // Parallax sutil al mouse (factor ~5-8% del de InteractiveSparkles)
        // Fórmula: desplazamiento = (mousePos - particlePos) * factor Muy bajo
        const dx = smoothMouse.x - p.x
        const dy = smoothMouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 500 && dist > 0) {
          const force = (1 - dist / 500) * 0.008
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force * 0.5
        }

        p.x += p.vx
        p.y += p.vy

        // Respawn: cuando sale por arriba, reaparece abajo
        if (p.y < -p.size * 2) {
          p.y = h + p.size * 2
          p.x = Math.random() * w
          p.size = Math.random() * 14 + 4
          p.alpha = Math.random() * 0.09 + 0.03
          p.color = COLORS[Math.floor(Math.random() * COLORS.length)]
          p.floatSpeed = Math.random() * 0.15 + 0.1
        }
        if (p.x < -p.size * 2) p.x = w + p.size * 2
        if (p.x > w + p.size * 2) p.x = -p.size * 2

        // ── Dibujar glow suave ──
        // Glow exterior grande y difuso
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.25})`
        ctx.fill()

        // Glow medio
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha * 0.55})`
        ctx.fill()

        // Núcleo
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.35})`
        ctx.fill()
      }

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
```

- [ ] **Step 2: Verificar que el archivo existe y es válido**

Run: `npx tsc --noEmit --pretty src/components/SunMotes.tsx 2>&1`
Expected: Sin errores de compilación

---

### Task 2: Actualizar Hero.tsx

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Reemplazar imports en Hero.tsx**

Cambiar:
```
import SunRays from './SunRays'
```
por:
```
import SunMotes from './SunMotes'
```

- [ ] **Step 2: Reemplazar render en modo día**

Cambiar:
```
<SunRays />
```
por:
```
<SunMotes />
```

---

### Task 3: Eliminar SunRays.tsx

**Files:**
- Delete: `src/components/SunRays.tsx`

- [ ] **Step 1: Eliminar el archivo**

Run: `Remove-Item -LiteralPath "src/components/SunRays.tsx" -Force`
Expected: Archivo eliminado

---

### Task 4: Verificar build

- [ ] **Step 1: Build de producción**

Run: `npm run build 2>&1`
Expected: tsc + vite build exitoso, sin errores

- [ ] **Step 2: Lint**

Run: `npm run lint 2>&1`
Expected: Sin errores de lint
