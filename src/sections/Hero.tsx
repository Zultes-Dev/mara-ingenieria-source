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

      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-20 mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")" }}
        aria-hidden="true"
      />

      <div ref={ref} className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2">

        {/* ── Left content ── */}
        <div className="relative z-20 flex flex-col justify-center px-[5%] py-24 sm:py-32 lg:py-0">
          <div className="w-full max-w-[620px] lg:ml-auto lg:pr-[40px]">

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
              style={{ filter: 'drop-shadow(0 4px 20px rgba(0,0,0,0.7))' }}
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

        {/* ── Right: Image mosaic ── */}
        <div className="relative min-h-[320px] sm:min-h-[480px] lg:min-h-0 overflow-hidden">
          {/* 2x2 grid */}
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[2px]">
            {hero.images.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 + i * 0.15 }}
                className="overflow-hidden relative"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width:1024px) 100vw, 30vw"
                  className="object-cover opacity-55 lg:opacity-50 grayscale-[10%]"
                />
              </motion.div>
            ))}
          </div>

          {/* Dark diffused gradient: center → right edge */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#0a0e17] via-brand-ink/60 via-30% to-transparent" />
          {/* Top/bottom gentle fade */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-brand-ink/15 to-transparent" />
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-brand-ink/30 via-transparent to-transparent" />

          {/* Floating card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
            className="absolute bottom-5 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 md:bottom-9 md:left-9 z-20 bg-brand-ink/85 backdrop-blur-xl border border-white/10 rounded-card p-3 sm:p-4 md:p-5 w-[90%] sm:w-auto max-w-[200px] text-center sm:text-left"
          >
            <p className="font-semi text-[10px] tracking-[2.5px] uppercase text-brand-sky mb-1.5">Enfoque</p>
            <p className="font-display font-black text-[20px] sm:text-[22px] md:text-[26px] leading-none">Calidad<br className="hidden sm:block"/>primero.</p>
            <p className="text-[11px] sm:text-[12px] text-brand-slate mt-1">Sin atajos técnicos</p>
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
