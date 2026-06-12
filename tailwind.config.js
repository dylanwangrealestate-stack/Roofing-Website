/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:        '#2F6FEB',
        'primary-dark': '#1A55D4',
        'primary-light':'#5C93F5',
        accent:         '#4B8BF5',
        'accent-dark':  '#1A55D4',
        background:     '#06080F',
        surface:        '#0C1220',
        ink:            '#E8EEFF',
        muted:          '#64748B',
        divider:        '#1A2540',
        deep:           '#030407',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif:   ['"Cormorant Garamond"', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        '2.5xl': '1.25rem',
        '4xl':   '2rem',
        '5xl':   '2.5rem',
        '6xl':   '3rem',
        '7xl':   '4rem',
      },
      animation: {
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'blink':       'blink 1s step-end infinite',
        'float':       'float 6s ease-in-out infinite',
        'float-slow':  'float 12s ease-in-out infinite',
        'float-slower':'float 18s ease-in-out infinite',
        'glow-pulse':  'glow-pulse 4s ease-in-out infinite',
        'shimmer':     'shimmer 2.8s linear infinite',
        'orb-drift':   'orb-drift 20s ease-in-out infinite',
        'scan':        'scan 3s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%':      { opacity: '0.65', transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'orb-drift': {
          '0%':   { transform: 'translate(0, 0) scale(1)' },
          '33%':  { transform: 'translate(40px, -30px) scale(1.05)' },
          '66%':  { transform: 'translate(-20px, 20px) scale(0.95)' },
          '100%': { transform: 'translate(0, 0) scale(1)' },
        },
        scan: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(400%)' },
        },
      },
    },
  },
  plugins: [],
}
