// sections/Services.tsx
'use client'

import { Reveal }        from '@components/ui/Reveal'
import { SectionHeader } from '@components/ui/SectionHeader'
import { services }      from '@config/content'
import { track }         from '@utils/analytics'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export function Services() {
  return (
    <section id="services" className="py-[120px] pb-0 bg-[#0a0e17]">
      <div className="site-container mb-[72px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-end">
          <Reveal>
            <SectionHeader
              eyebrow="Servicios"
              headline={['Lo que', 'hacemos bien.']}
            />
          </Reveal>
          <Reveal delay={1}>
            <p className="text-white/50 text-[15px] leading-[1.7] max-w-[420px]">
              Cinco líneas de servicio enfocadas en ingeniería civil y construcción. Trabajamos con rigor técnico sin importar si es una remodelación o un proyecto de infraestructura.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Premium grid — gap-px creates perfect 1px lines */}
      <div className="site-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-white/6 rounded-card overflow-hidden">
          {services.map((svc, i) => (
            <Reveal key={svc.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div
                className="group bg-[#0a0e17] p-8 xl:p-11 hover:bg-brand-navy/25 transition-all duration-350 relative overflow-hidden cursor-default flex flex-col h-full"
                onMouseEnter={() => track.serviceHover(svc.id)}
              >
                <span className="absolute inset-0 bg-gradient-to-b from-brand-sky/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none" />

                <span className="block font-display font-bold text-[11px] tracking-[3px] text-brand-sky/35 mb-8">
                  {svc.number}
                </span>
                <div className="w-14 h-14 rounded-[12px] bg-brand-sky/8 border border-brand-sky/15 flex items-center justify-center text-brand-sky text-2xl mb-6 transition-all duration-350 group-hover:bg-brand-sky/15 group-hover:border-brand-sky/4">
                  <i className={`fa-solid ${svc.icon}`} aria-hidden="true" />
                </div>
                <h3 className="font-semi text-[16px] font-bold mb-3 leading-[1.25]">{svc.title}</h3>
                <p className="text-[13px] text-brand-slate leading-[1.6] flex-1">{svc.description}</p>
                <button
                  onClick={() => { scrollTo('contact'); track.ctaClick(`service_${svc.id}`) }}
                  className="inline-flex items-center gap-1.5 mt-5 font-semi text-[11px] tracking-[1.5px] uppercase text-brand-sky opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 hover:text-white focus-visible:outline-brand-sky self-start"
                >
                  → Ver más
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
