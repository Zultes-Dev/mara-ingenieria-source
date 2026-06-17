// components/layout/Navbar.tsx
'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { useScrolled } from '@hooks/useScrolled'
import { navLinks } from '@config/content'
import { site } from '@config/site'
import { Button } from '@components/ui/Button'
import { cn } from '@utils/cn'

export function Navbar() {
  const scrolled = useScrolled(80)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => {
      // Bloquear scroll del body cuando el menú está abierto
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
      {/* ── Main Navbar ───────────────────────────────── */}
      <header
        role="banner"
        className={cn(
          'fixed top-0 left-0 right-0 z-[999] px-[5%]',
          'transition-[background,border,box-shadow] duration-350',
          scrolled && 'bg-brand-ink/96 backdrop-blur-xl border-b border-white/6 shadow-[0_2px_40px_rgba(0,0,0,0.4)]'
        )}
      >
        <div className="flex items-center justify-between h-[72px] max-w-site mx-auto">

          {/* Logo */}
          <a
            href="#hero"
            aria-label={`${site.name} — Ir al inicio`}
            onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
            className="focus-visible:outline-brand-sky"
          >
            <Image
              src="/assets/logo.png"
              alt={site.name}
              width={160}
              height={48}
              className="h-[46px] w-auto object-contain brightness-0 invert"
              priority
            />
          </a>

          {/* Desktop nav */}
          <nav aria-label="Navegación principal" className="hidden lg:flex">
            <ul className="flex gap-0 list-none m-0 p-0">
              {navLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    className={cn(
                      'font-semi text-[13px] tracking-[0.5px]',
                      'text-white/55 hover:text-white',
                      'px-[18px] py-2 rounded',
                      'hover:bg-white/5',
                      'transition-colors duration-200',
                      'focus-visible:outline-brand-sky'
                    )}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA */}
          <Button
            className="hidden lg:inline-flex"
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
            <span className={cn('block w-[22px] h-[2px] bg-white rounded transition-transform duration-300', menuOpen && 'translate-y-[7px] rotate-45')} />
            <span className={cn('block w-[22px] h-[2px] bg-white rounded transition-opacity duration-300', menuOpen && 'opacity-0')} />
            <span className={cn('block w-[22px] h-[2px] bg-white rounded transition-transform duration-300', menuOpen && '-translate-y-[7px] -rotate-45')} />
          </button>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ───────────────────────── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menú móvil"
        className={cn(
          'fixed inset-0 z-[998]',
          'bg-[rgba(10,13,20,0.98)] backdrop-blur-2xl',
          'flex flex-col items-center justify-center gap-9',
          'transition-opacity duration-300',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        {navLinks.map(({ label, href }) => (
          <button
            key={href}
            onClick={() => scrollTo(href)}
            className="font-display font-black text-[36px] tracking-[2px] uppercase text-white/80 hover:text-brand-sky transition-colors duration-200"
          >
            {label}
          </button>
        ))}
        <Button className="mt-4" onClick={() => scrollTo('#contact')}>
          Cotizar proyecto
        </Button>
      </div>
    </>
  )
}
