// sections/ClientTypes.tsx
import { Reveal }        from '@components/ui/Reveal'
import { SectionHeader } from '@components/ui/SectionHeader'
import { clientTypes }   from '@config/content'

export function ClientTypes() {
  return (
    <section id="clients" className="py-[120px] bg-brand-ink">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-end mb-16">
          <Reveal>
            <SectionHeader
              eyebrow="¿A quién atendemos?"
              headline={['Tres tipos', 'de cliente.']}
            />
          </Reveal>
          <Reveal delay={1}>
            <p className="text-white/50 text-[15px] leading-[1.7] max-w-[380px]">
              MARA Ingeniería trabaja con personas naturales, empresas privadas y entidades públicas. Cada tipo de cliente requiere un enfoque diferente — y nosotros lo entendemos.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {clientTypes.map((ct, i) => (
            <Reveal key={ct.id} delay={(i % 3) as 0 | 1 | 2}>
              <div className="group p-9 rounded-card-lg bg-brand-navy/20 border border-white/6 hover:border-brand-sky/25 hover:bg-brand-navy/40 transition-all duration-300 relative overflow-hidden">
                {/* Top accent line */}
                <span className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-sky to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-14 h-14 rounded-[12px] bg-brand-sky/8 border border-brand-sky/12 flex items-center justify-center text-brand-sky text-2xl mb-6">
                  <i className={`fa-solid ${ct.icon}`} aria-hidden="true" />
                </div>
                <h3 className="font-semi text-[17px] font-bold mb-2.5">{ct.title}</h3>
                <p className="text-[13px] text-brand-slate leading-[1.6] mb-5">{ct.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {ct.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-semi text-[10px] tracking-[1px] bg-brand-sky/8 border border-brand-sky/12 text-brand-sky/80 px-2.5 py-[3px] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
