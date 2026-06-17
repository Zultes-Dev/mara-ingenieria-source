import type { Config } from 'tailwindcss'

// ─────────────────────────────────────────────────────────
// DESIGN TOKENS — fuente única de verdad para la marca MARA
// Cambiar aquí afecta TODO el sitio
// ─────────────────────────────────────────────────────────
const brand = {
  navy:  '#1E2647',
  ink:   '#0D1117',
  sky:   '#00AEEF',
  slate: '#8A95A8',
  white: '#FFFFFF',
  off:   '#F0F2F5',
  concrete: '#C8CBD2',
  // Superficies
  surface: {
    '01': '#13192a',
    '02': '#0a0e17',
    '03': 'rgba(30,38,71,0.2)',
  },
}

const config: Config = {
  // ── Solo escanea lo que existe — tree-shaking agresivo ──
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx}',
    './src/sections/**/*.{ts,tsx}',
  ],

  theme: {
    extend: {
      // ── Colors ────────────────────────────────────────
      colors: {
        brand,
        // Semánticos — si el diseño cambia, solo se toca aquí
        primary:    brand.sky,
        background: brand.ink,
        surface:    brand.navy,
        muted:      brand.slate,
      },

      // ── Typography ────────────────────────────────────
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        semi:    ['"Barlow Semi Condensed"', 'sans-serif'],
        body:    ['"Barlow"', 'sans-serif'],
      },

      // ── Font sizes con line-height integrado ──────────
      fontSize: {
        'display-xl': ['clamp(56px,9vw,112px)', { lineHeight: '0.9',  letterSpacing: '-3px' }],
        'display-lg': ['clamp(40px,6vw,72px)',  { lineHeight: '0.92', letterSpacing: '-2px' }],
        'display-md': ['clamp(28px,4vw,48px)',  { lineHeight: '1.0',  letterSpacing: '-1px' }],
        'label':      ['11px',                  { lineHeight: '1',    letterSpacing: '3px'  }],
      },

      // ── Spacing extra ─────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '112': '28rem',
        '128': '32rem',
      },

      // ── Border radius ─────────────────────────────────
      borderRadius: {
        'card': '12px',
        'card-lg': '20px',
      },

      // ── Keyframes ─────────────────────────────────────
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        'scroll-bar': {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(0.5)' },
          '50%':      { opacity: '1',   transform: 'scaleY(1)' },
        },
        'ripple': {
          from: { transform: 'scale(1)', opacity: '0.8' },
          to:   { transform: 'scale(2.4)', opacity: '0' },
        },
      },
      animation: {
        'fade-up':   'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in':   'fade-in 0.5s ease both',
        'blink':     'blink 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        'scroll-bar':'scroll-bar 1.8s ease-in-out infinite',
        'ripple':    'ripple 2s ease-out infinite',
      },

      // ── Box shadows ──────────────────────────────────
      boxShadow: {
        'glow-sky':  '0 0 32px rgba(0,174,239,0.3)',
        'glow-sky-lg': '0 6px 40px rgba(0,174,239,0.45)',
        'card': '0 4px 24px rgba(0,0,0,0.4)',
        'float': '0 12px 48px rgba(0,0,0,0.5)',
      },

      // ── Max widths ────────────────────────────────────
      maxWidth: {
        'site': '1160px',
      },
    },
  },

  plugins: [],
}

export default config
