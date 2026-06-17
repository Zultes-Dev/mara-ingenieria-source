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
      const serviceLabel = data.service || 'No especificado'
      const clientLabel  = data.clientType || 'No especificado'

      await resend.emails.send({
        from:    'MARA Ingeniería <noreply@maraingenieria.com>',
        to:      process.env.CONTACT_EMAIL!,
        subject: `Nueva solicitud — ${data.name} — ${serviceLabel}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head><meta charset="utf-8"></head>
          <body style="margin:0;padding:0;background:#f4f4f4;font-family:Helvetica,Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center" style="padding:40px 20px;">
                  <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
                    <!-- Header -->
                    <tr>
                      <td style="background:#0D1117;padding:32px 40px;text-align:center;">
                        <h1 style="margin:0;color:#00AEEF;font-size:22px;font-weight:800;letter-spacing:-0.5px;text-transform:uppercase;">MARA INGENIERÍA</h1>
                        <p style="margin:6px 0 0;color:#8A95A8;font-size:12px;">Nueva solicitud de contacto</p>
                      </td>
                    </tr>
                    <!-- Status -->
                    <tr>
                      <td style="padding:0 40px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:24px 0 0;border-bottom:2px solid #00AEEF;">
                              <span style="display:inline-block;background:#00AEEF;color:#fff;font-size:11px;font-weight:700;padding:4px 14px;border-radius:4px;text-transform:uppercase;letter-spacing:1px;">Nuevo lead</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <!-- Data -->
                    <tr>
                      <td style="padding:28px 40px 20px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          ${[
                            ['Nombre completo', data.name],
                            ['Correo electrónico', data.email],
                            ['Teléfono', data.phone],
                            ['Tipo de cliente', clientLabel],
                            ['Servicio requerido', serviceLabel],
                          ].map(([label, value]) => `
                            <tr>
                              <td style="padding:8px 0;border-bottom:1px solid #eee;">
                                <span style="font-size:11px;color:#8A95A8;text-transform:uppercase;letter-spacing:1px;font-weight:600;">${label}</span>
                                <p style="margin:4px 0 0;font-size:15px;color:#1a1a1a;font-weight:500;">${value}</p>
                              </td>
                            </tr>
                          `).join('')}
                        </table>
                      </td>
                    </tr>
                    <!-- Message -->
                    <tr>
                      <td style="padding:0 40px 28px;">
                        <span style="font-size:11px;color:#8A95A8;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Mensaje</span>
                        <div style="margin:8px 0 0;padding:16px;background:#f8f9fb;border-radius:8px;font-size:14px;color:#333;line-height:1.6;border-left:3px solid #00AEEF;">
                          ${data.message.replace(/\n/g, '<br/>')}
                        </div>
                      </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                      <td style="background:#f8f9fb;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
                        <p style="margin:0;font-size:12px;color:#8A95A8;">
                          MARA Ingeniería — Barrancabermeja, Santander<br/>
                          <a href="mailto:Maraingenieriasas@gmail.com" style="color:#00AEEF;text-decoration:none;">Maraingenieriasas@gmail.com</a>
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
          </html>
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
