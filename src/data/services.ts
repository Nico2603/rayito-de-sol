import type { Service } from '../types/components'
import { User, ToyBrick, Video, Presentation } from 'lucide-react'

export const services: Service[] = [
  {
    icon: User,
    title: 'Terapia Individual',
    description: 'Espacio personalizado para trabajar ansiedad, depresión, autoestima y crecimiento personal. Sesiones online y presenciales.',
    href: '/terapia-ansiedad-pereira',
    ctaLabel: 'Conocer terapia para ansiedad',
  },
  {
    icon: ToyBrick,
    title: 'Atención Infantil',
    description: 'Terapia lúdica para niños. A través del juego y la expresión creativa, abordamos sus necesidades emocionales.',
    href: '/psicologia-infantil-pereira',
    ctaLabel: 'Conocer psicología infantil',
  },
  {
    icon: Video,
    title: 'Terapia Online',
    description: 'Sesiones virtuales desde la comodidad de tu hogar. Misma calidad y compromiso que la terapia presencial.',
    href: '/terapia-online-colombia',
    ctaLabel: 'Conocer terapia online',
  },
  {
    icon: Presentation,
    title: 'Talleres y Charlas',
    description: 'Espacios grupales sobre manejo del estrés, inteligencia emocional, crianza consciente y bienestar laboral.',
  },
]
