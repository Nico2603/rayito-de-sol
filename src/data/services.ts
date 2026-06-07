import type { LucideIcon } from 'lucide-react'
import { User, Users, ToyBrick, Video, Presentation } from 'lucide-react'

export interface Service {
  icon: LucideIcon
  title: string
  description: string
}

export const services: Service[] = [
  {
    icon: User,
    title: 'Terapia Individual',
    description: 'Espacio personalizado para trabajar ansiedad, depresión, autoestima y crecimiento personal. Sesiones online y presenciales.',
  },
  {
    icon: Users,
    title: 'Terapia Familiar',
    description: 'Acompañamiento a familias para mejorar la comunicación, resolver conflictos y fortalecer vínculos afectivos.',
  },
  {
    icon: ToyBrick,
    title: 'Atención Infantil',
    description: 'Terapia lúdica para niños. A través del juego y la expresión creativa, abordamos sus necesidades emocionales.',
  },
  {
    icon: Video,
    title: 'Terapia Online',
    description: 'Sesiones virtuales desde la comodidad de tu hogar. Misma calidad y compromiso que la terapia presencial.',
  },
  {
    icon: Presentation,
    title: 'Talleres y Charlas',
    description: 'Espacios grupales sobre manejo del estrés, inteligencia emocional, crianza consciente y bienestar laboral.',
  },
]
