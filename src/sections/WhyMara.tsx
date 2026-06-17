// sections/WhyMara.tsx
import { Reveal }        from '@components/ui/Reveal'
import { SectionHeader } from '@components/ui/SectionHeader'
import { whyItems, manifesto } from '@config/content'

export function WhyMara() {
  return (
    <section id="why" className="py-[120px] bg-brand-navy">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-20 items-start">

          {/* Left: list */}
          <div>
            <Reveal>
              <SectionHeader
                eyebrow="¿Por qué MARA?"
                headline={['Lo que nos', 'hace diferentes.']}
              />
            </Reveal>
            <div className="flex flex-col gap-[3px]">
              {whyItems.map((item, i) => (
                <Reveal key={item.number} delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <div className="group flex gap-4 items-start p-5 rounded-card border border-transparent hover:bg-brand-ink/40 hover:border-brand-sky/12 transition-all duration-250">
                    <span className="font-display font-black text-[13px] text-brand-sky/30 tracking-[1px] min-w-[24px] pt-[3px]">
                      {item.number}
                    </span>
                    <div>
                      <h4 className="font-semi text-[14px] font-bold mb-1.5 tracking-[0.2px]">{item.title}</h4>
                      <p className="text-[13px] text-brand-slate leading-[1.55]">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Right: manifesto */}
          <Reveal delay={2}>
            <div className="bg-brand-ink/50 border border-brand-sky/15 rounded-card-lg p-[52px] relative overflow-hidden">
              {/* Background glow */}
              <span className="absolute top-[-100px] right-[-100px] w-[280px] h-[280px] rounded-full bg-radial-[circle] from-brand-sky/10 to-transparent pointer-events-none" />

              <blockquote className="font-display font-black text-[clamp(22px,3vw,32px)] uppercase leading-[1.15] tracking-[-0.5px] mb-7 relative z-10">
                <span className="font-serif text-[120px] leading-[0] align-[-0.3em] text-brand-sky/12 mr-1">{'\u201C'}</span>
                {manifesto.quote[0]}{' '}
                <em className="not-italic text-brand-sky">{manifesto.quote[1]}</em>{' '}
                {manifesto.quote[2]}
              </blockquote>

              <p className="text-white/50 text-[14px] leading-[1.7] relative z-10 mb-6">
                {manifesto.body}
              </p>

              <div className="border-t border-white/7 pt-5 mb-8 relative z-10">
                <p className="font-semi text-[13px] font-bold tracking-[0.5px]">{manifesto.author}</p>
                <p className="text-[12px] text-brand-slate">{manifesto.location}</p>
              </div>

              {/* Attr grid */}
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {manifesto.attrs.map(attr => (
                  <div key={attr.label} className="text-center p-4">
                    <div className="font-display font-black text-[32px] tracking-[-1px] text-brand-sky">{attr.value}</div>
                    <div className="font-semi text-[11px] tracking-[1.5px] uppercase text-brand-slate mt-1">{attr.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
