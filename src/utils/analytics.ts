// utils/analytics.ts
//
// Wrapper delgado sobre GA4.
// Si en el futuro cambian a Plausible, Mixpanel o PostHog,
// solo se toca este archivo — los componentes no cambian.

type EventName =
  | 'cta_click'
  | 'form_submit'
  | 'whatsapp_click'
  | 'service_hover'
  | 'map_interaction'

type EventPayload = Record<string, string | number | boolean>

// Declara gtag en window sin importar @types/gtag
declare global {
  interface Window {
    gtag?: (command: string, eventName: string, params?: EventPayload) => void
    dataLayer?: unknown[]
  }
}

export function trackEvent(name: EventName, payload?: EventPayload): void {
  // Guard: no falla si GA no está cargado (dev, ad-blockers)
  if (typeof window === 'undefined' || !window.gtag) return

  window.gtag('event', name, {
    ...payload,
    // Contexto automático
    page_path: window.location.pathname,
  })
}

// Helpers semánticos — más legibles en los componentes

export const track = {
  ctaClick:       (label: string) => trackEvent('cta_click',       { label }),
  formSubmit:     (service: string) => trackEvent('form_submit',   { service }),
  whatsappClick:  ()               => trackEvent('whatsapp_click'),
  serviceHover:   (id: string)     => trackEvent('service_hover',  { id }),
  mapInteraction: ()               => trackEvent('map_interaction'),
}
