// ─────────────────────────────────────────────────────────────
// config/content.ts
//
// TODO el contenido del sitio vive aquí.
// Ventajas:
//   1. Un redactor puede cambiar textos sin tocar componentes
//   2. Cuando escalen a CMS (Sanity, Contentful), solo se
//      reemplaza este archivo por una llamada fetch()
//   3. TypeScript garantiza que ningún componente quede sin dato
// ─────────────────────────────────────────────────────────────

// ── Tipos ────────────────────────────────────────────────────

export type Service = {
  id:          string
  number:      string
  icon:        string          // clase FA o nombre de componente SVG
  title:       string
  description: string
  tags:        string[]
}

export type ClientType = {
  id:          string
  icon:        string
  title:       string
  description: string
  tags:        string[]
}

export type ProcessStep = {
  number:      string
  title:       string
  description: string
}

export type WhyItem = {
  number:      string
  title:       string
  description: string
}

export type TrustStat = {
  id:          string
  value:       string | number
  animateTo?:  number          // si está definido, el counter anima hasta este valor
  suffix?:     string
  label:       string
}

export type NavLink = {
  label: string
  href:  string
}

// ── Navegación ───────────────────────────────────────────────

export const navLinks: NavLink[] = [
  { label: 'Nosotros',  href: '#about'    },
  { label: 'Servicios', href: '#services' },
  { label: 'Clientes',  href: '#clients'  },
  { label: 'Proceso',   href: '#process'  },
  { label: 'Cobertura', href: '#coverage' },
  { label: 'Contacto',  href: '#contact'  },
]

// ── Hero ─────────────────────────────────────────────────────

export const hero = {
  statusText: 'Empresa activa · Recibiendo proyectos',
  headline:   ['Construimos', 'con', 'precisión'],
  description:
    'Ingeniería civil, consultoría, interventoría y construcción con un equipo técnico honesto y comprometido desde el primer plano hasta la entrega final.',
  cta: {
    primary:   'Solicitar cotización',
    secondary: 'Ver servicios',
  },
  topBar: {
    location: 'Barrancabermeja, Santander',
    norm:     'NSR-10 · RAS-2000',
  },
  // Imágenes del mosaico — reemplazar con fotos propias cuando estén disponibles
  images: [
    {
      src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=75&fit=crop',
      alt: 'Construcción de estructura civil',
    },
    {
      src: 'https://images.unsplash.com/photo-1541888946425-d81bb5b8d3b8?w=800&q=75&fit=crop',
      alt: 'Consultor de ingeniería civil',
    },
    {
      src: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=75&fit=crop',
      alt: 'Obra civil en ejecución',
    },
    {
      src: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=75&fit=crop',
      alt: 'Consultoría técnica de campo',
    },
  ],
} as const

// ── Trust Bar ────────────────────────────────────────────────

export const trustStats: TrustStat[] = [
  {
    id:        'commitment',
    value:     '100%',
    animateTo: 100,
    suffix:    '%',
    label:     'Compromiso en cada proyecto',
  },
  {
    id:        'transparency',
    value:     '100%',
    animateTo: 100,
    suffix:    '%',
    label:     'Transparencia en presupuestos',
  },
  {
    id:        'shortcuts',
    value:     0,
    animateTo: 0,
    label:     'Atajos técnicos aceptados',
  },
  {
    id:        'norm',
    value:     'NSR-10',
    label:     'Norma sismo resistente aplicada',
  },
]

// ── About ────────────────────────────────────────────────────

export const about = {
  eyebrow:  'Quiénes somos',
  headline: ['Una empresa', 'seria.'],
  body: [
    'MARA Ingeniería es una firma de ingeniería civil con base en **Barrancabermeja, Santander**. Nacimos con una convicción clara: que el tamaño de una empresa no determina la calidad de su trabajo.',
    'Operamos con **formación técnica sólida**, normas vigentes y una honestidad que pocas empresas se atreven a prometer: si un proyecto está fuera de nuestro alcance, lo decimos antes de comenzar.',
    'Atendemos personas naturales, empresas y entidades públicas con el mismo nivel de rigor y dedicación.',
  ],
  pills:    ['NSR-10', 'RAS-2000', 'Normas NTC', 'Presupuesto transparente'],
  cards: [
    {
      icon:  'fa-bullseye',
      title: 'Misión',
      body:  'Entregar proyectos de ingeniería civil con precisión técnica, presupuestos claros y comunicación honesta en cada etapa.',
    },
    {
      icon:  'fa-rocket',
      title: 'Visión',
      body:  'Convertirnos en la firma de ingeniería civil de confianza en la región, creciendo proyecto a proyecto con reputación ganada.',
    },
    {
      icon:  'fa-handshake',
      title: 'Nuestro compromiso',
      body:  'Cada cliente tiene acceso directo al equipo técnico. Sin intermediarios, sin sorpresas en costos, sin excusas en plazos.',
    },
    {
      icon:  'fa-helmet-safety',
      title: 'Seguridad y normas',
      body:  'Trabajamos bajo reglamentación técnica colombiana vigente en todos los proyectos, sin excepción ni importar su magnitud.',
    },
  ],
} as const

// ── Services ─────────────────────────────────────────────────

export const services: Service[] = [
  {
    id:          'ingenieria-civil',
    number:      '01',
    icon:        'fa-compass-drafting',
    title:       'Ingeniería Civil',
    description: 'Diseño estructural, cálculo y memorias técnicas bajo NSR-10. Planos de construcción y especificaciones para licencias y permisos.',
    tags:        ['Diseño estructural', 'NSR-10', 'Memorias de cálculo', 'Planos'],
  },
  {
    id:          'consultoria',
    number:      '02',
    icon:        'fa-magnifying-glass-chart',
    title:       'Consultoría',
    description: 'Asesoría técnica en etapas de planeación, diseño y ejecución. Le ayudamos a tomar decisiones bien fundamentadas antes de gastar.',
    tags:        ['Estudios de factibilidad', 'Asesoría técnica', 'Planeación'],
  },
  {
    id:          'interventoria',
    number:      '03',
    icon:        'fa-clipboard-check',
    title:       'Interventoría',
    description: 'Control técnico, administrativo y financiero de obras en ejecución. Verificamos que el contratista cumpla lo pactado en diseño y norma.',
    tags:        ['Control técnico', 'Seguimiento financiero', 'Informes'],
  },
  {
    id:          'obra-civil',
    number:      '04',
    icon:        'fa-building',
    title:       'Obra Civil · Construcción',
    description: 'Ejecución directa de proyectos residenciales, comerciales e institucionales. Personal calificado, materiales certificados, supervisión permanente.',
    tags:        ['Residencial', 'Comercial', 'Institucional', 'Supervisión'],
  },
  {
    id:          'remodelaciones',
    number:      '05',
    icon:        'fa-paint-roller',
    title:       'Remodelaciones',
    description: 'Renovación de viviendas y espacios comerciales. Cocinas, baños, fachadas, ampliaciones y adecuaciones con acabados de calidad y garantía.',
    tags:        ['Vivienda', 'Comercial', 'Fachadas', 'Ampliaciones'],
  },
]

// ── Client Types ─────────────────────────────────────────────

export const clientTypes: ClientType[] = [
  {
    id:          'personas',
    icon:        'fa-house',
    title:       'Personas & Familias',
    description: 'Propietarios que quieren construir o remodelar con la seguridad de que su inversión está en manos técnicas y honestas.',
    tags:        ['Casas', 'Remodelaciones', 'Ampliaciones', 'Fachadas'],
  },
  {
    id:          'empresas',
    icon:        'fa-building-columns',
    title:       'Empresas Privadas',
    description: 'Pymes y empresas que necesitan obras civiles, adecuaciones comerciales o interventoría profesional para sus proyectos.',
    tags:        ['Locales comerciales', 'Bodegas', 'Adecuaciones', 'Consultoría'],
  },
  {
    id:          'entidades',
    icon:        'fa-landmark',
    title:       'Entidades Públicas',
    description: 'Alcaldías e instituciones que requieren interventoría, supervisión técnica y cumplimiento normativo riguroso en contratación pública.',
    tags:        ['Interventoría', 'Supervisión', 'Informes técnicos', 'Licitaciones'],
  },
]

// ── Process ──────────────────────────────────────────────────

export const processSteps: ProcessStep[] = [
  {
    number:      '01',
    title:       'Consulta sin costo',
    description: 'Escuchamos su necesidad, visitamos el sitio si es necesario y evaluamos el alcance real del proyecto.',
  },
  {
    number:      '02',
    title:       'Propuesta técnica',
    description: 'Entregamos presupuesto detallado, cronograma y especificaciones técnicas. Todo por escrito y firmado.',
  },
  {
    number:      '03',
    title:       'Ejecución con seguimiento',
    description: 'Personal calificado en obra, materiales certificados y reportes de avance periódicos al cliente.',
  },
  {
    number:      '04',
    title:       'Entrega y garantía',
    description: 'Acta de entrega formal, documentación técnica completa y garantía de obra por escrito.',
  },
]

// ── Why MARA ─────────────────────────────────────────────────

export const whyItems: WhyItem[] = [
  {
    number:      '01',
    title:       'Acceso directo al ingeniero',
    description: 'No hay capas de intermediarios. Habla directamente con quien diseña y ejecuta su proyecto desde el primer día.',
  },
  {
    number:      '02',
    title:       'Presupuestos ítem por ítem',
    description: 'Cada cobro está justificado. Le entregamos un APU detallado para que sepa exactamente en qué va su dinero.',
  },
  {
    number:      '03',
    title:       'Si no podemos, lo decimos',
    description: 'Honestidad radical: si un proyecto está fuera de nuestro alcance, se lo decimos antes de cobrarle un peso.',
  },
  {
    number:      '04',
    title:       'Normas sin excepción',
    description: 'NSR-10, RAS-2000 y normas NTC en cada proyecto. No hacemos ingeniería "por experiencia" sin respaldo normativo.',
  },
  {
    number:      '05',
    title:       'Comunicación semanal',
    description: 'Reportes fotográficos y de avance cada semana. Usted siempre sabe en qué estado está su proyecto.',
  },
]

export const manifesto = {
  quote:  ['Una empresa nueva no tiene proyectos pasados que mostrar. Tiene', 'valores presentes', 'que demostrar.'],
  body:   'Construimos reputación proyecto a proyecto. Cada obra bien hecha es nuestra mejor presentación ante el siguiente cliente.',
  author: 'Equipo MARA Ingeniería',
  location: 'Barrancabermeja · Santander · Colombia',
  attrs: [
    { value: '100%', label: 'Transparencia'   },
    { value: '0',    label: 'Atajos de calidad' },
    { value: 'NSR',  label: 'Normativa'        },
    { value: '3',    label: 'Tipos de cliente' },
  ],
} as const

// ── Coverage ─────────────────────────────────────────────────

export const coverage = {
  eyebrow:  'Cobertura',
  headline: ['Base en', 'Santander.', 'Nacional.'],
  body:     'Con sede en Barrancabermeja, atendemos proyectos en toda Colombia. Para consultoría e interventoría también operamos de forma remota.',
  items: [
    { color: '#00AEEF', label: 'Sede principal — Barrancabermeja, Santander'         },
    { color: '#22c55e', label: 'Proyectos en campo — todo el territorio nacional'     },
    { color: '#f59e0b', label: 'Consultoría remota — cualquier región del país'       },
  ],
  // Ciudades marcadas en el mapa
  cities: [
    { lat: 4.7110,  lng: -74.0721, name: 'Bogotá D.C.'  },
    { lat: 6.2442,  lng: -75.5812, name: 'Medellín'     },
    { lat: 3.4516,  lng: -76.5320, name: 'Cali'         },
    { lat: 10.9685, lng: -74.7813, name: 'Barranquilla'  },
    { lat: 7.1193,  lng: -73.1227, name: 'Bucaramanga'  },
    { lat: 1.2136,  lng: -77.2811, name: 'Pasto'        },
    { lat: 5.0689,  lng: -75.5174, name: 'Manizales'    },
  ],
} as const

// ── Contact ──────────────────────────────────────────────────

export const contactForm = {
  serviceOptions: [
    'Ingeniería Civil',
    'Consultoría técnica',
    'Interventoría',
    'Obra civil / Construcción',
    'Remodelación',
    'No estoy seguro — necesito orientación',
  ],
  clientTypeOptions: [
    'Persona natural / Familia',
    'Empresa privada',
    'Entidad pública',
  ],
} as const
