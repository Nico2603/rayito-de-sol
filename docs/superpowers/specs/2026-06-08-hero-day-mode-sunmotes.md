# Hero: Modo Día — SunMotes (Partículas Abstractas Cálidas)

**Fecha:** 2026-06-08
**Proyecto:** Rayito de Sol Landing Page
**Estado:** Aprobado para implementación

---

## Resumen

Reemplazar el modo día del Hero (anteriormente: nubes SVG + rayos CSS con parallax) con un sistema de **partículas abstractas cálidas** que flotan hacia arriba. Misma arquitectura canvas que InteractiveSparkles (modo noche), pero con paleta dorada, movimiento lento ascendente, y sensación etérea.

---

## Componente: `SunMotes`

### Visual

| Propiedad | Valor |
|---|---|
| Forma | Círculos suaves con glow (radial gradient) |
| Tamaño | 4px – 18px de radio |
| Cantidad | 50–60 partículas |
| Colores | `#FFD425` (oro marca), `#FFF8E7` (blanco cálido), `#FFEAA7` (crema), `#FFF5D6` (dorado claro) |
| Opacidad | 0.03 – 0.12 (muy sutil, se perciben en conjunto) |
| Blur/Glow | Desenfoque suave para sensación etérea |
| Paleta fija | No varía con el tema (el modo día siempre usa esta paleta) |

### Movimiento

- **Dirección:** Ascendente lento (flotando hacia arriba)
- **Velocidad:** ~30% de la velocidad de InteractiveSparkles (~0.3 píxeles/frame)
- **Deriva horizontal:** Suave, sinusoidal, sin patrones fijos
- **Easing:** Movimiento lineal con micro-variaciones (no easing brusco)
- **Respawn:** Cuando una partícula sale del viewport, reaparece en la parte inferior con nueva posición X aleatoria y tamaño/variación aleatoria

### Interacción (mouse parallax)

- Las partículas se desplazan sutilmente hacia la posición del cursor
- **Factor de desplazamiento:** Muy leve (~5–8% del de InteractiveSparkles)
- El desplazamiento se aplica como offset uniforme a todas las partículas (no seguimiento individual)
- **Reduced motion:** Sin seguimiento de mouse; partículas solo flotan hacia arriba

### Render

- Canvas HTML5 (2D context)
- Misma arquitectura que `InteractiveSparkles.tsx`: bucle `requestAnimationFrame`, array de objetos `Particle`, render batch
- Sin dependencias adicionales (no Framer Motion involucrado en el canvas)
- Memoria estable: sin crear/eliminar objetos en cada frame (pool de 60 partículas)

### Contraste con InteractiveSparkles (modo noche)

| Dimensión | Modo Noche | Modo Día |
|---|---|---|
| Partículas | 120 | 50–60 |
| Tamaño | 1px – 6px | 4px – 18px |
| Velocidad | Rápida, errática | Lenta, ascendente |
| Color | Blanco/azulado frío | Oro/blanco cálido |
| Opacidad | 0.1 – 0.6 | 0.03 – 0.12 |
| Blur | Mínimo | Notable |
| Interacción mouse | Fuerte (parallax marcado) | Sutil (apenas perceptible) |
| Sensación | Mágico, oscuro, vivo | Cálido, etéreo, sereno |

---

## Cambios requeridos en otros archivos

### `Hero.tsx`
- Render condicional: `día → <SunMotes />` | `noche → <InteractiveSparkles />`
- Eliminar `SunRays` del modo día
- No tocar el modo noche

### `Hero.tsx` (imports)
- Eliminar `import SunRays from './SunRays'`
- Agregar `import SunMotes from './SunMotes'`

### Archivos a eliminar
- `src/components/SunRays.tsx` — reemplazado por SunMotes

### Archivos a crear
- `src/components/SunMotes.tsx` — nuevo componente

### Sin cambios
- `InteractiveSparkles.tsx` — intacto
- `ThemeContext.tsx` — intacto
- Navbar, Contact, DESIGN_SYSTEM.md — intactos

---

## Árbol de archivos (después del cambio)

```
src/
├── components/
│   ├── Hero.tsx          # Render condicional SunMotes / InteractiveSparkles
│   ├── SunMotes.tsx      # ✨ NUEVO — partículas cálidas abstractas (canvas)
│   └── InteractiveSparkles.tsx  # Intacto
```

---

## Criterios de éxito

1. Las partículas se sienten cálidas y etéreas — no intentan ser realistas
2. El movimiento ascendente es lento y relajante
3. La interacción con mouse apenas se nota (parallax muy sutil)
4. No compite visualmente con el contenido del Hero
5. Reduced motion: partículas estáticas floating hacia arriba (sin mouse tracking)
6. Build y lint pasan sin errores
