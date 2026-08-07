# Blueprint completo — ProSavis `publicidad/` (recrear en PC casa / Remote Control)

Documento único para pegar a otro agente. Objetivo: recrear **exactamente** la carpeta de publicidad, skills, reglas, arquitectura, pipeline HTML→PNG y preview en teléfono (Firebase + Cloudflare opcional).

**Fecha de extracción:** 2026-08-07  
**Origen:** Prosavis-PC (oficina) — workspace `%USERPROFILE%\Documents\GitHub`  
**Repo git:** `https://github.com/Prosavis/publicidad.git` · rama `main`  
**Commits recientes de referencia:** `6f78a6d` (feat ads + phone preview) · `4679a9a` (safe-zones backup)

---

## 0. Resumen ejecutivo

| Qué | Valor |
| --- | --- |
| Módulo | `publicidad/` — piezas marketing ProSavis HTML → PNG |
| Repo | Standalone `Prosavis/publicidad` embebido en suite |
| Path canónico scripts | `%USERPROFILE%\Documents\GitHub\publicidad` |
| Stack | Node.js + Playwright Chromium + PowerShell + Firebase Hosting + cloudflared opcional |
| Base de datos | **No hace falta** |
| Preview teléfono | Firebase site `prosavis-ads-preview` → `https://prosavis-ads-preview.web.app` |
| Proyecto Firebase | `prosavis` |
| Cloudflare | Opcional (“en vivo” / SSE). La vista principal es PNG estático en Hosting |
| Lumencare / Rayito | **No requeridos** para paridad. Mantener standalone |
| Skills | `design-dna` + `high-end-visual-design` + `canvas-design` + `frontend-design` |
| Regla agente | `.cursor/rules/agent-publicidad.mdc` (también en `publicidad/.cursor/rules/`) |

**Camino más rápido en casa:** clonar el repo → instalar skills del lockfile → `firebase login` → `npm install` → `npm run preview:autostart`.

---

## 1. Propósito del módulo

Piezas publicitarias (Stories, Feed, ads, certificados) diseñadas en HTML con tokens de marca, exportadas a PNG con Playwright, y publicadas a un bookmark fijo para revisarlas desde el iPhone/Android vía chat (Remote Control).

Flujo mental del agente:

1. Brief + canales  
2. `source.html` con tokens/assets/safe zones  
3. `npm run render` → `output.png`  
4. `npm run preview:start` → deep link en el chat  
5. Usuario descarga desde el teléfono  

---

## 2. Estructura de carpetas (completa)

```text
publicidad/
  .cursor/
    rules/
      agent-publicidad.mdc          # overlay local (misma regla que suite)
  .git/                             # repo Prosavis/publicidad
  .gitignore
  README.md                         # ops + estructura + preview
  DESIGN.md                         # sistema visual + Safe Zones
  PRODUCT.md                        # personalidad de producto/marca creativa
  package.json                      # @prosavis/publicidad
  package-lock.json                 # ignorado por .gitignore actualmente
  PREVIEW-URL.txt                   # bookmark generado (gitignored)
  node_modules/                     # gitignored

  brand/
    brand.json                      # tokens, formatos, rutas assets, sync sources
    tokens.css                      # CSS vars + clases safe zone
    safe-zones.json                 # números canónicos 9:16
    channels.json                   # redes/web/WA/stores canónico
    CHANNELS.md                     # resumen legible

  assets/
    README.md
    MANIFEST.json                   # regenerado por sync
    provided/svg/                   # SVGs desde Downloads/AssetsSVG
    source/                         # copias SVG fuente
    logo/
      svg/                          # LogoIcono.svg, LogoIconoProsavis2.svg, LogoLetras*.svg, …
      raster/                       # PNG limpios naranja/clean
      app-icons/                    # variantes store
    wordmark/                       # ProsavisNombre.png
    mascot/                         # Prosavito.png, prosavitoRostro.png
    social/                         # instagram, tiktok, whatsapp, facebook, x, youtube, linkedin, google…
    badges/                         # verificado, etc.
    photography/                    # fotos campaña (limpieza, etc.)
    apps/                           # qr-code.svg, qr-code-prosavis.svg, qr branded

  templates/
    story-1080x1920.html            # plantilla 9:16 con safe zones

  pieces/
    2026-07-descuento-10000-pro/
      brief.md
      source.html
      output.png
    2026-07-story-whatsapp-agendar-limpieza/
      brief.md
      source.html
      output.png
    2026-07-anuncio-limpieza-condominios/
      brief.md
      source.html
      output.png
    2026-07-busqueda-personal-santa-rosa/
      brief.md
      source.html
      output.png
    2026-08-certificado-limpieza-domicilio/
      brief.md
      source.html
      output.png

  scripts/
    render.mjs                      # HTML → PNG Playwright
    sync-assets.ps1                 # sync desde suite + Downloads
    preview-server.mjs              # galería local :18787 + SSE + download
    start-ads-preview.ps1           # orquesta token+server+tunnel+deploy
    stop-ads-preview.ps1
    install-ads-preview-autostart.ps1
    preview-piece-url.ps1           # imprime deep link

  preview-gateway/                  # Firebase Hosting app
    .firebaserc                     # default project: prosavis
    firebase.json                   # site: prosavis-ads-preview
    public/
      index.html
      p/<token>/                    # generado en runtime (gitignored)
        index.html
        manifest.json
        current.json
        piece/<slug>/index.html
        piece/<slug>/output.png
    .firebase/                      # cache deploy (gitignored)
```

### Piezas existentes

| Carpeta | Formato | Descripción |
| --- | --- | --- |
| `2026-07-descuento-10000-pro` | Story | Descuento $10.000 · código PRO · fondo blanco |
| `2026-07-story-whatsapp-agendar-limpieza` | Story 9:16 + safe zones | CTA WhatsApp citas · foto full-bleed |
| `2026-07-anuncio-limpieza-condominios` | Story | Anuncio condominios · foto + QR |
| `2026-07-busqueda-personal-santa-rosa` | Story | Se busca personal · Santa Rosa |
| `2026-08-certificado-limpieza-domicilio` | Landscape ~1400×1120 | Certificado post-servicio · QR |

---

## 3. `.gitignore`

```
node_modules/
package-lock.json
.DS_Store
*.tmp
Thumbs.db

# Preview runtime / secretos locales
PREVIEW-URL.txt
preview-gateway/public/p/
preview-gateway/.firebase/
graphify-out/
*.log
```

---

## 4. `package.json` exacto

```json
{
  "name": "@prosavis/publicidad",
  "private": true,
  "version": "1.0.0",
  "description": "Piezas publicitarias ProSavis — HTML → PNG",
  "type": "module",
  "scripts": {
    "render": "node scripts/render.mjs",
    "render:descuento": "node scripts/render.mjs pieces/2026-07-descuento-10000-pro",
    "sync:assets": "powershell -NoProfile -ExecutionPolicy Bypass -File ./scripts/sync-assets.ps1",
    "preview:start": "powershell -NoProfile -ExecutionPolicy Bypass -File ./scripts/start-ads-preview.ps1",
    "preview:stop": "powershell -NoProfile -ExecutionPolicy Bypass -File ./scripts/stop-ads-preview.ps1",
    "preview:autostart": "powershell -NoProfile -ExecutionPolicy Bypass -File ./scripts/install-ads-preview-autostart.ps1",
    "preview:url": "powershell -NoProfile -ExecutionPolicy Bypass -File ./scripts/preview-piece-url.ps1",
    "postinstall": "npx playwright install chromium"
  },
  "dependencies": {
    "playwright": "^1.49.0"
  }
}
```

### Comandos operativos

```powershell
cd publicidad
npm install
npm run sync:assets
npm run render -- pieces/YYYY-MM-slug
npm run render -- pieces/YYYY-MM-slug --width 1080 --height 1080
npm run preview:start
npm run preview:url -- pieces/YYYY-MM-slug
npm run preview:autostart
npm run preview:stop
```

---

## 5. Regla del agente (texto completo)

**Rutas a crear:**
- Suite: `.cursor/rules/agent-publicidad.mdc`
- Repo: `publicidad/.cursor/rules/agent-publicidad.mdc`

```mdc
---
description: Piezas publicitarias ProSavis — HTML creatives → PNG (Stories/Feed/Ads)
globs:
  - "publicidad/**"
alwaysApply: false
---

# Agent Publicidad — Marketing creatives

Trabajas en `publicidad/` (módulo del Prosavis Suite). Antes de diseñar lee:

1. `publicidad/README.md`
2. `publicidad/brand/brand.json`
3. `publicidad/brand/channels.json` (+ `CHANNELS.md`)
4. Si el formato es **9:16** (Story / Reel / TikTok): `publicidad/brand/safe-zones.json` + sección Safe Zones en `DESIGN.md`

## Safe Zones 9:16 (obligatorio)

Para cualquier pieza **1080×1920** (Instagram Reels, Stories, TikTok):

- Lienzo: 1080×1920 · aspecto 9:16
- **Prohibido** colocar texto/logo/cara/CTA/contacto en:
  - Top Y 0–220
  - Bottom Y 1500–1920
  - Rail derecho X 930–1080 (mitad inferior)
- **Safe zone:** X 0–930 · Y 220–1500 (930×1280)
- **Feed 4:5:** hook y gráficos principales también en Y 285–1635
- Usar clases/tokens: `.canvas-story`, `.safe-zone`, `--sz-*` en `brand/tokens.css`
- Partir de `templates/story-1080x1920.html` (padding ya aplica safe zones)
- Debug opcional: `body.debug-safe-zones` → quitar antes del render final
- La foto puede ser full-bleed; el contenido vital **no**

## Flujo obligatorio para pieza nueva o edición

1. Crear o editar `publicidad/pieces/YYYY-MM-slug/`
2. Añadir/actualizar `brief.md` con oferta **y apartado Contexto de canales**
3. Partir de `templates/…` → `source.html` (si es nueva); en 9:16 respetar safe zones
4. Usar `brand/tokens.css` + assets de `assets/`
5. Exportar: `cd publicidad && npm run render -- pieces/YYYY-MM-slug`
6. Verificar visualmente `output.png` (Read tool) — comprobar que nada vital invade top 220 / bottom 420 / rail derecho
7. **Entregar preview al usuario (obligatorio):**
   - Tras el render: `npm run preview:start` (publica `output.png` estático en Firebase Hosting; no basta el servidor local)
   - Obtener URL de la pieza:
     `npm run preview:url -- pieces/YYYY-MM-slug`
     (o `powershell -File ./scripts/preview-piece-url.ps1 pieces/YYYY-MM-slug`)
   - Pegar en el chat el deep link de la pieza:
     `https://prosavis-ads-preview.web.app/p/<token>/piece/<slug>/`
   - Si el usuario no puede abrir la página: pegar también el PNG directo `…/piece/<slug>/output.png`
   - No basta con la galería ni con decir “recarga el bookmark”
   - En la página: **Descargar imagen** (iPhone: Compartir → Guardar imagen)

Doc del sistema: `prosavis-firebase/docs/desarrollo/ads-preview-tunnel.md`.

## Contexto de canales (obligatorio en briefs)

Todo brief debe incluir tabla/sección con web, redes, WhatsApp y stores relevantes.
Fuente canónica: `brand/channels.json`.

### Cuando el usuario pegue un mensaje/link de IG, WA, TikTok, etc.

1. Extraer: red, handle/@, URL, y logo en `assets/social/`
2. Actualizar `brand/channels.json` (y `CHANNELS.md` si cambia algo público)
3. Actualizar el `brief.md` de la pieza si aplica
4. Guardar nota con `capturedAt` / fragmento del mensaje en el canal
5. No inventar handles: si no está claro, preguntar

## Contraste y assets

- Fondo navy: `logo/svg/LogoIcono.svg` (gradiente cálido)
- Fondo blanco/claro: `logo/svg/LogoIconoProsavis2.svg` o `logo/raster/iconProsavisNaranjaClean.png`
- CTA naranja: texto navy `#002446`
- Texto sobre blanco: navy / `#3d5470` (tokens `--ink`, `--ink-soft`)

## Skills

- `design-dna`, `high-end-visual-design`, `canvas-design`, `frontend-design`
- Marca: Archivo Black + Plus Jakarta Sans

## No hacer

- No mezclar piezas sueltas en la raíz de `publicidad/`
- No commitear `node_modules`
- No inventar logos ni @handles
- No entregar solo `output.png` local sin el deep link del preview cuando el usuario revisa desde el teléfono / Remote Control
```

### Bundles en `skills-mandatory.mdc` (suite)

| Tipo | Skills |
| --- | --- |
| Publicidad / creatividades | `design-dna` + `high-end-visual-design` (+ `canvas-design` si aplica) |
| Proyecto publicidad | agente `agent-publicidad` · regla `.cursor/rules/agent-publicidad.mdc` |

### Punteros en `AGENTS.md`

- Piezas en `publicidad/` (HTML → PNG)
- Canales: `publicidad/brand/channels.json`
- Diseño + safe zones: `DESIGN.md`, `safe-zones.json`
- Regla: `.cursor/rules/agent-publicidad.mdc`
- Render: `cd publicidad && npm run render -- pieces/<slug>`
- Preview: `prosavis-firebase/docs/desarrollo/ads-preview-tunnel.md`

---

## 6. Skills — composición, fuentes, instalación

### 6.1 Dónde viven

| Contexto | Ruta |
| --- | --- |
| Lockfile maestro (git) | `prosavis-firebase/workspace/skills-lock.json` |
| Instaladas en suite | `GitHub/.agents/skills/<nombre>/SKILL.md` |
| Instalador | `prosavis-firebase/workspace/install-workspace-skills.ps1 -CopyOverlays` |
| Manual graphify (aparte) | `%USERPROFILE%\.cursor\skills\graphify\` |

### 6.2 Skills del bundle publicidad

| Skill | Source (lockfile) | skillPath | Hash | Rol |
| --- | --- | --- | --- | --- |
| `design-dna` | `zanwei/design-dna` | `SKILL.md` | `e80e8eed3701291776b10d3e7ca91b4af830c3ba4e6ad42fbeedd8b8f1511553` | Extraer/aplicar Design DNA (tokens + estilo + efectos) en 3 fases |
| `high-end-visual-design` | `leonxlnx/taste-skill` | `skills/soft-skill/SKILL.md` | `f730e4132775f13eea19e3dc39afc6bb453cfc0498872b127ad8f0d47cfd802d` | Calidad agency; anti-defaults AI genéricos |
| `canvas-design` | `anthropics/skills` | `skills/canvas-design/SKILL.md` | `4e8bbc31d3b159efdd32d31a63ba8cd5a44d84911e924c1f2c709c50cbcdd0ec` | Filosofía visual → canvas PNG/PDF; incluye `canvas-fonts/` |
| `frontend-design` | `anthropics/skills` | `skills/frontend-design/SKILL.md` | `93f53fd1c0352d3d7ec17b8f73d7351bf76f4821e55d123c9d2abc2c53ba48e4` | Dirección tipográfica/layout distintiva |

### 6.3 Archivos por skill (instalación mínima)

**`design-dna/`**
- `SKILL.md`
- Upstream también: `references/schema.md`, `references/generation-guide.md`  
  Si faltan tras el instalador → clonar `https://github.com/zanwei/design-dna` y copiar `references/`

**`high-end-visual-design/`**
- `SKILL.md`

**`canvas-design/`**
- `SKILL.md`
- `LICENSE.txt`
- `canvas-fonts/` (decenas de TTF + OFL: ArsenalSC, BigShoulders, Boldonse, BricolageGrotesque, CrimsonPro, DMMono, EricaOne, GeistMono, Gloock, IBMPlex*, Instrument*, Italiana, JetBrainsMono, Jura, LibreBaskerville, Lora, NationalPark, NothingYouCouldDo, Outfit, PixelifySans, PoiretOne, RedHatMono, Silkscreen, SmoochSans, Tektur, WorkSans, YoungSerif, …)

**`frontend-design/`**
- `SKILL.md`
- `LICENSE.txt`

### 6.4 Cómo se componen al crear un anuncio

1. **`design-dna`** — estructura DNA / analiza referencias / genera desde JSON (o reutilizar DNA Prosavis ya en `brand/` + `DESIGN.md` + `PRODUCT.md`)
2. **`high-end-visual-design`** — barra de calidad; evitar looks AI default (cream+serif+terracotta, purple glow, ghost-cards, Inter/Roboto)
3. **`frontend-design`** — composición, tipografía, jerarquía del HTML
4. **`canvas-design`** — cuando el pedido es más “póster / arte / filosofía visual” que UI de producto
5. **Siempre ganan** las reglas Prosavis: navy/orange, Archivo Black + Plus Jakarta, safe zones, contrast rules, channels.json

### 6.5 Instalar skills en PC casa

```powershell
# Preferido (si hay suite / prosavis-firebase):
cd prosavis-firebase\workspace
.\install-workspace-skills.ps1 -CopyOverlays

# Abrir carpeta GitHub/ o Prosavis-Suite.code-workspace para descubrimiento
```

Si no hay suite: copiar las 4 carpetas de skill a un directorio de skills que Cursor descubra (p. ej. `.agents/skills/` del workspace).

---

## 7. Marca — `brand.json` (contenido clave)

```json
{
  "name": "ProSavis",
  "url": "https://prosavis.com",
  "channels": "brand/channels.json",
  "channelsDoc": "brand/CHANNELS.md",
  "colors": {
    "navy": "#002446",
    "navyDeep": "#001529",
    "navyMid": "#001d3d",
    "orange": "#FF7700",
    "brandStart": "#f73600",
    "brandEnd": "#f9cb22",
    "cream": "#FFF8F0",
    "white": "#FFFFFF",
    "muted": "#C5D4E3",
    "mutedStrong": "#E8EEF4"
  },
  "typography": {
    "display": "Archivo Black",
    "body": "Plus Jakarta Sans",
    "googleFonts": "https://fonts.googleapis.com/css2?family=Archivo+Black&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
  },
  "assetsRoot": "assets/",
  "recommended": {
    "iconOnNavy": "assets/logo/svg/LogoIcono.svg",
    "iconPlusWordmarkOnNavy": "assets/logo/svg/LogoLetras.svg",
    "iconOnLight": "assets/logo/svg/LogoIconoProsavis2.svg",
    "iconOrangePng": "assets/logo/raster/iconProsavisNaranjaClean.png",
    "iconCleanPng": "assets/logo/raster/iconoProsavisClean.png",
    "wordmarkPng": "assets/wordmark/ProsavisNombre.png",
    "mascotFull": "assets/mascot/Prosavito.png",
    "mascotFace": "assets/mascot/prosavitoRostro.png",
    "verifiedBadge": "assets/badges/verificado.png"
  },
  "formats": {
    "story": { "width": 1080, "height": 1920, "use": "Instagram/WhatsApp/TikTok Stories & Reels", "safeZones": "brand/safe-zones.json" },
    "reel": { "width": 1080, "height": 1920, "use": "Instagram Reels / TikTok", "safeZones": "brand/safe-zones.json" },
    "feed": { "width": 1080, "height": 1080, "use": "Instagram/Facebook Feed" },
    "landscape": { "width": 1920, "height": 1080, "use": "YouTube/Web banner" }
  },
  "safeZones": "brand/safe-zones.json",
  "contrastRules": {
    "onNavy": ["white", "mutedStrong", "warmGradient", "orange", "LogoIcono.svg"],
    "onOrangeCta": ["navy"],
    "avoid": [
      "LogoIconoProsavis2 (navy-orange) on navy background",
      "white text below ~70% opacity on navy",
      "orange text on orange gradient"
    ]
  },
  "import": {
    "command": "npm run sync:assets",
    "script": "scripts/sync-assets.ps1",
    "providedDropFolder": "%USERPROFILE%\\Downloads\\AssetsSVG",
    "sources": [
      "Downloads/AssetsSVG",
      "Prosavis-App/assets/branding",
      "Prosavis-Web/public/assets/images",
      "Prosavis-Panel/public/assets",
      "Prosavis-UserConsole/public",
      "Prosavis-CRM-WhatsApp/public/assets/icons"
    ]
  }
}
```

### Contraste rápido

| Fondo | Usar |
| --- | --- |
| Navy `#002446` | `LogoIcono.svg`, texto claro |
| Blanco/claro | `LogoIconoProsavis2.svg` o PNG naranja, texto navy |
| CTA naranja | Texto navy `#002446` |

---

## 8. Tokens CSS (`brand/tokens.css`) — variables críticas

```css
:root {
  --navy: #002446;
  --navy-deep: #001529;
  --navy-mid: #001d3d;
  --orange: #ff7700;
  --brand-start: #f73600;
  --brand-end: #f9cb22;
  --cream: #fff8f0;
  --white: #ffffff;
  --muted: #c5d4e3;
  --muted-strong: #e8eef4;
  --ink: #002446;
  --ink-soft: #3d5470;
  --surface: #ffffff;
  --surface-soft: #fff8f0;
  --rule-soft: rgba(0, 36, 70, 0.12);
  --grad-warm: linear-gradient(135deg, var(--brand-start) 0%, var(--orange) 45%, var(--brand-end) 100%);
  --font-display: "Archivo Black", system-ui, sans-serif;
  --font-body: "Plus Jakarta Sans", system-ui, sans-serif;
  --canvas-story-w: 1080px;
  --canvas-story-h: 1920px;
  --canvas-feed-w: 1080px;
  --canvas-feed-h: 1080px;
  --canvas-landscape-w: 1920px;
  --canvas-landscape-h: 1080px;
  --sz-top: 220px;
  --sz-bottom: 420px;
  --sz-right: 150px;
  --sz-left: 0px;
  --sz-safe-w: 930px;
  --sz-safe-h: 1280px;
  --sz-content-inset: 48px;
  --sz-feed-4x5-top: 285px;
  --sz-feed-4x5-bottom: 285px;
  --sz-feed-4x5-h: 1350px;
  --sz-hook-y: 250px;
  --sz-hook-y-feed: 285px;
  --sz-hook-y-end: 500px;
  --sz-secondary-y: 1000px;
  --sz-secondary-y-end: 1400px;
  --sz-logo-x: 50px;
  --sz-logo-y: 250px;
  --sz-cta-y-max: 1450px;
}
```

Clases obligatorias:
- `.canvas-story` / `.canvas-vertical-9x16` — padding safe zones
- `.safe-zone` — caja 930×1280
- `.safe-zone-feed-4x5` — guía crop Feed
- `body.debug-safe-zones` — overlays rojo/naranja (quitar antes de render final)

---

## 9. Safe zones (`brand/safe-zones.json`) — canónico

```json
{
  "canvas": { "width": 1080, "height": 1920, "aspectRatio": "9:16" },
  "forbidden": {
    "top": { "yStart": 0, "yEnd": 220, "height": 220 },
    "bottom": { "yStart": 1500, "yEnd": 1920, "height": 420 },
    "rightRailLower": { "xStart": 930, "xEnd": 1080, "width": 150, "yStart": 960, "yEnd": 1920 }
  },
  "safeZone": {
    "xStart": 0, "xEnd": 930, "yStart": 220, "yEnd": 1500,
    "width": 930, "height": 1280
  },
  "feedCrop4x5": {
    "width": 1080, "height": 1350, "yStart": 285, "yEnd": 1635
  },
  "placement": {
    "hooks": { "yStart": 250, "yEnd": 500, "preferFeedAwareYStart": 285 },
    "secondaryText": { "yStart": 1000, "yEnd": 1400 },
    "logo": { "x": 50, "y": 250 },
    "cta": { "yMax": 1450 }
  },
  "appliesTo": ["instagram-reels", "instagram-stories", "tiktok", "whatsapp-status-9x16"]
}
```

### Checklist 9:16 antes de cerrar

1. Brand/logo ≥ Y 220 (ideal ~250)  
2. Hook en Y 250–500 (≥285 si debe sobrevivir Feed)  
3. CTA bottom ≤ 1450; contacto/IG ≤ 1500  
4. Ningún texto vital con `right` > 930  
5. Foto puede invadir márgenes; el mensaje no  

---

## 10. Canales (`CHANNELS.md` / `channels.json`)

### Web
- Principal: https://prosavis.com  
- Panel: https://panel.prosavis.com  
- Limpieza: https://prosavis.com/limpieza  

### App
- Play: https://play.google.com/store/apps/details?id=com.prosavis.app  
- App Store: https://apps.apple.com/co/app/prosavis/id6754036487  

### Redes
| Red | Handle | URL | Icono |
| --- | --- | --- | --- |
| Instagram | @prosavis.app | https://www.instagram.com/prosavis.app/ | `assets/social/instagram.webp` |
| TikTok | @prosavis | https://tiktok.com/@prosavis | `assets/social/tiktok.png` |
| Facebook | Prosavis | https://www.facebook.com/profile.php?id=61581754336778 | `assets/social/facebook.png` |
| X | @prosavis | https://x.com/prosavis | `assets/social/x.png` |
| YouTube | @Prosavis8 | https://www.youtube.com/@Prosavis8 | `assets/social/Youtube_logo.png` |
| LinkedIn | company/prosavis | https://www.linkedin.com/company/prosavis | `assets/social/LinkedIn.png` |

### WhatsApp
| Uso | Número | Link |
| --- | --- | --- |
| Soporte | +57 324 654 9657 | https://wa.me/573246549657 |
| Comercial / Limpieza | +57 311 212 1108 | https://wa.me/573112121108 |
| Citas limpieza | +57 312 253 1271 | https://wa.me/573122531271 |

### Correo / teléfono
- soporte@prosavis.com / support@prosavis.com  
- comercial@prosavis.com  
- +57 311 212 1108  

### Brand legal
- PROSAVIS SAS · NIT 902027137-1  
- Tagline: Plataforma colombiana de servicios verificados a domicilio  
- Dirección: Cra. 23 #85-13 Manzana 5 Casa 17, Pereira, Risaralda, Colombia  

### creativeDefaults
- primaryWebDisplay: `prosavis.com`  
- primaryInstagramHandle: `@prosavis.app`  
- storyFooterSocial: `instagram`, `tiktok`, `whatsappCommercial`  

---

## 11. Design system (`DESIGN.md` + `PRODUCT.md`)

### Visual theme
Navy + orange. Superficie clara tintada al navy (no cream AI) o navy profundo. Craft de servicio local, no SaaS landing.

### Tipografía
- Display Archivo Black; body Plus Jakarta 600–800  
- Headline Story ~64–72px, letter-spacing ≥ -0.03em  
- Enunciados ≥30px weight 800  
- Sin gradient text  

### Prohibido en piezas
- `background-clip: text` con gradiente  
- Ghost-card (borde 1px + shadow blur ≥16px)  
- Radius ≥24px en paneles de contenido  
- Panfletos AI cream/beige + cards flotantes  
- Glassmorphism, purple glow  
- Más de un CTA compitiendo al mismo peso  

### Layout Story
Marca → headline → 3 enunciados → CTA. Spacing 8/16/24/40. En 9:16 todo el flujo vital **dentro** de safe zone. Plantilla: `templates/story-1080x1920.html`. Ejemplo: `pieces/2026-07-story-whatsapp-agendar-limpieza/`.

### Product principles
1. Una acción primaria (WhatsApp / QR)  
2. Confianza antes que adorno  
3. Escaneable en 2 segundos  
4. Identidad Prosavis  
5. Destilar  
6. Safe zones 9:16  

### Audiencia
Residentes y administradores de conjuntos en Pereira, Dosquebradas, Cerritos, Santa Rosa. Ven el anuncio en grupos WhatsApp del condominio.

### Canvas light (DESIGN)
`#F2F5F8` — tinte navy, chroma bajo (evitar beige `#F4F1EA`).

---

## 12. Arquitectura — pipeline de render

```text
pieces/<slug>/brief.md
pieces/<slug>/source.html  (+ brand/tokens.css + assets/)
            │
            ▼
   scripts/render.mjs
     • HTTP estático local sobre publicidad/
     • Playwright Chromium headless
     • viewport width×height (default 1080×1920)
     • wait networkidle + fonts.ready + 800ms
     • screenshot de selector (default `.canvas`)
            │
            ▼
   pieces/<slug>/output.png
```

CLI:
```
npm run render -- pieces/mi-pieza
npm run render -- pieces/mi-pieza --width 1080 --height 1080
npm run render -- pieces/mi-pieza --out custom.png
npm run render -- pieces/mi-pieza --selector .canvas
```

`postinstall` instala Chromium de Playwright.

---

## 13. Arquitectura — preview teléfono (Firebase + Cloudflare)

**Doc canónica suite:** `prosavis-firebase/docs/desarrollo/ads-preview-tunnel.md`  
**Actualizado:** 2026-08-07

### Capas

| Capa | Qué hace |
| --- | --- |
| `scripts/preview-server.mjs` | Galería local + detalle pieza + SSE + descarga PNG en `127.0.0.1:18787` |
| `cloudflared` | Túnel opcional `*.trycloudflare.com` (vista “en vivo”) |
| Firebase Hosting `prosavis-ads-preview` | Bookmark fijo + HTML estático + `output.png` por pieza |
| Autostart Windows | Tarea `Prosavis Ads Preview Tunnel` + hook en `start-prosavis-workers.ps1` |

### Diagrama

```text
iPhone → https://prosavis-ads-preview.web.app/p/<token>/piece/<slug>/
       → HTML estático + ./output.png en Firebase (visible aunque PC apagado)
       → botón Descargar imagen (Web Share / Guardar imagen)
       → opcional “Ver en vivo” → túnel Cloudflare (SSE al PC)
```

**Cambio clave 2026-08-07:** el bookmark **ya no depende del iframe del túnel**. Los túneles trycloudflare fallan en iframes Safari/iPhone. Hosting sirve el PNG estático.

### Qué hace `npm run preview:start` (`start-ads-preview.ps1`)

1. State dir: `%LOCALAPPDATA%\cursor-agent\ads-preview\`  
2. Genera/reusa token (≥24 hex) en `token.txt`  
3. Arranca `preview-server.mjs` en puerto **18787**  
4. Asegura `cloudflared` (winget `Cloudflare.cloudflared` o descarga exe a state dir)  
5. Arranca túnel quick (`tunnel --url http://127.0.0.1:18787`) o named si hay `tunnel-token.txt`  
6. Copia `pieces/*/output.png` → `preview-gateway/public/p/<token>/piece/<slug>/output.png`  
7. Genera `manifest.json` + HTML estático de galería/pieza  
8. Deploy Firebase Hosting site `prosavis-ads-preview`  
9. Escribe bookmark en `PREVIEW-URL.txt` y `bookmark-url.txt`  

### URLs

| Qué | URL |
| --- | --- |
| Galería fija | `https://prosavis-ads-preview.web.app/p/<token>/` |
| **Pieza (usar esta)** | `https://prosavis-ads-preview.web.app/p/<token>/piece/<slug>/` |
| PNG directo | `…/piece/<slug>/output.png` |

Obtener URL:
```powershell
npm run preview:url -- pieces/YYYY-MM-slug
```

### Firebase gateway

`preview-gateway/.firebaserc`:
```json
{ "projects": { "default": "prosavis" } }
```

`preview-gateway/firebase.json`:
- site: `prosavis-ads-preview`
- public: `public`
- Cache-Control: no-cache
- X-Robots-Tag: noindex, nofollow

### Path hardcodeado (CRÍTICO en PC casa)

En `start-ads-preview.ps1`:
```powershell
$PublicidadRoot = Join-Path $env:USERPROFILE "Documents\GitHub\publicidad"
```

→ Clonar en esa ruta **o** editar la variable.

### Estado runtime
`%LOCALAPPDATA%\cursor-agent\ads-preview\`  
- `token.txt`, `bookmark-url.txt`, `tunnel-url.txt`  
- `cloudflared.exe`, `server.pid`, `tunnel.pid`  
- logs: `ads-preview.log`, `server.*.log`, `tunnel.*.log`  

### Seguridad
- Sin token → 404  
- `/` del site no lista piezas  
- Túnel solo expone preview local  
- Token/bookmark = secreto de equipo  

### Requisitos
- Node.js  
- Firebase CLI autenticado con deploy a `prosavis`  
- cloudflared (auto) para modo live  
- Vista estática Hosting funciona con PC apagado hasta el próximo redeploy  

### Relación con workers Remote Control
También se lanza desde `%LOCALAPPDATA%\cursor-agent\start-prosavis-workers.ps1`.  
Workers oficina: Prosavis-PC → GitHub, Prosavis-PC-App → App, etc.  
En casa: el worker debe tener cwd con acceso a `publicidad` (idealmente `Documents\GitHub`).

---

## 14. Template Story — contrato HTML

Archivo: `templates/story-1080x1920.html`

- Google Fonts Archivo Black + Plus Jakarta Sans  
- `<link rel="stylesheet" href="../../brand/tokens.css">`  
- Contenedor `.canvas` / `.canvas-story`  
- Contenido vital dentro `.safe-zone`  
- Foto full-bleed: `position:absolute; inset:0` **fuera** de `.safe-zone`  
- Debug: `class="debug-safe-zones"` en `<body>`  

Cada pieza en `pieces/.../source.html` sigue ese patrón (rutas relativas a brand/assets ajustadas: `../../brand/…`, `../../assets/…`).

---

## 15. Plantilla de `brief.md`

```markdown
# Brief — <título>

| Campo | Valor |
| --- | --- |
| Formato | Story 1080×1920 (Instagram) |
| Safe zones | Obligatorias 9:16 — vital en X 0–930 · Y 220–1500; Feed 4:5 hook en Y 285–1635 |
| Estilo | … |
| Mensaje | … |
| CTA | … |
| Número / URL | … |
| Assets | … |

## Contexto de canales (suite)

Fuente: `brand/channels.json` / `brand/CHANNELS.md`

| Tipo | Valor |
| --- | --- |
| Web | prosavis.com |
| Instagram | @prosavis.app · https://www.instagram.com/prosavis.app/ |
| TikTok | @prosavis · https://tiktok.com/@prosavis |
| WhatsApp (pieza) | … |
| Play Store | https://play.google.com/store/apps/details?id=com.prosavis.app |
| App Store | https://apps.apple.com/co/app/prosavis/id6754036487 |

## Archivos

- `source.html` — diseño editable
- `output.png` — export listo para publicar

## Regenerar PNG

```powershell
cd publicidad
npm install
npm run render -- pieces/YYYY-MM-slug
```
```

---

## 16. Assets — catálogo y sync

### Carpetas
| Carpeta | Uso |
| --- | --- |
| `assets/provided/svg/` | SVGs dejados en Downloads |
| `assets/logo/svg/` | Logos canónicos HTML |
| `assets/logo/raster/` | PNG/WebP |
| `assets/logo/app-icons/` | Store icons |
| `assets/wordmark/` | Nombre PNG |
| `assets/mascot/` | Prosavito |
| `assets/social/` | Iconos redes |
| `assets/badges/` | Verificado, etc. |
| `assets/photography/` | Fotos campaña |
| `assets/apps/` | QR canónico `qr-code.svg` |

### Sync
```powershell
# 1) Dejar SVGs nuevos en %USERPROFILE%\Downloads\AssetsSVG
# 2)
cd publicidad
npm run sync:assets
```
También re-copia desde App, Web, Panel, UserConsole, CRM si esos repos existen como hermanos.

Índice: `assets/MANIFEST.json`.

---

## 17. Tasks del workspace (`Prosavis-Suite.code-workspace`)

- **Publicidad: Install deps** → `npm install` cwd `publicidad`  
- **Publicidad: Render descuento $10.000 PRO** → `npm run render:descuento`  
- **Publicidad: Sync assets** → `npm run sync:assets`  
- **Publicidad: Render pieza (prompt)** → `npm run render -- ${input:publicidadPiecePath}`  
- Input id: `publicidadPiecePath` — “Ruta de la pieza relativa a publicidad/”

---

## 18. Checklist de recreación en PC casa

### A. Clonar módulo
```powershell
cd $env:USERPROFILE\Documents\GitHub
git clone https://github.com/Prosavis/publicidad.git
cd publicidad
npm install
```

### B. Skills + reglas
1. `prosavis-firebase\workspace\install-workspace-skills.ps1 -CopyOverlays` **o** copiar las 4 skills  
2. Asegurar `agent-publicidad.mdc` en `.cursor/rules/` y/o `publicidad/.cursor/rules/`  
3. Abrir workspace `GitHub/` o `Prosavis-Suite.code-workspace`  

### C. Assets
```powershell
npm run sync:assets
```
(Si no hay repos hermanos, los assets ya versionados en el clone bastan para piezas existentes.)

### D. Preview teléfono
1. Node + Firebase CLI; `firebase login` (proyecto `prosavis`)  
2. `npm run preview:autostart` o `preview:start`  
3. Verificar deep link en el teléfono  
4. cloudflared se autoinstala si hace falta  

### E. Contrato del agente (siempre)
Tras cada render para revisión remota:
1. `npm run render -- pieces/<slug>`  
2. `npm run preview:start`  
3. Pegar resultado de `npm run preview:url -- pieces/<slug>`  
4. Si falla la página: pegar también `…/output.png`  

### F. Remote Control
Worker home debe apuntar a un cwd que contenga `publicidad` (ideal `Documents\GitHub`).  
Opcional: integrar con `start-prosavis-workers.ps1` como en oficina.

---

## 19. Lumencare / Rayito del Sol

**Decisión recomendada: NO migrar.** Mantener `publicidad` standalone + Firebase `prosavis-ads-preview`.

| Pregunta | Respuesta |
| --- | --- |
| ¿Hace falta DB? | No |
| ¿Cloudflare es obligatorio? | No (opcional live); Hosting estático sí |
| ¿Lumencare aporta algo ahora? | Solo si se quiere CMS futuro de piezas |
| ¿Rayito aporta algo ahora? | Solo si se quiere otra marca/producto |
| ¿Infraestructura transparente? | Sí — clonar + Firebase auth basta |

Si algún día se quiere otro hosting: duplicar `preview-gateway`, cambiar site/proyecto Firebase, conservar scripts y estructura.

---

## 20. Criterios de éxito (paridad)

- [ ] `publicidad` clonado; `npm install` OK  
- [ ] Skills `design-dna`, `high-end-visual-design`, `canvas-design`, `frontend-design` disponibles  
- [ ] Regla `agent-publicidad` aplica a `publicidad/**`  
- [ ] Crear `pieces/YYYY-MM-slug` con brief + HTML  
- [ ] `npm run render` genera `output.png`  
- [ ] `npm run preview:start` publica en `prosavis-ads-preview.web.app`  
- [ ] Deep link de pieza pega en chat y abre en teléfono  
- [ ] Descarga de imagen funciona en iPhone (Compartir → Guardar)  
- [ ] Túnel Cloudflare opcional funciona con PC encendido  

---

## 21. Qué NO inventar / NO hacer

- Logos, mascota, fotos → solo `assets/` o sync  
- Handles sociales → solo `channels.json`  
- Números safe zone → solo `safe-zones.json`  
- Token de preview → generado local; no hardcodear token de oficina en git  
- No mezclar piezas sueltas en raíz  
- No entregar solo PNG local sin deep link en revisión remota  
- No depender del iframe Cloudflare para la entrega principal  

---

## 22. Prompt listo para el agente de la PC casa

Pegar esto junto con este archivo:

> Recrea el módulo de publicidad ProSavis siguiendo `archivo.md` al pie de la letra.  
> 1) Clona `https://github.com/Prosavis/publicidad.git` en `%USERPROFILE%\Documents\GitHub\publicidad`.  
> 2) Instala skills del bundle (`design-dna`, `high-end-visual-design`, `canvas-design`, `frontend-design`) y la regla `agent-publicidad.mdc`.  
> 3) `npm install` + verifica render de una pieza existente.  
> 4) Configura preview: Firebase project `prosavis`, site `prosavis-ads-preview`, `npm run preview:autostart`.  
> 5) Confirma que puedes pegar deep links `https://prosavis-ads-preview.web.app/p/<token>/piece/<slug>/` en el chat.  
> No migres a Lumencare/Rayito. No inventes marca ni handles. Usa solo la arquitectura documentada.

---

## 23. Referencias de archivos fuente (oficina)

| Archivo | Rol |
| --- | --- |
| `publicidad/README.md` | Entrada ops |
| `publicidad/DESIGN.md` | Design system + safe zones |
| `publicidad/PRODUCT.md` | Product/brand creative |
| `publicidad/brand/*` | Tokens, channels, safe zones |
| `publicidad/scripts/*` | Render + preview |
| `publicidad/preview-gateway/*` | Firebase Hosting |
| `.cursor/rules/agent-publicidad.mdc` | Regla agente |
| `prosavis-firebase/docs/desarrollo/ads-preview-tunnel.md` | Doc preview |
| `prosavis-firebase/workspace/skills-lock.json` | Lock skills |
| `Prosavis-Suite.code-workspace` | Tasks Publicidad:* |
| `AGENTS.md` | Punteros suite |
| `.cursor/rules/skills-mandatory.mdc` | Bundle publicidad |

---

**Fin del blueprint.** Preferir clonar el repo real antes que reconstruir archivo por archivo; este documento es el contrato de paridad para el agente remoto.
)
