import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: '#0e0e0e',
          soft: '#161616',
          mid: '#1e1e1e',
        },
        gold: {
          DEFAULT: '#D4AF37',
          dim: '#a8872a',
          muted: 'rgba(212,175,55,0.15)',
        },
        silver: {
          DEFAULT: '#9a9a9a',
          dim: 'rgba(154,154,154,0.4)',
        },
        purple: {
          deep: '#2a1a3e',
        },
        border: {
          DEFAULT: '#2a2a2a',
          gold: 'rgba(212,175,55,0.25)',
        },
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', 'Montserrat', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'serif'],
        display: ['var(--font-league)', 'League Spartan', 'sans-serif'],
      },
      letterSpacing: {
        luxe: '0.3em',
        ultra: '0.5em',
        wide: '0.2em',
      },
      backgroundImage: {
        'hero-radial':
          'radial-gradient(ellipse at 60% 40%, rgba(42,26,62,0.45) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(212,175,55,0.07) 0%, transparent 50%)',
        'card-gradient':
          'linear-gradient(to top, rgba(14,14,14,0.92) 0%, transparent 55%)',
        'purple-veil':
          'linear-gradient(135deg, rgba(42,26,62,0.35) 0%, transparent 100%)',
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        reveal: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'scroll-line': 'scrollLine 2s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s var(--tw-ease-reveal) both',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        scrollLine: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(0.5)' },
          '50%': { opacity: '1', transform: 'scaleY(1)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
