import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun } from 'lucide-react'

const links = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre mí', href: '#about' },
  { label: 'Enfoque', href: '#approach' },
  { label: 'Servicios', href: '#services' },
  { label: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-sky-white/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className={`transition-all duration-500 ${scrolled ? 'border-b border-border-light' : 'border-b border-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleClick('#hero')}
              className={`flex items-center gap-2 font-bold text-lg tracking-tight transition-colors duration-500 ${
                scrolled ? 'text-text-primary' : 'text-white'
              }`}
            >
              <Sun className="w-5 h-5 text-sun shrink-0" strokeWidth={2.25} fill="currentColor" />
              Rayito de Sol
            </button>

            {/* Desktop links */}
            <nav className="hidden md:flex items-center gap-8">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`text-sm font-medium transition-colors duration-500 ${
                    scrolled
                      ? 'text-text-primary hover:text-sky-deep'
                      : 'text-white/95 hover:text-sun [text-shadow:0_1px_4px_rgb(30_58_95_/_40%)]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2"
              aria-label="Menú"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className={`block w-6 h-0.5 transition-colors duration-500 ${scrolled ? 'bg-text-primary' : 'bg-white'}`}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className={`block w-6 h-0.5 transition-colors duration-500 ${scrolled ? 'bg-text-primary' : 'bg-white'}`}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className={`block w-6 h-0.5 transition-colors duration-500 ${scrolled ? 'bg-text-primary' : 'bg-white'}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-sky-white/95 backdrop-blur-xl border-b border-border-light"
          >
            <nav className="flex flex-col px-4 py-6 gap-4">
              {links.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleClick(link.href)}
                  className="text-left text-lg font-medium text-text-primary py-2 hover:text-sun transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
