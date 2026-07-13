/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#050507',
        elev: '#0B0B10',
        ink: '#F4F4F5',
        dim: '#9CA0AB',
        accent: '#7C6BFF',
        accent2: '#4CC9F0',
        accent3: '#FF7AC6',
        ok: '#4ADE80',
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'sans-serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: { content: '72rem' },
    },
  },
  plugins: [],
}
