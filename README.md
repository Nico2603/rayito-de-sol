# Rayito de Sol 🌤️🌙 — Psicología & Bienestar Emocional

**Landing page profesional** para el consultorio psicológico de María Camila en Bogotá, Colombia.  
Terapia individual, atención infantil, sesiones online y talleres grupales con un enfoque cálido, humano y clínico.

---

## ✨ Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| **React** | ^19.2.6 | UI Framework |
| **TypeScript** | ~6.0.2 | Tipado estático |
| **Vite** | ^8.0.12 | Build tool / dev server |
| **Tailwind CSS** | ^4.3.0 | Estilos utilitarios |
| **Framer Motion** | ^12.40.0 | Animaciones y transiciones |
| **Lenis** | ^1.3.23 | Smooth scroll |
| **Lucide React** | ^1.17.0 | Iconografía |
| **react-router-dom** | ^7.17.0 | Enrutamiento SPA |
| **react-helmet-async** | ^3.0.0 | SEO / meta tags |

## 📐 Sistema de Diseño

El proyecto cuenta con un **sistema de diseño completo** documentado en [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) que incluye:

- **Paleta "Cielo Van Gogh"** — azules profundos a celestes + dorados solares
- **Tema dual** ☀️🌙 — Día (Sol) / Noche (Luna) con persistencia en `localStorage`
- **Tipografía** — `Plus Jakarta Sans` (body) + `Fraunces` (display)
- **Componentes** — Navbar, Hero con partículas interactivas, About, Approach, Services, FAQ, Instagram Feed, Contact, Footer
- **Animaciones** — Scroll reveal con SectionWrapper, sparkles doradas, MouseGlow, InteractiveSparkles canvas
- **100% responsive** — mobile-first con breakpoints sm/md/lg/xl

## 🧱 Estructura del Proyecto

```
src/
├── assets/images/           # Imágenes (logo, foto profesional)
├── components/
│   ├── icons/               # Iconos SVG custom (WhatsApp, Instagram)
│   ├── About.tsx            # Sección sobre la psicóloga
│   ├── Approach.tsx         # Enfoque y valores
│   ├── Contact.tsx          # Formulario de contacto + WhatsApp
│   ├── FAQ.tsx              # Preguntas frecuentes (acordeón)
│   ├── Footer.tsx           # Pie de página con redes
│   ├── Hero.tsx             # Hero principal con partículas
│   ├── InstagramFeed.tsx    # Feed de Instagram integrado
│   ├── InteractiveSparkles.tsx # Partículas canvas interactivas
│   ├── Logo.tsx             # Componente de logo
│   ├── MouseGlow.tsx        # Brillo que sigue al mouse
│   ├── Navbar.tsx           # Navegación con tema dual
│   ├── SectionWrapper.tsx   # Wrapper de scroll reveal
│   ├── Services.tsx         # Tarjetas de servicios
│   └── Sparkles.tsx         # Sparkles decorativas CSS
├── constants/social.ts      # Redes sociales y contactos
├── context/ThemeContext.tsx  # Contexto de tema día/noche
├── data/                    # Datos de servicios, enfoque, FAQ
├── hooks/                   # Hooks personalizados (mouse, Instagram)
├── lib/                     # Utilidades (API Instagram)
├── App.tsx                  # Componente raíz
├── main.tsx                 # Entry point
└── index.css                # Tokens de diseño + temas + animaciones
```

## 🚀 Comandos

```bash
# Desarrollo
npm run dev        # Inicia servidor de desarrollo (Vite)

# Build
npm run build      # TypeScript check + build de producción

# Preview
npm run preview    # Vista previa del build de producción

# Linting
npm run lint       # ESLint
```

## 🧩 Secciones de la Landing

1. **Hero** — Cielo Van Gogh con partículas animadas, brillo interactivo, CTA a WhatsApp
2. **About** — Foto de la psicóloga, credenciales, badges (Titulada, TCC, Atención Infantil)
3. **Approach** — Valores: Humanista, Transformación, Clínico
4. **Services** — Terapia Individual, Atención Infantil, Terapia Online, Talleres
5. **FAQ** — Preguntas frecuentes con acordeón animado
6. **Contact** — Formulario + WhatsApp directo + ubicación
7. **Instagram Feed** — Grid de publicaciones de Instagram
8. **Footer** — Redes sociales, enlaces, copyright

## 🌐 Despliegue

**Producción:** [rayito-de-sol.vercel.app](https://rayito-de-sol.vercel.app)  
**Plataforma:** Vercel (deploy automático desde `master`)

## 🔑 Variables de Entorno

| Variable | Descripción |
|---|---|
| `VITE_INSTAGRAM_TOKEN` | Token de Instagram Graph API (opcional, para feed) |

## 👩‍⚕️ Contacto

- **Instagram:** [@rayitodesol.psico](https://www.instagram.com/rayitodesol.psico/)
- **WhatsApp:** [+57 321 648 0414](https://wa.link/6kr7ep)
- **Ubicación:** Bogotá, Colombia

---

<p align="center">Hecho con 💛 para acompañar procesos de bienestar emocional</p>
