/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: ['class'],
  theme: {
    extend: {
      // device-tuned breakpoints layered on top of Tailwind's defaults
      // (sm 640 / md 768 / lg 1024 / xl 1280 / 2xl 1536)
      screens: {
        xs: '400px', // large phones / small-phone landscape
        '3xl': '1800px', // 2K, 4K, ultrawide
      },
      // fluid type — scales continuously between phone and desktop, no jumps
      fontSize: {
        display: ['clamp(2.35rem, 1.2rem + 6vw, 5.2rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        h2: ['clamp(1.95rem, 1.1rem + 4.2vw, 3.75rem)', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        'fluid-lead': ['clamp(1rem, 0.94rem + 0.4vw, 1.15rem)', { lineHeight: '1.65' }],
      },
      colors: {
        void: '#050505',
        charcoal: '#0B0B0F',
        ink: '#0a0a12',
        navy: {
          950: '#0F172A',
          900: '#0a0f1e',
          800: '#0d1428',
        },
        aurora: {
          violet: '#8b5cf6',
          indigo: '#6366f1',
          purple: '#a78bfa',
          blue: '#60a5fa',
          electric: '#3b82f6',
          cyan: '#67e8f9',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'aurora-slow': 'aurora 22s ease-in-out infinite alternate',
        'aurora-slower': 'aurora 30s ease-in-out infinite alternate-reverse',
        'spin-slow': 'spin 28s linear infinite',
        'spin-slower': 'spin 44s linear infinite reverse',
        shimmer: 'shimmer 2.6s linear infinite',
        'pulse-glow': 'pulse-glow 3.2s ease-in-out infinite',
        'border-flow': 'border-flow 6s linear infinite',
        float: 'float 7s ease-in-out infinite',
      },
      keyframes: {
        aurora: {
          '0%': { transform: 'translate(0%, 0%) scale(1) rotate(0deg)' },
          '50%': { transform: 'translate(12%, -8%) scale(1.15) rotate(20deg)' },
          '100%': { transform: 'translate(-10%, 10%) scale(0.95) rotate(-15deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'border-flow': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
      },
    },
  },
  plugins: [],
}
