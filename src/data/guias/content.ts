import type { TopicFaqItem } from '../../lib/structured-data'
import type { GuideSlug } from '../../constants/seo-routes'

export interface GuiaSection {
  heading: string
  paragraphs: string[]
}

export interface GuiaContent {
  slug: GuideSlug
  path: string
  title: string
  description: string
  keywords: string
  directAnswer: string
  datePublished: string
  dateModified: string
  sections: GuiaSection[]
  faq: TopicFaqItem[]
}

export const guiasContent: GuiaContent[] = [
  {
    slug: 'como-saber-si-necesito-terapia',
    path: '/guias/como-saber-si-necesito-terapia',
    title: '¿Cómo saber si necesito terapia psicológica? | Rayito de Sol',
    description:
      'Señales para saber si necesitas terapia psicológica, cuándo consultar y qué esperar al iniciar un proceso en Pereira, Colombia.',
    keywords:
      'cómo saber si necesito terapia, señales para ir al psicólogo, cuándo ir al psicólogo Pereira',
    directAnswer:
      'Necesitas considerar terapia psicológica cuando malestares emocionales como ansiedad, tristeza, irritabilidad o agotamiento persisten varias semanas e interfieren en tu sueño, trabajo o relaciones. No hace falta estar en crisis: la terapia también sirve para prevenir, ordenar emociones y tomar decisiones con más claridad.',
    datePublished: '2026-06-29',
    dateModified: '2026-06-29',
    sections: [
      {
        heading: 'Señales frecuentes de que conviene consultar',
        paragraphs: [
          'Muchas personas postergan la consulta porque creen que deben “estar muy mal” para merecer ayuda profesional. En la práctica clínica, quienes llegan temprano suelen recuperar equilibrio con menos desgaste.',
          'Algunas señales habituales son: preocupación constante que no se calma, sensación de vacío o tristeza prolongada, irritabilidad desproporcionada, cambios en el apetito o el sueño, dificultad para concentrarse y evitación de situaciones cotidianas por miedo o inseguridad.',
          'También es válido consultar si atraviesas un duelo, un cambio laboral, conflictos de pareja o sensación de no reconocerte. La terapia ofrece un espacio para nombrar lo que sientes y construir estrategias concretas.',
        ],
      },
      {
        heading: 'Diferencia entre malestar normal y consulta profesional',
        paragraphs: [
          'El estrés puntual ante un examen, una entrega laboral o una discusión familiar es parte de la vida. El criterio clínico relevante es la duración, la intensidad y el impacto funcional: ¿puedes descansar, trabajar, relacionarte y cuidar de ti con relativa normalidad?',
          'Si el malestar se mantiene más de dos o tres semanas, se intensifica o aparecen síntomas físicos recurrentes (tensión, palpitaciones, dolores de cabeza), una valoración psicológica puede aclarar si necesitas intervención, orientación o solo contención temporal.',
        ],
      },
      {
        heading: 'Qué NO necesitas para iniciar terapia',
        paragraphs: [
          'No necesitas un diagnóstico previo, una historia perfectamente ordenada ni la certeza absoluta de que “esto es ansiedad o depresión”. La primera sesión existe precisamente para comprender tu situación y definir objetivos realistas.',
          'Tampoco se trata de demostrar fortaleza o debilidad. Buscar apoyo psicológico es un acto de cuidado y responsabilidad con tu salud mental, similar a consultar por un dolor físico persistente.',
        ],
      },
      {
        heading: 'Primer paso en Pereira',
        paragraphs: [
          'Si estás en Pereira o en otra ciudad de Colombia, puedes iniciar con una valoración presencial u online. En Rayito de Sol — Psicología, la primera sesión es un espacio de escucha, clarificación de objetivos y acuerdo de un plan de trabajo sin presión.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Puedo ir al psicólogo sin tener un diagnóstico?',
        answer:
          'Sí. Muchas personas inician terapia para ordenar emociones, tomar decisiones o atravesar etapas de cambio sin un diagnóstico previo. La valoración inicial orienta el camino.',
      },
      {
        question: '¿Cuánto tiempo debo esperar antes de consultar?',
        answer:
          'Si los síntomas persisten varias semanas o afectan tu funcionamiento diario, no es necesario esperar a empeorar. Consultar a tiempo suele facilitar un proceso más breve y sostenible.',
      },
    ],
  },
  {
    slug: 'ansiedad-y-burnout-trabajo',
    path: '/guias/ansiedad-y-burnout-trabajo',
    title: 'Ansiedad y burnout laboral: guía práctica | Rayito de Sol',
    description:
      'Qué es el burnout, cómo se relaciona con la ansiedad y qué estrategias psicológicas ayudan en Pereira y Colombia.',
    keywords:
      'burnout laboral Pereira, ansiedad trabajo, agotamiento emocional Colombia, estrés laboral psicólogo',
    directAnswer:
      'El burnout laboral es un estado de agotamiento físico y emocional prolongado por estrés crónico en el trabajo, que suele acompañarse de ansiedad, irritabilidad y sensación de ineficacia. La terapia psicológica ayuda a recuperar límites, regular emociones y prevenir recaídas con herramientas basadas en evidencia.',
    datePublished: '2026-06-29',
    dateModified: '2026-06-29',
    sections: [
      {
        heading: '¿Qué es el burnout y cómo se manifiesta?',
        paragraphs: [
          'El burnout no es simplemente “estar cansado del trabajo”. Es un desgaste sostenido que afecta la motivación, la concentración y la capacidad de recuperación. Puede incluir cinismo hacia las tareas, sensación de estar al límite y dificultad para desconectar fuera del horario laboral.',
          'Físicamente aparecen tensiones musculares, alteraciones del sueño, dolores de cabeza y fatiga que no mejora con descanso convencional. Emocionalmente, la persona puede sentirse atrapada, culpable por no rendir igual o ansiosa ante cada notificación laboral.',
        ],
      },
      {
        heading: 'Relación entre ansiedad y agotamiento laboral',
        paragraphs: [
          'Ansiedad y burnout suelen reforzarse mutuamente: la preocupación constante por el desempeño aumenta el estrés, y el agotamiento reduce la tolerancia a la frustración. En consulta se trabajan ambos ejes de forma integrada.',
          'La terapia cognitivo-conductual (TCC) es especialmente útil para identificar pensamientos de exigencia extrema, perfeccionismo y dificultad para decir no, reemplazándolos por criterios más realistas y límites saludables.',
        ],
      },
      {
        heading: 'Estrategias que suelen ayudar',
        paragraphs: [
          'Regulación emocional diaria (pausas breves, respiración, micro-hábitos de recuperación), renegociación de carga laboral cuando es posible, y revisión de creencias sobre productividad y merecimiento.',
          'También es importante evaluar factores organizacionales: jornadas extendidas, falta de reconocimiento o ambigüedad de roles. La terapia no sustituye cambios estructurales necesarios, pero fortalece tu capacidad de decidir y protegerte.',
        ],
      },
      {
        heading: 'Cuándo buscar ayuda profesional en Pereira',
        paragraphs: [
          'Si el agotamiento afecta tu salud, tus relaciones o tu desempeño de forma sostenida, una valoración psicológica puede prevenir un empeoramiento. En Rayito de Sol acompaño procesos de ansiedad y burnout con enfoque clínico en Pereira y modalidad online para Colombia.',
        ],
      },
    ],
    faq: [
      {
        question: '¿El burnout se cura solo con vacaciones?',
        answer:
          'Las vacaciones pueden aliviar temporalmente, pero si no se abordan causas y hábitos de fondo, los síntomas suelen reaparecer. La terapia ayuda a construir cambios sostenibles.',
      },
      {
        question: '¿Puedo seguir trabajando mientras hago terapia por burnout?',
        answer:
          'En la mayoría de los casos sí. El proceso busca que recuperes funcionalidad y límites sin necesidad de abandonar tu trabajo, salvo situaciones que requieran decisiones adicionales.',
      },
    ],
  },
  {
    slug: 'cuando-llevar-a-un-nino-al-psicologo',
    path: '/guias/cuando-llevar-a-un-nino-al-psicologo',
    title: '¿Cuándo llevar a un niño al psicólogo? | Rayito de Sol',
    description:
      'Señales de alerta en infancia, edades de atención y cómo preparar la primera consulta psicológica infantil en Pereira.',
    keywords:
      'cuándo llevar niño al psicólogo, psicología infantil Pereira, señales alerta infancia',
    directAnswer:
      'Conviene llevar a un niño al psicólogo cuando hay cambios emocionales o de conducta persistentes que afectan su bienestar, sueño, alimentación, rendimiento escolar o vínculos familiares. No es necesario esperar a una crisis: la orientación temprana previene el agravamiento de dificultades en infancia.',
    datePublished: '2026-06-29',
    dateModified: '2026-06-29',
    sections: [
      {
        heading: 'Señales frecuentes en niñas y niños',
        paragraphs: [
          'Cambios bruscos de humor, retraimiento, agresividad, miedos intensos o regresiones (como alteraciones del sueño o control de esfínteres) pueden ser señales de que el niño necesita contención profesional.',
          'Las somatizaciones repetidas —dolor de estómago o cabeza sin causa médica clara— también son una forma habitual en la que la infancia expresa malestar emocional.',
        ],
      },
      {
        heading: 'Situaciones vitales que suelen motivar consulta',
        paragraphs: [
          'Separaciones familiares, duelos, mudanzas, bullying escolar, nacimiento de un hermano o dificultades de aprendizaje pueden desencadenar malestar que beneficia de acompañamiento psicológico.',
          'No siempre implica un trastorno. Muchas familias consultan para recibir orientación sobre límites, regulación emocional y comunicación en casa.',
        ],
      },
      {
        heading: 'Rol de madres, padres y cuidadores',
        paragraphs: [
          'En psicología infantil, la familia es parte del proceso. Las sesiones con cuidadores permiten alinear estrategias entre casa y colegio, reducir culpa parental y fortalecer vínculos seguros.',
          'En Rayito de Sol atiendo desde los 4 años con metodología adaptada por edad y acompañamiento activo a la familia.',
        ],
      },
      {
        heading: 'Cómo preparar la primera visita',
        paragraphs: [
          'Explica al niño de forma sencilla que irán a un espacio donde puede expresarse y jugar para sentirse mejor. Evita usar la consulta como amenaza. Lleva información sobre su rutina, evolución de síntomas y contexto escolar si es relevante.',
        ],
      },
    ],
    faq: [
      {
        question: '¿A qué edad puede empezar terapia infantil?',
        answer:
          'En este consultorio la atención infantil inicia desde los 4 años, con técnicas acordes al desarrollo evolutivo de cada niño o niña.',
      },
      {
        question: '¿Los padres deben estar en todas las sesiones?',
        answer:
          'No en todas. Suele haber momentos de entrevista con cuidadores y sesiones individuales con el niño. El equilibrio se define en la valoración inicial.',
      },
    ],
  },
  {
    slug: 'terapia-online-colombia-guia',
    path: '/guias/terapia-online-colombia-guia',
    title: 'Guía de terapia psicológica online en Colombia | Rayito de Sol',
    description:
      'Cómo funciona la terapia online en Colombia, requisitos, confidencialidad y para quién es recomendable.',
    keywords:
      'terapia psicológica online Colombia, psicólogo online, sesiones virtuales psicología',
    directAnswer:
      'La terapia psicológica online en Colombia es una modalidad clínica válida que permite atención por videollamada segura con objetivos, técnicas y seguimiento equivalentes a la consulta presencial, ideal para quienes buscan flexibilidad geográfica o de horarios sin renunciar al acompañamiento profesional.',
    datePublished: '2026-06-29',
    dateModified: '2026-06-29',
    sections: [
      {
        heading: '¿Cómo funciona una sesión online?',
        paragraphs: [
          'Tras agendar, recibes indicaciones de plataforma y recomendaciones de privacidad. La sesión dura entre 50 y 60 minutos e incluye exploración emocional, técnicas terapéuticas y tareas de seguimiento cuando corresponde.',
          'Se mantiene el mismo marco ético y de confidencialidad que la consulta presencial, adaptado al entorno digital.',
        ],
      },
      {
        heading: 'Requisitos técnicos y de espacio',
        paragraphs: [
          'Necesitas conexión estable, dispositivo con cámara y micrófono, y un lugar privado donde no te interrumpan. Usar audífonos puede mejorar la confidencialidad y la concentración.',
        ],
      },
      {
        heading: 'Ventajas y límites de la modalidad virtual',
        paragraphs: [
          'Ventajas: acceso desde cualquier ciudad de Colombia, continuidad en viajes, menor tiempo de desplazamiento. Límites: no sustituye urgencias psiquiátricas o crisis que requieran atención presencial inmediata; en infancia muy temprana la presencialidad suele ser preferible.',
        ],
      },
      {
        heading: 'Modalidad híbrida desde Pereira',
        paragraphs: [
          'Muchas personas combinan sesiones presenciales en Pereira con citas online según su agenda. La modalidad se revisa periódicamente para asegurar que sigue siendo la más adecuada para el proceso.',
        ],
      },
    ],
    faq: [
      {
        question: '¿La terapia online es confidencial?',
        answer:
          'Sí. Se utilizan plataformas seguras y se acuerdan medidas para proteger tu privacidad, como espacio reservado y uso de audífonos.',
      },
      {
        question: '¿Puedo empezar online y luego ir presencial?',
        answer:
          'Sí. La modalidad híbrida es una opción frecuente para personas que viven en Pereira o visitan la ciudad periódicamente.',
      },
    ],
  },
  {
    slug: 'cuanto-cuesta-terapia-psicologica-pereira',
    path: '/guias/cuanto-cuesta-terapia-psicologica-pereira',
    title: '¿Cuánto cuesta la terapia psicológica en Pereira? | Rayito de Sol',
    description:
      'Factores que influyen en el costo de la terapia psicológica en Pereira, modalidades de pago y cómo consultar tarifas actualizadas.',
    keywords:
      'cuánto cuesta terapia psicológica Pereira, precio psicólogo Pereira, tarifas consulta psicológica',
    directAnswer:
      'El costo de la terapia psicológica en Pereira varía según modalidad (presencial u online), tipo de proceso y frecuencia de sesiones. En Rayito de Sol — Psicología el rango orientativo es COP 50.000 – COP 300.000; las tarifas exactas se confirman por WhatsApp según tu caso y disponibilidad.',
    datePublished: '2026-06-29',
    dateModified: '2026-06-29',
    sections: [
      {
        heading: 'Factores que influyen en el precio',
        paragraphs: [
          'La modalidad de atención, la duración del proceso, si es terapia individual, infantil u online, y la frecuencia semanal acordada pueden influir en el valor total mensual.',
          'La inversión en salud mental debe entenderse en relación con la continuidad del proceso: la regularidad suele ser más determinante que el costo de una sesión aislada.',
        ],
      },
      {
        heading: '¿Cubre EPS o medicina prepagada?',
        paragraphs: [
          'La atención en Rayito de Sol es particular. Si tu plan de salud contempla reembolso por consulta psicológica, puedo entregar el soporte necesario para que gestiones el trámite con tu aseguradora.',
        ],
      },
      {
        heading: 'Transparencia desde la primera consulta',
        paragraphs: [
          'Antes de agendar se comparten tarifas, horarios y condiciones de pago. No hay cobros ocultos. Puedes escribir por WhatsApp para recibir información actualizada y resolver dudas sobre inversión y frecuencia recomendada.',
        ],
      },
      {
        heading: 'Duración y frecuencia de sesiones',
        paragraphs: [
          'Cada sesión dura entre 50 y 60 minutos. La frecuencia inicial suele ser semanal y se ajusta según evolución clínica. Conocer estos parámetros ayuda a planificar el compromiso económico del proceso.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Puedo pagar sesión por sesión?',
        answer:
          'Sí. Las condiciones de pago se acuerdan con claridad al iniciar el proceso terapéutico.',
      },
      {
        question: '¿El precio es igual en terapia online?',
        answer:
          'Puede variar según modalidad. Consulta tarifas actualizadas por WhatsApp para comparar opciones presencial y virtual.',
      },
    ],
  },
  {
    slug: 'primera-sesion-psicologica-que-esperar',
    path: '/guias/primera-sesion-psicologica-que-esperar',
    title: 'Primera sesión psicológica: qué esperar | Rayito de Sol',
    description:
      'Qué ocurre en la primera sesión con un psicólogo en Pereira, duración, confidencialidad y cómo prepararte.',
    keywords:
      'primera sesión psicológica, qué esperar psicólogo Pereira, valoración inicial psicología',
    directAnswer:
      'La primera sesión psicológica es una valoración inicial de 50 a 60 minutos donde exploras tu motivo de consulta, contexto y objetivos; el psicólogo explica el marco de confidencialidad y acuerdan un plan de trabajo claro sin que necesites tener todo resuelto de antemano.',
    datePublished: '2026-06-29',
    dateModified: '2026-06-29',
    sections: [
      {
        heading: 'Objetivo de la valoración inicial',
        paragraphs: [
          'No es un examen ni una entrevista para juzgarte. Es un espacio para comprender qué te trae a consulta, desde cuándo lo vives y qué impacto tiene en tu vida diaria.',
          'También es momento para que conozcas el enfoque terapéutico, la duración habitual de las sesiones y las condiciones de atención.',
        ],
      },
      {
        heading: 'Qué información puedes compartir',
        paragraphs: [
          'Puedes hablar de síntomas emocionales, situaciones familiares o laborales, antecedentes de salud mental si los tienes, y expectativas sobre el proceso. No necesitas un discurso perfecto: la escucha clínica ayuda a ordenar la información.',
        ],
      },
      {
        heading: 'Confidencialidad y límites',
        paragraphs: [
          'Lo que compartes en sesión es confidencial, con las excepciones legales y éticas habituales en salud mental. Esta conversación suele ocurrir al inicio para que te sientas seguro al expresarte.',
        ],
      },
      {
        heading: 'Después de la primera sesión',
        paragraphs: [
          'Se define si continúas con frecuencia semanal u otro ritmo, y qué objetivos trabajar en las siguientes citas. Si la química terapéutica o el enfoque no encajan, es válido preguntar y decidir con libertad.',
        ],
      },
    ],
    faq: [
      {
        question: '¿Debo llevar algo a la primera sesión?',
        answer:
          'No es obligatorio. Si tienes informes médicos o referencias previas relevantes, puedes llevarlos, pero no son requisito para iniciar.',
      },
      {
        question: '¿Puedo ir acompañado a la primera sesión?',
        answer:
          'En terapia adulta individual suele ser una sesión personal. En psicología infantil la presencia de cuidadores forma parte de la valoración inicial.',
      },
    ],
  },
]

const guiasBySlug = new Map(guiasContent.map((guia) => [guia.slug, guia]))

export function getGuiaBySlug(slug: string): GuiaContent | undefined {
  return guiasBySlug.get(slug as GuideSlug)
}

export function getAllGuias(): GuiaContent[] {
  return guiasContent
}
