const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

let initialized = false

function getMeasurementId(): string | undefined {
  const id = GA_MEASUREMENT_ID?.trim()
  return id && id.startsWith('G-') ? id : undefined
}

function ensureDataLayer(): void {
  window.dataLayer = window.dataLayer ?? []
  window.gtag =
    window.gtag ??
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }
}

function loadGtagScript(measurementId: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[data-ga-id="${measurementId}"]`)) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
    script.dataset.gaId = measurementId
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('No se pudo cargar Google Analytics'))
    document.head.appendChild(script)
  })
}

function hasGtagScript(measurementId: string): boolean {
  return Boolean(
    document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`),
  )
}

export async function initGoogleAnalytics(): Promise<void> {
  const measurementId = getMeasurementId()
  if (!measurementId || initialized) return

  ensureDataLayer()

  if (hasGtagScript(measurementId) && typeof window.gtag === 'function') {
    window.gtag('config', measurementId, { send_page_view: false })
    initialized = true
    return
  }

  await loadGtagScript(measurementId)

  window.gtag!('js', new Date())
  window.gtag!('config', measurementId, { send_page_view: false })

  initialized = true
}

export function trackPageView(path: string): void {
  if (!initialized) return

  const measurementId = getMeasurementId()
  if (!measurementId) return

  window.gtag!('event', 'page_view', {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
  })
}

export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (!initialized) return

  window.gtag!('event', name, params)
}

export type WhatsappClickLocation = 'contact_info' | 'contact_cta' | 'footer'

export function trackWhatsappClick(location: WhatsappClickLocation): void {
  trackEvent('whatsapp_click', { location })
}

export function trackContactFormSubmit(): void {
  trackEvent('contact_form_submit')
}
