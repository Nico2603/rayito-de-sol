# Hero: Modo Día — SunGlow (Resplandor Solar Abstracto)

**Fecha:** 2026-06-08
**Proyecto:** Rayito de Sol Landing Page
**Estado:** Aprobado para implementación

---

## Resumen

Reemplazar `SunMotes` (partículas flotantes cálidas) por un efecto de **resplandor solar abstracto** que sigue al mouse. Un círculo de luz con destellos lentos, ultra minimal, sin canvas.

---

## Componente: `SunGlow`

### Visual

- Un círculo grande con gradiente radial: `#FFD425` en centro → transparente (muy baja opacidad, se siente más de lo que se ve)
- Opacidad general muy baja (0.08–0.15) — es un efecto ambiental
- `backdrop-filter: blur()` para que se funda con el contenido detrás
- Forma: `position: absolute`, centrado en el viewport, cubriendo ~80vmax de diámetro

### Destellos (lens flares)

- 6 líneas finas (2px) que irradian del centro
- Gradiente: `#FFD425` opaco cerca del centro → transparente
- Rotan 360° lentamente en ~20s (CSS `@keyframes`)
- Sin easing — rotación lineal constante
- Opacidad muy baja (~0.06)

### Interacción mouse

- Toda la composición se desplaza con Framer Motion spring (stiffness 60, damping 20)
- Rango de desplazamiento: ±3% del viewport (se mueve con la mirada, no es un cursor)
- Reduced motion: sin seguimiento de mouse, glow estático

### Render

- 100% DOM + CSS + Framer Motion
- Sin canvas, sin SVG
- ~40–50 líneas de código

### Archivos afectados

| Archivo | Cambio |
|---|---|
| `src/components/SunGlow.tsx` | ✨ Nuevo — componente de resplandor solar |
| `src/components/SunMotes.tsx` | Eliminar (SunGlow lo reemplaza) |
| `src/components/Hero.tsx` | `SunMotes` → `SunGlow` |
