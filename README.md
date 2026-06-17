# MARA Ingeniería — Web Corporativa

Sitio web profesional de MARA Ingeniería, construido con Next.js 14, TypeScript, Tailwind CSS y Framer Motion.

## Stack

| Tecnología          | Propósito                           |
| ------------------- | ----------------------------------- |
| Next.js 14 (App Router) | Framework React con SSG          |
| TypeScript          | Tipo seguro durante todo el proyecto|
| Tailwind CSS        | Estilos utilitarios con JIT         |
| Framer Motion       | Animaciones scroll-triggered        |
| Leaflet + CartoDB   | Mapa de cobertura gratuito          |
| Font Awesome 6      | Iconos vectoriales (CDN)            |
| Resend              | Email transaccional (formulario)    |

## Estructura

```
src/
├── app/           # App Router (layout, pages, API, sitemap, robots)
├── components/    # UI atómicos + layout (Navbar, Footer)
├── sections/      # Secciones de la landing page (Hero, About, Services...)
├── config/        # Contenido del sitio y metadata SEO
├── hooks/         # Custom hooks (scroll, intersection observer, counter)
└── utils/         # Utilidades (cn, analytics wrapper)
```

## Comandos

```bash
npm install
npm run dev        # Desarrollo → http://localhost:3000
npm run build      # Build de producción
npm run start      # Servidor de producción
npm run lint       # ESLint
npm run type-check # TypeScript check
```

## Despliegue en Netlify

### 1. Push a GitHub (o GitLab/Bitbucket)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <tu-repo-url>
git push -u origin main
```

### 2. Conectar en Netlify

1. Ir a [netlify.com](https://netlify.com) → "Add new site" → "Import an existing project"
2. Conectar con GitHub y seleccionar el repositorio
3. Build settings se auto-detectan desde `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
   - **Node version:** 20

### 3. Variables de entorno en Netlify

Agregar en **Site settings → Environment variables**:

| Variable                  | Obligatoria | Ejemplo                          |
| ------------------------- | :---------: | -------------------------------- |
| `NEXT_PUBLIC_WA_NUMBER`   | ✅          | `573001234567`                   |
| `NEXT_PUBLIC_PHONE`       | ✅          | `+57 300 123 4567`              |
| `NEXT_PUBLIC_EMAIL`       | ✅          | `contacto@maraingenieria.com`    |
| `CONTACT_EMAIL`           | ✅          | `admin@maraingenieria.com`       |
| `NEXT_PUBLIC_GA_ID`       | ❌          | `G-XXXXXXXXXX`                   |
| `RESEND_API_KEY`          | ❌          | `re_xxxxxxxxxxxx`                |

### 4. Dominio personalizado

1. En Netlify: **Site settings → Domain management → Add custom domain**
2. Agregar `maraingenieria.com` y `www.maraingenieria.com`
3. Configurar DNS: apuntar los nameservers del dominio a los de Netlify
4. El redirect `www` → non-www ya está configurado en `next.config.mjs`

### 5. Post-deploy checklist

- [ ] Reemplazar `public/assets/logo.png` con logo real (PNG transparente, ~320×80)
- [ ] Reemplazar `public/assets/og-image.jpg` (1200×630px, para redes sociales)
- [ ] Verificar que los íconos de Font Awesome carguen correctamente
- [ ] Probar formulario de contacto y flujo de email
- [ ] Configurar Google Analytics en Netlify (variable `NEXT_PUBLIC_GA_ID`)
- [ ] Agregar sitio a **Google Search Console**
- [ ] Verificar Lighthouse > 95
- [ ] Probar en mobile y desktop

## API Routes

### `POST /api/contact`

Procesa el formulario de contacto. Incluye:
- Validación de datos
- Sanitización XSS
- Rate limiting en memoria
- Envío de email vía Resend (si `RESEND_API_KEY` está configurada)

## Próximos pasos (escalabilidad)

| Cuándo                  | Qué agregar                          |
| ----------------------- | ------------------------------------ |
| Primer proyecto entregado | Sección `/proyectos` con galería   |
| 3+ testimonios          | Sección de reseñas con schema markup |
| Blog técnico            | MDX + `/blog` con ISR               |
| CMS                     | Sanity.io conectado a `content.ts`   |
| Multiidioma             | `next-intl` (estructura ya lo permite) |
