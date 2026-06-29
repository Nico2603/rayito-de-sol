import { Link } from 'react-router-dom'
import Logo from './Logo'
import InstagramIcon from './icons/InstagramIcon'
import LinkedInIcon from './icons/LinkedInIcon'
import WhatsAppIcon from './icons/WhatsAppIcon'
import {
  GOOGLE_REVIEW_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  buildWhatsappBookingUrl,
} from '../constants/social'
import { getAllGuias } from '../data/guias/content'
import {
  trackInstagramClick,
  trackLinkedInClick,
  trackReviewClick,
  trackWhatsappClick,
} from '../lib/analytics'
import { FOOTER_COPYRIGHT } from '../data/footer'

export default function Footer() {
  const footerWhatsappUrl = buildWhatsappBookingUrl('footer')
  const guias = getAllGuias().slice(0, 3)

  return (
    <footer className="bg-sky-deep text-white/80 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <Logo className="h-9 w-auto" variant="onDark" />

          <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="text-sm font-semibold text-white/90">Servicios</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:justify-start">
              <Link to="/terapia-ansiedad-pereira" className="text-white/80 transition-colors duration-200 hover:text-sun">
                Ansiedad en Pereira
              </Link>
              <Link to="/psicologia-infantil-pereira" className="text-white/80 transition-colors duration-200 hover:text-sun">
                Psicología infantil
              </Link>
              <Link to="/terapia-online-colombia" className="text-white/80 transition-colors duration-200 hover:text-sun">
                Terapia online
              </Link>
              <Link to="/sobre-maria-camila" className="text-white/80 transition-colors duration-200 hover:text-sun">
                Sobre María Camila
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="text-sm font-semibold text-white/90">Guías</p>
            <div className="flex flex-col gap-2 text-sm">
              {guias.map((guia) => (
                <Link
                  key={guia.slug}
                  to={guia.path}
                  className="text-white/80 transition-colors duration-200 hover:text-sun"
                >
                  {guia.title.split('|')[0]?.trim()}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 md:items-start">
            <p className="text-sm font-semibold text-white/90">Contacto</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:justify-start">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackInstagramClick('footer')}
                className="inline-flex items-center gap-2 text-white/90 transition-colors duration-200 hover:text-sun"
              >
                <InstagramIcon className="w-5 h-5" variant="light" />
                Instagram
              </a>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackLinkedInClick('footer')}
                className="inline-flex items-center gap-2 text-white/90 transition-colors duration-200 hover:text-sun"
              >
                <LinkedInIcon className="w-5 h-5" variant="light" />
                LinkedIn
              </a>
              <a
                href={footerWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsappClick('footer')}
                className="inline-flex items-center gap-2 text-white/90 transition-colors duration-200 hover:text-sun"
              >
                <WhatsAppIcon className="w-5 h-5" variant="light" />
                WhatsApp
              </a>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackReviewClick('footer')}
                className="text-white/90 transition-colors duration-200 hover:text-sun"
              >
                Reseñas Google
              </a>
              <Link to="/politica-privacidad" className="text-white/80 transition-colors duration-200 hover:text-sun">
                Política de privacidad
              </Link>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-white/50 md:text-left">
          &copy; {new Date().getFullYear()} {FOOTER_COPYRIGHT}
        </p>
      </div>
    </footer>
  )
}
