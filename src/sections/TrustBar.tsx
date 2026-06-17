// sections/TrustBar.tsx
'use client'

import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { useCounter } from '@hooks/useCounter'
import { trustStats } from '@config/content'

function StatItem({ stat }: { stat: typeof trustStats[number] }) {
  const [ref, visible] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.3 })
  const count = useCounter({
    target:  stat.animateTo ?? 0,
    enabled: visible,
    duration: 1800,
  })

  return (
    <div
      ref={ref}
      className="px-7 py-8 text-center border-r border-white/5 last:border-r-0"
    >
      <div className="font-display font-black text-[54px] leading-none tracking-[-2px] text-brand-sky">
        {stat.animateTo !== undefined
          ? `${count}${stat.suffix ?? ''}`
          : stat.value
        }
      </div>
      <div className="font-semi text-[12px] tracking-[1.5px] uppercase text-brand-slate mt-2">
        {stat.label}
      </div>
    </div>
  )
}

export function TrustBar() {
  return (
    <section id="trust" className="bg-[#13192a] border-y border-white/5 py-14">
      <div className="site-container">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {trustStats.map(stat => (
            <StatItem key={stat.id} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
