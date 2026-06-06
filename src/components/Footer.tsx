export default function Footer() {
  return (
    <footer className="bg-sky-deep text-white/80 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-sun text-lg">✦</span>
            <span className="font-bold text-white text-lg">Rayito de Sol</span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/rayitodesol.psicologia"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sun transition-colors duration-200 text-sm"
            >
              Instagram
            </a>
            <a
              href="https://wa.me/573000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sun transition-colors duration-200 text-sm"
            >
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
