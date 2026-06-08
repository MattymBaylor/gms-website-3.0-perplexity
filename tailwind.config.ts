import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './content/**/*.{md,mdx}',
    './mdx-components.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Per spec §1
        bg: {
          DEFAULT: '#0a0a0a',
          elevated: '#111113',
          card: '#141417',
        },
        accent: {
          DEFAULT: '#00d4ff', // cyan — highlights, links, active
          dim: '#0099bb',
          glow: 'rgba(0, 212, 255, 0.35)',
        },
        cta: {
          DEFAULT: '#f97316', // orange — primary action only
          hover: '#fb8d3a',
        },
        success: {
          DEFAULT: '#10b981',
        },
        ink: {
          DEFAULT: '#f5f5f5',
          muted: '#9ca3af',
          dim: '#6b7280',
        },
        border: {
          DEFAULT: 'rgba(255,255,255,0.07)',
          strong: 'rgba(255,255,255,0.12)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Slightly tightened scale for a premium feel
        'hero': ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'h1':   ['clamp(2rem, 4.5vw, 3.25rem)', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'h2':   ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'h3':   ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'lead': ['clamp(1.1rem, 1.6vw, 1.35rem)', { lineHeight: '1.55' }],
      },
      borderRadius: {
        'card': '12px',
        'btn': '10px',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        pulseSoft: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
