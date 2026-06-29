let initialized = false
let lastTrackedPath: string | null = null

type AnalyticsEventParams = Record<
  string,
  string | number | boolean | undefined
>

function ensureDataLayer(): void {
  window.dataLayer = window.dataLayer ?? []
}

function pushDataLayerEvent(
  name: string,
  params?: AnalyticsEventParams,
): void {
  window.dataLayer!.push({
    event: name,
    ...(params ?? {}),
  })
}

export function initGoogleAnalytics(): void {
  if (initialized) return

  ensureDataLayer()
  initialized = true
}

export function trackPageView(path: string): void {
  initGoogleAnalytics()

  if (path === lastTrackedPath) return
  lastTrackedPath = path

  pushDataLayerEvent('page_view', {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    page_title: document.title,
  })
}

export function trackEvent(
  name: string,
  params?: AnalyticsEventParams,
): void {
  initGoogleAnalytics()
  pushDataLayerEvent(name, params)
}

export type WhatsappClickLocation = 'contact_info' | 'contact_cta' | 'footer'

export function trackWhatsappClick(location: WhatsappClickLocation): void {
  trackEvent('whatsapp_click', { location })
}

export function trackContactFormSubmit(): void {
  trackEvent('contact_form_submit')
}
