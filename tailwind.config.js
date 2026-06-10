/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:        '#E07B39',
        'primary-dark': '#C05A1F',
        'primary-light':'#F09A60',
        accent:         '#F0C080',
        'accent-dark':  '#D4A060',
        background:     '#0C0C0E',
        surface:        '#131316',
        ink:            '#F0F0F0',
        muted:          '#777777',
        divider:        '#1E1E22',
        deep:           '#08080A',
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
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'blink':      'blink 1s step-end infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':       { opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
