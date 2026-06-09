# Sistema de Diseño — Rayito de Sol 🌤️🌙

> **Landing page de psicología y bienestar emocional.**
> React 19 + TypeScript + Tailwind v4 + Framer Motion + Lenis + Vite 8.
> **Tema dual:** Día (Sol) / Noche (Luna) con persistencia en localStorage.

---

## 1. Brand & Personalidad

| Atributo | Valor |
|---|---|
| **Brand name** | Rayito de Sol |
| **Tagline** | Un espacio seguro para tu bienestar emocional |
| **Tono** | Cálido, profesional, acogedor, humano |
| **Audiencia** | Personas buscando apoyo psicológico (niños, adultos) |
| **Propuesta** | Acompañamiento psicológico con calidez, profesionalismo y compromiso |
| **Psicóloga** | María Camila |
| **Ubicación** | Bogotá, Colombia |
| **Paleta maestra** | "Cielo Van Gogh" (azules profundos → celestes) + "Sol" (dorados) |

---

## 2. Paleta de Colores

### 2.1 Colores Fijos (no cambian con tema)

| Token | Value | Uso |
|---|---|---|
| `--color-sky-deep` | `#1E3A5F` | Headings, badges, icon containers, submit buttons, brand accent oscuro |
| `--color-sky-cerulean` | `#4A90D9` | Input focus border/ring |
| `--color-sky-mid` | `#7BB8E8` | (reserva / gradientes) |
| `--color-sky-soft` | `#A8D8EA` | (reserva / gradientes) |
| `--color-sky-pale` | `#D6EAF8` | Badge backgrounds (día) |
| `--color-sky-white` | `#F7F9FC` | Body background (día) |
| `--color-sun` | `#FFD425` | Hero accent, CTA buttons, toggle sol, sparkles, branding |
| `--color-sun-soft` | `#FFE566` | Hero tagline, hover state CTA |
| `--color-sun-ink` | `#C48F0A` | Section labels (uppercase tracking), texto sobre sol |
| `--color-night-deep` | `#0B1622` | Hero top (noche) |
| `--color-night-mid` | `#162D50` | Section backgrounds (noche) |
| `--color-night-star` | `#F8FAE5` | (reserva) |
| `--color-night-purple` | `#2D1B69` | (reserva) |

### 2.2 Variables de Tema (cambian con `.dark`)

| Token | Light (`:root`) | Dark (`.dark`) | Uso |
|---|---|---|---|
| `--color-bg-primary` | `#F7F9FC` | `#0F1923` | Fondo de secciones principales |
| `--color-bg-secondary` | `#D6EAF8` | `#162D50` | Secciones alternas (Approach, FAQ) |
| `--color-bg-card` | `#FFFFFF` | `#1A2744` | Cards, formularios, FAQ items |
| `--color-text-primary` | `#1A1A2E` | `#F1F5F9` | Texto principal, headings |
| `--color-text-secondary` | `#5A6A7E` | `#94A3B8` | Texto secundario, descripciones |
| `--color-border-light` | `#E5E9F0` | `#1E3A5F` | Bordes de cards, inputs, FAQ |
| `--color-nav-bg` | `rgba(247,249,252,0.9)` | `rgba(15,25,35,0.9)` | Fondo navbar al scrollear |
| `--color-btn-secondary-bg` | `#1E3A5F` *(fijo)* | `#1E3A5F` *(fijo)* | Fondo botón submit formulario |
| `--color-btn-secondary-text` | `#FFFFFF` *(fijo)* | `#FFFFFF` *(fijo)* | Texto botón submit formulario |

### 2.3 Gradientes de Tema

| Token | Light | Dark | Uso |
|---|---|---|---|
| `--gradient-hero` | `180deg, #1E3A5F → #4A90D9 → #7BB8E8 → #A8D8EA → #D6EAF8` | `180deg, #070E18 → #0B1622 → #162D50 → #1E3A5F → #0F1923` | Fondo hero |
| `--gradient-hero-scrim` | `radial 85% 52% at 50% 40%, rgba(30,58,95,0.48) → (0.12) → transparent` | `radial 85% 52% at 50% 40%, rgba(255,212,37,0.10) → (0.03) → transparent` | Vignette central para legibilidad |
| `--gradient-hero-horizon` | `to top, rgba(214,234,248,0.7) → (0.15) → transparent` | `to top, rgba(15,25,35,0.8) → (0.2) → transparent` | Bruma en el horizonte (bottom 38%) |

### 2.4 Gradientes de Componentes

| Componente | Light | Dark |
|---|---|---|
| **MouseGlow** | `radial(circle, rgba(255,212,37,0.12) → (0.06) → (0.02) → transparent 72%)` | `radial(circle, rgba(255,220,120,0.18) → (0.08) → (0.03) → transparent 72%)` |
| **InstagramIcon brand** | `linear(0% #1E3A5F → 45% #4A90D9 → 100% #FFD425)` | — |
| **InstagramIcon light** | `linear(0% #FFFFFF → 55% #FFE566 → 100% #FFD425)` | — |
| **WhatsAppIcon brand** | `linear(0% #1E3A5F → 100% #4A90D9)` | — |
| **WhatsAppIcon light** | `linear(0% #FFFFFF → 100% #FFE566)` | — |

---

## 3. Tipografía

### 3.1 Familias

| Rol | Font | Fallback | Variable |
|---|---|---|---|
| **Body** `--font-sans` | `'Plus Jakarta Sans'` | `sans-serif` | wght 200–800, italica 200–800 |
| **Display** `--font-display` | `'Fraunces'` | `Georgia, serif` | opsz 9–144, wght 400–700 |

### 3.2 Escala Tipográfica

| Class | Size | Line Height | Uso |
|---|---|---|---|
| `text-xs` | 12px | — | Labels de sección (uppercase) |
| `text-sm` | 14px | — | Tags, badges, secondary info |
| `text-base` | 16px | — | Párrafos base |
| `text-lg` | 18px | — | Body intro |
| `text-xl` | 20px | — | Subtítulos, hero copy |
| `text-2xl` | 24px | — | Hero tagline |
| `text-3xl` | 30px/36px | `tracking-tight` | Títulos de sección (mobile) |
| `text-5xl` | 48px | `tracking-tight` | Títulos de sección (desktop) |
| `text-6xl` | 60px | — | Hero (sm+) |
| `text-7xl` | 72px | `tracking-tight` | Hero (md+) |
| `text-8xl` | 96px | `tracking-tight` | Hero (lg+) |

### 3.3 Roles de Texto

| Elemento | Classes | Estilo |
|---|---|---|
| **Label sección** | `text-sun-ink font-semibold text-xs uppercase tracking-[0.2em] mb-3` | Dorado oscuro, tracking amplio |
| **H1 Hero** | `font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white mb-8 tracking-tight leading-[0.95]` | Fraunces bold, blanco, leading cerrado |
| **Hero tagline** | `font-display text-xl sm:text-2xl md:text-[1.75rem] text-white font-medium leading-snug` | Fraunces medium |
| **Hero copy** | `text-base sm:text-lg md:text-xl text-white/90 font-light leading-relaxed` | Plus Jakarta light |
| **H2 sección** | `font-display text-3xl md:text-5xl font-semibold mb-4/6 tracking-tight` | Fraunces semibold |
| **H3 card** | `text-xl font-semibold mb-3` → `text-lg font-semibold mb-2` | Plus Jakarta semibold |
| **Body card** | `leading-relaxed` → `text-sm leading-relaxed` | Plus Jakarta regular |
| **Nav link** | `text-sm font-medium` | Plus Jakarta medium |
| **Mobile nav link** | `text-lg font-medium` | Plus Jakarta medium |
| **FAQ question** | `font-medium` | Plus Jakarta medium |
| **Hero "Psicología & Bienestar"** | `text-sun-soft font-semibold text-sm md:text-base uppercase tracking-[0.2em]` | Dorado suave, uppercase |

### 3.4 Hero Text Glow

| Tema | Clase | text-shadow |
|---|---|---|
| **Light** | `.hero-subcopy-glow-light` | `0 1px 2px rgb(30 58 95 / 0.9), 0 4px 20px rgb(30 58 95 / 0.65), 0 0 40px rgb(30 58 95 / 0.4)` |
| **Dark** | `.hero-subcopy-glow-dark` | `0 1px 2px rgb(7 14 24 / 0.95), 0 4px 24px rgb(7 14 24 / 0.8), 0 0 60px rgb(255 212 37 / 0.25)` |

---

## 4. Espaciado & Layout

### 4.1 Contenedores

| Contexto | Max Width | Padding |
|---|---|---|
| **Page sections** | `max-w-6xl` | `px-4 sm:px-6 lg:px-8` |
| **Hero content** | `max-w-4xl` | `px-4` |
| **Hero subcopy** | `max-w-2xl` | — |
| **FAQ** | `max-w-3xl` | — |

### 4.2 Section Padding

| Breakpoint | Padding |
|---|---|
| **Mobile** | `py-24` (96px) |
| **Desktop (md+)** | `md:py-32` (128px) |

### 4.3 Grids

| Sección | Columnas | Gap |
|---|---|---|
| **About** | `grid md:grid-cols-2` | `gap-12 md:gap-16` |
| **Approach** | `grid md:grid-cols-3` | `gap-8` |
| **Services** | `grid sm:grid-cols-2` | `gap-6` |
| **Instagram** | `grid grid-cols-2 md:grid-cols-3` | `gap-3 md:gap-4` |
| **Contact** | `grid md:grid-cols-2` | `gap-12 md:gap-16` |
| **Footer** | `flex flex-col md:flex-row` | `gap-6` |

### 4.4 Component Spacing

| Elemento | Vertical |
|---|---|
| **Card icon → título** | `mb-5` (approach), `mb-4` (services) |
| **Card título → descripción** | `mb-3` (approach), `mb-2` (services) |
| **CTA button → arriba** | `mt-8` |
| **Section título → grid** | `mb-12` / `mb-16` |
| **Tag badges → arriba** | `mt-8` |
| **Nav links gap** | `gap-6` |
| **Mobile nav links gap** | `gap-4` |
| **FAQ items** | `space-y-3` |
| **Form fields** | `space-y-5` |
| **Contact info items** | `space-y-4` |
| **Hero copy blocks** | `space-y-4` / `mb-10` |
| **Navbar height** | `h-16` (64px) |
| **Hero min-height** | `min-h-[100dvh]` |

---

## 5. Bordes & Radios

| Elemento | Border Radius | Border |
|---|---|---|
| **Botón CTA** | `rounded-full` | — |
| **Botón submit** | `rounded-xl` (12px) | — |
| **Card (approach)** | `rounded-2xl` (16px) | `border` 1px |
| **Card (services)** | `rounded-2xl` (16px) | `border` 1px |
| **Card (contact form)** | `rounded-2xl` (16px) | `border` 1px + `shadow-sm` |
| **FAQ item** | `rounded-xl` (12px) | `border` 1px + `hover:shadow-md` |
| **Input fields** | `rounded-xl` (12px) | `border` 1px |
| **Icon containers** | `rounded-xl` (12px) | — |
| **Tag/badge** | `rounded-full` | — |
| **Instagram posts** | `rounded-2xl` (16px) | `border` 1px + `shadow-sm` |
| **Instagram skeleton** | `rounded-2xl` (16px) | `border` 1px |
| **Theme toggle** | `rounded-full` | — |
| **Video badge** | `rounded-full` | — |

---

## 6. Sombras

| Elemento | Sombra |
|---|---|
| **CTA button** | `shadow-lg shadow-sun/30` → `hover:shadow-xl hover:shadow-sun/40` |
| **Cards (approach)** | `hover:shadow-lg` |
| **Cards (services)** | — (border only) |
| **Contact form** | `shadow-sm` |
| **FAQ item** | `hover:shadow-md` |
| **Instagram posts** | `shadow-sm` → `hover:shadow-lg` |
| **Logo (default)** | `drop-shadow-[0_0_0.5px_rgb(30_58_95/0.7)] drop-shadow-[0_2px_5px_rgb(30_58_95/0.14)]` |
| **Logo (onDark)** | `drop-shadow-[0_0_0.55px_rgb(255_255_255/0.65)] drop-shadow-[0_0_8px_rgb(255_255_255/0.22)] drop-shadow-[0_2px_6px_rgb(30_58_95/0.35)]` |
| **Input focus ring** | `focus:ring-2 focus:ring-sky-cerulean/10` |
| **Sparkle glow** | `box-shadow: 0 0 ${size*3}px ${size}px rgba(255, 212, 37, 0.35)` |

---

## 7. Motion & Animaciones

### 7.1 Easing Curves

| Token | Cubic Bézier | Uso |
|---|---|---|
| `--ease-smooth` | `(0.22, 1, 0.36, 1)` | Entradas de sección, hero, FAQ accordion, mobile menu, botones, transiciones de hover |
| `--ease-spring` | `(0.32, 0.72, 0, 1)` | (reserva) |

### 7.2 Spring Physics

| Componente | stiffness | damping | Uso |
|---|---|---|---|
| **MouseGlow** | 80 | 25 | Seguimiento suave del resplandor |
| **useSpringMousePosition** (default) | 120 | 18 | Para otros usos de spring |

### 7.3 Section Entry (SectionWrapper)

| Propiedad | Valor |
|---|---|
| initial | `{ opacity: 0, y: 48 }` |
| animate | `{ opacity: 1, y: 0 }` |
| viewport | `{ once: true, margin: '-100px' }` |
| transition | `{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }` |

### 7.4 Hero Animations

| Elemento | Framer Variant | delay | duration |
|---|---|---|---|
| Label | `fadeUp` (opacity:0, y:24) | 0.05s | 0.75s |
| H1 | `fadeUp` | 0.12s | 0.8s |
| Tagline + copy | `fadeUp` | 0.22s | 0.8s |
| CTA button | `fadeUp` | 0.34s | 0.75s |
| Contenedor padre | `initial→animate` | — | 0.85s |

### 7.5 Efectos por modo (Hero)

| Modo | Componentes | Propósito |
|---|---|---|
| **☀️ Día** | `SunRays` + `MouseGlow` | God rays en canvas + resplandor solar |
| **🌙 Noche** | `InteractiveSparkles` | Luciérnagas interactivas, 60 partículas |

### 7.6 SunRays (God Rays — modo día)

| Parámetro | Valor |
|---|---|
| **Rayos** | 18 haces de luz desde arriba |
| **Apertura total** | 180° |
| **Largo** | 50–107% del viewport |
| **Animación** | Sway sinusoidal `sin(t * speed + phase) * 0.05` + influencia mouse `(mx-0.5)*0.2` |
| **Pulse** | Opacidad oscila 0.65–1.0 con `sin(t * speed * 0.6 + phase * 1.3)` |
| **Mouse** | Source se desplaza 15–85% del ancho × 4–10% del alto según cursor |
| **Mouse influence** | Los rayos se inclinan hacia el cursor: `(mx - 0.5) * 0.2` rad |
| **Sun glow** | Radial gradient en fuente: `rgba(255,220,80,0.12)` → `rgba(255,200,50,0.05)` → transparent |
| **Paleta** | RGB `(255, 212–242, 37–67)` — dorados cálidos |
| **Reduced motion** | Modo estático sin animación ni mouse tracking |

### 7.7 Interactive Particles (Luciérnagas — modo noche)

| Parámetro | Valor |
|---|---|
| **Count** | 60 |
| **Size Range** | 2–5px |
| **Alpha Range** | 0.35–0.70 |
| **Attraction** | 0.05 |
| **Drift** | 0.18 |
| **Glow Mult** | 0.12 |
| **Colors** | inner `255, 248, 214`, outer `255, 212, 37` |
| **Mouse smoothing lerp** | `0.12` |
| **Modo estático** | 14 partículas sin movimiento (reduced-motion o touch) |

### 7.8 CSS Animaciones

| Name | Keyframes | Uso |
|---|---|---|
| `sparkle` | `0%/100%: opacity 0, scale 0.5 → 50%: opacity 0.8, scale 1` | Sparkles estáticas (8, duración 3–6s) |

### 7.7 Lenis (Smooth Scroll)

| Propiedad | Valor |
|---|---|
| duration | 1.2 |
| easing | `1.001 - 2^(-10t)` |
| orientation | `vertical` |
| smoothWheel | `true` |
| wheelMultiplier | 1 |

### 7.8 Theme Transitions

| Propiedad | Duración | Easing |
|---|---|---|
| `background-color` | 0.4s | ease |
| `color` | 0.3s | ease |
| `border-color` | 0.3s | ease |
| `box-shadow` | 0.3s | ease |

Se desactivan todas si `prefers-reduced-motion: reduce`.

### 7.9 Navbar Transitions

| Elemento | Duración | Detalle |
|---|---|---|
| Navbar bg | 0.5s | transition-all |
| Navbar border | 0.5s | transition-all |
| Nav links color | 0.5s | transition-colors |
| Theme toggle | 0.3s | transition-all + hover:scale-110 |
| Hamburger color | 0.5s | transition-colors |
| Mobile menu | 0.3s | opacity + y, ease-smooth |

### 7.10 Instagram Grid Entries

| Propiedad | Valor |
|---|---|
| initial | `{ opacity: 0, y: 16 }` |
| whileInView | `{ opacity: 1, y: 0 }` |
| viewport | `{ once: true, margin: '-40px' }` |
| transition | duration 0.45s, delay staggered `index * 0.05s`, ease-smooth |
| Image hover | `transition-transform duration-500 group-hover:scale-105` |
| Overlay hover | `bg-sky-deep/0 → /25 transition-colors duration-300` |

---

## 8. Componentes

### 8.1 Navbar

| Estado | bg | border | text |
|---|---|---|---|
| **Top (no scrolled)** | `transparent` | `transparent` | `rgba(255,255,255,0.95)` |
| **Scrolled** | `var(--color-nav-bg) backdrop-blur-md` | `var(--color-border-light)` | `var(--color-text-primary)` |
| **Mobile menu** | `var(--color-bg-primary) backdrop-blur-xl` | `var(--color-border-light)` | `var(--color-text-primary)` |

- **Altura:** `h-16` (64px)
- **Breakpoint mobile:** `md:hidden` / `md:flex`
- **Logo variant:** `default` (scrolled) / `onDark` (top)
- **Theme toggle:** w-9 h-9 rounded-full, bg `var(--color-border-light)` o `rgba(255,255,255,0.15)`
- **Links hover:** `hover:text-sun`

### 8.2 Hero

- **Estructura (z-stack):** 1. `--gradient-hero` → 2. Efectos según modo (día: SunRays+MouseGlow+Sparkles / noche: InteractiveSparkles) → 3. `--gradient-hero-scrim` → 4. `--gradient-hero-horizon` → 5. Content (z-10)
- **Capa horizonte:** `absolute inset-x-0 bottom-0 h-[38%]`
- **Content offset:** `-translate-y-6 sm:-translate-y-10 md:-translate-y-12`

### 8.3 Botones

| Tipo | Classes | Uso |
|---|---|---|
| **Primary CTA** | `bg-sun text-text-primary font-semibold px-8 py-4 rounded-full text-lg shadow-lg shadow-sun/30 hover:shadow-xl hover:shadow-sun/40` | Hero, WhatsApp link |
| **Secondary submit** | `w-full bg-sky-deep text-white font-semibold px-8 py-4 rounded-xl hover:bg-sky-deep/90` | Form submit |
| **Social outline** | `group inline-flex items-center gap-2.5 rounded-full border px-6 py-3 font-medium shadow-sm hover:shadow-md` | Instagram link |
| **Nav link** | `text-sm font-medium transition-colors duration-500 hover:text-sun` | Desktop nav |
| **Mobile nav link** | `text-lg font-medium py-2 hover:text-sun transition-colors` | Mobile nav |

### 8.4 Cards

| Sección | padding | border | bg | hover |
|---|---|---|---|---|
| **Approach** | `p-8` | `border`, rounded-2xl | `var(--color-bg-card)` | `hover:shadow-lg` |
| **Services** | `p-6` | `border`, rounded-2xl | `var(--color-bg-card)` | — |
| **Contact form** | `p-8` | `border`, rounded-2xl + `shadow-sm` | `var(--color-bg-card)` | — |
| **Error state** | `p-10` | `border`, rounded-2xl | `var(--color-bg-card)` | — |

### 8.5 Icon Containers

| Propiedad | Valor |
|---|---|
| Size | `w-12 h-12` (approach), `w-12 h-12` (services, contact), `w-14 h-14` (approach heading) |
| Radius | `rounded-xl` |
| BG | `bg-sun/10` → `group-hover:bg-sun/20` |
| Icon color | `text-sky-deep`, strokeWidth 1.75 |

### 8.6 Tags / Badges

| Propiedad | Valor |
|---|---|
| BG | `bg-sky-pale/60` (fijo, no temático) |
| Text | `text-sky-deep` (fijo) |
| Size | `text-sm font-medium` |
| Padding | `px-4 py-2` |
| Radius | `rounded-full` |
| Gap (icon+text) | `gap-2` |

### 8.7 Form Inputs

| Propiedad | Valor |
|---|---|
| Padding | `px-4 py-3` |
| Radius | `rounded-xl` |
| BG | `var(--color-bg-primary)` |
| Border | `var(--color-border-light)` |
| Text | `var(--color-text-primary)` |
| Placeholder | `opacity-50` |
| Focus | `border-sky-cerulean ring-2 ring-sky-cerulean/10` |

### 8.8 FAQ Accordion

| Propiedad | Valor |
|---|---|
| Item | `rounded-xl border overflow-hidden hover:shadow-md` |
| Trigger | `w-full flex items-center justify-between px-6 py-5 text-left` |
| Answer | `px-6 pb-5 leading-relaxed` |
| Icon | `Plus` de lucide-react, rotación 135° al abrir |

### 8.9 Logo

| Variant | Clases de filtro |
|---|---|
| `default` | `contrast-[1.14] saturate-[1.08] drop-shadow-[0_0_0.5px_rgb(30_58_95/0.7)] drop-shadow-[0_2px_5px_rgb(30_58_95/0.14)]` |
| `onDark` | `contrast-[1.16] saturate-[1.12] brightness-[1.04] drop-shadow-[0_0_0.55px_rgb(255_255_255/0.65)] drop-shadow-[0_0_8px_rgb(255_255_255/0.22)] drop-shadow-[0_2px_6px_rgb(30_58_95/0.35)]` |

- **Tamaño base:** `h-9 w-auto` (36px height)
- **Formato:** WebP
- **Atributos:** `width=160 height=36 decoding="async"`

### 8.10 Iconos SVG (Custom)

| Componente | Variants | Tamaño default |
|---|---|---|
| **WhatsAppIcon** | `brand` (sky-deep→cerulean), `light` (white→sun-soft) | `w-5 h-5` |
| **InstagramIcon** | `brand` (sky-deep→cerulean→sun), `light` (white→sun-soft→sun) | `w-5 h-5` |
| **Sun/Moon icons** (Navbar toggle) | Sol: `stroke="#FFD425"`, Luna: `stroke="white"` | 18×18 (desktop), 16×16 (mobile) |

### 8.11 Theme Toggle (Navbar)

| Estado | Icono | Color stroke | Label aria |
|---|---|---|---|
| **Dark mode active** | Sol (svg rays) | `#FFD425` | "Modo claro" |
| **Light mode active** | Luna (svg crescent) | `white` | "Modo oscuro" |

---

## 9. Dark/Light Mode

### 9.1 Estrategia

- **Clase en `<html>`:** `.dark` activa el modo oscuro
- **Persistencia:** `localStorage` key `rayito-de-sol-theme`
- **Default:** Preferencia del SO (`prefers-color-scheme: dark`)
- **Provider:** `ThemeContext.tsx` con `ThemeProvider` envolviendo la app
- **Implementación CSS:** `@variant dark (&:where(.dark, .dark *))` + `.dark` class con CSS custom properties

### 9.2 Hooks

| Hook | Propósito |
|---|---|
| `useTheme()` | Estado del tema + toggle desde cualquier componente |
| `ThemeContext` `{ theme, toggleTheme, setTheme }` | Context API |

### 9.3 Valores que cambian con el tema

Ver sección 2.2 (Variables de Tema), 2.3 (Gradientes), 3.4 (Hero glow).

---

## 10. Breakpoints Responsive

| Name | Min Width | Uso principal |
|---|---|---|
| **sm** | 640px | Hero text sizes, grid columns (services), padding |
| **md** | 768px | Navbar desktop/mobile, grid 2col/3col, section padding, heading sizes |
| **lg** | 1024px | Container padding, hero 8xl |
| **xl** | 1280px | (default max container) |

---

## 11. Iconos (Lucide React)

| Icono | Componente | strokeWidth | Uso |
|---|---|---|---|
| `GraduationCap` | About | 2 | Badge "Psicóloga Titulada" |
| `Brain` | About | 2 | Badge "TCC" |
| `Baby` | About | 2 | Badge "Atención Infantil" |
| `Plus` | FAQ | 2 | Accordion toggle |
| `MapPin` | Contact | 1.75 | Ubicación info |
| `Mail` | Contact | 1.75 | Email info |
| `ArrowRight` | Contact/Instagram | 2 / 2 | CTA arrow |
| `Play` | Instagram | 0 (fill) | Video badge |
| `HeartHandshake` | Approach | 1.75 | Valor "Humanista" |
| `Sprout` | Approach | 1.75 | Valor "Transformación" |
| `BadgeCheck` | Approach | 1.75 | Valor "Clínico" |
| `User` | Services | 1.75 | "Terapia Individual" |
| `ToyBrick` | Services | 1.75 | "Atención Infantil" |
| `Video` | Services | 1.75 | "Terapia Online" |
| `Presentation` | Services | 1.75 | "Talleres" |

---

## 12. Estructura del Layout

### 12.1 Orden de Secciones

```
Navbar (fixed, z-50)
├── Hero (#hero)
├── About (#about)
├── Approach (#approach)
├── Services (#services)
├── FAQ (#faq)
├── Contact (#contact)
├── InstagramFeed (#instagram)
└── Footer
```

### 12.2 Navbar Layer

```
header (fixed top-0 left-0 right-0 z-50)
├── max-w-6xl container
│   ├── Logo (left)
│   ├── Desktop nav (hidden md:flex)
│   │   ├── links × 5
│   │   └── Theme toggle
│   └── Mobile controls (md:hidden)
│       ├── Theme toggle
│       └── Hamburger (3 span bars)
└── Mobile menu overlay (AnimatePresence)
    └── Nav links column
```

### 12.3 Hero Layer (z-stack bottom→top)

```
section#hero min-h-[100dvh]
  ├── 1. Gradient cielo (absolute inset-0)
  ├── 2. [Modo DÍA] SunRays canvas + MouseGlow
  │   [Modo NOCHE] InteractiveSparkles canvas (luciérnagas)
  ├── 3. Hero scrim (absolute inset-0)
  ├── 4. Horizonte (absolute inset-x-0 bottom-0 h-[38%])
  └── 5. Content (relative z-10 max-w-4xl)
```

---

## 13. SEO & Meta

| Propiedad | Valor |
|---|---|
| **lang** | `es` |
| **title** | `Rayito de Sol - Psicología \| Bienestar Emocional` |
| **theme-color** | `#FFD425` |
| **author** | `Rayito de Sol - Psicología` |
| **robots** | `index, follow` |
| **og:type** | `website` |
| **og:locale** | `es_CO` |
| **og:site_name** | `Rayito de Sol - Psicología` |
| **twitter:card** | `summary_large_image` |
| **Favicon** | `/logo.webp` |

---

## 14. Performance & Accesibilidad

### 14.1 Reduced Motion

- Se desactivan **todas las transiciones** con `prefers-reduced-motion: reduce`
- InteractiveSparkles cambia a **modo estático** (14 partículas sin movimiento)
- MouseGlow **no se renderiza** si reduced motion está activo (`useReducedMotion()`)
- `AnimatePresence` debe respetar `prefers-reduced-motion`

### 14.2 Touch Devices

- InteractiveSparkles detecta `pointer: coarse` y usa **modo estático**
- `useCanvasMousePosition` devuelve `{x:-1000,y:-1000}` en touch
- `useSpringMousePosition` se desactiva si `pointer: coarse`

### 14.3 Scrollbar

| Propiedad | Valor |
|---|---|
| Firefox | `scrollbar-width: thin; scrollbar-color: var(--color-border-light) transparent` |
| Webkit | width 8px, track transparent, thumb `var(--color-border-light)`, hover `#94A3B8` |

### 14.4 Selection

```css
::selection { background-color: rgba(255, 212, 37, 0.35); color: var(--color-text-primary); }
```

### 14.5 Images

- **Lazy loading** en todas las imágenes (`loading="lazy"`)
- **Formato WebP** para logo y fotos
- **Atributos** `width`, `height`, `decoding="async"`

---

## 15. Data Flow

### 15.1 Constants

```ts
// constants/social.ts
INSTAGRAM_USERNAME = 'rayitodesol.psico'
INSTAGRAM_URL      = 'https://www.instagram.com/rayitodesol.psico/'
INSTAGRAM_HANDLE   = '@rayitodesol.psico'
WHATSAPP_URL       = 'https://wa.link/6kr7ep'
WHATSAPP_PHONE_DISPLAY = '+57 321 648 0414'
```

### 15.2 Data Files

| File | Export | Tipo |
|---|---|---|
| `data/approach.ts` | `aboutIntroLead`, `aboutIntroFollow`, `approachValues[]` | strings + `ApproachValue[]` |
| `data/services.ts` | `services[]` | `Service[]` |
| `data/faq.ts` | `faqItems[]` | `FAQItem[]` |

---

## 16. Dependencias Clave

| Paquete | Versión | Propósito |
|---|---|---|
| `react` | ^19.2.6 | UI framework |
| `framer-motion` | ^12.40.0 | Animaciones, spring physics, AnimatePresence |
| `tailwindcss` | ^4.3.0 | CSS utility framework |
| `@tailwindcss/vite` | ^4.3.0 | Tailwind v4 Vite plugin |
| `lenis` | ^1.3.23 | Smooth scrolling |
| `lucide-react` | ^1.17.0 | Iconos |
| `react-router-dom` | ^7.17.0 | Routing |
| `react-helmet-async` | ^3.0.0 | SEO meta tags |
| `vite` | ^8.0.12 | Build tool |
| `typescript` | ~6.0.2 | Type checking |

---

## 17. Estructura de Archivos

```
src/
├── assets/images/           # Imágenes (MariaCamilaFace.webp, logo_amarillo.webp, etc.)
├── components/
│   ├── icons/               # Iconos SVG custom (WhatsAppIcon, InstagramIcon)
│   ├── About.tsx
│   ├── Approach.tsx
│   ├── Contact.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── InstagramFeed.tsx
│   ├── InteractiveSparkles.tsx
│   ├── SunRays.tsx
│   ├── Logo.tsx
│   ├── MouseGlow.tsx
│   ├── Navbar.tsx
│   ├── SectionWrapper.tsx
│   ├── Services.tsx
│   └── Sparkles.tsx
├── constants/
│   └── social.ts            # Redes sociales
├── context/
│   └── ThemeContext.tsx      # Tema día/noche
├── data/
│   ├── approach.ts          # Contenido "Sobre mí" + "Enfoque"
│   ├── faq.ts               # Preguntas frecuentes
│   └── services.ts          # Servicios
├── hooks/
│   ├── useInstagramFeed.ts  # Fetch feed de Instagram
│   └── useMousePosition.ts  # Tracking de mouse (spring + canvas)
├── lib/
│   ├── instagram-api.ts     # API de Instagram
│   └── instagram-image.ts   # Proxy de imágenes Instagram
├── App.tsx
├── main.tsx
└── index.css                # Design tokens + temas + animaciones
```

---

## 18. Versiones & Mantenimiento

| Fecha | Versión | Cambios |
|---|---|---|
| Junio 2026 | 1.0.0 | Sistema de diseño inicial con tema dual, mouse interactions, partículas, y dark mode |
| Junio 2026 | 1.1.0 | Ubicación actualizada a Pereira. Nuevo SunRays (god rays) para modo día. Noche: solo luciérnagas. Modo día: god rays + resplandor. |
| Junio 2026 | 1.2.0 | Navbar: toggle icon color dinámico (contraste fijo). Contact: botón submit azul + texto blanco fijo. SunRays: 18 rayos + glow central + influencia mouse. Hero: Sparkles eliminado del modo día. Nuevos tokens CSS: `--color-btn-secondary-bg/text`. |

> **Este documento es la fuente de verdad centralizada para todo el diseño de Rayito de Sol.**
> Cualquier cambio visual debe reflejarse aquí primero (o simultáneamente).
