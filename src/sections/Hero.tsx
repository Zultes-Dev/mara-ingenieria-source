// sections/Hero.tsx
'use client'

import Image from 'next/image'
import { Button } from '@components/ui/Button'
import { hero, services } from '@config/content'
import { site } from '@config/site'
import { track } from '@utils/analytics'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

// Iconos inline para el strip inferior — evita cargar FA completo
const stripIcons: Record<string, React.ReactNode> = {
  'fa-compass-drafting':       <rect x="3" y="3" width="18" height="18" rx="2"/>,
  'fa-magnifying-glass-chart': <circle cx="11" cy="11" r="8"/>,
  'fa-clipboard-check':        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/>,
  'fa-building':               <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4"/>,
  'fa-paint-roller':           <path d="M4 4h16v4H4zM4 12v9M8 12v9M12 12v9"/>,
}

export function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col relative overflow-hidden bg-brand-ink">

      {/* Subtle noise texture */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")" }}
        aria-hidden="true"
      />

      {/* Top info bar */}
      <div className="relative z-10 border-b border-white/6 px-[5%] py-3.5">
        <div className="max-w-site mx-auto flex justify-between items-center">
          <span className="font-semi text-[11px] tracking-[2px] text-brand-slate uppercase">
            Ingeniería Civil &amp; Construcción · Colombia
          </span>
          <div className="hidden md:flex gap-6">
            {[
              { icon: '📍', text: hero.topBar.location },
              { icon: '🛡',  text: hero.topBar.norm     },
              { icon: '📞', text: site.contact.phone    },
            ].map(({ icon, text }) => (
              <span key={text} className="font-semi text-[11px] tracking-[1.5px] text-brand-slate uppercase flex items-center gap-1.5">
                <span className="text-brand-sky text-[10px]">{icon}</span>
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main split layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 relative z-10">

        {/* ── Left: Content ─────────────────────────── */}
        <div className="flex flex-col justify-center px-[5%] py-[120px] border-r border-white/5">
          <div className="max-w-[560px] ml-auto pr-0 lg:pr-[60px]">

            {/* Status indicator */}
            <div className="flex items-center gap-2.5 mb-9">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_10px_#22c55e] animate-blink" />
              <span className="font-semi text-[11px] tracking-[2px] uppercase text-white/50">
                {hero.statusText}
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-display-xl uppercase leading-[0.9] tracking-[-3px] mb-7">
              <span className="block">{hero.headline[0]}</span>
              <span className="block text-brand-sky">{hero.headline[1]}</span>
              <span className="block text-stroke">{hero.headline[2]}</span>
            </h1>

            <p className="text-[16px] text-white/55 leading-[1.75] max-w-[420px] mb-11 font-light">
              {hero.description}
            </p>

            {/* CTAs */}
            <div className="flex gap-3 flex-wrap">
              <Button
                onClick={() => { scrollTo('contact'); track.ctaClick('hero_primary') }}
                icon={<ArrowIcon />}
              >
                {hero.cta.primary}
              </Button>
              <Button
                variant="ghost"
                onClick={() => { scrollTo('services'); track.ctaClick('hero_secondary') }}
              >
                {hero.cta.secondary}
              </Button>
            </div>
          </div>
        </div>

        {/* ── Right: Image Mosaic ────────────────────── */}
        <div className="relative hidden lg:block overflow-hidden bg-gradient-to-br from-[#161c2c] to-[#0a0e17]">
          <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-[2px]">
            {hero.images.map((img, i) => (
              <div key={i} className="overflow-hidden relative">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width:1024px) 0px, 30vw"
                  className="object-cover opacity-55 grayscale-[30%] hover:opacity-70 transition-opacity duration-400"
                />
              </div>
            ))}
          </div>
          {/* Overlay */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ background: 'linear-gradient(135deg,rgba(0,174,239,.08) 0%,transparent 60%), linear-gradient(to right,rgba(13,17,23,.7) 0%,transparent 40%)' }}
          />
          {/* Floating card */}
          <div className="absolute bottom-9 left-9 z-20 bg-brand-ink/90 backdrop-blur-xl border border-brand-sky/20 rounded-card p-5 min-w-[220px]">
            <p className="font-semi text-[10px] tracking-[2.5px] uppercase text-brand-sky mb-2">Enfoque</p>
            <p className="font-display font-black text-[26px] leading-none">Calidad<br/>primero.</p>
            <p className="text-[12px] text-brand-slate mt-1">Sin atajos técnicos</p>
          </div>
        </div>
      </div>

      {/* Bottom service strip */}
      <div className="relative z-10 border-t border-white/6 bg-white/[0.02] px-[5%] py-[18px] hidden sm:block">
        <div className="max-w-site mx-auto flex gap-12 items-center flex-wrap">
          {services.map((svc, i) => (
            <div key={svc.id} className="flex items-center gap-2.5">
              {i > 0 && <span className="w-[1px] h-5 bg-white/8 mr-4" />}
              <span className="text-brand-sky text-[13px]">◆</span>
              <span className="font-semi text-[12px] tracking-[0.5px] text-white/50">{svc.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 hidden lg:flex">
        <span className="font-semi text-[9px] tracking-[3px] uppercase text-brand-slate">Scroll</span>
        <span className="w-[1px] h-9 bg-gradient-to-b from-brand-sky to-transparent animate-scroll-bar" />
      </div>
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
