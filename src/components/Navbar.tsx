import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import { useTheme } from '../context/ThemeContext'

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
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

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

  const navBg = scrolled
    ? isDark
      ? 'var(--color-nav-bg)'
      : '#FFFFFF'
    : 'transparent'
  const borderCol = scrolled ? 'var(--color-border-light)' : 'transparent'
  const textCol = scrolled ? 'var(--color-text-primary)' : 'rgba(255,255,255,0.95)'
  const hamburgerCol = scrolled ? 'var(--color-text-primary)' : 'white'
  // Toggle icon: en modo oscuro siempre dorado; en modo claro blanco sobre hero, oscuro al scrollear
  const toggleIconStroke = isDark ? '#FFD425' : scrolled ? 'var(--color-text-primary)' : 'white'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500${scrolled && isDark ? ' backdrop-blur-md' : ''}`}
      style={{ backgroundColor: navBg }}
    >
      <div
        className="transition-all duration-500"
        style={{ borderBottom: `1px solid ${borderCol}` }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleClick('#hero')}
              className="flex items-center shrink-0"
              aria-label="Rayito de Sol — inicio"
            >
              <Logo className="h-9 w-auto" variant={scrolled ? 'default' : 'onDark'} />
            </button>

            {/* Desktop links + Theme toggle */}
            <nav className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className="text-sm font-medium transition-colors duration-500 hover:text-sun"
                  style={{ color: textCol }}
                >
                  {link.label}
                </button>
              ))}

              {/* Theme toggle — sol/luna */}
              <button
                onClick={toggleTheme}
                className="ml-2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: scrolled
                    ? 'var(--color-border-light)'
                    : 'rgba(255,255,255,0.15)',
                }}
                aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
              >
                {isDark ? (
                  /* Sol */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={toggleIconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  /* Luna */
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={toggleIconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
            </nav>

            {/* Mobile: hamburger + theme toggle */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: scrolled
                    ? 'var(--color-border-light)'
                    : 'rgba(255,255,255,0.15)',
                }}
                aria-label={isDark ? 'Modo claro' : 'Modo oscuro'}
              >
                {isDark ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={toggleIconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={toggleIconStroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex flex-col gap-1.5 p-2"
                aria-label="Menú"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 transition-colors duration-500"
                  style={{ backgroundColor: hamburgerCol }}
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-6 h-0.5 transition-colors duration-500"
                  style={{ backgroundColor: hamburgerCol }}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 transition-colors duration-500"
                  style={{ backgroundColor: hamburgerCol }}
                />
              </button>
            </div>
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
            className="md:hidden backdrop-blur-xl border-b"
            style={{
              backgroundColor: 'var(--color-bg-primary)',
              borderColor: 'var(--color-border-light)',
            }}
          >
            <nav className="flex flex-col px-4 py-6 gap-4">
              {links.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => handleClick(link.href)}
                  className="text-left text-lg font-medium py-2 hover:text-sun transition-colors"
                  style={{ color: 'var(--color-text-primary)' }}
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
