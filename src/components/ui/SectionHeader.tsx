// components/ui/SectionHeader.tsx
import { cn } from '@utils/cn'

interface SectionHeaderProps {
  eyebrow:   string
  headline:  string | string[]   // array = cada item en su propia línea
  body?:     string
  align?:    'left' | 'center'
  className?: string
  /** Habilita el texto stroke en el último elemento del headline */
  lastStroke?: boolean
}

export function SectionHeader({
  eyebrow,
  headline,
  body,
  align = 'left',
  className,
  lastStroke = false,
}: SectionHeaderProps) {
  const lines = Array.isArray(headline) ? headline : [headline]
  const isCenter = align === 'center'

  return (
    <div className={cn(isCenter && 'text-center', className)}>
      {/* Eyebrow label */}
      <span className={cn(
        'block font-semi text-[11px] tracking-[3px] uppercase text-brand-sky mb-3.5',
        'px-3 py-1.5 border border-brand-sky/35 bg-brand-sky/10 rounded-sm',
        'inline-block'
      )}>
        {eyebrow}
      </span>

      {/* Display headline */}
      <h2 className="font-display font-black uppercase leading-[0.92] tracking-[-2px] text-display-lg mb-6">
        {lines.map((line, i) => {
          const isLast     = i === lines.length - 1
          const applyStroke = lastStroke && isLast
          return (
            <span
              key={i}
              className={cn(
                'block',
                // Highlight the second line in blue (design pattern)
                i === 1 && 'text-brand-sky',
                applyStroke && 'text-stroke'
              )}
            >
              {line}
            </span>
          )
        })}
      </h2>

      {/* Decorative rule */}
      <div className={cn('section-rule mb-9', isCenter && 'mx-auto')} />

      {/* Optional body text */}
      {body && (
        <p className="text-white/55 text-[15px] leading-[1.75] font-light max-w-[480px]">
          {body}
        </p>
      )}
    </div>
  )
}
