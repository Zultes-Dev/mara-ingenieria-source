// utils/cn.ts
// Combina clsx + tailwind-merge para resolver conflictos de clases Tailwind.
//
// Problema que resuelve:
//   cn('px-4', 'px-8')  → 'px-8'  ✅  (sin merge sería 'px-4 px-8' = bug)
//
// Uso:
//   <div className={cn('base-class', condition && 'conditional-class', props.className)} />

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
