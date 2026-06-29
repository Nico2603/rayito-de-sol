const GTM_CONTAINER_ID = import.meta.env.VITE_GTM_CONTAINER_ID?.trim()
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim()

type AnalyticsMode = 'none' | 'gtm' | 'ga'

let initialized = false
let mode: AnalyticsMode = 'none'
let lastTrackedPath: string | null = null
let initPromise: Promise<void> | null = null
const pendingEvents: Array<{ name: string; params?: AnalyticsEventParams }> = []

type AnalyticsEventParams = Record<
  string,
  string | number | boolean | undefined
>

export type WhatsappClickLocation =
  | 'contact_info'
  | 'contact_cta'
  | 'footer'
  | 'hero_primary'
  | 'floating_button'
  | 'faq_cta'
  | 'navbar_cta'
  | 'topic_page'
export type InstagramClickLocation = 'footer'
export type LinkedInClickLocation = 'footer'
export type EmailClickLocation = 'contact_info'
export type HeroCtaLocation = 'hero_primary' | 'hero_secondary'
export type NavigationClickLocation = 'navbar' | 'logo' | 'mobile_menu'
export type ReviewClickLocation = 'testimonials' | 'contact' | 'footer'

function isValidGtmContainerId(value: string | undefined): value is string {
  return Boolean(value && /^GTM-[A-Z0-9]+$/.test(value))
}

function isValidGaMeasurementId(value: string | undefined): value is string {
  return Boolean(value && /^G-[A-Z0-9]+$/.test(value))
}

function ensureDataLayer(): void {
  window.dataLayer = window.dataLayer ?? []
}

function pushDataLayerEvent(name: string, params?: AnalyticsEventParams): void {
  window.dataLayer!.push({
    event: name,
    ...(params ?? {}),
  })
}

function loadScript(scriptId: string, src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.getElementById(scriptId)
    if (existing) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.id = scriptId
    script.async = true
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`No se pudo cargar el script: ${src}`))
    document.head.appendChild(script)
  })
}

function hasScriptBySrc(src: string): boolean {
  return Boolean(document.querySelector(`script[src="${src}"]`))
}

async function initGtm(containerId: string): Promise<void> {
  ensureDataLayer()
  pushDataLayerEvent('gtm.js', { 'gtm.start': Date.now() })
  await loadScript('gtm-base-script', `https://www.googletagmanager.com/gtm.js?id=${containerId}`)
  mode = 'gtm'
}

async function initGa(measurementId: string): Promise<void> {
  ensureDataLayer()

  window.gtag =
    window.gtag ??
    function gtag(...args: unknown[]) {
      window.dataLayer!.push(args)
    }

  const gtagSrc = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  if (!hasScriptBySrc(gtagSrc)) {
    await loadScript('ga-base-script', gtagSrc)
  }

  window.gtag('js', new Date())
  window.gtag('config', measurementId, { send_page_view: false })
  mode = 'ga'
}

export async function initGoogleAnalytics(): Promise<void> {
  if (initPromise) return initPromise
  if (initialized) return

  initPromise = (async () => {
    if (isValidGtmContainerId(GTM_CONTAINER_ID)) {
      await initGtm(GTM_CONTAINER_ID)
      initialized = true
      flushPendingEvents()
      return
    }

    if (isValidGaMeasurementId(GA_MEASUREMENT_ID)) {
      await initGa(GA_MEASUREMENT_ID)
      initialized = true
      flushPendingEvents()
      return
    }

    mode = 'none'
    initialized = true
    console.warn(
      '[analytics] No se inicializó tracking: define VITE_GTM_CONTAINER_ID o VITE_GA_MEASUREMENT_ID',
    )
  })()
    .catch((error: unknown) => {
      mode = 'none'
      initialized = true
      console.warn('[analytics] Falló la inicialización de tracking', error)
    })
    .finally(() => {
      initPromise = null
    })

  return initPromise
}

function canTrack(): boolean {
  return mode === 'gtm' || mode === 'ga'
}

function dispatchEvent(name: string, params?: AnalyticsEventParams): void {
  if (!canTrack()) return

  if (mode === 'ga') {
    window.gtag?.('event', name, params)
    return
  }

  pushDataLayerEvent(name, params)
}

export function trackEvent(name: string, params?: AnalyticsEventParams): void {
  if (canTrack()) {
    dispatchEvent(name, params)
    return
  }

  pendingEvents.push({ name, params })
  void initGoogleAnalytics()
}

function flushPendingEvents(): void {
  if (!canTrack() || pendingEvents.length === 0) return

  for (const event of pendingEvents) {
    dispatchEvent(event.name, event.params)
  }

  pendingEvents.length = 0
}

export function trackPageView(path: string): void {
  if (path === lastTrackedPath) return
  lastTrackedPath = path

  trackEvent('page_view', {
    page_path: path,
    page_location: `${window.location.origin}${path}`,
    page_title: document.title,
  })
}

export function trackWhatsappClick(location: WhatsappClickLocation): void {
  trackEvent('whatsapp_click', { location })
}

export function trackInstagramClick(location: InstagramClickLocation): void {
  trackEvent('instagram_click', { location })
}

export function trackLinkedInClick(location: LinkedInClickLocation): void {
  trackEvent('linkedin_click', { location })
}

export function trackEmailClick(location: EmailClickLocation): void {
  trackEvent('email_click', { location })
}

export function trackHeroCtaClick(location: HeroCtaLocation): void {
  trackEvent('hero_cta_click', { location })
}

export function trackNavigationClick(
  location: NavigationClickLocation,
  target: string,
): void {
  trackEvent('navigation_click', { location, target })
}

export function trackContactFormStart(): void {
  trackEvent('contact_form_start')
}

export function trackContactFormSubmit(): void {
  trackEvent('contact_form_submit')
}

export function trackContactFormError(
  type: 'validation' | 'submission',
  detail?: string,
): void {
  trackEvent('contact_form_error', { type, detail })
}

export function trackReviewClick(location: ReviewClickLocation): void {
  trackEvent('review_click', { location })
}
