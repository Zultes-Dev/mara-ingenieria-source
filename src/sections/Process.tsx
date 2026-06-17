// sections/Process.tsx
import { Reveal }        from '@components/ui/Reveal'
import { SectionHeader } from '@components/ui/SectionHeader'
import { processSteps }  from '@config/content'

export function Process() {
  return (
    <section id="process" className="py-[120px] bg-[#0a0e17]">
      <div className="site-container">
        <div className="text-center max-w-[580px] mx-auto mb-20">
          <Reveal>
            <SectionHeader
              eyebrow="Cómo trabajamos"
              headline={['Del contacto', 'a la entrega.']}
              align="center"
              body="Un proceso claro, sin pasos ocultos ni sorpresas intermedias."
            />
          </Reveal>
        </div>

        {/* Steps grid with connector line */}
        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Horizontal connector — desktop only */}
          <div className="absolute hidden lg:block top-[38px] left-[12%] right-[12%] h-[1px] bg-gradient-to-r from-brand-sky/35 via-brand-sky/8 to-brand-sky/35 pointer-events-none" />

          {processSteps.map((step, i) => (
            <Reveal key={step.number} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <div className="group text-center relative z-10 px-6">
                <div className="w-[76px] h-[76px] rounded-full mx-auto mb-7 border border-brand-sky/25 bg-[#0a0e17] flex items-center justify-center transition-all duration-300 relative group-hover:border-brand-sky group-hover:bg-brand-sky/8 group-hover:shadow-[0_0_28px_rgba(0,174,239,0.2)]">
                  {/* outer dashed ring */}
                  <span className="absolute inset-[-6px] rounded-full border border-dashed border-brand-sky/10" />
                  <span className="font-display font-black text-[22px] text-brand-sky">{step.number}</span>
                </div>
                <h4 className="font-semi text-[15px] font-bold mb-2.5">{step.title}</h4>
                <p className="text-[13px] text-brand-slate leading-[1.6]">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
