// sections/About.tsx
import { Reveal }         from '@components/ui/Reveal'
import { SectionHeader }  from '@components/ui/SectionHeader'
import { about }          from '@config/content'

export function About() {
  return (
    <section id="about" className="py-[120px] bg-brand-ink">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[100px] items-center">

          {/* Left: text */}
          <Reveal>
            <SectionHeader
              eyebrow={about.eyebrow}
              headline={about.headline as unknown as string[]}
            />
            <div className="flex flex-col gap-4 mb-8">
              {about.body.map((para, i) => (
                <p
                  key={i}
                  className="text-[15px] text-white/58 leading-[1.85] font-light"
                  dangerouslySetInnerHTML={{
                    __html: para.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-medium">$1</strong>'),
                  }}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {about.pills.map(pill => (
                <span
                  key={pill}
                  className="bg-brand-navy/50 border border-brand-sky/15 rounded-full px-4 py-1.5 font-semi text-[12px] tracking-[0.5px] text-brand-concrete"
                >
                  ✓ {pill}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Right: value cards */}
          <div className="flex flex-col gap-4">
            {about.cards.map((card, i) => (
              <Reveal key={card.title} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <div className="group flex gap-5 items-start p-6 rounded-card bg-brand-navy/18 border border-white/5 hover:border-brand-sky/20 hover:bg-brand-navy/35 hover:translate-x-1 transition-all duration-300 relative overflow-hidden">
                  {/* Left accent bar */}
                  <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-brand-sky rounded-r opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="w-11 h-11 rounded-[8px] bg-brand-sky/10 flex items-center justify-center text-brand-sky text-[18px] flex-shrink-0">
                    <i className={`fa-solid ${card.icon}`} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semi text-[15px] font-bold mb-1.5">{card.title}</h3>
                    <p className="text-[13px] text-brand-slate leading-[1.55]">{card.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
