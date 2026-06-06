# Rayito de Sol — Diseño Visual

**Fecha:** 2026-06-06
**Proyecto:** Rayito de Sol — Landing page de psicología
**Stack:** React 19 + Vite 8 + Tailwind v4 + Framer Motion 12 + Lenis
**URL:** [rayito-de-sol.vercel.app](https://rayito-de-sol.vercel.app)

---

## 1. Brand DNA

### Personalidad
Rayito de Sol es una marca de psicología que combina:

| Dimensión | Expresión visual |
|-----------|-----------------|
| **Cálida y acogedora** | Tonos suaves, amigable, cercana, transmite contención y confort |
| **Elegante y confiable** | Seriedad clínica y expertise — sin ser fría |
| **Vibrante y juvenil** | Energía positiva, rayitos de sol como símbolo de transformación |
| **Orgánica y natural** | El crecimiento personal como un proceso orgánico que florece |

### Inspiración central
> **"La noche estrellada de Van Gogh, pero de día"** — Un cielo en movimiento con azules profundos que se aclaran, con destellos dorados flotando como rayitos de sol.

---

## 2. Paleta de Colores

### Inspiración: cielo diurno al estilo Van Gogh

```
Azul profundo  ──▶  Cerúleo  ──▶  Cielo medio  ──▶  Azul suave  ──▶  Blanco nube
   #1E3A5F          #4A90D9        #7BB8E8          #A8D8EA          #F7F9FC
```

### Colores del sistema

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-primary` | `#1E3A5F` | Fondos oscuros, headers, títulos principales |
| `--color-secondary` | `#4A90D9` | Acentos secundarios, enlaces, hover states |
| `--color-accent` | `#F5C842` | **Oro solar** — CTAs, botones, destellos, rayitos |
| `--color-accent-soft` | `#F9E07A` | Versión suave del acento, glows, badges |
| `--color-sky-light` | `#A8D8EA` | Fondos de secciones alternas |
| `--color-sky-pale` | `#D6EAF8` | Fondos muy suaves, tarjetas |
| `--color-bg` | `#F7F9FC` | Fondo general (blanco cielo) |
| `--color-text` | `#1A1A2E` | Texto principal (casi negro) |
| `--color-text-soft` | `#5A6A7E` | Texto secundario |
| `--color-border` | `#E5E9F0` | Bordes y separadores |

### Gradientes clave
- **Hero:** `linear-gradient(170deg, #1E3A5F 0%, #4A90D9 30%, #7BB8E8 55%, #A8D8EA 75%, #D6EAF8 90%, #F7F9FC 100%)`
- **Acento:** `linear-gradient(135deg, #F5C842, #F9E07A)` — para badges y glow effects

---

## 3. Tipografía

### Familia única: Plus Jakarta Sans

```
Plus Jakarta Sans (Variable)
  ├── Light (300)    → Textos largos, descripciones
  ├── Regular (400)  → Cuerpo, párrafos
  ├── Medium (500)   → Subtítulos, nav links
  ├── SemiBold (600) → H3, H4, botones
  ├── Bold (700)     → H2, títulos de sección
  └── ExtraBold (800)→ H1, hero headline
```

### Escala tipográfica

| Nivel | Size | Weight | Letter-spacing | Uso |
|-------|------|--------|---------------|-----|
| H1 | `text-5xl md:text-7xl` | 800 (ExtraBold) | `-0.03em` | Hero headline |
| H2 | `text-3xl md:text-5xl` | 700 (Bold) | `-0.02em` | Títulos de sección |
| H3 | `text-xl md:text-2xl` | 600 (SemiBold) | `-0.01em` | Títulos de tarjetas |
| Body | `text-base md:text-lg` | 400 (Regular) | `0em` | Párrafos |
| Small | `text-sm` | 400 (Regular) | `0.01em` | Metadata, captions |
| Eyebrow | `text-xs uppercase` | 600 (SemiBold) | `0.1em` | Etiquetas sobre títulos |
| Button | `text-base` | 600 (SemiBold) | `0.02em` | CTAs |

---

## 4. Estructura de la Página

### Navegación

**Estilo:** Barra superior minimalista con línea divisoria sutil (no glassmorphism, no sombra).

```
🌟 Rayito                    Inicio · Enfoque · Servicios · Contacto
─────────────────────────────────────────────────────────────────────
```

- **Logo:** Texto "Rayito de Sol" con un icono de sol/estrella decorativo
- **Menu:** Links a secciones (scroll suave con Lenis)
- **Mobile:** Hamburger menu en esquina superior derecha
- **Estado:** Transparente inicialmente (se ve el hero), fondo blanco sutil al hacer scroll

### Secciones (orden)

```
1. HERO
   └── Cielo Van Gogh de fondo con destellos dorados animados
   └── Headline + Subheadline
   └── CTA principal: "Agendar una cita"
   └── Full viewport (min-h-[100dvh])

2. SOBRE MÍ
   └── Foto de la psicóloga (circular o con borde suave)
   └── Presentación personal + credentials
   └── Enfoque terapéutico en 2-3 líneas
   └── Fondo: blanco cielo (#F7F9FC)

3. MI ENFOQUE
   └── Título: "Mi enfoque" + eyebrow "Filosofía"
   └── Grid de 3 valores/principios con iconos decorativos
   └── Cada valor: icono dorado + título + descripción breve
   └── Fondo: azul muy suave (#D6EAF8)

4. SERVICIOS
   └── Título "Servicios" + eyebrow "¿Qué ofrezco?"
   └── Grid de tarjetas (2-3 columnas)
   └── Cada tarjeta: icono decorativo + título + descripción
   └── Fondo: blanco cielo (#F7F9FC)

5. FAQ
   └── Título + eyebrow "Preguntas frecuentes"
   └── Acordeón de 5-7 preguntas
   └── Fondo: azul muy suave (#D6EAF8)

6. INSTAGRAM FEED
   └── Título + eyebrow "Redes"
   └── Grid de últimos posts o embed visual
   └── Fondo: blanco cielo (#F7F9FC)

7. CONTACTO / AGENDAR
   └── Título "Agenda tu primera sesión"
   └── Formulario (nombre + email + mensaje)
   └── Botón de WhatsApp flotante o integrado
   └── Horarios y ubicación
   └── Fondo: gradiente sutil azul

8. FOOTER
   └── Logo + frase corta
   └── Redes sociales (Instagram, WhatsApp)
   └── Copyright
   └── Fondo: azul profundo (#1E3A5F), texto blanco
```

---

## 5. Animaciones y Movimiento

### Nivel: 🌤️ Sutil Brisa

Animaciones suaves, serenas, profesionales. Nada que distraiga de la experiencia.

| Elemento | Animación | Detalle |
|----------|-----------|---------|
| **Hero al cargar** | Fade-in + slide-up (800ms) | Título, subtítulo y CTA aparecen secuencialmente con delay |
| **Scroll reveal** | Fade-up | Cada sección aparece al hacer scroll: `translate-y-12 opacity-0 → translate-y-0 opacity-1` con blur suave |
| **Destellos dorados** | Parpadeo lento (CSS) | 3-4 puntos de luz flotan en el Hero con opacidad variable, ciclo de 4-6s |
| **Botones CTA** | Scale suave en hover | `scale-[1.02]` con transición de 300ms, sombra más intensa |
| **Tarjetas** | Lift en hover | Leve elevación + sombra más notoria al pasar el mouse |
| **FAQ acordeón** | Expand suave (300ms) | Altura animada con Framer Motion `AnimatePresence` |
| **Navbar** | Aparece al scroll | Barra se vuelve opaca sutilmente al hacer scroll hacia abajo |
| **Lenis scroll** | Smooth scroll (1.2s) | Easing personalizado: `t => Math.min(1, 1.001 - Math.pow(2, -10 * t))` |

### Reglas de animación
- Solo animar `transform` y `opacity` (GPU-safe)
- Sin animaciones en `top`, `left`, `width`, `height`
- `will-change: transform` solo en elementos animados activamente
- `prefers-reduced-motion: reduce` — desactivar todas las animaciones

---

## 6. Componentes Clave

### Botón CTA Primario
```css
/* Estilo */
bg-[#F5C842] text-[#1A1A2E] font-semibold px-8 py-4 rounded-full
hover:bg-[#E8B83A] shadow-lg shadow-[#F5C842]/30
transition-all duration-300 ease-out
```

### Tarjetas de Servicios
```css
/* Estilo */
bg-[#F7F9FC] border border-[#E5E9F0] rounded-2xl p-6
hover:shadow-lg hover:border-[#4A90D9]/20
transition-all duration-300
```

### Iconos decorativos
- La sección de Enfoque usa iconos (SVG inline) con color `#F5C842` (oro)
- La sección de Servicios usa iconos representativos con fondo redondeado sutil

### Formulario de Contacto
```css
/* Inputs */
bg-white border border-[#E5E9F0] rounded-xl px-4 py-3
focus:border-[#4A90D9] focus:ring-2 focus:ring-[#4A90D9]/10
transition-all duration-200
```

---

## 7. Design Tokens (Tailwind v4)

```css
@theme {
  /* Colores */
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
}
```

---

## 8. Mockups Generados

Los mockups visuales del brainstorming están en:
- `.superpowers/brainstorm/session-20260606-170831/content/` — screens HTML del Visual Companion

---

## 9. Notas Técnicas

- **SEO:** react-helmet-async configurado ✅ (Open Graph, meta tags, title por página)
- **Rendimiento:** Animaciones solo CSS + Framer Motion (sin Three.js ni Canvas pesados)
- **Responsive:** Mobile-first con Tailwind breakpoints (sm, md, lg)
- **Accesibilidad:** Contraste suficiente en todos los colores, `prefers-reduced-motion`
- **Fuentes:** Plus Jakarta Sans desde Google Fonts (variable font, carga optimizada)
- **Despliegue:** Vercel (ya conectado)
