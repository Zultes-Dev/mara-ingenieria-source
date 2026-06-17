// hooks/useScrolled.ts
//
// Detecta si el usuario scrolleó más allá de un umbral.
// Throttled con requestAnimationFrame para no afectar el rendimiento.

import { useEffect, useState } from 'react'

export function useScrolled(threshold = 80): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold)
        ticking = false
      })
      ticking = true
    }

    // Evaluar en mount (por si llega con scroll ya hecho)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
