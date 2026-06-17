// app/not-found.tsx
// Página 404 personalizada — Next.js la detecta automáticamente

import { Button } from '@components/ui/Button'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-brand-ink flex items-center justify-center px-[5%]">
      <div className="text-center max-w-[520px]">
        {/* Big number */}
        <div
          className="font-display font-black text-[clamp(100px,20vw,180px)] leading-none tracking-[-8px] select-none"
          style={{ WebkitTextStroke: '1.5px rgba(0,174,239,0.25)', color: 'transparent' }}
          aria-hidden="true"
        >
          404
        </div>

        <h1 className="font-display font-black text-[28px] uppercase tracking-[-0.5px] mt-2 mb-4">
          Página no encontrada
        </h1>

        <p className="text-white/50 text-[15px] leading-[1.75] mb-10 font-light">
          La página que buscas no existe o fue movida. Vuelva al inicio y navegue desde allí.
        </p>

        <Button href="/" size="md">
          ← Volver al inicio
        </Button>
      </div>
    </main>
  )
}
