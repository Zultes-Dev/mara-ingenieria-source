// hooks/useCounter.ts
//
// Anima un número de 0 a `target` durante `duration` ms.
// Se activa cuando `enabled` cambia a true (tipicamente al entrar al viewport).

import { useEffect, useRef, useState } from 'react'

interface Options {
  target:    number
  duration?: number
  enabled?:  boolean
}

export function useCounter({ target, duration = 1800, enabled = false }: Options): number {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!enabled) {
      setValue(0)
      return
    }
    if (target === 0) {
      setValue(0)
      return
    }

    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed  = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutCubic — se siente más natural que lineal
      const eased    = 1 - Math.pow(1 - progress, 3)

      setValue(Math.round(eased * target))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, duration, enabled])

  return value
}
