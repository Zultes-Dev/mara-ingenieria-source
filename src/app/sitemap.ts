// app/sitemap.ts
// Next.js genera /sitemap.xml automáticamente en build time.
// Registrar en Google Search Console después del despliegue.

import type { MetadataRoute } from 'next'
import { site } from '@config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:             site.url,
      lastModified:    new Date(),
      changeFrequency: 'monthly',
      priority:        1,
    },
    // Agregar rutas dinámicas aquí cuando existan (/proyectos, /blog)
  ]
}
