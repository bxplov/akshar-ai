/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F5F3ED',
          50: '#FAF9F6',
          100: '#F5F3ED',
          200: '#EDEAE2',
          300: '#E5E1D6',
          400: '#D4CFC2',
        },
        charcoal: {
          DEFAULT: '#2A2B2A',
          50: '#3D3E3D',
          100: '#333433',
          200: '#2A2B2A',
          300: '#222322',
          400: '#1A1B1A',
        },
        gold: {
          DEFAULT: '#FCE07B',
          50: '#FEF6D8',
          100: '#FDECB0',
          200: '#FCE07B',
          300: '#F5D24E',
          400: '#D4A843',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'Cambria', 'serif'],
        handwritten: ['Caveat', 'cursive'],
      },
      borderRadius: {
        'bento': '2rem',
        'bento-sm': '1.5rem',
        'bento-lg': '2.5rem',
      },
      animation: {
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.5s ease-out',
        'float-in': 'float-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scale-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'breathe': 'breathe 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease-in-out infinite',
        'stagger-1': 'float-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s both',
        'stagger-2': 'float-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both',
        'stagger-3': 'float-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both',
        'stagger-4': 'float-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both',
        'stagger-5': 'float-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both',
        'shake': 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'float-in': {
          '0%': { opacity: '0', transform: 'translateY(20px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'breathe': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shake: {
          '10%, 90%': { transform: 'translate3d(-1px, 0, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 0)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, 0, 0)' },
          '40%, 60%': { transform: 'translate3d(4px, 0, 0)' }
        }
      },
      transitionTimingFunction: {
        'bento': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      boxShadow: {
        'bento': '0 8px 30px rgb(0 0 0 / 0.03)',
        'bento-hover': '0 12px 40px rgb(0 0 0 / 0.06)',
        'bento-lg': '0 20px 60px rgb(0 0 0 / 0.05)',
        'bento-xl': '0 25px 80px rgb(0 0 0 / 0.07)',
        'inner-soft': 'inset 0 2px 4px rgb(0 0 0 / 0.04)',
        'pill': '0 1px 3px rgb(0 0 0 / 0.06), 0 1px 2px rgb(0 0 0 / 0.04)',
        'floating': '0 12px 40px rgb(0 0 0 / 0.08), 0 4px 12px rgb(0 0 0 / 0.04)',
      },
    },
  },
  plugins: [],
}
