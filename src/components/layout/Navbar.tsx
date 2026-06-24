// components/layout/Navbar.tsx
'use client'

import { useState, useCallback } from 'react'
import { useScrolled } from '@hooks/useScrolled'
import { navLinks } from '@config/content'
import { site } from '@config/site'
import { Button } from '@components/ui/Button'
import { cn } from '@utils/cn'

export function Navbar() {
  const scrolled = useScrolled(60)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => {
      document.body.style.overflow = !prev ? 'hidden' : ''
      return !prev
    })
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }, [])

  const scrollTo = (href: string) => {
    closeMenu()
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-[999]',
          'transition-all duration-500 ease-out',
          scrolled
            ? 'top-3 lg:top-4 px-3 lg:px-4'
            : 'top-0 px-[5%]'
        )}
      >
        <div
          className={cn(
            'mx-auto transition-all duration-500 ease-out',
            'flex items-center justify-between',
            scrolled
              ? 'max-w-[1200px] bg-brand-ink/85 backdrop-blur-2xl border border-white/8 shadow-[0_8px_40px_rgba(0,0,0,0.5)] rounded-[16px] px-5 py-2 h-[58px] lg:h-[62px]'
              : 'max-w-site bg-transparent h-[72px] px-0'
          )}
        >
          {/* Logo */}
          <a
            href="#hero"
            aria-label={`${site.name} — Ir al inicio`}
            onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
            className="focus-visible:outline-brand-sky flex-shrink-0"
          >
            <img
              src="/assets/logo.png"
              alt={site.name}
              style={{ height: scrolled ? '38px' : '46px', width: 'auto' }}
              className="transition-all duration-500 ease-out"
            />
          </a>

          {/* Desktop nav */}
          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className={cn(
                  'relative font-semi text-[13px] tracking-[0.3px]',
                  'text-white/55 hover:text-white',
                  'px-4 py-2 rounded-lg',
                  'hover:bg-white/5',
                  'transition-all duration-200',
                  'focus-visible:outline-brand-sky',
                  'after:absolute after:bottom-1 after:left-4 after:right-4 after:h-[2px]',
                  'after:bg-brand-sky after:scale-x-0 after:origin-left',
                  'hover:after:scale-x-100 after:transition-transform after:duration-300'
                )}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Button
            className="hidden lg:inline-flex"
            size={scrolled ? 'sm' : 'md'}
            onClick={() => scrollTo('#contact')}
          >
            Cotizar proyecto
          </Button>

          {/* Mobile hamburger */}
          <button
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            onClick={toggleMenu}
            className="flex lg:hidden flex-col gap-[5px] cursor-pointer p-1.5 focus-visible:outline-brand-sky"
          >
            <span className={cn('block w-[22px] h-[2px] bg-white rounded-full transition-all duration-300 origin-center', menuOpen && 'translate-y-[7px] rotate-45')} />
            <span className={cn('block w-[22px] h-[2px] bg-white rounded-full transition-all duration-300', menuOpen && 'opacity-0 scale-x-0')} />
            <span className={cn('block w-[22px] h-[2px] bg-white rounded-full transition-all duration-300 origin-center', menuOpen && '-translate-y-[7px] -rotate-45')} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menú móvil"
        className={cn(
          'fixed inset-0 z-[998]',
          'bg-[rgba(10,13,20,0.97)] backdrop-blur-2xl',
          'flex flex-col items-center justify-center gap-8',
          'transition-all duration-400 ease-out',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <nav className="flex flex-col items-center gap-2">
          {navLinks.map(({ label, href }, i) => (
            <button
              key={href}
              onClick={() => scrollTo(href)}
              className={cn(
                'font-display font-black text-[32px] sm:text-[40px] tracking-[2px] uppercase',
                'text-white/70 hover:text-brand-sky',
                'transition-all duration-300',
                'px-6 py-2 rounded-xl hover:bg-white/5',
                menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              )}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
            >
              {label}
            </button>
          ))}
        </nav>
        <Button
          className="mt-4 scale-110"
          onClick={() => scrollTo('#contact')}
        >
          Cotizar proyecto
        </Button>
      </div>
    </>
  )
}
