// sections/Hero.tsx
'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { Button } from '@components/ui/Button'
import { hero, services } from '@config/content'
import { site } from '@config/site'
import { track } from '@utils/analytics'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } },
})

export function Hero() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden bg-brand-ink">

      {/* ── Fullscreen image mosaic background ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[2px]">
          {hero.images.map((img, i) => (
            <div key={i} className="overflow-hidden relative">
              <Image
                src={img.src}
                alt=""
                fill
                sizes="50vw"
                className="object-cover opacity-60 lg:opacity-70 scale-105"
                priority={i < 2}
              />
            </div>
          ))}
        </div>
        <div
          className="absolute inset-0 z-[1] pointer-events-none opacity-20 mix-blend-overlay"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")" }}
          aria-hidden="true"
        />
      </div>

      {/* ── Smart gradient: dark left → clears right → images peek through ── */}
      <div className="absolute inset-0 z-[2] bg-gradient-to-r from-[#0a0e17] via-brand-ink/90 via-50% to-transparent lg:via-[#0a0e17] lg:via-40% lg:to-transparent" />

      <div ref={ref} className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2">

        {/* ── Left content ── */}
        <div className="relative z-20 flex flex-col justify-center px-[5%] py-24 sm:py-32 lg:py-0">
          <div className="max-w-[560px] lg:ml-auto lg:pr-[60px]">

            <motion.div {...fadeUp(0)} initial="initial" animate={isInView ? 'animate' : 'initial'} className="flex items-center gap-2.5 mb-8">
              <span className="relative flex w-2.5 h-2.5">
                <span className="absolute inset-0 rounded-full bg-[#22c55e] animate-ping opacity-40" />
                <span className="relative w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
              </span>
              <span className="font-semi text-[11px] tracking-[2px] uppercase text-white/50">
                {hero.statusText}
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.1)} initial="initial" animate={isInView ? 'animate' : 'initial'}
              className="font-display font-black text-display-xl uppercase leading-[0.9] tracking-[-3px] mb-6"
              style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.6))' }}
            >
              {hero.headline.map((line, i) => (
                <span key={i} className={`block ${i === 1 ? 'text-brand-sky' : ''} ${i === hero.headline.length - 1 ? 'text-stroke' : ''}`}>
                  {line}
                </span>
              ))}
            </motion.h1>

            <motion.p
              {...fadeUp(0.2)} initial="initial" animate={isInView ? 'animate' : 'initial'}
              className="text-[16px] text-white/55 leading-[1.75] max-w-[460px] mb-10 font-light"
            >
              {hero.description}
            </motion.p>

            <motion.div
              {...fadeUp(0.3)} initial="initial" animate={isInView ? 'animate' : 'initial'}
              className="flex gap-3 flex-wrap"
            >
              <Button onClick={() => { scrollTo('contact'); track.ctaClick('hero_primary') }} icon={<ArrowIcon />}>
                {hero.cta.primary}
              </Button>
              <Button variant="ghost" onClick={() => { scrollTo('services'); track.ctaClick('hero_secondary') }}>
                {hero.cta.secondary}
              </Button>
            </motion.div>

            <motion.div
              {...fadeUp(0.4)} initial="initial" animate={isInView ? 'animate' : 'initial'}
              className="flex flex-wrap gap-x-6 gap-y-2 mt-12 lg:hidden"
            >
              <span className="font-semi text-[11px] tracking-[1.5px] text-brand-slate">📍 {hero.topBar.location}</span>
              <span className="font-semi text-[11px] tracking-[1.5px] text-brand-slate">📞 {site.contact.phone}</span>
            </motion.div>
          </div>
        </div>

        {/* ── Right: Floating card ── */}
        <div className="hidden lg:flex flex-col justify-end pb-12 pl-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            className="bg-brand-ink/80 backdrop-blur-xl border border-white/10 rounded-card p-5 max-w-[200px]"
          >
            <p className="font-semi text-[10px] tracking-[2.5px] uppercase text-brand-sky mb-2">Enfoque</p>
            <p className="font-display font-black text-[26px] leading-none">Calidad<br/>primero.</p>
            <p className="text-[12px] text-brand-slate mt-1">Sin atajos técnicos</p>
          </motion.div>
        </div>
      </div>

      {/* Info bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 1 }}
        className="relative z-10 border-t border-white/6 px-[5%] py-3 hidden sm:block"
      >
        <div className="max-w-site mx-auto flex items-center justify-between">
          <div className="flex gap-8">
            {services.slice(0, 4).map((svc) => (
              <span key={svc.id} className="font-semi text-[11px] tracking-[1px] text-white/40 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-sky/40" />
                {svc.title}
              </span>
            ))}
          </div>
          <span className="text-[11px] tracking-[2px] text-white/20 font-semi uppercase hidden md:block">
            <span className="text-brand-sky/60">✦</span> NSR-10 · RAS-2000
          </span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1.5 hidden lg:flex"
      >
        <span className="font-semi text-[9px] tracking-[3px] uppercase text-brand-slate/60">Scroll</span>
        <span className="w-[1px] h-8 bg-gradient-to-b from-brand-sky to-transparent animate-scroll-bar" />
      </motion.div>
    </section>
  )
}

function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M3.105 3.105a1.5 1.5 0 012.122-.001L17.5 15.378V9.75a1.5 1.5 0 013 0v9a1.5 1.5 0 01-1.5 1.5h-9a1.5 1.5 0 010-3h5.629L3.106 5.228a1.5 1.5 0 01-.001-2.123z" />
    </svg>
  )
}
