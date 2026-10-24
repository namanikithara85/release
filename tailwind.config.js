/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#213D31',
          50: '#EDF2EE',
          100: '#D8E3D9',
          200: '#B0C4B2',
          300: '#82A085',
          400: '#567B5A',
          500: '#33563F',
          600: '#213D31',
          700: '#1B3329',
          800: '#15281F',
          900: '#0F1D17',
        },
        ivory: {
          DEFAULT: '#F5F0E5',
          50: '#FDFCF8',
          100: '#F8F4EA',
          200: '#F5F0E5',
          300: '#EDE5D2',
          400: '#E2D6BC',
        },
        terracotta: {
          DEFAULT: '#BC7755',
          50: '#FBF1ED',
          100: '#F5DDD0',
          200: '#E8B698',
          300: '#D49976',
          400: '#BC7755',
          500: '#A86645',
          600: '#8A5238',
        },
        sand: {
          DEFAULT: '#D9B98A',
          50: '#FBF5EA',
          100: '#F4E8D2',
          200: '#E9D3AC',
          300: '#DDBF93',
          400: '#D9B98A',
          500: '#C39E63',
          600: '#A8854F',
        },
        charcoal: {
          DEFAULT: '#292D29',
          50: '#E9EAE9',
          100: '#C6C8C7',
          200: '#949894',
          300: '#5E6360',
          400: '#3A3F3B',
          500: '#292D29',
          600: '#1E211F',
        },
        sage: {
          DEFAULT: '#DCE4DA',
          50: '#F4F7F3',
          100: '#E8EEE6',
          200: '#DCE4DA',
          300: '#C0D0BC',
        },
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(2.25rem, 5vw, 3.75rem)', { lineHeight: '1.05', letterSpacing: '-0.015em' }],
        'h1': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'h2': ['clamp(1.75rem, 3.5vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'h3': ['clamp(1.5rem, 2.5vw, 2rem)', { lineHeight: '1.2', letterSpacing: '-0.005em' }],
        'eyebrow': ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.18em' }],
        'lead': ['clamp(1.125rem, 1.6vw, 1.375rem)', { lineHeight: '1.6' }],
      },
      maxWidth: {
        'prose-narrow': '34rem',
        'prose-wide': '40rem',
        'section': '80rem',
      },
      letterSpacing: {
        'wider-2': '0.14em',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1s ease both',
        'slow-zoom': 'slow-zoom 24s ease-in-out infinite alternate',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
    },
  },
  plugins: [],
};
