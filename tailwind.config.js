/** @type {import('tailwindcss').Config} */
import tailwindForms from '@tailwindcss/forms';
import tailwindAnimate from 'tailwindcss-animate';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // sage green with low opacity
        input: 'var(--color-input)', // subtle warm gray
        ring: 'var(--color-ring)', // sage green
        background: 'var(--color-background)', // warm off-white
        foreground: 'var(--color-foreground)', // deep charcoal
        primary: {
          DEFAULT: 'var(--color-primary)', // sage green
          foreground: 'var(--color-primary-foreground)' // white
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // lighter sage variant
          foreground: 'var(--color-secondary-foreground)' // deep charcoal
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // muted coral
          foreground: 'var(--color-destructive-foreground)' // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // subtle warm gray
          foreground: 'var(--color-muted-foreground)' // medium gray
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // warm terracotta
          foreground: 'var(--color-accent-foreground)' // deep charcoal
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // warm off-white
          foreground: 'var(--color-popover-foreground)' // deep charcoal
        },
        card: {
          DEFAULT: 'var(--color-card)', // subtle warm gray
          foreground: 'var(--color-card-foreground)' // deep charcoal
        },
        success: {
          DEFAULT: 'var(--color-success)', // gentle green
          foreground: 'var(--color-success-foreground)' // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // soft amber
          foreground: 'var(--color-warning-foreground)' // deep charcoal
        },
        error: {
          DEFAULT: 'var(--color-error)', // muted coral
          foreground: 'var(--color-error-foreground)' // white
        }
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'],
        'body': ['Source Sans 3', 'sans-serif'],
        'caption': ['Nunito Sans', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }]
      },
      borderRadius: {
        'organic': '16px',
        'organic-lg': '24px'
      },
      boxShadow: {
        'therapeutic-sm': '0 2px 8px rgba(123, 154, 126, 0.08)',
        'therapeutic': '0 4px 20px rgba(123, 154, 126, 0.08)',
        'therapeutic-lg': '0 8px 32px rgba(123, 154, 126, 0.12)',
        'soft-inset': 'inset 0 2px 4px rgba(0,0,0,0.06)'
      },
      animation: {
        'breathe': 'breathe 2.5s ease-in-out infinite',
        'gentle-pulse': 'gentle-pulse 1.5s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite'
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' }
        },
        'gentle-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },
        'pulse-slow': {
          '0%, 100%': { width: '0%' },
          '50%': { width: '100%' }
        }
      },
      transitionTimingFunction: {
        'therapeutic': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      },
      zIndex: {
        '100': '100',
        '200': '200',
        '9999': '9999'
      }
    },
  },
  plugins: [
    tailwindForms,
    tailwindAnimate
  ],
}