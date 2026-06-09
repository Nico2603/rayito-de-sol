import Logo from './Logo'
import InstagramIcon from './icons/InstagramIcon'
import WhatsAppIcon from './icons/WhatsAppIcon'
import { INSTAGRAM_URL, WHATSAPP_URL } from '../constants/social'

export default function Footer() {
  return (
    <footer className="bg-sky-deep text-white/80 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Logo className="h-9 w-auto" variant="onDark" />

          {/* Social */}
          <div className="flex items-center gap-6">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 hover:text-sun transition-colors duration-200 text-sm text-white/90"
            >
              <InstagramIcon className="w-5 h-5" variant="light" />
              Instagram
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 hover:text-sun transition-colors duration-200 text-sm text-white/90"
            >
              <WhatsAppIcon className="w-5 h-5" variant="light" />
              WhatsApp
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Rayito de Sol. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
