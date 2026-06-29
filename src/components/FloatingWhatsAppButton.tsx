import WhatsAppIcon from './icons/WhatsAppIcon'
import { buildWhatsappBookingUrl } from '../constants/social'
import { trackWhatsappClick } from '../lib/analytics'

export default function FloatingWhatsAppButton() {
  const whatsappUrl = buildWhatsappBookingUrl('boton flotante')

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsappClick('floating_button')}
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-sun px-4 py-3 font-semibold text-[#1A1A2E] shadow-lg shadow-sun/30 transition-all duration-300 hover:scale-105 hover:bg-sun-soft"
      aria-label="Agendar por WhatsApp"
    >
      <WhatsAppIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Agendar</span>
    </a>
  )
}
