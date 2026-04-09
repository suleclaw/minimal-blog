/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        'text-dim': 'var(--color-text-dim)',
        accent: 'var(--color-accent)',
        'accent-glow': 'var(--color-accent-glow)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        mono: ['"Space Mono"', 'monospace'],
        serif: ['"Lora"', 'serif'],
        code: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
