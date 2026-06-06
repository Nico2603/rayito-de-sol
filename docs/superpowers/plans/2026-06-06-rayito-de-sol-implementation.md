# Rayito de Sol — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the full Rayito de Sol landing page with Van Gogh sky visual identity, smooth animations, and 7 sections.

**Architecture:** Single-page React app with Framer Motion for scroll reveals and animations, Lenis for smooth scrolling, and Tailwind v4 with custom theme tokens. All sections are components composed in `Home.tsx`.

**Tech Stack:** React 19, Vite 8, Tailwind v4, Framer Motion 12, Lenis, Plus Jakarta Sans

**Assets disponibles:**
- `src/assets/hero.png` — Imagen principal del hero
- `src/assets/images/MariaCamilaFace.webp` — Foto de la psicóloga (Sobre mí)
- `src/assets/images/Graduation-Diploma.webp` — Diploma/Credentials
- `src/assets/images/Practica1Kids.webp` — Foto de práctica
- `src/assets/images/WorkStation.webp` — Espacio de trabajo

---

## File Structure

### Modificar:
- `src/index.css` — Agregar Tailwind theme tokens y estilos base
- `src/App.tsx` — Mantener Lenis, agregar Navbar global
- `src/pages/Home.tsx` — Componer todas las secciones
- `src/components/Hero.tsx` — Reescribir con cielo Van Gogh

### Crear:
- `src/components/Navbar.tsx` — Barra de navegación minimalista
- `src/components/About.tsx` — Sección Sobre mí
- `src/components/Approach.tsx` — Sección Mi enfoque
- `src/components/Services.tsx` — Sección Servicios
- `src/components/FAQ.tsx` — Sección FAQ
- `src/components/InstagramFeed.tsx` — Sección Instagram
- `src/components/Contact.tsx` — Sección Contacto/Agendar
- `src/components/Footer.tsx` — Footer
- `src/components/Sparkles.tsx` — Componente de destellos dorados animados
- `src/components/SectionWrapper.tsx` — Wrapper de sección con scroll reveal + fondo alternado
- `src/data/services.ts` — Datos de servicios
- `src/data/faq.ts` — Preguntas frecuentes
- `src/data/approach.ts` — Valores del enfoque

---

### Task 1: Configurar Tailwind Theme y CSS Base

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Escribir los tokens de tema y estilos base en `src/index.css`**

```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap');

@theme {
  /* Colores - Paleta Cielo Van Gogh */
  --color-sky-deep: #1E3A5F;
  --color-sky-cerulean: #4A90D9;
  --color-sky-mid: #7BB8E8;
  --color-sky-soft: #A8D8EA;
  --color-sky-pale: #D6EAF8;
  --color-sky-white: #F7F9FC;
  --color-sun: #F5C842;
  --color-sun-soft: #F9E07A;
  --color-text-primary: #1A1A2E;
  --color-text-secondary: #5A6A7E;
  --color-border-light: #E5E9F0;

  /* Tipografía */
  --font-sans: 'Plus Jakarta Sans', sans-serif;

  /* Animaciones */
  --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);

  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
}

/* Lenis smooth scrolling */
html.lenis { scroll-behavior: auto; }
html.lenis-smooth { scroll-behavior: auto; }
html.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }

/* Custom scrollbar */
::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #94A3B8; }

/* Selection */
::selection { background-color: rgba(245, 200, 66, 0.3); color: #1A1A2E; }

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/index.css
git commit -m "style: add Tailwind theme tokens with Van Gogh sky palette"
```

---

### Task 2: Crear el componente de Destellos Dorados (Sparkles)

**Files:**
- Create: `src/components/Sparkles.tsx`

- [ ] **Step 1: Crear `src/components/Sparkles.tsx`**

```tsx
import { useEffect, useState } from 'react'

interface Sparkle {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export default function Sparkles({ count = 6 }: { count?: number }) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])

  useEffect(() => {
    const items: Sparkle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 3,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 3,
    }))
    setSparkles(items)
  }, [count])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-sun"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: 0,
            animation: `sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            boxShadow: `0 0 ${s.size * 3}px ${s.size}px rgba(245, 200, 66, 0.3)`,
          }}
        />
      ))}
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 0.8; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Sparkles.tsx
git commit -m "feat: add Sparkles component with golden glow animation"
```

---

### Task 3: Crear SectionWrapper con Scroll Reveal

**Files:**
- Create: `src/components/SectionWrapper.tsx`

- [ ] **Step 1: Crear `src/components/SectionWrapper.tsx`**

```tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  className?: string
  id?: string
}

export default function SectionWrapper({ children, className = '', id }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/SectionWrapper.tsx
git commit -m "feat: add SectionWrapper with Framer Motion scroll reveal"
```

---

### Task 4: Navbar

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Crear `src/components/Navbar.tsx`**

```tsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Enfoque', href: '#approach' },
  { label: 'Servicios', href: '#services' },
  { label: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-sky-white/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className={`transition-all duration-500 ${scrolled ? 'border-b border-border-light' : 'border-b border-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button onClick={() => handleClick('#hero')} className="flex items-center gap-2 text-text-primary font-bold text-lg tracking-tight">
              <span className="text-sun text-xl">✦</span>
              Rayito de Sol
            </button>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="text-sm font-medium text-text-secondary hover:text-sky-deep transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menú"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-text-primary transition-colors"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-text-primary"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-text-primary"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-sky-white/95 backdrop-blur-xl border-b border-border-light"
          >
            <nav className="flex flex-col px-4 py-6 gap-4">
              {links.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleClick(link.href)}
                  className="text-left text-lg font-medium text-text-primary py-2 hover:text-sun transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: add Navbar with mobile menu and scroll effect"
```

---

### Task 5: Hero Section con Cielo Van Gogh

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Reescribir `src/components/Hero.tsx`**

```tsx
import { motion } from 'framer-motion'
import Sparkles from './Sparkles'

export default function Hero() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Van Gogh sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-deep via-sky-cerulean via-sky-mid via-sky-soft to-sky-pale" />

      {/* Sparkles overlay */}
      <Sparkles count={8} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sun-soft font-semibold text-sm md:text-base uppercase tracking-[0.2em] mb-6">
            Psicología &amp; Bienestar
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight leading-[0.95]">
            Rayito de{' '}
            <span className="text-sun">Sol</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            Un espacio seguro para tu bienestar emocional.
            <br />
            Acompañamiento psicológico con calidez, profesionalismo y compromiso.
          </p>
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-sun text-text-primary font-semibold px-8 py-4 rounded-full text-lg shadow-lg shadow-sun/30 hover:shadow-xl hover:shadow-sun/40 transition-all duration-300"
          >
            Agendar una cita
          </motion.button>
        </motion.div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-sky-pale pointer-events-none" />
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: redesign Hero with Van Gogh sky gradient and sparkles"
```

---

### Task 6: About Section (Sobre mí)

**Files:**
- Create: `src/components/About.tsx`

- [ ] **Step 1: Crear `src/components/About.tsx`**

```tsx
import SectionWrapper from './SectionWrapper'
import MariaCamilaFace from '../assets/images/MariaCamilaFace.webp'

export default function About() {
  return (
    <SectionWrapper id="about" className="bg-sky-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
              <img
                src={MariaCamilaFace}
                alt="María Camila - Psicóloga"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
            {/* Decorative ring */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-sun/30 -z-10" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-sky-pale/50 -z-10" />
          </div>

          {/* Content */}
          <div>
            <p className="text-sun font-semibold text-xs uppercase tracking-[0.2em] mb-3">
              Sobre mí
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">
              Hola, soy{' '}
              <span className="text-sky-deep">María Camila</span>
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Psicóloga apasionada por el bienestar emocional y el crecimiento personal.
                Mi enfoque combina la calidez humana con el rigor profesional, creando un
                espacio seguro donde puedas sentirte escuchado y acompañado.
              </p>
              <p>
                Creo firmemente en el proceso orgánico de la terapia: cada persona tiene
                las herramientas para sanar, y mi labor es guiarte a descubrirlas.
              </p>
              <p>
                Titulada con enfoque en terapia cognitivo-conductual y atención a la
                diversidad. Con experiencia en acompañamiento individual, infantil y familiar.
              </p>
            </div>

            {/* Credentials badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              <span className="bg-sky-pale/60 text-sky-deep text-sm font-medium px-4 py-2 rounded-full">
                🎓 Psicóloga Titulada
              </span>
              <span className="bg-sky-pale/60 text-sky-deep text-sm font-medium px-4 py-2 rounded-full">
                🧠 TCC
              </span>
              <span className="bg-sky-pale/60 text-sky-deep text-sm font-medium px-4 py-2 rounded-full">
                👶 Atención Infantil
              </span>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: add About section with photo and credentials"
```

---

### Task 7: Approach Section (Mi Enfoque)

**Files:**
- Create: `src/data/approach.ts`
- Create: `src/components/Approach.tsx`

- [ ] **Step 1: Crear `src/data/approach.ts`**

```ts
export interface ApproachValue {
  icon: string
  title: string
  description: string
}

export const approachValues: ApproachValue[] = [
  {
    icon: '🤝',
    title: 'Calidez y Confianza',
    description: 'Un espacio donde puedas ser tú sin juicios. La base de todo proceso terapéutico es sentirte en un lugar seguro.',
  },
  {
    icon: '🌱',
    title: 'Crecimiento Orgánico',
    description: 'No hay prisas. Cada proceso es único y florece a su propio ritmo. Te acompaño en tu camino sin forzar pasos.',
  },
  {
    icon: '🔬',
    title: 'Rigor Profesional',
    description: 'Técnicas basadas en evidencia, actualización constante y un enfoque estructurado pero flexible a tus necesidades.',
  },
]
```

- [ ] **Step 2: Crear `src/components/Approach.tsx`**

```tsx
import SectionWrapper from './SectionWrapper'
import { approachValues } from '../data/approach'

export default function Approach() {
  return (
    <SectionWrapper id="approach" className="bg-sky-pale/50 py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sun font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            Filosofía
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
            Mi enfoque
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Así concibo el acompañamiento psicológico
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {approachValues.map((item, i) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-8 border border-border-light hover:shadow-lg hover:border-sky-soft/30 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-sun/10 flex items-center justify-center text-2xl mb-5 group-hover:bg-sun/20 transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-text-primary mb-3">{item.title}</h3>
              <p className="text-text-secondary leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/approach.ts src/components/Approach.tsx
git commit -m "feat: add Approach section with value cards"
```

---

### Task 8: Services Section (Servicios)

**Files:**
- Create: `src/data/services.ts`
- Create: `src/components/Services.tsx`

- [ ] **Step 1: Crear `src/data/services.ts`**

```ts
export interface Service {
  icon: string
  title: string
  description: string
}

export const services: Service[] = [
  {
    icon: '💬',
    title: 'Terapia Individual',
    description: 'Espacio personalizado para trabajar ansiedad, depresión, autoestima y crecimiento personal. Sesiones online y presenciales.',
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Terapia Familiar',
    description: 'Acompañamiento a familias para mejorar la comunicación, resolver conflictos y fortalecer vínculos afectivos.',
  },
  {
    icon: '🧸',
    title: 'Atención Infantil',
    description: 'Terapia lúdica para niños. A través del juego y la expresión creativa, abordamos sus necesidades emocionales.',
  },
  {
    icon: '📱',
    title: 'Terapia Online',
    description: 'Sesiones virtuales desde la comodidad de tu hogar. Misma calidad y compromiso que la terapia presencial.',
  },
  {
    icon: '🌿',
    title: 'Talleres y Charlas',
    description: 'Espacios grupales sobre manejo del estrés, inteligencia emocional, crianza consciente y bienestar laboral.',
  },
]
```

- [ ] **Step 2: Crear `src/components/Services.tsx`**

```tsx
import SectionWrapper from './SectionWrapper'
import { services } from '../data/services'

export default function Services() {
  return (
    <SectionWrapper id="services" className="bg-sky-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sun font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            ¿Qué ofrezco?
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
            Servicios
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Acompañamiento psicológico adaptado a tus necesidades
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-6 border border-border-light hover:shadow-lg hover:border-sky-soft/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-sun/10 flex items-center justify-center text-xl mb-4">
                {service.icon}
              </div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">{service.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/services.ts src/components/Services.tsx
git commit -m "feat: add Services section with service cards"
```

---

### Task 9: FAQ Section

**Files:**
- Create: `src/data/faq.ts`
- Create: `src/components/FAQ.tsx`

- [ ] **Step 1: Crear `src/data/faq.ts`**

```ts
export interface FAQItem {
  question: string
  answer: string
}

export const faqItems: FAQItem[] = [
  {
    question: '¿Cuánto dura una sesión?',
    answer: 'Las sesiones tienen una duración de 50 a 60 minutos. La frecuencia recomendada es semanal, aunque se ajusta según tus necesidades y disponibilidad.',
  },
  {
    question: '¿Trabajas con EPS o medicina prepagada?',
    answer: 'Actualmente atiendo de forma particular. Puedo emitir factura para que solicites reembolso a tu aseguradora si tu plan lo cubre.',
  },
  {
    question: '¿Ofreces sesiones online?',
    answer: 'Sí, las sesiones online son a través de Google Meet o WhatsApp. Misma calidez y profesionalismo que la terapia presencial, desde donde estés.',
  },
  {
    question: '¿Cómo es la primera sesión?',
    answer: 'La primera sesión es un espacio de conocimiento mutuo. Hablaremos sobre lo que te trae a consulta, tus objetivos y resolveremos todas tus dudas sobre el proceso.',
  },
  {
    question: '¿A qué edades atiendes?',
    answer: 'Atiendo desde niños (a partir de 4 años) hasta adultos. Cada etapa tiene un enfoque adaptado a sus necesidades específicas.',
  },
  {
    question: '¿Cuál es el costo de la sesión?',
    answer: 'El valor de la sesión depende de la modalidad (presencial u online) y del tipo de terapia. Escríbeme y con gusto te daré toda la información.',
  },
]
```

- [ ] **Step 2: Crear `src/components/FAQ.tsx`**

```tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionWrapper from './SectionWrapper'
import { faqItems } from '../data/faq'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <SectionWrapper id="faq" className="bg-sky-pale/50 py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sun font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            Preguntas frecuentes
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
            FAQ
          </h2>
        </div>

        <div className="space-y-3">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-border-light overflow-hidden transition-shadow duration-300 hover:shadow-md"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-medium text-text-primary pr-4">{item.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sun text-xl shrink-0"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 text-text-secondary leading-relaxed">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/data/faq.ts src/components/FAQ.tsx
git commit -m "feat: add FAQ section with accordion animation"
```

---

### Task 10: Instagram Feed Section

**Files:**
- Create: `src/components/InstagramFeed.tsx`

- [ ] **Step 1: Crear `src/components/InstagramFeed.tsx`**

```tsx
import SectionWrapper from './SectionWrapper'

export default function InstagramFeed() {
  return (
    <SectionWrapper id="instagram" className="bg-sky-white py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sun font-semibold text-xs uppercase tracking-[0.2em] mb-3">
            Redes
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 tracking-tight">
            Sígueme en Instagram
          </h2>
          <p className="text-text-secondary text-lg">
            Contenido sobre bienestar emocional, tips y reflexiones
          </p>
        </div>

        {/* Placeholder for Instagram embed */}
        <div className="bg-sky-pale/30 rounded-2xl border-2 border-dashed border-border-light p-12 text-center">
          <div className="text-5xl mb-4">📸</div>
          <p className="text-text-secondary font-medium mb-2">Instagram Feed</p>
          <p className="text-text-secondary text-sm">
            Aquí irá el embed de Instagram o la cuadrícula de posts.
          </p>
          <a
            href="https://instagram.com/rayitodesol.psicologia"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 text-sky-deep font-medium hover:text-sun transition-colors duration-200 underline underline-offset-4"
          >
            @rayitodesol.psicologia →
          </a>
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/InstagramFeed.tsx
git commit -m "feat: add Instagram Feed section with placeholder"
```

---

### Task 11: Contact Section

**Files:**
- Create: `src/components/Contact.tsx`

- [ ] **Step 1: Crear `src/components/Contact.tsx`**

```tsx
import SectionWrapper from './SectionWrapper'

export default function Contact() {
  return (
    <SectionWrapper id="contact" className="bg-gradient-to-b from-sky-white to-sky-pale py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {/* Info */}
          <div>
            <p className="text-sun font-semibold text-xs uppercase tracking-[0.2em] mb-3">
              Contacto
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-6 tracking-tight">
              Agenda tu{' '}
              <span className="text-sky-deep">primera sesión</span>
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Da el primer paso hacia tu bienestar. Escríbeme y te responderé a la brevedad para
              coordinar una cita.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sun/10 flex items-center justify-center text-xl shrink-0">
                  📍
                </div>
                <div>
                  <p className="font-medium text-text-primary">Ubicación</p>
                  <p className="text-text-secondary text-sm">Bogotá, Colombia</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sun/10 flex items-center justify-center text-xl shrink-0">
                  💬
                </div>
                <div>
                  <p className="font-medium text-text-primary">WhatsApp</p>
                  <p className="text-text-secondary text-sm">+57 300 000 0000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sun/10 flex items-center justify-center text-xl shrink-0">
                  📧
                </div>
                <div>
                  <p className="font-medium text-text-primary">Email</p>
                  <p className="text-text-secondary text-sm">hola@rayitodesol.com</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/573000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-8 bg-sun text-text-primary font-semibold px-8 py-4 rounded-full hover:bg-sun-soft transition-all duration-300 shadow-lg shadow-sun/30"
            >
              <span>Escríbeme por WhatsApp</span>
              <span>→</span>
            </a>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 border border-border-light shadow-sm">
            <h3 className="text-xl font-semibold text-text-primary mb-6">Envíame un mensaje</h3>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-1.5">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  className="w-full bg-sky-white border border-border-light rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-sky-cerulean focus:ring-2 focus:ring-sky-cerulean/10 transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-1.5">
                  Correo electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  className="w-full bg-sky-white border border-border-light rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-sky-cerulean focus:ring-2 focus:ring-sky-cerulean/10 transition-all duration-200"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-1.5">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Cuéntame brevemente cómo puedo ayudarte..."
                  className="w-full bg-sky-white border border-border-light rounded-xl px-4 py-3 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-sky-cerulean focus:ring-2 focus:ring-sky-cerulean/10 transition-all duration-200 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-sky-deep text-white font-semibold px-8 py-4 rounded-xl hover:bg-sky-deep/90 transition-all duration-300"
              >
                Enviar mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "feat: add Contact section with form and WhatsApp CTA"
```

---

### Task 12: Footer

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Crear `src/components/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer className="bg-sky-deep text-white/80 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-sun text-lg">✦</span>
            <span className="font-bold text-white text-lg">Rayito de Sol</span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/rayitodesol.psicologia"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sun transition-colors duration-200 text-sm"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/573000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sun transition-colors duration-200 text-sm"
            >
              WhatsApp
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Rayito de Sol. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: add Footer with social links and copyright"
```

---

### Task 13: Integrar todo en App.tsx y Home.tsx

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/pages/Home.tsx`

- [ ] **Step 1: Actualizar `src/pages/Home.tsx`**

```tsx
import { Helmet } from 'react-helmet-async'
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
        <meta property="og:url" content="https://rayito-de-sol.vercel.app" />
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
```

- [ ] **Step 2: Actualizar `src/App.tsx`** — envolver con Navbar

```tsx
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
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
    </>
  )
}
```

- [ ] **Step 3: Build y verificar**

Run: `npm run build`
Expected: Build exits with 0, no errors

- [ ] **Step 4: Commit**

```bash
git add src/pages/Home.tsx src/App.tsx
git commit -m "feat: integrate all sections into Home page"
```

---

### Task 14: Limpiar assets innecesarios

**Files:**
- Delete: `src/assets/react.svg`
- Delete: `src/assets/vite.svg`
- Modify: `public/favicon.svg` (opcional — actualizar al logo de Rayito de Sol)

- [ ] **Step 1: Eliminar assets del template Vite**

```bash
git rm src/assets/react.svg src/assets/vite.svg
```

- [ ] **Step 2: Commit**

```bash
git commit -m "chore: remove unused template assets"
```

---

### Task 15: Verificación final y lint

**Files:**
- Todo el proyecto

- [ ] **Step 1: Ejecutar lint**

Run: `npm run lint`
Expected: No errors (or 0 warnings if configured)

- [ ] **Step 2: Ejecutar build final de producción**

Run: `npm run build`
Expected: Build exits with 0

- [ ] **Step 3: Commit final**

```bash
git add -A
git commit -m "chore: final cleanup and build verification"
```
