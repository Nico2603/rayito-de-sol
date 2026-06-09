import { motion } from 'framer-motion'
import Sparkles from './Sparkles'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export default function Hero() {
  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Cielo Van Gogh — mantiene profundidad más tiempo antes de aclarar */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #1E3A5F 0%, #4A90D9 30%, #7BB8E8 55%, #A8D8EA 82%, #D6EAF8 100%)',
        }}
      />

      {/* Scrim atmosférico centrado en el copy (no es una caja) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 85% 52% at 50% 40%, rgb(30 58 95 / 0.48) 0%, rgb(30 58 95 / 0.12) 45%, transparent 72%)',
        }}
      />

      {/* Horizonte suave solo abajo */}
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-t from-sky-pale/70 via-sky-soft/15 to-transparent pointer-events-none" />

      <Sparkles count={8} />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center -translate-y-6 sm:-translate-y-10 md:-translate-y-12">
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="text-sun-soft font-semibold text-sm md:text-base uppercase tracking-[0.2em] mb-6 hero-subcopy-glow"
          >
            Psicología &amp; Bienestar
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white mb-8 tracking-tight leading-[0.95] hero-subcopy-glow"
          >
            Rayito de{' '}
            <span className="text-sun">Sol</span>
          </motion.h1>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto mb-10 space-y-4"
          >
            <p className="font-display text-xl sm:text-2xl md:text-[1.75rem] text-white font-medium leading-snug hero-subcopy-glow">
              Un espacio seguro para tu{' '}
              <span className="text-sun-soft">bienestar emocional</span>.
            </p>
            <p className="text-base sm:text-lg md:text-xl text-white/90 font-light leading-relaxed hero-subcopy-glow">
              Acompañamiento psicológico con calidez, profesionalismo y compromiso.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.75, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              onClick={scrollToContact}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="bg-sun text-text-primary font-semibold px-8 py-4 rounded-full text-lg shadow-lg shadow-sun/30 hover:shadow-xl hover:shadow-sun/40 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            >
              Agendar una cita
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
