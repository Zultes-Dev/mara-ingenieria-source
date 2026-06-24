// components/ui/CustomCursor.tsx
'use client'

import { useEffect, useRef, useCallback } from 'react'

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  const update = useCallback(() => {
    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return
    const x = posRef.current.x
    const y = posRef.current.y
    ring.style.transform = `translate(${x - 18}px, ${y - 18}px)`
    dot.style.transform = `translate(${x - 3}px, ${y - 3}px)`
    rafRef.current = 0
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!rafRef.current) rafRef.current = requestAnimationFrame(update)
    }

    const onOver = () => {
      ringRef.current?.classList.add('!w-14', '!h-14', '!opacity-20', '!border-brand-sky')
    }
    const onOut = () => {
      ringRef.current?.classList.remove('!w-14', '!h-14', '!opacity-20', '!border-brand-sky')
    }

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
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-9 h-9 rounded-full border-[2.5px] border-brand-sky/80 transition-all duration-200 ease-out hidden lg:block"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-[5px] h-[5px] rounded-full bg-brand-sky hidden lg:block"
        style={{ willChange: 'transform' }}
      />
    </>
  )
}
