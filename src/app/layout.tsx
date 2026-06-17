// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Barlow, Barlow_Condensed, Barlow_Semi_Condensed } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { site } from '@config/site'

// ── Fuentes — cargadas por Next.js (self-hosted automático, GDPR-safe) ──
const barlow = Barlow({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600'],
  variable: '--font-barlow',
  display:  'swap',
})

const barlowCondensed = Barlow_Condensed({
  subsets:  ['latin'],
  weight:   ['400', '500', '600', '700', '800', '900'],
  variable: '--font-barlow-condensed',
  display:  'swap',
})

const barlowSemi = Barlow_Semi_Condensed({
  subsets:  ['latin'],
  weight:   ['400', '500', '600', '700'],
  variable: '--font-barlow-semi',
  display:  'swap',
})

// ── Metadata — generada desde config/site.ts ──────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:  `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    'ingeniería civil Colombia',
    'construcción Barrancabermeja',
    'interventoría Santander',
    'consultoría ingeniería civil',
    'remodelaciones Barrancabermeja',
    'obra civil Santander',
    'MARA Ingeniería',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,

  // Open Graph — para compartir en LinkedIn (crucial para clientes B2B)
  openGraph: {
    type:        'website',
    locale:      site.locale,
    url:         site.url,
    siteName:    site.name,
    title:       `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url:    site.og.image,
        width:  1200,
        height: 630,
        alt:    `${site.name} — Ingeniería Civil & Construcción`,
      },
    ],
  },

  // Twitter / X card
  twitter: {
    card:        'summary_large_image',
    title:       `${site.name} — ${site.tagline}`,
    description: site.description,
    images:      [site.og.image],
  },

  // Schema.org via JSON-LD (abajo)
  alternates: {
    canonical: site.url,
  },

  // Robots — indexar todo en producción
  robots: {
    index:  true,
    follow: true,
    googleBot: {
      index:             true,
      follow:            true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor:  '#0D1117',
  colorScheme: 'dark',
  width:       'device-width',
  initialScale: 1,
}

// ── JSON-LD Schema — mejora el ranking en búsquedas locales ──
const jsonLd = {
  '@context': 'https://schema.org',
  '@type':    'ProfessionalService',
  name:        site.name,
  description: site.description,
  url:         site.url,
  telephone:   site.contact.phone,
  email:       site.contact.email,
  address: {
    '@type':           'PostalAddress',
    addressLocality:   'Barrancabermeja',
    addressRegion:     'Santander',
    addressCountry:    'CO',
  },
  geo: {
    '@type':     'GeoCoordinates',
    latitude:    site.contact.coordinates.lat,
    longitude:   site.contact.coordinates.lng,
  },
  openingHoursSpecification: {
    '@type':     'OpeningHoursSpecification',
    dayOfWeek:   ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    opens:       '07:00',
    closes:      '18:00',
  },
  serviceType: [
    'Ingeniería Civil',
    'Consultoría de Ingeniería',
    'Interventoría',
    'Construcción Civil',
    'Remodelaciones',
  ],
  areaServed: {
    '@type': 'Country',
    name:    'Colombia',
  },
  knowsAbout: ['NSR-10', 'RAS-2000', 'NTC Colombia', 'Ingeniería Civil'],
}

// ── Layout Component ──────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const gaId = process.env['NEXT_PUBLIC_GA_ID']

  return (
    <html
      lang="es"
      className={`${barlow.variable} ${barlowCondensed.variable} ${barlowSemi.variable}`}
    >
      <head>
        {/* JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Preconnect a recursos externos críticos */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        {/* Font Awesome 6 — CDN gratuito para íconos */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />

        {/* Favicon */}
        <link rel="icon" href="/assets/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/assets/logo.png" />
      </head>

      <body>
        {children}

        {/* Google Analytics 4 — solo en producción si GA_ID está definido */}
        {gaId && process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
