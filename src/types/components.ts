import type { LucideIcon } from 'lucide-react'

export interface Service {
  icon: LucideIcon
  title: string
  description: string
  href?: string
  ctaLabel?: string
}

export interface ApproachValue {
  icon: LucideIcon
  title: string
  description: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface Testimonial {
  quote: string
  context: string
  initials: string
}
