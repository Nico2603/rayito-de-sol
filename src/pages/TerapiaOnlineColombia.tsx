import TopicLandingLayout from '../components/TopicLandingLayout'
import { onlineTopicFaq } from '../data/topic-faq-online'

const pageTitle = 'Terapia psicológica online en Colombia | Rayito de Sol'
const pageDescription =
  'Sesiones de psicología online en Colombia con enfoque clínico. Ansiedad, burnout y acompañamiento familiar desde Pereira con modalidad virtual segura.'

export default function TerapiaOnlineColombia() {
  return (
    <TopicLandingLayout
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      slug="/terapia-online-colombia"
      serviceName="Terapia psicológica online en Colombia"
      breadcrumbs={[
        { name: 'Inicio', path: '/' },
        { name: 'Terapia online', path: '/terapia-online-colombia' },
      ]}
      eyebrow="Psicología online en Colombia"
      h1="Terapia psicológica online con acompañamiento clínico"
      lead="La terapia online permite iniciar o continuar tu proceso psicológico con flexibilidad, confidencialidad y la misma rigurosidad clínica que la atención presencial en Pereira."
      whatsappSource="pagina terapia online colombia"
      ctaLabel="Consultar disponibilidad online"
      leftCardTitle="¿Para quién es la terapia online?"
      leftCardItems={[
        'Adultos y adolescentes en cualquier ciudad de Colombia.',
        'Personas con agenda exigente o desplazamientos frecuentes.',
        'Quienes prefieren continuidad terapéutica sin pausas por viajes.',
        'Familias que requieren orientación parental por videollamada.',
      ]}
      rightCardTitle="¿Qué trabajamos en sesión virtual?"
      rightCardItems={[
        'Ansiedad, estrés laboral y regulación emocional.',
        'Burnout y límites saludables en el trabajo.',
        'Autoestima, duelo y toma de decisiones.',
        'Orientación a padres en procesos de infancia y adolescencia.',
      ]}
      faqTitle="Preguntas frecuentes sobre terapia online"
      faq={onlineTopicFaq}
    />
  )
}
