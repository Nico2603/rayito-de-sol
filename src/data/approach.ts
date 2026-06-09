import type { ApproachValue } from '../types/components'
import { HeartHandshake, Sprout, BadgeCheck } from 'lucide-react'

export const aboutIntroLead =
  'Psicóloga apasionada por el bienestar emocional y el crecimiento personal. Mi enfoque integra la calidez humana, el rigor científico y la transformación personal.'

export const aboutIntroFollow =
  'Ofrezco un acompañamiento cercano y profesional, basado en la evidencia psicológica, donde cada persona es vista más allá de un diagnóstico y acompañada en la construcción de cambios significativos para su bienestar.'

export const approachValues: ApproachValue[] = [
  {
    icon: HeartHandshake,
    title: 'Enfoque Humanista y Centrado en la Persona',
    description:
      'Creo en la importancia de construir un espacio seguro, cálido y libre de juicios, donde cada persona pueda sentirse escuchada, comprendida y acompañada. Más allá de los síntomas o diagnósticos, reconozco la historia, los recursos y el potencial de cada ser humano.',
  },
  {
    icon: BadgeCheck,
    title: 'Enfoque Clínico Basado en la Evidencia',
    description:
      'Mi trabajo se fundamenta en conocimientos científicos y herramientas psicológicas respaldadas por la investigación. Esto permite ofrecer procesos terapéuticos éticos, responsables y orientados a generar cambios significativos y sostenibles.',
  },
  {
    icon: Sprout,
    title: 'Enfoque de Transformación y Bienestar Integral',
    description:
      'La terapia no se limita a aliviar el malestar emocional; también busca promover el crecimiento personal, el autoconocimiento y el desarrollo de habilidades que permitan construir una vida más equilibrada, consciente y coherente con los propios valores.',
  },
]
