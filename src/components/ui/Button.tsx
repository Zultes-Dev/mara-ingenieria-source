// components/ui/Button.tsx
import { forwardRef } from 'react'
import { cn } from '@utils/cn'

type Variant = 'primary' | 'ghost' | 'whatsapp'
type Size    = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:   Variant
  size?:      Size
  href?:      string
  external?:  boolean
  icon?:      React.ReactNode
  iconRight?: React.ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-brand-sky text-brand-ink font-semibold shadow-glow-sky ' +
    'hover:bg-[#1ac9ff] hover:-translate-y-0.5 hover:shadow-glow-sky-lg active:translate-y-0',
  ghost:
    'bg-transparent text-white/70 border border-white/20 ' +
    'hover:border-white/40 hover:text-white active:bg-white/5',
  whatsapp:
    'bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/25 ' +
    'hover:bg-[#25D366]/18 hover:-translate-y-0.5',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-5 py-2.5 text-[12px] tracking-[1.5px]',
  md: 'px-8 py-[15px] text-[13px] tracking-[1.5px]',
  lg: 'px-10 py-4 text-[14px] tracking-[1.5px]',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', href, external, icon, iconRight, children, className, ...props },
  ref
) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2.5',
    'font-semi uppercase rounded-md transition-all duration-200',
    'focus-visible:outline-2 focus-visible:outline-brand-sky',
    'disabled:opacity-40 disabled:pointer-events-none cursor-pointer',
    variantStyles[variant],
    sizeStyles[size],
    className
  )

  if (href) {
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {icon}{children}{iconRight}
      </a>
    )
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {icon}{children}{iconRight}
    </button>
  )
})
