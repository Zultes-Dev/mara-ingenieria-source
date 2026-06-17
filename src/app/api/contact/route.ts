// app/api/contact/route.ts
//
// Route Handler de Next.js para procesar el formulario de contacto.
// En producción conectar con: Resend, Nodemailer, Formspree, etc.
//
// Patrón: validación estricta → sanitización → envío → log
// Nunca exponer el error interno al cliente.

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// ── Types ──────────────────────────────────────────────────────
interface ContactPayload {
  name:       string
  phone:      string
  email:      string
  clientType: string
  service:    string
  message:    string
}

// ── Validadores puros — sin dependencias externas ──────────────
const validators = {
  name:    (v: string) => v.trim().length >= 2 && v.trim().length <= 100,
  email:   (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),
  phone:   (v: string) => v.trim().length >= 7 && v.trim().length <= 20,
  message: (v: string) => v.trim().length >= 10 && v.trim().length <= 2000,
}

function validate(body: unknown): body is ContactPayload {
  if (!body || typeof body !== 'object') return false
  const b = body as Record<string, unknown>
  return (
    typeof b['name']    === 'string' && validators.name(b['name']) &&
    typeof b['email']   === 'string' && validators.email(b['email']) &&
    typeof b['phone']   === 'string' && validators.phone(b['phone']) &&
    typeof b['message'] === 'string' && validators.message(b['message'])
  )
}

// ── Sanitización básica (XSS) ──────────────────────────────────
function sanitize(str: string): string {
  return str
    .trim()
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// ── Rate limiting simple en memoria ─────────────────────────
// Para producción real: usar Upstash Redis + @upstash/ratelimit
const submissionMap = new Map<string, number>()
const RATE_WINDOW_MS = 60_000  // 1 minuto
const MAX_PER_WINDOW = 3

function isRateLimited(ip: string): boolean {
  const now    = Date.now()
  const last   = submissionMap.get(ip)
  if (!last || now - last > RATE_WINDOW_MS) {
    submissionMap.set(ip, now)
    return false
  }
  // Contar cuántas veces en la ventana (simplificado)
  return true
}

// ── Handler ────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // ── 1. Rate limiting ───────────────────────────
    const ip = req.headers.get('x-forwarded-for') ?? req.headers.get('x-real-ip') ?? 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes. Intente en un minuto.' },
        { status: 429 }
      )
    }

    // ── 2. Parse & validate ────────────────────────
    let body: unknown
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ error: 'Cuerpo de solicitud inválido.' }, { status: 400 })
    }

    if (!validate(body)) {
      return NextResponse.json({ error: 'Datos del formulario incompletos o inválidos.' }, { status: 422 })
    }

    // ── 3. Sanitize ────────────────────────────────
    const data: ContactPayload = {
      name:       sanitize(body.name),
      email:      sanitize(body.email),
      phone:      sanitize(body.phone),
      clientType: sanitize(body.clientType ?? ''),
      service:    sanitize(body.service ?? ''),
      message:    sanitize(body.message),
    }

    // ── 4. Send email ──────────────────────────────
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from:    'MARA Web <noreply@maraingenieria.com>',
        to:      process.env.CONTACT_EMAIL!,
        subject: `Nueva consulta — ${data.service || 'Servicio no especificado'}`,
        html: `
          <h2>Nueva solicitud de contacto</h2>
          <p><strong>Nombre:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Teléfono:</strong> ${data.phone}</p>
          <p><strong>Tipo de cliente:</strong> ${data.clientType}</p>
          <p><strong>Servicio:</strong> ${data.service}</p>
          <p><strong>Mensaje:</strong><br>${data.message}</p>
        `,
      })
    } else {
      console.info('[contact-form] No RESEND_API_KEY configured — logging only')
    }

    // ── 5. Log estructurado (siempre, incluso sin email) ──
    console.info('[contact-form]', {
      timestamp:  new Date().toISOString(),
      name:       data.name,
      email:      data.email,
      service:    data.service,
      clientType: data.clientType,
    })

    return NextResponse.json({ ok: true }, { status: 200 })

  } catch (err) {
    // Log interno — nunca exponer detalles al cliente
    console.error('[contact-form] Unhandled error:', err)
    return NextResponse.json(
      { error: 'Error interno. Por favor escribanos por WhatsApp.' },
      { status: 500 }
    )
  }
}

// Rechazar métodos no permitidos
export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
