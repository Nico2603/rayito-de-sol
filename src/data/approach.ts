import type { LucideIcon } from 'lucide-react'
import { HeartHandshake, Sprout, BadgeCheck } from 'lucide-react'

export interface ApproachValue {
  icon: LucideIcon
  title: string
  description: string
}

export const approachValues: ApproachValue[] = [
  {
    icon: HeartHandshake,
    title: 'Calidez y Confianza',
    description: 'Un espacio donde puedas ser tú sin juicios. La base de todo proceso terapéutico es sentirte en un lugar seguro.',
  },
  {
    icon: Sprout,
    title: 'Crecimiento Orgánico',
    description: 'No hay prisas. Cada proceso es único y florece a su propio ritmo. Te acompaño en tu camino sin forzar pasos.',
  },
  {
    icon: BadgeCheck,
    title: 'Rigor Profesional',
    description: 'Técnicas basadas en evidencia, actualización constante y un enfoque estructurado pero flexible a tus necesidades.',
  },
]
