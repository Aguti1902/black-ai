/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-2': 'var(--bg-2)',
        ink: 'var(--ink)',
        body: 'var(--body)',
        muted: 'var(--muted)',
        gold: 'var(--gold)',
        border: 'var(--border)',
        dark: '#141414',
        surface: 'var(--surface)',
        // Legacy tokens kept so existing components still compile
        black: 'var(--black)',
        deep: 'var(--deep)',
        accent: 'var(--accent)',
        'accent-cold': 'var(--accent-cold)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono:    ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1280px',
      },
      keyframes: {
        scrollPulse: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top', opacity: '0' },
          '40%': { transform: 'scaleY(1)', transformOrigin: 'top', opacity: '1' },
          '60%': { transform: 'scaleY(1)', transformOrigin: 'bottom', opacity: '1' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom', opacity: '0' },
        },
      },
      animation: {
        scrollPulse: 'scrollPulse 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
