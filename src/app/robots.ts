// app/robots.ts
// Next.js genera /robots.txt automáticamente en build.

import type { MetadataRoute } from 'next'
import { site } from '@config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/api/', '/_next/'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host:    site.url,
  }
}
