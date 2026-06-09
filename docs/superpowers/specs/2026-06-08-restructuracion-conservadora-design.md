# Reestructuración Conservadora — Rayito de Sol

> **Fecha:** 2026-06-08
> **Estado:** Por implementar
> **Basado en:** Graphify analysis (366 nodos, 396 aristas, 30 comunidades) + auditoría manual de archivos

---

## 1. Diagnóstico Actual

### Métricas del proyecto

| Métrica | Valor |
|---|---|
| Archivos en `src/` | ~30 |
| Líneas totales aprox. | ~2.000 |
| Páginas | 1 (`Home.tsx`) |
| Comunidades en el grafo | 30 |
| Nodos aislados (<1 conexión) | ~101 (configs) |

### Archivos más grandes (objetivos de división)

| Archivo | Líneas | Problema |
|---|---|---|
| `src/index.css` | 204 | Todo junto: tokens, temas, animaciones, scrollbar, selection. Debería estar modularizado. |
| `src/components/InteractiveSparkles.tsx` | 228 | Canvas + partículas + mouse tracking + lógica de render + configuración todo en uno. |
| `src/components/Navbar.tsx` | 189 | Navegación desktop + menú mobile + theme toggle + logo + estado de scroll. |
| `src/components/Hero.tsx` | 129 | Varios subcomponentes (label, título, tagline, copy, CTA, sparkles wrapper). |
| `src/components/Contact.tsx` | 132 | Formulario + validación + campos + información de contacto + layout. |
| `src/components/InstagramFeed.tsx` | 112 | Feed + 3 estados (loading/error/success) + skeleton + lógica de render condicional. |

### Problemas de organización detectados por Graphify

1. **Baja cohesión** en comunidades principales (0.10–0.14) — los módulos mezclan preocupaciones.
2. **Datos mezclados con presentación** — algunos textos/links están hardcodeados en componentes en vez de en `data/`.
3. **Capa de estilos monolítica** — `index.css` concentra tokens de diseño, temas, animaciones CSS, utilerías de scrollbar y selection.
4. **Lógica de features mezclada con UI** — especialmente en InteractiveSparkles (canvas + física + render condicional).

---

## 2. Decisión: Enfoque Conservador

**No hacemos:** features folders, barrel exports (`index.ts` en cada carpeta), lazy loading por sección, capas formales (ui/logic/data), ni nuevas abstracciones.

**Sí hacemos:** Dividir archivos grandes donde sea evidente el punto de separación, mover datos a `data/`, y organizar estilos en módulos temáticos. Sin cambiar comportamiento ni romper animaciones existentes.

**Razón:** El proyecto es una landing page de una sola página (~2,000 líneas, ~30 archivos). La arquitectura actual (components/, data/, hooks/, lib/, context/, constants/) ya es adecuada. Solo necesita orden fino.

---

## 3. Plan de Acción (7 pasos, en orden)

### Paso 1: Modularizar `index.css` → 3 archivos

| Archivo actual | Líneas | Nuevos archivos | Contenido |
|---|---|---|---|
| `src/index.css` | 204 | `src/styles/tokens.css` | Variables CSS (colores fijos + variables de tema light/dark) |
| | | `src/styles/animations.css` | Keyframes (sparkle), theme transitions, reduced motion |
| | | `src/styles/base.css` | Scrollbar, selection, body defaults, utilidades mínimas |

`src/index.css` se convierte en un barrel que importa los 3:
```css
@import './styles/tokens.css';
@import './styles/animations.css';
@import './styles/base.css';
```

### Paso 2: Separar `InteractiveSparkles.tsx` → 2 archivos

| Actual | Líneas | Nuevos archivos |
|---|---|---|
| `InteractiveSparkles.tsx` | 228 | `InteractiveSparkles.tsx` (~100) — Componente React con canvas ref + render loop |
| | | `lib/particles.ts` (~130) — Lógica pura: clase Particle, física, clustering, tipos |

**Regla:** `particles.ts` no importa React. Solo tipos, física, y lógica de canvas. El componente se queda con el `useEffect`, canvas ref, y render loop.

### Paso 3: Separar `Navbar.tsx` → extraer links de navegación

| Actual | Líneas | Cambio |
|---|---|---|
| `Navbar.tsx` | 189 | Extraer array de nav links a `data/navigation.ts` + extraer MobileMenu a componente separado (opcional) |

**Opcional pero recomendado:** Mover los `navLinks` a `data/navigation.ts` y extraer `MobileMenu` como subcomponente en `components/MobileMenu.tsx`.

### Paso 4: Separar `Contact.tsx` → extraer datos del formulario

| Actual | Líneas | Cambio |
|---|---|---|
| `Contact.tsx` | 132 | Mover campos del formulario + metadata de contacto a `data/contact.ts` |

Los `inputFields` (nombre, email, teléfono, mensaje) y la info de contacto (email, ubicación, WhatsApp) salen a `data/contact.ts`. El componente solo renderiza.

### Paso 5: Mover constantes huérfanas a `data/`

Inventario de textos y datos hardcodeados encontrados en componentes:

| Componente | Dato a mover | Destino |
|---|---|---|
| `Hero.tsx` | `heroSubcopy` text | `data/hero.ts` |
| `Hero.tsx` | `heroTagline` text | `data/hero.ts` |
| `Contact.tsx` | `inputFields` array | `data/contact.ts` |
| `Contact.tsx` | `contactInfo` array | `data/contact.ts` |
| `Navbar.tsx` | `navLinks` array | `data/navigation.ts` |
| `Footer.tsx` | Footer links y textos | `data/footer.ts` |

### Paso 6: Consolidar lógica de Instagram

Actualmente el feed de Instagram está disperso en 7 archivos:

```
api/instagram-feed.ts     → serverless function (Vercel)
api/instagram-image.ts    → serverless function (Vercel)
src/lib/instagram-api.ts  → cliente API
src/lib/instagram-image.ts → proxy de imágenes
src/hooks/useInstagramFeed.ts → hook React
src/data/instagram-posts.ts → fallback data
src/components/InstagramFeed.tsx → UI
```

**Propuesta:** No mover archivos (son responsabilidades distintas), pero **unificar tipos** en `src/types/instagram.ts` para que todos compartan las mismas interfaces. Actualmente los tipos están duplicados o implícitos.

### Paso 7: Añadir `src/types/` para tipos compartidos

Crear carpeta `src/types/` con tipos que hoy están definidos inline o duplicados:

| Archivo | Contenido |
|---|---|
| `src/types/instagram.ts` | `InstagramPost`, `FeedState`, `InstagramFallbackPost` |
| `src/types/components.ts` | `Service`, `ApproachValue`, `FAQItem` (hoy en `data/`) |
| `src/types/theme.ts` | `Theme`, `ThemeContext` (hoy en `context/ThemeContext.tsx`) |

Los tipos en `data/` se mantienen pero re-exportan desde los archivos de tipos.

---

## 4. Lo que NO se toca

| Componente | Razón |
|---|---|
| `Hero.tsx` completo | Ya está en un tamaño razonable (129 líneas) y tiene animaciones complejas que no queremos arriesgar |
| `SectionWrapper.tsx` | 678 bytes / ~25 líneas — perfecto como está |
| `Logo.tsx` | 785 bytes — pequeño y enfocado |
| `MouseGlow.tsx` | ~35 líneas — bien acotado |
| `Sparkles.tsx` | ~40 líneas — bien acotado |
| `ThemeContext.tsx` | ~50 líneas — bien acotado |
| `About.tsx` | ~60 líneas — bien acotado |
| `Approach.tsx` | ~50 líneas — bien acotado |
| `Services.tsx` | ~50 líneas — bien acotado |
| `FAQ.tsx` | ~65 líneas — bien acotado |
| `Footer.tsx` | ~40 líneas — bien acotado |
| `App.tsx` | ~35 líneas — entry point |
| `main.tsx` | ~16 líneas — entry point |

---

## 5. Árbol de Archivos Resultante (solo cambios)

```
src/
├── index.css                  # Barrel: importa styles/*.css
├── styles/                    # NUEVA
│   ├── tokens.css             # Variables CSS, colores, gradientes
│   ├── animations.css         # Keyframes, transitions, reduced motion
│   └── base.css               # Scrollbar, selection, body defaults
├── types/                     # NUEVA
│   ├── instagram.ts           # InstagramPost, FeedState, etc.
│   ├── components.ts          # Service, ApproachValue, FAQItem
│   └── theme.ts               # Theme, ThemeContext
├── data/
│   ├── navigation.ts          # NUEVO (extraído de Navbar)
│   ├── contact.ts             # NUEVO (extraído de Contact)
│   ├── hero.ts                # NUEVO (extraído de Hero)
│   ├── footer.ts              # NUEVO (extraído de Footer)
│   ├── approach.ts            # EXISTENTE
│   ├── services.ts            # EXISTENTE
│   ├── faq.ts                 # EXISTENTE
│   └── instagram-posts.ts     # EXISTENTE
├── lib/
│   ├── particles.ts           # NUEVO (extraído de InteractiveSparkles)
│   ├── instagram-api.ts       # EXISTENTE
│   └── instagram-image.ts     # EXISTENTE
├── components/
│   ├── InteractiveSparkles.tsx # REDUCIDO (solo canvas + render loop)
│   ├── Navbar.tsx             # REDUCIDO (sin datos hardcodeados)
│   ├── Contact.tsx            # REDUCIDO (sin datos de formulario)
│   ├── Hero.tsx                # REDUCIDO (sin textos hardcodeados)
│   └── ... (resto sin cambios)
└── ... (sin cambios)
```

---

## 6. Orden de Ejecución (crítico para no romper nada)

1. **Paso 1:** `styles/tokens.css` + `styles/animations.css` + `styles/base.css` + barrel `index.css`
   - *Riesgo:* Bajo. Solo mover CSS puro entre archivos.
   - *Verificación:* `npm run dev` y revisar que el tema día/noche siga funcionando.

2. **Paso 5 (anticipado):** `data/hero.ts` + `data/footer.ts` + `data/navigation.ts`
   - *Riesgo:* Bajo. Solo mover datos. Asegurar imports correctos.

3. **Paso 3:** Separar `Navbar.tsx` + opcionalmente `MobileMenu.tsx`
   - *Riesgo:* Medio. MobileMenu tiene animación de entrada/salida (AnimatePresence). Cuidar que los refs y variantes de Framer Motion se mantengan.

4. **Paso 2:** Separar `InteractiveSparkles.tsx` → `lib/particles.ts`
   - *Riesgo:* Medio-alto. La física de partículas y el canvas loop son delicados. Asegurar que Particle class exportada funcione idéntico. Probar en día y noche.

5. **Paso 4:** Separar `Contact.tsx` → `data/contact.ts`
   - *Riesgo:* Bajo. Solo mover datos.

6. **Paso 6:** `src/types/instagram.ts`
   - *Riesgo:* Bajo. Extraer tipos existentes.

7. **Paso 7:** `src/types/components.ts` + `src/types/theme.ts`
   - *Riesgo:* Bajo. Extraer tipos existentes.

---

## 7. Criterios de Éxito

- [ ] `npm run dev` funciona sin errores después de cada paso
- [ ] `npm run build` pasa sin errores (TypeScript + Vite)
- [ ] `npm run lint` pasa sin errores
- [ ] Tema día/noche funciona (probar toggle + persistencia)
- [ ] Animaciones del Hero funcionan (partículas, sparkles, fadeUp)
- [ ] Formulario de contacto funciona (validación + envío)
- [ ] FAQ accordion funciona
- [ ] Instagram feed carga (o muestra fallback)
- [ ] Navbar responsiva funciona (desktop + mobile + menú hamburguesa)
- [ ] Graphify: `graphify update .` reporta misma cantidad de nodos (~366) y aristas (~396)
- [ ] DESIGN_SYSTEM.md se mantiene actualizado como fuente de verdad
