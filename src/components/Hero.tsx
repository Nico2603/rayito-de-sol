import { motion } from 'framer-motion'
import Sparkles from './Sparkles'

export default function Hero() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Van Gogh sky gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-deep via-sky-cerulean via-sky-mid via-sky-soft to-sky-pale" />

      {/* Sparkles overlay */}
      <Sparkles count={8} />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sun-soft font-semibold text-sm md:text-base uppercase tracking-[0.2em] mb-6 [text-shadow:0_1px_8px_rgb(30_58_95_/_45%)]">
            Psicología &amp; Bienestar
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white mb-6 tracking-tight leading-[0.95] [text-shadow:0_2px_24px_rgb(30_58_95_/_35%)]">
            Rayito de{' '}
            <span className="text-sun">Sol</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed mb-10 font-light [text-shadow:0_1px_12px_rgb(30_58_95_/_40%)]">
            Un espacio seguro para tu bienestar emocional.
            <br />
            Acompañamiento psicológico con calidez, profesionalismo y compromiso.
          </p>
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="bg-sun text-text-primary font-semibold px-8 py-4 rounded-full text-lg shadow-lg shadow-sun/30 hover:shadow-xl hover:shadow-sun/40 transition-all duration-300"
          >
            Agendar una cita
          </motion.button>
        </motion.div>
      </div>

      {/* Subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-sky-pale pointer-events-none" />
    </section>
  )
}
