export type InstagramFallbackPost = {
  shortcode: string
  isVideo: boolean
  caption: string
}

/** Respaldo cuando la API de Instagram limita peticiones (401 / rate limit). */
export const INSTAGRAM_FALLBACK_POSTS: InstagramFallbackPost[] = [
  {
    shortcode: 'DXAWg04Cb0H',
    isVideo: true,
    caption: 'Capítulo #3: La alegría. La alegría no es solo “sentirse bien”. Es una emoción…',
  },
  {
    shortcode: 'DWw7TxViYwJ',
    isVideo: true,
    caption: 'Capítulo #2: La tristeza. La tristeza no llega para dañarnos, sino para hablar…',
  },
  {
    shortcode: 'DWFFe-OiaKn',
    isVideo: true,
    caption: 'CAPÍTULO #1: El miedo. Serie pensada en busca del autoconocimiento y exploración…',
  },
  {
    shortcode: 'DVrubZCiXde',
    isVideo: true,
    caption: 'Sigue caminando, lo estás haciendo bien. #psicologia #terapia',
  },
  {
    shortcode: 'DUqv6u_CQXm',
    isVideo: true,
    caption: 'Recordemos: el movimiento es la primera forma de aprendizaje…',
  },
  {
    shortcode: 'DUoCpbJjEtG',
    isVideo: false,
    caption: 'Entendernos también es comprender de dónde viene todo lo que sentimos…',
  },
  {
    shortcode: 'DUQ5FtWiXsF',
    isVideo: false,
    caption: 'Neuronas espejo y su poder. No siempre podemos elegir qué aprendizajes obtenemos…',
  },
  {
    shortcode: 'DUGs1HICd5-',
    isVideo: true,
    caption: 'Sí, está bien no estar bien. Es importante permitirnos sentir…',
  },
  {
    shortcode: 'DT_xlIDjI_e',
    isVideo: false,
    caption: 'Para encontrarnos y avanzar. #psicoterapia #Acompañamiento',
  },
]
