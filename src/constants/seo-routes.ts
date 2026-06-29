export interface SeoRoute {
  path: string
  changefreq: 'weekly' | 'monthly' | 'yearly'
  priority: number
}

export const PRERENDER_ROUTES: SeoRoute[] = [
  { path: '/', changefreq: 'monthly', priority: 1.0 },
  { path: '/terapia-ansiedad-pereira', changefreq: 'monthly', priority: 0.9 },
  { path: '/psicologia-infantil-pereira', changefreq: 'monthly', priority: 0.9 },
  { path: '/terapia-online-colombia', changefreq: 'monthly', priority: 0.9 },
  { path: '/sobre-maria-camila', changefreq: 'monthly', priority: 0.85 },
  { path: '/guias/como-saber-si-necesito-terapia', changefreq: 'monthly', priority: 0.8 },
  { path: '/guias/ansiedad-y-burnout-trabajo', changefreq: 'monthly', priority: 0.8 },
  { path: '/guias/cuando-llevar-a-un-nino-al-psicologo', changefreq: 'monthly', priority: 0.8 },
  { path: '/guias/terapia-online-colombia-guia', changefreq: 'monthly', priority: 0.8 },
  { path: '/guias/cuanto-cuesta-terapia-psicologica-pereira', changefreq: 'monthly', priority: 0.8 },
  { path: '/guias/primera-sesion-psicologica-que-esperar', changefreq: 'monthly', priority: 0.8 },
  { path: '/politica-privacidad', changefreq: 'yearly', priority: 0.5 },
]

export const GUIDE_SLUGS = [
  'como-saber-si-necesito-terapia',
  'ansiedad-y-burnout-trabajo',
  'cuando-llevar-a-un-nino-al-psicologo',
  'terapia-online-colombia-guia',
  'cuanto-cuesta-terapia-psicologica-pereira',
  'primera-sesion-psicologica-que-esperar',
] as const

export type GuideSlug = (typeof GUIDE_SLUGS)[number]
