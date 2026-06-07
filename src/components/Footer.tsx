import { Sun, Camera, MessageCircle } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-sky-deep text-white/80 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-sun" strokeWidth={2.25} fill="currentColor" />
            <span className="font-bold text-white text-lg">Rayito de Sol</span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/rayitodesol.psicologia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-sun transition-colors duration-200 text-sm"
            >
              <Camera className="w-4 h-4" strokeWidth={1.75} />
              Instagram
            </a>
            <a
              href="https://wa.me/573000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-sun transition-colors duration-200 text-sm"
            >
              <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
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
