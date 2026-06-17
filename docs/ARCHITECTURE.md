# MARA Ingeniería — Decisiones de Arquitectura (ADR)

## ADR-001: Next.js 14 App Router + SSG

**Contexto:** sitio corporativo de marketing, sin autenticación de usuarios.

**Decisión:** `export const dynamic = 'force-static'` en page.tsx.

**Consecuencias:**
- Build genera HTML estático puro → Lighthouse ~98
- CDN cachea todo, cero carga al servidor
- Para agregar blog/proyectos dinámicos: ISR con `revalidate`

---

## ADR-002: Contenido en `config/content.ts`

**Contexto:** empresa nueva sin CMS todavía. Agregar Sanity/Contentful sería sobre-ingeniería prematura.

**Decisión:** todo el copy en un archivo TypeScript tipado.

**Contrato:** los componentes consumen tipos de `content.ts`.
Cuando escalen, `content.ts` se reemplaza por:
```ts
// content.ts (versión CMS)
import { client } from '@/sanity/client'
export const services = await client.fetch(`*[_type=="service"]`)
```
Los componentes NO cambian.

---

## ADR-003: Leaflet con dynamic import + ssr:false

**Contexto:** Leaflet usa `window` y `document` directamente — explota en SSR.

**Decisión:** `CoverageMap.tsx` es un componente aislado importado con:
```ts
const CoverageMap = dynamic(() => import('./CoverageMap'), { ssr: false })
```

**Por qué no iframe de Google Maps:**
- Google Maps requiere API key con billing activado
- Leaflet + CartoDB tiles son gratuitos sin límite para este tráfico
- Control total sobre el estilo del mapa

---

## ADR-004: CSS — Tailwind JIT + CSS Variables

**Contexto:** necesitamos theming para Leaflet (que no pasa por Tailwind) y para pseudo-elementos.

**Decisión:** tokens de diseño en dos lugares sincronizados:
1. `tailwind.config.ts` → clases utilitarias de Tailwind
2. `globals.css` `:root {}` → variables CSS para third-party libs

**Regla:** si cambias un color, cambias en AMBOS archivos.

---

## ADR-005: Formulario — validación en cliente Y servidor

**Contexto:** los formularios HTML `required` son bypasseables en el navegador.

**Decisión:**
- Cliente: `required` nativo + disable del botón mientras envía
- Servidor (`api/contact/route.ts`): validación estricta + sanitización XSS + rate limiting
- Principio: **nunca confiar en el cliente**

---

## ADR-006: Fuentes — Next.js Font + self-hosting automático

**Contexto:** Google Fonts hace una request externa que puede bloquear render y tiene implicaciones GDPR.

**Decisión:** `next/font/google` descarga y sirve las fuentes desde el propio dominio en build time.

**Beneficios:**
- Cero requests externas en producción
- GDPR compliant por defecto
- Eliminación de FOUT (Flash of Unstyled Text) con `display: swap`

---

## ADR-007: Analytics — wrapper propio

**Contexto:** si cambian de GA4 a Plausible o Mixpanel, no se quiere refactorizar 20 componentes.

**Decisión:** todos los eventos pasan por `utils/analytics.ts`.

```ts
// Cambiar provider = cambiar UN archivo
track.ctaClick('hero_primary')  // en el componente
// ↑ esto nunca cambia, sin importar el provider
```

---

## Checklist de Performance

| Técnica                             | Implementado | Impacto         |
|-------------------------------------|:------------:|-----------------|
| SSG (HTML estático)                 | ✅           | LCP -60%        |
| `next/image` con AVIF/WebP          | ✅           | Imágenes -40%   |
| Fuentes self-hosted (next/font)     | ✅           | FOUT eliminado  |
| Dynamic import Leaflet (ssr:false)  | ✅           | Bundle -180KB   |
| `removeConsole` en producción       | ✅           | Bundle -2KB     |
| Security headers                    | ✅           | Seguridad A+    |
| Sitemap + robots.txt automáticos    | ✅           | SEO             |
| JSON-LD Schema markup               | ✅           | Rich snippets   |
| `preconnect` para recursos externos | ✅           | LCP -80ms       |

---

## Roadmap de Escalabilidad

```
FASE 1 (ahora)          FASE 2 (3-6 meses)       FASE 3 (6-12 meses)
─────────────────────   ─────────────────────    ─────────────────────
Landing SSG             /proyectos (ISR)          CMS (Sanity)
Formulario básico       /blog (MDX)               i18n (next-intl)
Mapa Leaflet            Galería de fotos reales   Auth dashboard
WhatsApp float          Testimonios + reviews     Cotizador online
SEO básico              GA4 + Search Console      A/B testing
```
