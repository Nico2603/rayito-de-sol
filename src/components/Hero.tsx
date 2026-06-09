import { motion } from 'framer-motion'
import InteractiveSparkles from './InteractiveSparkles'
import DayMode from './DayMode'
import { useTheme } from '../context/ThemeContext'
import { HERO_LABEL, HERO_TITLE_MAIN, HERO_TITLE_ACCENT, HERO_TAGLINE_START, HERO_TAGLINE_ACCENT, HERO_TAGLINE_END, HERO_SUBCOPY, HERO_CTA_TEXT } from '../data/hero'

/* ── Gradientes para crossfade (valores fijos, no CSS vars) ── */
const SKY_LIGHT = 'linear-gradient(180deg, #1E3A5F 0%, #4A90D9 30%, #7BB8E8 55%, #A8D8EA 82%, #D6EAF8 100%)'
const SKY_DARK = 'linear-gradient(180deg, #070E18 0%, #0B1622 25%, #162D50 50%, #1E3A5F 75%, #0F1923 100%)'

const SCRIM_LIGHT =
  'radial-gradient(ellipse 85% 52% at 50% 40%, rgb(30 58 95 / 0.48) 0%, rgb(30 58 95 / 0.12) 45%, transparent 72%)'
const SCRIM_DARK =
  'radial-gradient(ellipse 85% 52% at 50% 40%, rgb(255 212 37 / 0.10) 0%, rgb(255 212 37 / 0.03) 45%, transparent 72%)'

const HORIZON_LIGHT =
  'linear-gradient(to top, rgba(214, 234, 248, 0.7) 0%, rgba(168, 216, 234, 0.15) 50%, transparent 100%)'
const HORIZON_DARK =
  'linear-gradient(to top, rgba(15, 25, 35, 0.8) 0%, rgba(22, 45, 80, 0.2) 50%, transparent 100%)'

const CROSSFADE = 'opacity 0.7s ease-in-out'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export default function Hero() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const glowClass = isDark ? 'hero-subcopy-glow-dark' : 'hero-subcopy-glow-light'

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* ══════ Cielo — crossfade entre claro/oscuro ══════ */}
      {/* Capa clara (default) */}
      <div
        className="absolute inset-0"
        style={{ background: SKY_LIGHT, transition: CROSSFADE, opacity: isDark ? 0 : 1 }}
      />
      {/* Capa oscura (.dark) */}
      <div
        className="absolute inset-0"
        style={{ background: SKY_DARK, transition: CROSSFADE, opacity: isDark ? 1 : 0 }}
      />

      {/* ══════ Partículas — crossfade ══════ */}
      {/* Noche */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: isDark ? 1 : 0 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <InteractiveSparkles />
      </motion.div>

      {/* Día */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: isDark ? 0 : 1 }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        <DayMode />
      </motion.div>

      {/* ══════ Scrim — crossfade ══════ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: SCRIM_LIGHT, transition: CROSSFADE, opacity: isDark ? 0 : 1 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: SCRIM_DARK, transition: CROSSFADE, opacity: isDark ? 1 : 0 }}
      />

      {/* ══════ Horizonte — crossfade ══════ */}
      <div
        className="absolute inset-x-0 bottom-0 h-[38%] pointer-events-none"
        style={{ background: HORIZON_LIGHT, transition: CROSSFADE, opacity: isDark ? 0 : 1 }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[38%] pointer-events-none"
        style={{ background: HORIZON_DARK, transition: CROSSFADE, opacity: isDark ? 1 : 0 }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center -translate-y-6 sm:-translate-y-10 md:-translate-y-12">
        <motion.div
          initial="initial"
          animate="animate"
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.75, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className={`text-sun-soft font-semibold text-sm md:text-base uppercase tracking-[0.2em] mb-6 ${glowClass}`}
          >
            {HERO_LABEL}
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className={`font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-white mb-8 tracking-tight leading-[0.95] ${glowClass}`}
          >
            {HERO_TITLE_MAIN}
            <span className="text-sun">{HERO_TITLE_ACCENT}</span>
          </motion.h1>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.8, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl mx-auto mb-10 space-y-4"
          >
            <p className={`font-display text-xl sm:text-2xl md:text-[1.75rem] text-white font-medium leading-snug ${glowClass}`}>
              {HERO_TAGLINE_START}
              <span className="text-sun-soft">{HERO_TAGLINE_ACCENT}</span>{HERO_TAGLINE_END}
            </p>
            <p className={`text-base sm:text-lg md:text-xl text-white/90 font-light leading-relaxed ${glowClass}`}>
              {HERO_SUBCOPY}
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
              {HERO_CTA_TEXT}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
