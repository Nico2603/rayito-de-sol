# Reestructuración Conservadora — Plan de Implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dividir archivos grandes, mover datos a `data/`, organizar CSS en módulos, y crear carpeta `types/` — sin cambiar comportamiento ni romper animaciones.

**Architecture:** 7 pasos secuenciales, cada uno con verificación después de implementar. Orden diseñado para minimizar riesgo: primero lo más seguro (CSS, datos), luego lo más delicado (partículas).

**Tech Stack:** React 19, TypeScript 6, Vite 8, Tailwind 4, Framer Motion 12, Lenis

---

### Task 1: Modularizar styles — tokens.css + animations.css + base.css

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/animations.css`
- Create: `src/styles/base.css`
- Modify: `src/index.css` (convertir a barrel)

- [ ] **Step 1: Crear `src/styles/tokens.css`**

Contenido: la sección `@theme` + `@variant dark` + variables `:root` y `.dark`

```css
@import "tailwindcss";

@variant dark (&:where(.dark, .dark *));

@theme {
  --color-sky-deep: #1E3A5F;
  --color-sky-cerulean: #4A90D9;
  --color-sky-mid: #7BB8E8;
  --color-sky-soft: #A8D8EA;
  --color-sky-pale: #D6EAF8;
  --color-sky-white: #F7F9FC;
  --color-sun: #FFD425;
  --color-sun-soft: #FFE566;
  --color-sun-ink: #C48F0A;
  --color-night-deep: #0B1622;
  --color-night-mid: #162D50;
  --color-night-star: #F8FAE5;
  --color-night-purple: #2D1B69;
  --font-sans: 'Plus Jakarta Sans', sans-serif;
  --font-display: 'Fraunces', Georgia, serif;
  --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

:root {
  --color-bg-primary: #F7F9FC;
  --color-bg-secondary: #D6EAF8;
  --color-bg-card: #FFFFFF;
  --color-text-primary: #1A1A2E;
  --color-text-secondary: #5A6A7E;
  --color-text-placeholder: rgba(26, 26, 46, 0.5);
  --color-text-on-hero: rgba(255, 255, 255, 0.9);
  --color-border-light: #E5E9F0;
  --color-nav-bg: #FFFFFF;
  --color-accent-label: #C48F0A;
  --color-accent-highlight: #1E3A5F;
  --color-accent-icon: #1E3A5F;
  --color-accent-badge-bg: rgba(214, 234, 248, 0.6);
  --color-accent-badge-text: #1E3A5F;
  --color-btn-secondary-bg: #1E3A5F;
  --color-btn-secondary-text: #FFFFFF;
  --gradient-hero: linear-gradient(180deg, #1E3A5F 0%, #4A90D9 30%, #7BB8E8 55%, #A8D8EA 82%, #D6EAF8 100%);
  --gradient-hero-scrim: radial-gradient(ellipse 85% 52% at 50% 40%, rgb(30 58 95 / 0.48) 0%, rgb(30 58 95 / 0.12) 45%, transparent 72%);
  --gradient-hero-horizon: linear-gradient(to top, rgba(214, 234, 248, 0.7) 0%, rgba(168, 216, 234, 0.15) 50%, transparent 100%);
}

.dark {
  --color-bg-primary: #0F1923;
  --color-bg-secondary: #162D50;
  --color-bg-card: #1A2744;
  --color-text-primary: #F1F5F9;
  --color-text-secondary: #B8C5D4;
  --color-text-placeholder: rgba(241, 245, 249, 0.45);
  --color-text-on-hero: rgba(255, 255, 255, 0.92);
  --color-border-light: #1E3A5F;
  --color-nav-bg: rgba(15, 25, 35, 0.9);
  --color-accent-label: #FFD425;
  --color-accent-highlight: #FFE566;
  --color-accent-icon: #FFD425;
  --color-accent-badge-bg: rgba(255, 212, 37, 0.15);
  --color-accent-badge-text: #FFD425;
  --color-btn-secondary-bg: #1E3A5F;
  --color-btn-secondary-text: #FFFFFF;
  --gradient-hero: linear-gradient(180deg, #070E18 0%, #0B1622 25%, #162D50 50%, #1E3A5F 75%, #0F1923 100%);
  --gradient-hero-scrim: radial-gradient(ellipse 85% 52% at 50% 40%, rgb(255 212 37 / 0.10) 0%, rgb(255 212 37 / 0.03) 45%, transparent 72%);
  --gradient-hero-horizon: linear-gradient(to top, rgba(15, 25, 35, 0.8) 0%, rgba(22, 45, 80, 0.2) 50%, transparent 100%);
}
```

- [ ] **Step 2: Crear `src/styles/animations.css`**

Contenido: keyframes + theme transitions + reduced motion

```css
/* ── Theme Transitions ── */
html,
html *,
html *::before,
html *::after {
  transition:
    background-color 0.4s ease,
    color 0.3s ease,
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

@media (prefers-reduced-motion: reduce) {
  html,
  html *,
  html *::before,
  html *::after {
    transition: none !important;
  }
}

/* ── Sparkle Keyframe ── */
@keyframes sparkle {
  0%, 100% { opacity: 0; scale: 0.5; }
  50% { opacity: 0.8; scale: 1; }
}

/* ── Reduced Motion ── */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 3: Crear `src/styles/base.css`**

Contenido: Lenis, scrollbar, selection, body defaults, hero glows

```css
/* ── Lenis Smooth Scroll ── */
html.lenis { scroll-behavior: auto; }
html.lenis-smooth { scroll-behavior: auto; }
html.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }

/* ── Scrollbar ── */
html { scrollbar-width: thin; scrollbar-color: var(--color-border-light) transparent; }
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--color-border-light); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #94A3B8; }

/* ── Selection ── */
::selection { background-color: rgba(255, 212, 37, 0.35); color: var(--color-text-primary); }

/* ── Hero Text Glow ── */
.hero-subcopy-glow-light {
  text-shadow:
    0 1px 2px rgb(30 58 95 / 0.9),
    0 4px 20px rgb(30 58 95 / 0.65),
    0 0 40px rgb(30 58 95 / 0.4);
}
.hero-subcopy-glow-dark {
  text-shadow:
    0 1px 2px rgb(7 14 24 / 0.95),
    0 4px 24px rgb(7 14 24 / 0.8),
    0 0 60px rgb(255 212 37 / 0.25);
}

/* ── Base ── */
html { background-color: var(--color-bg-primary); }
body { background-color: var(--color-bg-primary); color: var(--color-text-primary); }
input::placeholder, textarea::placeholder { color: var(--color-text-placeholder); }
```

- [ ] **Step 4: Convertir `src/index.css` en barrel**

```css
@import './styles/tokens.css';
@import './styles/animations.css';
@import './styles/base.css';
```

- [ ] **Step 5: Verificar que build y dev sigan funcionando**

Run: `npm run build`
Expected: Build exitoso sin errores

Run: `npm run lint`
Expected: Sin errores de lint

- [ ] **Step 6: Commit**

```bash
git add src/index.css src/styles/
git commit -m "refactor: modularizar styles/ en tokens, animations y base"
```

---

### Task 2: Extraer datos hardcodeados a data/ (hero, footer, navigation)

**Files:**
- Create: `src/data/hero.ts`
- Create: `src/data/navigation.ts`
- Create: `src/data/footer.ts`
- Modify: `src/components/Hero.tsx` (importar desde data/)
- Modify: `src/components/Navbar.tsx` (importar links desde data/)
- Modify: `src/components/Footer.tsx` (importar desde data/)

- [ ] **Step 1: Crear `src/data/hero.ts`**

```typescript
export const HERO_LABEL = 'Psicología & Bienestar'

export const HERO_TITLE_MAIN = 'Rayito de '
export const HERO_TITLE_ACCENT = 'Sol'

export const HERO_TAGLINE_START = 'Un espacio seguro para tu '
export const HERO_TAGLINE_ACCENT = 'bienestar emocional'
export const HERO_TAGLINE_END = '.'

export const HERO_SUBCOPY = 'Acompañamiento psicológico con calidez, profesionalismo y compromiso.'

export const HERO_CTA_TEXT = 'Agendar una cita'
```

- [ ] **Step 2: Crear `src/data/navigation.ts`**

```typescript
export interface NavLink {
  label: string
  href: string
}

export const navLinks: NavLink[] = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Enfoque', href: '#approach' },
  { label: 'Servicios', href: '#services' },
  { label: 'Contacto', href: '#contact' },
]
```

- [ ] **Step 3: Crear `src/data/footer.ts`**

```typescript
export const FOOTER_COPYRIGHT = 'Rayito de Sol. Todos los derechos reservados.'
```

- [ ] **Step 4: Modificar `src/components/Hero.tsx`**

AGREGAR al inicio:
```typescript
import { HERO_LABEL, HERO_TITLE_MAIN, HERO_TITLE_ACCENT, HERO_TAGLINE_START, HERO_TAGLINE_ACCENT, HERO_TAGLINE_END, HERO_SUBCOPY, HERO_CTA_TEXT } from '../data/hero'
```

REEMPLAZAR línea 102: `Psicología &amp; Bienestar` → `{HERO_LABEL}`

REEMPLAZAR líneas 110-111:
```tsx
{HERO_TITLE_MAIN}
<span className="text-sun">{HERO_TITLE_ACCENT}</span>
```

REEMPLAZAR líneas 119-122:
```tsx
<>
  <p>...{HERO_TAGLINE_START}<span className="text-sun-soft">{HERO_TAGLINE_ACCENT}</span>{HERO_TAGLINE_END}</p>
  <p>...{HERO_SUBCOPY}</p>
</>
```

REEMPLAZAR línea 139: `Agendar una cita` → `{HERO_CTA_TEXT}`

- [ ] **Step 5: Modificar `src/components/Navbar.tsx`**

AGREGAR al inicio:
```typescript
import { navLinks } from '../data/navigation'
```

ELIMINAR las líneas 6-12 (el array `const links = [...]`)

REEMPLAZAR todas las referencias de `links` por `navLinks` (ya que el array se llamaba `links` en el componente)

- [ ] **Step 6: Modificar `src/components/Footer.tsx`**

AGREGAR al inicio:
```typescript
import { FOOTER_COPYRIGHT } from '../data/footer'
```

REEMPLAZAR línea 38: `&copy; {new Date().getFullYear()} Rayito de Sol. Todos los derechos reservados.` → `&copy; {new Date().getFullYear()} {FOOTER_COPYRIGHT}`

- [ ] **Step 7: Verificar build**

Run: `npm run build`
Expected: Build exitoso

Run: `npm run lint`
Expected: Sin errores

- [ ] **Step 8: Commit**

```bash
git add src/data/hero.ts src/data/navigation.ts src/data/footer.ts src/components/Hero.tsx src/components/Navbar.tsx src/components/Footer.tsx
git commit -m "refactor: extraer textos a data/ (hero, navigation, footer)"
```

---

### Task 3: Separar lógica de partículas — lib/particles.ts

**Files:**
- Create: `src/lib/particles.ts`
- Modify: `src/components/InteractiveSparkles.tsx` (simplificar)

- [ ] **Step 1: Crear `src/lib/particles.ts`**

Extraer: tipo Particle, getConfig, createParticles, física, render loop

```typescript
export interface Particle {
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

export interface ParticleConfig {
  count: number
  maxDist: number
  attraction: number
  drift: number
  baseSizeRange: [number, number]
  alphaRange: [number, number]
  glowMult: number
  colorInner: string
  colorOuter: string
}

export function getParticleConfig(isDark: boolean): ParticleConfig {
  return isDark
    ? {
        count: 60,
        maxDist: 220,
        attraction: 0.05,
        drift: 0.18,
        baseSizeRange: [2, 5],
        alphaRange: [0.35, 0.7],
        glowMult: 0.12,
        colorInner: '255, 248, 214',
        colorOuter: '255, 212, 37',
      }
    : {
        count: 40,
        maxDist: 180,
        attraction: 0.03,
        drift: 0.10,
        baseSizeRange: [1.5, 3.5],
        alphaRange: [0.15, 0.4],
        glowMult: 0.06,
        colorInner: '255, 248, 214',
        colorOuter: '255, 200, 50',
      }
}

export function createParticles(w: number, h: number, cfg: ParticleConfig): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < cfg.count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
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
  return particles
}

export function updateParticles(
  particles: Particle[],
  cfg: ParticleConfig,
  mouseX: number,
  mouseY: number,
  w: number,
  h: number,
  ctx: CanvasRenderingContext2D,
): void {
  const SMOOTHING = 0.12

  ctx.clearRect(0, 0, w, h)

  particles.forEach((p) => {
    p.orbit += p.orbitSpeed
    p.vx += Math.sin(p.orbit) * 0.015
    p.vy -= cfg.drift * 0.01

    const dx = mouseX - p.x
    const dy = mouseY - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < cfg.maxDist && dist > 0) {
      const force = (1 - dist / cfg.maxDist) * cfg.attraction
      p.vx += (dx / dist) * force
      p.vy += (dy / dist) * force

      const proximity = 1 - dist / cfg.maxDist
      p.targetAlpha = cfg.alphaRange[0] + proximity * (1 - cfg.alphaRange[0])
      p.size = p.baseSize * (1 + proximity * 0.8)

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

    // Gradiente radial
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
    gradient.addColorStop(0, `rgba(${cfg.colorInner}, ${alpha})`)
    gradient.addColorStop(0.3, `rgba(${cfg.colorOuter}, ${alpha * 0.6})`)
    gradient.addColorStop(1, `rgba(${cfg.colorOuter}, 0)`)
    ctx.fillStyle = gradient
    ctx.fill()

    // Punto central
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.7})`
    ctx.fill()
  })
}

export function createStaticSparkles() {
  return Array.from({ length: 14 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    alpha: Math.random() * 0.5 + 0.2,
    speed: Math.random() * 0.02 + 0.005,
    phase: Math.random() * Math.PI * 2,
  }))
}

export function renderStaticSparkles(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
): void {
  const dark = document.documentElement.classList.contains('dark')
  const baseColor = dark ? '255, 238, 186' : '255, 212, 37'
  const glowMult = dark ? 0.25 : 0.12
  const sparkles = createStaticSparkles()

  sparkles.forEach((s) => {
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
}
```

- [ ] **Step 2: Reescribir `src/components/InteractiveSparkles.tsx`**

Simplificar para que solo tenga el canvas ref, efectos, y loop render — la lógica pura vive en `lib/particles.ts`.

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { useCanvasMousePosition } from '../hooks/useMousePosition'
import { useTheme } from '../context/ThemeContext'
import {
  getParticleConfig,
  createParticles,
  updateParticles,
  createStaticSparkles,
  renderStaticSparkles,
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

    // ── Modo estático ──
    if (isReduced || !isMouseDevice) {
      const renderStatic = () => {
        if (!canvas || !ctx) return
        const w = (dimsRef.current.w = canvas.width = canvas.offsetWidth)
        const h = (dimsRef.current.h = canvas.height = canvas.offsetHeight)
        ctx.clearRect(0, 0, w, h)
        renderStaticSparkles(ctx, w, h)
        rafRef.current = requestAnimationFrame(renderStatic)
      }
      renderStatic()
      return () => cancelAnimationFrame(rafRef.current)
    }

    // ── Modo interactivo ──
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
```

- [ ] **Step 3: Verificar**

Run: `npm run build`
Expected: Build exitoso

Probar manual: `npm run dev`, abrir el hero, verificar que las partículas se muevan con el mouse, cambiar tema, verificar que las partículas se adapten (día/noche).

- [ ] **Step 4: Commit**

```bash
git add src/lib/particles.ts src/components/InteractiveSparkles.tsx
git commit -m "refactor: separar lógica de partículas a lib/particles.ts"
```

---

### Task 4: Extraer datos de contacto a data/contact.ts

**Files:**
- Create: `src/data/contact.ts`
- Modify: `src/components/Contact.tsx` (importar datos)

- [ ] **Step 1: Crear `src/data/contact.ts`**

```typescript
export const CONTACT_SECTION_LABEL = 'Contacto'
export const CONTACT_HEADING_START = 'Agenda tu '
export const CONTACT_HEADING_ACCENT = 'primera sesión'
export const CONTACT_SUBCOPY =
  'Da el primer paso hacia tu bienestar. Escríbeme y te responderé a la brevedad para coordinar una cita.'

export interface ContactInfoItem {
  icon: 'map-pin' | 'whatsapp' | 'mail'
  title: string
  value: string
}

export const contactInfoItems: ContactInfoItem[] = [
  { icon: 'map-pin', title: 'Ubicación', value: 'Pereira, Colombia' },
  { icon: 'whatsapp', title: 'WhatsApp', value: '+57 321 648 0414' },
  { icon: 'mail', title: 'Email', value: 'hola@rayitodesol.com' },
]

export const FORM_TITLE = 'Envíame un mensaje'

export interface FormField {
  id: string
  label: string
  type: 'text' | 'email' | 'textarea'
  placeholder: string
}

export const formFields: FormField[] = [
  { id: 'name', label: 'Nombre', type: 'text', placeholder: 'Tu nombre' },
  { id: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'tu@correo.com' },
  { id: 'message', label: 'Mensaje', type: 'textarea', placeholder: 'Cuéntame brevemente cómo puedo ayudarte...' },
]

export const FORM_SUBMIT_TEXT = 'Enviar mensaje'
export const WHATSAPP_CTA_TEXT = 'Escríbeme por WhatsApp'
```

- [ ] **Step 2: Modificar `src/components/Contact.tsx`**

AGREGAR imports:
```typescript
import { CONTACT_SECTION_LABEL, CONTACT_HEADING_START, CONTACT_HEADING_ACCENT, CONTACT_SUBCOPY, contactInfoItems, FORM_TITLE, formFields, FORM_SUBMIT_TEXT, WHATSAPP_CTA_TEXT, type ContactInfoItem } from '../data/contact'
```

REEMPLAZAR el contenido textual del componente usando las constantes importadas.

- [ ] **Step 3: Verificar**

Run: `npm run build`
Expected: Build exitoso

- [ ] **Step 4: Commit**

```bash
git add src/data/contact.ts src/components/Contact.tsx
git commit -m "refactor: extraer datos de contacto a data/contact.ts"
```

---

### Task 5: Crear carpeta types/ — Instagram types

**Files:**
- Create: `src/types/instagram.ts`
- Create: `src/types/components.ts`
- Create: `src/types/theme.ts`
- Verify: imports existentes no se rompen

- [ ] **Step 1: Crear `src/types/instagram.ts`**

```typescript
export interface InstagramPost {
  id: string
  shortcode: string
  permalink: string
  thumbnailUrl: string
  isVideo: boolean
  caption?: string
}

export type InstagramFeedSource = 'live' | 'fallback'

export interface InstagramFeedResult {
  posts: InstagramPost[]
  source: InstagramFeedSource
}

export type InstagramFallbackPost = {
  shortcode: string
  isVideo: boolean
  caption: string
}

export type FeedState =
  | { status: 'loading' }
  | { status: 'success'; posts: InstagramPost[] }
  | { status: 'error' }
```

- [ ] **Step 2: Crear `src/types/components.ts`**

```typescript
import type { LucideIcon } from 'lucide-react'

export interface Service {
  icon: LucideIcon
  title: string
  description: string
}

export interface ApproachValue {
  icon: LucideIcon
  title: string
  description: string
}

export interface FAQItem {
  question: string
  answer: string
}
```

- [ ] **Step 3: Crear `src/types/theme.ts`**

```typescript
export type Theme = 'light' | 'dark'

export interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}
```

- [ ] **Step 4: Modificar `src/lib/instagram-api.ts`**

AGREGAR al inicio:
```typescript
import type { InstagramPost, InstagramFeedResult } from '../types/instagram'
```

ELIMINAR las interfaces duplicadas:
- `export interface InstagramPost` (líneas 3-10)
- `export type InstagramFeedSource` (línea 12)
- `export interface InstagramFeedResult` (líneas 14-17)

- [ ] **Step 5: Modificar `src/data/instagram-posts.ts`**

AGREGAR al inicio:
```typescript
import type { InstagramFallbackPost } from '../types/instagram'
```

REEMPLAZAR `export type InstagramFallbackPost = { ... }` por solo el array (el tipo ahora está en types/)

- [ ] **Step 6: Modificar `src/hooks/useInstagramFeed.ts`**

REEMPLAZAR `import type { InstagramPost } from '../lib/instagram-api'` 
POR `import type { InstagramPost, FeedState } from '../types/instagram'`

ELIMINAR la declaración local de tipo `FeedState` (líneas 4-7)

- [ ] **Step 7: Modificar `src/data/services.ts`**

AGREGAR al inicio:
```typescript
import type { Service } from '../types/components'
```

ELIMINAR la interfaz duplicada `export interface Service` (líneas 4-8)

- [ ] **Step 8: Modificar `src/data/approach.ts`**

AGREGAR al inicio:
```typescript
import type { ApproachValue } from '../types/components'
```

ELIMINAR la interfaz duplicada `export interface ApproachValue` (líneas 4-8)

- [ ] **Step 9: Modificar `src/data/faq.ts`**

AGREGAR al inicio:
```typescript
import type { FAQItem } from '../types/components'
```

ELIMINAR la interfaz duplicada `export interface FAQItem` (líneas 1-4)

- [ ] **Step 10: Modificar `src/context/ThemeContext.tsx`**

AGREGAR al inicio:
```typescript
import type { Theme, ThemeContextType } from '../types/theme'
```

REEMPLAZAR `type Theme = 'light' | 'dark'` y `interface ThemeContextType { ... }` por los imports.

- [ ] **Step 11: Verificar build**

Run: `npm run build`
Expected: Build exitoso sin errores de tipos

Run: `npm run lint`
Expected: Sin errores

- [ ] **Step 12: Commit**

```bash
git add src/types/ src/lib/instagram-api.ts src/data/instagram-posts.ts src/hooks/useInstagramFeed.ts src/data/services.ts src/data/approach.ts src/data/faq.ts src/context/ThemeContext.tsx
git commit -m "refactor: crear carpeta types/ con tipos compartidos"
```

---

### Task 6: Verificación final con Graphify

- [ ] **Step 1: Actualizar grafo**

Run: `graphify update .`
Expected: `graph.json, graph.html and GRAPH_REPORT.md updated`

- [ ] **Step 2: Comparar métricas**

Run: Leer `graphify-out/GRAPH_REPORT.md` y verificar que nodos/aristas se mantengan similares (~350-400 nodos, ~380-420 aristas).

- [ ] **Step 3: Git tag (opcional)**

```bash
git tag -a "v1.1.0" -m "refactor: reestructuración conservadora completa"
```

---

## Resumen de Archivos Creados (9 nuevos)

| Archivo | Propósito |
|---|---|
| `src/styles/tokens.css` | Variables CSS, `@theme`, light/dark tokens |
| `src/styles/animations.css` | Keyframes, theme transitions, reduced motion |
| `src/styles/base.css` | Scrollbar, selection, Lenis, hero glow, body defaults |
| `src/data/hero.ts` | Textos del Hero |
| `src/data/navigation.ts` | Links de navegación |
| `src/data/footer.ts` | Texto de copyright |
| `src/data/contact.ts` | Campos del formulario + info de contacto |
| `src/lib/particles.ts` | Lógica pura de partículas (física, render, configuración) |
| `src/types/instagram.ts` | InstagramPost, FeedState, InstagramFallbackPost |
| `src/types/components.ts` | Service, ApproachValue, FAQItem |
| `src/types/theme.ts` | Theme, ThemeContextType |

## Archivos Modificados (10)

| Archivo | Cambio |
|---|---|
| `src/index.css` | Barrel que importa styles/*.css |
| `src/components/InteractiveSparkles.tsx` | Simplificado: solo canvas + efectos |
| `src/components/Navbar.tsx` | Importa navLinks de data/ |
| `src/components/Hero.tsx` | Importa textos de data/hero |
| `src/components/Footer.tsx` | Importa copyright de data/footer |
| `src/components/Contact.tsx` | Importa datos de data/contact |
| `src/lib/instagram-api.ts` | Usa tipos de types/ |
| `src/data/instagram-posts.ts` | Usa tipos de types/ |
| `src/hooks/useInstagramFeed.ts` | Usa tipos de types/ |
| `src/context/ThemeContext.tsx` | Usa tipos de types/ |

## Archivos NO tocados (13)

`About.tsx`, `Approach.tsx`, `Services.tsx`, `FAQ.tsx`, `SectionWrapper.tsx`, `Logo.tsx`, `MouseGlow.tsx`, `Sparkles.tsx`, `InstagramFeed.tsx`, `App.tsx`, `main.tsx`, `index.html`, `vite.config.ts`
