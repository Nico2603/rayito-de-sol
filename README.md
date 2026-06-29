# Rayito de Sol 🌤️🌙 — Psicología & Bienestar Emocional

**Landing page profesional** para el consultorio psicológico de María Camila en Pereira, Risaralda, Colombia.  
Terapia individual, atención infantil, sesiones online y talleres grupales con un enfoque cálido, humano y clínico.

---

## ✨ Stack Tecnológico

| Tecnología | Versión | Propósito |
|---|---|---|
| **React** | ^19.2.6 | UI Framework |
| **TypeScript** | ~6.0.2 | Tipado estático |
| **Vite** | ^8.0.16 | Build tool / dev server |
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
- **CSS modular** — tokens, animaciones y base separados en `src/styles/`
- **Datos desacoplados** — textos y config en `src/data/`, lógica pura en `src/lib/`
- **Tipos centralizados** — interfaces compartidas en `src/types/`

## 🧱 Estructura del Proyecto

```
src/
├── assets/images/           # Imágenes (logo, foto profesional, favicon)
├── components/
│   ├── icons/               # Iconos SVG custom (WhatsApp, Instagram)
│   ├── About.tsx            # Sección sobre la psicóloga
│   ├── Approach.tsx         # Enfoque y valores
│   ├── Contact.tsx          # Formulario de contacto + WhatsApp
│   ├── FAQ.tsx              # Preguntas frecuentes (acordeón)
│   ├── Footer.tsx           # Pie de página con redes
│   ├── Hero.tsx             # Hero principal con partículas
│   ├── InstagramFeed.tsx    # Feed de Instagram integrado
│   ├── InteractiveSparkles.tsx # Canvas lifecycle + render loop
│   ├── Logo.tsx             # Componente de logo (SVG inline)
│   ├── MouseGlow.tsx        # Brillo que sigue al mouse
│   ├── Navbar.tsx           # Navegación con tema dual
│   ├── SectionWrapper.tsx   # Wrapper de scroll reveal
│   ├── Services.tsx         # Tarjetas de servicios
│   └── Sparkles.tsx         # Sparkles decorativas CSS
├── context/ThemeContext.tsx  # Contexto de tema día/noche
├── data/                    # Datos puros (sin lógica)
│   ├── hero.ts              # Textos del Hero
│   ├── navigation.ts        # Links de navegación
│   ├── contact.ts           # Campos de formulario + info
│   ├── footer.ts            # Copyright + redes
│   ├── approach.ts          # Valores del enfoque
│   ├── services.ts          # Servicios ofrecidos
│   └── faq.ts               # Preguntas frecuentes
├── hooks/                   # Hooks personalizados
│   ├── useMousePosition.ts  # Tracking de posición del mouse
│   └── useInstagramFeed.ts  # Lógica de fetch de Instagram
├── lib/                     # Utilidades framework-agnostic
│   ├── instagram-api.ts     # Llamadas a Instagram Graph API
│   ├── instagram-image.ts   # Parseo de URLs de imágenes
│   └── particles.ts         # Física de partículas (pura)
├── styles/                  # CSS modular
│   ├── tokens.css           → @theme, :root, .dark (colores, spacing)
│   ├── animations.css       → Keyframes, transiciones, reduced-motion
│   ├── base.css             → Scrollbar, selection, hero glow, body
│   └── index.css            → Barrel (import ordenado)
├── types/                   # Tipos compartidos (TypeScript)
│   ├── instagram.ts         → InstagramPost, FeedState, etc.
│   ├── components.ts        → Service, ApproachValue, FAQItem
│   └── theme.ts             → Theme, ThemeContextType
├── App.tsx                  # Componente raíz (routing + layout)
├── main.tsx                 # Entry point (ReactDOM.createRoot)
└── index.css                # → re-exporta styles/index.css
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

# Graphify (mapeo del código)
npx graphify update .                     # AST rápido
npx graphify extract . --backend gemini   # Extracción semántica (requiere GEMINI_API_KEY)
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

**Producción:** [rayitodesolpsico.com](https://rayitodesolpsico.com)  
**Preview Vercel:** [rayito-de-sol.vercel.app](https://rayito-de-sol.vercel.app)  
**Plataforma:** Vercel (deploy automático desde `master`)

## 🔑 Variables de Entorno

| Variable | Descripción |
|---|---|
| `VITE_INSTAGRAM_TOKEN` | Token de Instagram Graph API (opcional, para feed) |
| `VITE_WEB3FORMS_ACCESS_KEY` | Access key de [Web3Forms](https://web3forms.com) (obligatoria para el formulario de contacto) |
| `GEMINI_API_KEY` | API Key de Google Gemini (para extracción semántica con Graphify) |

### Configurar el formulario de contacto (Web3Forms)

1. En [web3forms.com](https://web3forms.com), registra el correo de destino (`psico.camilaa@gmail.com`).
2. Copia el **access key** que llega al correo.
3. En **Vercel** → Project Settings → Environment Variables, añade `VITE_WEB3FORMS_ACCESS_KEY` (Production, Development y Preview).
4. En local, copia [`.env.example`](.env.example) a `.env.local` y pega tu key:

```env
VITE_WEB3FORMS_ACCESS_KEY=tu_access_key_aqui
VITE_GA_MEASUREMENT_ID=G-B1Z8RGJK1P
```

5. **Dominio en Web3Forms** (panel del formulario → Domain name):
   - Desarrollo: `localhost`
   - Producción: `rayitodesolpsico.com` (y/o `rayito-de-sol.vercel.app`)

   Cambia el dominio cuando pases de local a producción; no hace falta tocar código.

## 👩‍⚕️ Contacto

- **Instagram:** [@rayitodesol.psico](https://www.instagram.com/rayitodesol.psico/)
- **WhatsApp:** [+57 310 750 6153](https://wa.me/573107506153)
- **Ubicación:** Pereira, Risaralda, Colombia

## 📊 Google Analytics 4

1. Crear propiedad en [analytics.google.com](https://analytics.google.com) → flujo de datos **Web** → URL `https://rayitodesolpsico.com`.
2. Copiar el **ID de medición** (`G-XXXXXXXXXX`).
3. Local: añadir `VITE_GA_MEASUREMENT_ID=G-...` en `.env`.
4. **Vercel** → Settings → Environment Variables → `VITE_GA_MEASUREMENT_ID` (Production).
5. Tras deploy: GA4 → **Informes** → **Tiempo real** para confirmar visitas.

Eventos personalizados: `whatsapp_click` (contact_info, contact_cta, footer) y `contact_form_submit`.

## 🔍 SEO / Google Search Console

Pasos tras el deploy:

1. **Verificar dominio** en [Google Search Console](https://search.google.com/search-console) (`https://rayitodesolpsico.com`).
   - Método recomendado: etiqueta HTML en `index.html` (descomentar la línea `google-site-verification` y pegar el código de GSC).
   - Alternativa: verificación vía Google Analytics (cuando GA4 esté activo en producción).
2. **Enviar sitemap:** `sitemap.xml` (URL completa: `https://rayitodesolpsico.com/sitemap.xml`).
3. **Inspección de URLs** → `https://rayitodesolpsico.com/` → **Solicitar indexación**.
4. **Google Business Profile** (consultorio presencial): mismo NAP que `src/lib/structured-data.ts`.
5. **Validar rich results:** [Rich Results Test](https://search.google.com/test/rich-results) — FAQPage debe aparecer válido.
6. **Bing Webmaster Tools** (opcional): mismo sitemap.
7. Enlazar el dominio desde la bio de Instagram ([@rayitodesol.psico](https://www.instagram.com/rayitodesol.psico/)).

---

<p align="center">Hecho con 💛 para acompañar procesos de bienestar emocional</p>
