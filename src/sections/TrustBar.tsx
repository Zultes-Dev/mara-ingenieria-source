// sections/TrustBar.tsx
'use client'

import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { useCounter } from '@hooks/useCounter'
import { trustStats } from '@config/content'
import { Reveal } from '@components/ui/Reveal'

function StatItem({ stat, index }: { stat: typeof trustStats[number]; index: number }) {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 })
  const count = useCounter({
    target:  stat.animateTo ?? 0,
    enabled: visible,
    duration: 1800,
  })

  return (
    <Reveal delay={(index % 4) as 0 | 1 | 2 | 3}>
      <div
        ref={ref}
        className="px-5 sm:px-7 py-8 text-center border-r border-white/5 last:border-r-0"
      >
        <div className="font-display font-black text-[42px] sm:text-[54px] leading-none tracking-[-2px] text-brand-sky">
          {stat.animateTo !== undefined
            ? `${count}${stat.suffix ?? ''}`
            : stat.value
          }
        </div>
        <div className="font-semi text-[11px] sm:text-[12px] tracking-[1.5px] uppercase text-brand-slate mt-2">
          {stat.label}
        </div>
      </div>
    </Reveal>
  )
}

export function TrustBar() {
  return (
    <section id="trust" className="bg-[#13192a] border-y border-white/5 py-14">
      <div className="site-container">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {trustStats.map((stat, i) => (
            <StatItem key={stat.id} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
