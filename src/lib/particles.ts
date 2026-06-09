export interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseSize: number
  alpha: number
  targetAlpha: number
  life: number
  maxLife: number
  orbit: number
  orbitSpeed: number
}

export interface ParticleConfig {
  count: number
  maxDist: number
  attraction: number
  drift: number
  baseSizeRange: [number, number]
  alphaRange: [number, number]
  glowMult: number
  colorInner: string
  colorOuter: string
}

export function getParticleConfig(isDark: boolean): ParticleConfig {
  return isDark
    ? {
        count: 60,
        maxDist: 220,
        attraction: 0.05,
        drift: 0.18,
        baseSizeRange: [2, 5] as [number, number],
        alphaRange: [0.35, 0.7] as [number, number],
        glowMult: 0.12,
        colorInner: '255, 248, 214',
        colorOuter: '255, 212, 37',
      }
    : {
        count: 40,
        maxDist: 180,
        attraction: 0.03,
        drift: 0.10,
        baseSizeRange: [1.5, 3.5] as [number, number],
        alphaRange: [0.15, 0.4] as [number, number],
        glowMult: 0.06,
        colorInner: '255, 248, 214',
        colorOuter: '255, 200, 50',
      }
}

export function createParticles(w: number, h: number, cfg: ParticleConfig): Particle[] {
  const particles: Particle[] = []
  for (let i = 0; i < cfg.count; i++) {
    particles.push({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      size: Math.random() * (cfg.baseSizeRange[1] - cfg.baseSizeRange[0]) + cfg.baseSizeRange[0],
      baseSize: Math.random() * (cfg.baseSizeRange[1] - cfg.baseSizeRange[0]) + cfg.baseSizeRange[0],
      alpha: Math.random() * (cfg.alphaRange[1] - cfg.alphaRange[0]) + cfg.alphaRange[0],
      targetAlpha: Math.random() * (cfg.alphaRange[1] - cfg.alphaRange[0]) + cfg.alphaRange[0],
      life: Math.random() * 100,
      maxLife: 100 + Math.random() * 100,
      orbit: Math.random() * Math.PI * 2,
      orbitSpeed: (Math.random() - 0.5) * 0.02,
    })
  }
  return particles
}

export function updateParticles(
  particles: Particle[],
  cfg: ParticleConfig,
  mouseX: number,
  mouseY: number,
  w: number,
  h: number,
  ctx: CanvasRenderingContext2D,
): void {
  ctx.clearRect(0, 0, w, h)

  particles.forEach((p) => {
    p.orbit += p.orbitSpeed
    p.vx += Math.sin(p.orbit) * 0.015
    p.vy -= cfg.drift * 0.01

    const dx = mouseX - p.x
    const dy = mouseY - p.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < cfg.maxDist && dist > 0) {
      const force = (1 - dist / cfg.maxDist) * cfg.attraction
      p.vx += (dx / dist) * force
      p.vy += (dy / dist) * force

      const proximity = 1 - dist / cfg.maxDist
      p.targetAlpha = cfg.alphaRange[0] + proximity * (1 - cfg.alphaRange[0])
      p.size = p.baseSize * (1 + proximity * 0.8)

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * (4 + proximity * 6), 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${cfg.colorOuter}, ${proximity * cfg.glowMult * 1.5})`
      ctx.fill()
    } else {
      p.life += 0.5
      if (p.life > p.maxLife) {
        p.life = 0
        p.maxLife = 100 + Math.random() * 150
      }
      const lifeRatio = p.life / p.maxLife
      p.targetAlpha = Math.sin(lifeRatio * Math.PI) * (cfg.alphaRange[1] - 0.05) + 0.05
      p.size = p.baseSize * (0.8 + 0.4 * Math.sin(lifeRatio * Math.PI))

      if (dist > cfg.maxDist * 2 && Math.random() < 0.001) {
        p.x = Math.random() * w
        p.y = Math.random() * h * 0.3
      }
    }

    p.vx *= 0.97
    p.vy *= 0.97
    p.alpha += (p.targetAlpha - p.alpha) * 0.05

    const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
    if (speed > 3) {
      p.vx = (p.vx / speed) * 3
      p.vy = (p.vy / speed) * 3
    }

    p.x += p.vx
    p.y += p.vy

    if (p.x < 0) { p.x = 0; p.vx *= -0.5 }
    if (p.x > w) { p.x = w; p.vx *= -0.5 }
    if (p.y < 0) { p.y = 0; p.vy *= -0.5 }
    if (p.y > h) { p.y = h; p.vy *= -0.5 }

    const alpha = Math.max(0, Math.min(1, p.alpha))
    if (alpha < 0.01) return

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
    gradient.addColorStop(0, `rgba(${cfg.colorInner}, ${alpha})`)
    gradient.addColorStop(0.3, `rgba(${cfg.colorOuter}, ${alpha * 0.6})`)
    gradient.addColorStop(1, `rgba(${cfg.colorOuter}, 0)`)
    ctx.fillStyle = gradient
    ctx.fill()

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.7})`
    ctx.fill()
  })
}
