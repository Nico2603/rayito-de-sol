# Hero Day Mode — Atmospheric Parallax Layers

**Date:** 2026-06-08
**Status:** Approved for implementation
**Component:** `SunRays.tsx` (full rewrite)
**Project:** Rayito de Sol — Landing Page

## Problem

The day mode hero animation has been implemented three times with canvas-based approaches, all rejected:
1. **God rays from above** — too subtle, invisible against blue sky
2. **Radial rays from mouse** — jarring, not smooth, "desagradable"
3. All canvas approaches suffered from rendering issues, poor contrast, and unpolished feel

The user wants: clouds that move with the mouse, sun rays from top-left as ambient animation, and a polished, aesthetic, smooth result.

## Design decision

**Approach: Atmospheric Parallax Layers (100% DOM, zero canvas)**

- 3 cloud layers at different depths with smooth mouse parallax via Framer Motion spring physics
- 6 fixed sun rays from top-left with gentle CSS pulse animation
- Ambient glow at the light source
- Brand colors: `#FFD425` for sun rays, soft whites for clouds
- No canvas, no aggressive mouse-following, no jarring movements

## Architecture

```
SunRays.tsx
├── Ambient glow (CSS radial gradient, fixed top-left)
├── 6 Sun rays (CSS divs + linear-gradient + @keyframes pulse)
├── CloudLayer 1 — far background (SVG, slow parallax ±8px)
├── CloudLayer 2 — midground (SVG, medium parallax ±20px)
└── CloudLayer 3 — foreground (SVG, fast parallax ±35px)
```

### 1. Sun Rays

| Property | Value |
|---|---|
| Origin | `top-0 left-0`, `transform-origin: top left` |
| Count | 6 rays |
| Rotation range | 0° to 60° from horizontal |
| Shape | `linear-gradient(180deg, rgba(255,212,37, X) → transparent)` |
| Animation | CSS `@keyframes rayPulse` — opacity oscillates slowly (3-5s period) |
| Mouse tracking | **None** — rays are fixed |
| Color | `#FFD425` with varying opacity at base (0.08–0.18) |

### 2. Cloud Layers

Each cloud layer is an SVG with overlapping ellipses forming soft cloud shapes.

| Layer | Opacity | Blur | Scale | Parallax strength |
|---|---|---|---|---|
| Far (bg) | 10% | 6px | Large (1.0x) | ±8px, stiffness 40, damping 30 |
| Mid | 16% | 4px | Medium (0.7x) | ±20px, stiffness 60, damping 25 |
| Near (fg) | 22% | 2px | Small (0.5x) | ±35px, stiffness 80, damping 20 |

**Mouse tracking:**
- `useMotionValue` + `useSpring` for smooth mouse position
- `useTransform` maps mouse position (0–1) to pixel offset
- Each layer uses different spring config for varied feel
- Spring physics (not lerp) ensures smooth, organic movement

**Cloud SVG shape:**
```svg
<ellipse cx="..." cy="..." rx="..." ry="..." />
<!-- 3-4 overlapping ellipses per cloud cluster -->
```

### 3. Ambient Glow

A single `radial-gradient` div fixed at the top-left, centered on the light source. Very subtle — just enough to anchor the rays visually.

### 4. Reduced Motion

- `useReducedMotion()` from framer-motion
- Clouds render statically (no parallax)
- Sun rays still animate (CSS animation respects `prefers-reduced-motion`)
- Glow stays static

## Hero.tsx changes

Current:
```tsx
{isDark ? (
  <InteractiveSparkles />
) : (
  <>
    <SunRays />
    <MouseGlow />
  </>
)}
```

New:
```tsx
{isDark ? (
  <InteractiveSparkles />
) : (
  <SunRays />  // SunRays now includes rays + clouds + glow
)}
```

`MouseGlow` removed from day mode — SunRays replaces it entirely.

## Color reference

All sun ray colors use the brand's `#FFD425` (`--color-sun`). Cloud colors are semi-transparent white (`rgba(255,255,255, X)`) with slight cool tint for depth.

## Technical stack

| Aspect | Technology |
|---|---|
| Animation engine | Framer Motion (`useMotionValue`, `useSpring`, `useTransform`) |
| Ray rendering | CSS `linear-gradient` + `@keyframes` |
| Cloud shapes | Inline SVG |
| Mouse tracking | Spring physics (no lerp, no requestAnimationFrame) |
| Zero canvas | ✅ |
| Zero manual rAF | ✅ |

## Files affected

- `src/components/SunRays.tsx` — full rewrite
- `src/components/Hero.tsx` — remove MouseGlow from day mode, simplify

## Verification

- `npm run build` — must pass
- `npm run lint` — must pass
- Visual: clouds drift smoothly with mouse, rays pulse gently from top-left, no jarring movements
