import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': {
            opacity: '1'
          },
          '50%': {
            opacity: '0'
          }
        }
      },
      animation: {
        blink: 'blink 1.2s step-start infinite'
      },
      colors: {
        black: '#0F172A',
        white: '#FFFFFF',
        gray: {
          '50': '#F8FAFC',
          '100': '#F1F5F9',
          '200': '#E2E8F0',
          '600': '#475569'
        },
        blue: {
          '50': '#EFF6FF',
          '600': '#2563EB'
        },
        light: {
          'bg-primary': 'var(--white)',
          'bg-secondary': 'var(--gray-50)',
          'text-primary': 'var(--black)',
          'text-secondary': 'var(--gray-600)',
          border: 'var(--gray-100)',
          'card-bg': 'var(--white)',
          'card-border': 'var(--gray-200)'
        },
        dark: {
          'bg-primary': '#1E293B',
          'bg-secondary': '#0F172A',
          'text-primary': '#F8FAFC',
          'text-secondary': '#94A3B8',
          border: '#334155',
          'card-bg': '#1E293B',
          'card-border': '#334155'
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'system-ui',
          'sans-serif'
        ],
        mono: [
          'JetBrains Mono',
          'monospace'
        ]
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem'
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600'
      },
      spacing: {
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '12': '3rem',
        '16': '4rem'
      },
      borderRadius: {
        sm: 'calc(var(--radius) - 4px)',
        md: 'calc(var(--radius) - 2px)',
        lg: 'var(--radius)',
        full: '9999px'
      },
      maxWidth: {
        container: '1200px'
      },
      boxShadow: {
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.1)'
      },
      transitionProperty: {
        colors: 'background-color, border-color, color, fill, stroke',
        transform: 'transform'
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms'
      },
      transitionTimingFunction: {
        ease: 'ease',
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
  plugins: [require("tailwindcss-animate")]
} satisfies Config;
