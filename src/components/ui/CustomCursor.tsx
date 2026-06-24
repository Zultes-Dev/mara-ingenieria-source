// components/ui/CustomCursor.tsx
'use client'

import { useEffect, useRef, useCallback } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  const update = useCallback(() => {
    const el = cursorRef.current
    if (!el) return
    el.style.transform = `translate(${posRef.current.x - 12}px, ${posRef.current.y - 12}px)`
    rafRef.current = 0
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update)
    }

    const onOver = () => cursorRef.current?.classList.add('scale-150', 'opacity-60', 'mix-blend-difference')
    const onOut  = () => cursorRef.current?.classList.remove('scale-150', 'opacity-60', 'mix-blend-difference')

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button, input, textarea, select, [role="button"]').forEach(el => {
      el.addEventListener('mouseenter', onOver)
      el.addEventListener('mouseleave', onOut)
    })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [update])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 z-[9999] pointer-events-none w-6 h-6 rounded-full border-2 border-brand-sky/70 transition-[width,height] duration-200 ease-out hidden lg:block"
      style={{ willChange: 'transform' }}
    />
  )
}
