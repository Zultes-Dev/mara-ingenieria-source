// sections/Coverage.tsx
'use client'

import dynamic           from 'next/dynamic'
import { Reveal }        from '@components/ui/Reveal'
import { SectionHeader } from '@components/ui/SectionHeader'
import { Button }        from '@components/ui/Button'
import { coverage }      from '@config/content'

// Leaflet no soporta SSR — dynamic import con ssr:false es el patrón correcto
const CoverageMap = dynamic(() => import('./CoverageMap'), {
  ssr:     false,
  loading: () => (
    <div className="h-[480px] flex items-center justify-center bg-brand-navy/20 rounded-b-card-lg">
      <div className="flex flex-col items-center gap-3 text-brand-slate">
        <div className="w-8 h-8 border-2 border-brand-sky border-t-transparent rounded-full animate-spin" />
        <span className="font-semi text-[11px] tracking-[2px] uppercase">Cargando mapa…</span>
      </div>
    </div>
  ),
})

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Coverage() {
  return (
    <section id="coverage" className="py-[120px] bg-[#0a0e17]">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-20 items-center">

          {/* Left */}
          <Reveal>
            <SectionHeader
              eyebrow={coverage.eyebrow}
              headline={coverage.headline as unknown as string[]}
              lastStroke
            />
            <p className="text-white/55 text-[15px] leading-[1.8] mb-8 font-light">
              {coverage.body}
            </p>

            <div className="flex flex-col gap-3.5 mb-10">
              {coverage.items.map(item => (
                <div
                  key={item.label}
                  className="flex items-center gap-3.5 p-4 rounded-card bg-brand-navy/20 border border-white/5 hover:border-brand-sky/20 hover:bg-brand-navy/35 transition-all duration-250"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
                  />
                  <span className="font-semi text-[13px] tracking-[0.3px] text-white/70">{item.label}</span>
                </div>
              ))}
            </div>

            <Button
              icon={<LocationIcon />}
              onClick={() => scrollTo('contact')}
            >
              Solicitar visita técnica
            </Button>
          </Reveal>

          {/* Right: Map */}
          <Reveal delay={2}>
            <div className="bg-brand-navy/20 border border-brand-sky/15 rounded-card-lg overflow-hidden">
              {/* Chrome bar */}
              <div className="px-[18px] py-3 border-b border-brand-sky/10 bg-brand-ink/40 flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28ca41]" />
                </div>
                <span className="font-semi text-[10px] tracking-[2px] uppercase text-white/30 ml-2">
                  MARA Ingeniería · Cobertura Colombia
                </span>
              </div>
              <CoverageMap />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function LocationIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
    </svg>
  )
}
