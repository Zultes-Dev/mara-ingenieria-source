// ─────────────────────────────────────────────────────────────
// config/site.ts
// Toda la metadata del sitio en un solo lugar.
// Si cambia el dominio, teléfono o redes → solo se toca aquí.
// ─────────────────────────────────────────────────────────────

export const site = {
  name:        'MARA Ingeniería',
  tagline:     'Ingeniería Civil & Construcción en Colombia',
  description: 'Empresa joven de ingeniería civil con base en Barrancabermeja, Santander. Consultoría, interventoría, obra civil y remodelaciones con rigor técnico y transparencia total.',
  url:         'https://maraingenieria.com',
  locale:      'es_CO',

  // ── Contacto ─────────────────────────────────────────
  contact: {
    // Reemplazar con datos reales antes de desplegar
    phone:       process.env['NEXT_PUBLIC_PHONE']    ?? '+57 XXX XXX XXXX',
    whatsapp:    process.env['NEXT_PUBLIC_WA_NUMBER'] ?? '573000000000',
    email:       process.env['NEXT_PUBLIC_EMAIL']    ?? 'contacto@maraingenieria.com',
    address:     'Barrancabermeja, Santander, Colombia',
    coordinates: { lat: 7.0644, lng: -73.8547 } as const,
    hours:       'Lunes – Sábado, 7:00 am – 6:00 pm',
  },

  // ── SEO / Open Graph ─────────────────────────────────
  og: {
    image: '/assets/og-image.jpg', // 1200×630px — generar antes de lanzar
    type:  'website' as const,
  },

  // ── Redes sociales ───────────────────────────────────
  social: {
    instagram: 'https://instagram.com/maraingenieria',
    facebook:  'https://facebook.com/maraingenieria',
    linkedin:  'https://linkedin.com/company/maraingenieria',
    whatsapp:  `https://wa.me/${process.env['NEXT_PUBLIC_WA_NUMBER'] ?? '573000000000'}`,
  },

  // ── Normas técnicas — usadas en múltiples secciones ──
  norms: ['NSR-10', 'RAS-2000', 'NTC', 'INVIAS'],
} as const

// Tipo derivado — útil para componentes que reciben partes del config
export type SiteConfig = typeof site
