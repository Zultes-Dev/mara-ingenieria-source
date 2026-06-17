// hooks/useIntersectionObserver.ts
//
// Hook reutilizable para detectar cuando un elemento entra al viewport.
// Usado por el componente <Reveal /> y el counter animado de TrustBar.
//
// Patrón: un solo IntersectionObserver compartido via ref
// → más eficiente que crear uno por componente

import { useEffect, useRef, useState } from 'react'

interface Options {
  threshold?: number
  rootMargin?: string
  /** Una vez visible, deja de observar (para animaciones one-shot) */
  once?: boolean
}

export function useIntersectionObserver<T extends Element>(
  options: Options = {}
): [React.RefObject<T>, boolean] {
  const { threshold = 0.12, rootMargin = '0px', once = true } = options
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          if (once) observer.unobserve(el)
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return [ref, isVisible]
}
