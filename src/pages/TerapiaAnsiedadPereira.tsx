import TopicLandingLayout from '../components/TopicLandingLayout'
import { ansiedadTopicFaq } from '../data/topic-faq-ansiedad'

const pageTitle = 'Terapia para ansiedad en Pereira | Rayito de Sol'
const pageDescription =
  'Terapia psicológica para ansiedad, estrés y burnout en Pereira. Agenda tu primera sesión con enfoque clínico y acompañamiento cercano.'

export default function TerapiaAnsiedadPereira() {
  return (
    <TopicLandingLayout
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      slug="/terapia-ansiedad-pereira"
      serviceName="Terapia para ansiedad en Pereira"
      breadcrumbs={[
        { name: 'Inicio', path: '/' },
        { name: 'Terapia para ansiedad', path: '/terapia-ansiedad-pereira' },
      ]}
      eyebrow="Terapia psicológica en Pereira"
      h1="Terapia para ansiedad y burnout laboral"
      lead="Si sientes que la ansiedad está afectando tu energía, tu concentración o tus relaciones, podemos trabajar un proceso estructurado para recuperar estabilidad emocional y bienestar."
      whatsappSource="pagina ansiedad pereira"
      ctaLabel="Agendar por WhatsApp"
      leftCardTitle="Señales de alerta comunes"
      leftCardItems={[
        'Pensamientos repetitivos o sensación de alerta constante.',
        'Cansancio mental, dificultad para descansar o dormir.',
        'Bloqueo para tomar decisiones y sensación de saturación.',
        'Irritabilidad, culpa o miedo que interfiere en tu día a día.',
      ]}
      rightCardTitle="¿Cómo trabajamos en consulta?"
      rightCardItems={[
        'Valoración inicial para entender síntomas, detonantes y objetivos.',
        'Plan terapéutico personalizado con herramientas de regulación emocional.',
        'Seguimiento semanal para consolidar cambios sostenibles.',
      ]}
      faqTitle="Preguntas frecuentes sobre ansiedad"
      faq={ansiedadTopicFaq}
    />
  )
}
