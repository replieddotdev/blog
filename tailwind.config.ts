import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        }
      },
      animation: {
        blink: 'blink 1.2s step-start infinite'
      },
      colors: {
        // base colors
        'black': '#0F172A',
        'white': '#FFFFFF',
        'gray': {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          600: '#475569'
        },
        'blue': {
          50: '#EFF6FF',
          600: '#2563EB'
        },
        light: {
          'bg-primary': 'var(--white)',
          'bg-secondary': 'var(--gray-50)',
          'text-primary': 'var(--black)',
          'text-secondary': 'var(--gray-600)',
          'border': 'var(--gray-100)',
          'card-bg': 'var(--white)',
          'card-border': 'var(--gray-200)'
        },
        dark: {
          'bg-primary': '#1E293B',
          'bg-secondary': '#0F172A',
          'text-primary': '#F8FAFC',
          'text-secondary': '#94A3B8',
          'border': '#334155',
          'card-bg': '#1E293B',
          'card-border': '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      fontSize: {
        'xs': '0.75rem',     // 12px
        'sm': '0.875rem',    // 14px
        'base': '1rem',      // 16px
        'lg': '1.125rem',    // 18px
        'xl': '1.25rem',     // 20px
        '2xl': '1.5rem',     // 24px
        '3xl': '2rem',       // 32px
        '4xl': '2.5rem'      // 40px
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600'
      },
      spacing: {
        '4': '1rem',      // 16px
        '6': '1.5rem',    // 24px
        '8': '2rem',      // 32px
        '12': '3rem',     // 48px
        '16': '4rem'      // 64px
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'full': '9999px'
      },
      maxWidth: {
        'container': '1200px'
      },
      boxShadow: {
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.1)'
      },
      transitionProperty: {
        'colors': 'background-color, border-color, color, fill, stroke',
        'transform': 'transform'
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms'
      },
      transitionTimingFunction: {
        'ease': 'ease',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['dark', 'dark:hover'],
      textColor: ['dark', 'dark:hover'],
      borderColor: ['dark', 'dark:hover']
    }
  },
  // Plugins
  plugins: []
} satisfies Config;
