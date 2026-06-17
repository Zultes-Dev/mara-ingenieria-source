// components/ui/Reveal.tsx
//
// Wrapper que aplica animación fade-up cuando el elemento entra al viewport.
// Uso: <Reveal delay={1}><TuComponente /></Reveal>
//
// delay: 0-4 → incrementos de 80ms para stagger de grupos

'use client'

import { cn } from '@utils/cn'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'

interface RevealProps {
  children:  React.ReactNode
  className?: string
  delay?:    0 | 1 | 2 | 3 | 4
  threshold?: number
}

const delayMap = {
  0: '',
  1: '[transition-delay:80ms]',
  2: '[transition-delay:160ms]',
  3: '[transition-delay:240ms]',
  4: '[transition-delay:320ms]',
} as const

export function Reveal({ children, className, delay = 0, threshold = 0.1 }: RevealProps) {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({ threshold })

  return (
    <div
      ref={ref}
      className={cn(
        'transition-[opacity,transform] duration-700',
        'ease-[cubic-bezier(0.22,1,0.36,1)]',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8',
        delayMap[delay],
        className
      )}
    >
      {children}
    </div>
  )
}
