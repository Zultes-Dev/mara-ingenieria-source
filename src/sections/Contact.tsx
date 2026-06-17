// sections/Contact.tsx
'use client'

import { useState, type FormEvent } from 'react'
import { Reveal }        from '@components/ui/Reveal'
import { SectionHeader } from '@components/ui/SectionHeader'
import { Button }        from '@components/ui/Button'
import { site }          from '@config/site'
import { contactForm }   from '@config/content'
import { track }         from '@utils/analytics'
import { cn }            from '@utils/cn'

// ── Types ──────────────────────────────────────────────────────
interface FormData {
  name:        string
  phone:       string
  email:       string
  clientType:  string
  service:     string
  message:     string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const INITIAL: FormData = { name: '', phone: '', email: '', clientType: '', service: '', message: '' }

// ── Reusable form field ────────────────────────────────────────
function Field({
  label, id, required, children,
}: { label: string; id: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semi text-[10px] font-semibold tracking-[2px] uppercase text-white/35">
        {label}{required && <span className="text-brand-sky ml-1">*</span>}
      </label>
      {children}
    </div>
  )
}

const inputClass = cn(
  'w-full bg-brand-ink/70 border border-white/8 rounded-[8px]',
  'px-[15px] py-[13px] text-white text-[14px] font-body',
  'placeholder:text-white/20 outline-none',
  'transition-[border-color,background] duration-200',
  'focus:border-brand-sky/45 focus:bg-brand-ink/85'
)

// ── Contact Section ────────────────────────────────────────────
export function Contact() {
  const [form, setForm]     = useState<FormData>(INITIAL)
  const [status, setStatus] = useState<FormStatus>('idle')

  const set = (field: keyof FormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  // In a real deploy: replace with your backend/formspree/resend endpoint
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('submitting')
    track.formSubmit(form.service)

    try {
      // Example: POST to /api/contact (Next.js Route Handler)
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Server error')
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-[120px] bg-brand-ink">
      <div className="site-container">

        {/* Header */}
        <div className="text-center max-w-[560px] mx-auto mb-[72px]">
          <Reveal>
            <SectionHeader
              eyebrow="Contacto"
              headline={['Hablemos de', 'su proyecto.']}
              align="center"
              body="Sin compromisos. Cuéntenos qué necesita y le respondemos en menos de 24 horas hábiles."
            />
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 items-start">

          {/* ── Info column ─────────────────────────── */}
          <Reveal>
            <p className="text-[16px] text-white/55 leading-[1.75] mb-10 font-light">
              Estamos disponibles por WhatsApp, correo y llamada. Nos desplazamos para visita técnica sin costo previo.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-4 mb-9">
              {[
                { icon: '✉',  label: 'Correo electrónico',    value: site.contact.email,   href: `mailto:${site.contact.email}` },
                { icon: '📞', label: 'Teléfono / WhatsApp',   value: site.contact.phone,   href: `tel:${site.contact.phone}` },
                { icon: '📍', label: 'Sede',                  value: site.contact.address, href: undefined },
                { icon: '🕐', label: 'Horario de atención',   value: site.contact.hours,   href: undefined },
              ].map(item => (
                <div key={item.label} className="flex items-center gap-3.5 p-[18px] rounded-card bg-brand-navy/20 border border-white/5">
                  <div className="w-[42px] h-[42px] rounded-[8px] bg-brand-sky/8 border border-brand-sky/15 flex items-center justify-center text-brand-sky text-[16px] flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <strong className="block text-[13px] font-semibold mb-0.5">{item.label}</strong>
                    {item.href
                      ? <a href={item.href} className="text-[13px] text-brand-slate hover:text-brand-sky transition-colors">{item.value}</a>
                      : <span className="text-[13px] text-brand-slate">{item.value}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp block */}
            <a
              href={site.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track.whatsappClick()}
              className="flex items-center gap-4 p-5 rounded-card bg-[#25D366]/8 border border-[#25D366]/20 hover:bg-[#25D366]/14 hover:-translate-y-0.5 transition-all duration-250 group"
            >
              <div className="w-[46px] h-[46px] rounded-[10px] bg-[#25D366]/15 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="#25D366" className="w-6 h-6">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <strong className="block text-[14px] font-bold text-[#22c55e]">Escríbenos por WhatsApp</strong>
                <span className="text-[12px] text-white/40">Respuesta rápida · línea directa con el equipo</span>
              </div>
            </a>
          </Reveal>

          {/* ── Form column ─────────────────────────── */}
          <Reveal delay={2}>
            <div className="bg-[rgba(20,27,44,0.6)] border border-white/7 rounded-card-lg p-11">
              <h3 className="font-semi text-[20px] font-bold mb-1.5">Envíenos su requerimiento</h3>
              <p className="text-[13px] text-brand-slate mb-8">Complete el formulario y le responderemos con una propuesta técnica inicial.</p>

              {/* Success state */}
              {status === 'success' && (
                <div className="bg-[#22c55e]/10 border border-[#22c55e]/25 rounded-card p-5 mb-6 text-center">
                  <p className="text-[#22c55e] font-semi font-semibold text-[14px]">✓ Mensaje enviado correctamente</p>
                  <p className="text-white/50 text-[12px] mt-1">Le responderemos en menos de 24 horas hábiles.</p>
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/25 rounded-card p-5 mb-6 text-center">
                  <p className="text-red-400 font-semi font-semibold text-[14px]">Error al enviar. Intente de nuevo o escríbanos por WhatsApp.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                  <Field label="Nombre completo" id="name" required>
                    <input id="name" type="text" required placeholder="Su nombre" value={form.name} onChange={set('name')} className={inputClass} />
                  </Field>
                  <Field label="Teléfono" id="phone" required>
                    <input id="phone" type="tel" required placeholder="+57 300 000 0000" value={form.phone} onChange={set('phone')} className={inputClass} />
                  </Field>
                </div>

                <div className="mb-4">
                  <Field label="Correo electrónico" id="email" required>
                    <input id="email" type="email" required placeholder="su@correo.com" value={form.email} onChange={set('email')} className={inputClass} />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-4">
                  <Field label="Tipo de cliente" id="clientType">
                    <select id="clientType" value={form.clientType} onChange={set('clientType')} className={inputClass}>
                      <option value="">Seleccione...</option>
                      {contactForm.clientTypeOptions.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </Field>
                  <Field label="Servicio requerido" id="service">
                    <select id="service" value={form.service} onChange={set('service')} className={inputClass}>
                      <option value="">Seleccione un servicio</option>
                      {contactForm.serviceOptions.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                  </Field>
                </div>

                <div className="mb-5">
                  <Field label="Describa su proyecto" id="message" required>
                    <textarea
                      id="message" required rows={4}
                      placeholder="¿Qué necesita construir, remodelar o supervisar? Ubicación aproximada, etapa en la que está..."
                      value={form.message} onChange={set('message')}
                      className={cn(inputClass, 'resize-y min-h-[110px]')}
                    />
                  </Field>
                </div>

                <Button
                  type="submit"
                  className="w-full justify-center"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Enviando…' : 'Enviar solicitud →'}
                </Button>

                <p className="text-[11px] text-white/25 text-center mt-3">
                  Respuesta garantizada en menos de 24 horas hábiles
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
