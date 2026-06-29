import TopicLandingLayout from '../components/TopicLandingLayout'
import { infantilTopicFaq } from '../data/topic-faq-infantil'

const pageTitle = 'Psicología infantil en Pereira | Rayito de Sol'
const pageDescription =
  'Atención psicológica infantil en Pereira para niñas y niños desde los 4 años, con acompañamiento para familias y cuidadores.'

export default function PsicologiaInfantilPereira() {
  return (
    <TopicLandingLayout
      pageTitle={pageTitle}
      pageDescription={pageDescription}
      slug="/psicologia-infantil-pereira"
      serviceName="Psicología infantil en Pereira"
      breadcrumbs={[
        { name: 'Inicio', path: '/' },
        { name: 'Psicología infantil', path: '/psicologia-infantil-pereira' },
      ]}
      eyebrow="Atención psicológica infantil en Pereira"
      h1="Psicología infantil con acompañamiento familiar"
      lead="Acompaño procesos emocionales y de conducta en infancia con un enfoque respetuoso, cercano y basado en evidencia, involucrando activamente a la familia."
      whatsappSource="pagina psicologia infantil pereira"
      ctaLabel="Agendar valoración inicial"
      leftCardTitle="¿Cuándo consultar?"
      leftCardItems={[
        'Cambios de conducta frecuentes, irritabilidad o tristeza prolongada.',
        'Dificultades para expresar emociones o regular frustración.',
        'Problemas de adaptación escolar y social.',
        'Somatizaciones frecuentes: dolor de barriga, dolor de cabeza o alteraciones de sueño.',
      ]}
      rightCardTitle="Proceso terapéutico"
      rightCardItems={[
        'Entrevista inicial con cuidadores para comprender el contexto familiar y escolar.',
        'Sesiones terapéuticas adaptadas por edad, con juego y recursos expresivos.',
        'Retroalimentación periódica para fortalecer estrategias en casa.',
      ]}
      faqTitle="Preguntas frecuentes sobre atención infantil"
      faq={infantilTopicFaq}
    />
  )
}
