/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#030014', // Deep cosmic dark background
          card: 'rgba(10, 10, 25, 0.7)', // Dark glassmorphic background
          textPrimary: '#f3f4f6', // Light gray/white text
          textSecondary: '#9ca3af', // Gray text
          primary: '#10b981', // Emerald
          secondary: '#06b6d4', // Cyan
          accent: '#8b5cf6', // Violet
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float-medium 6s ease-in-out infinite',
        'float-fast': 'float-fast 4s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'background-shine': 'background-shine 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '50%': { transform: 'translate(10px, -20px) rotate(5deg)' },
        },
        'float-medium': {
          '0%, 100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '50%': { transform: 'translate(-15px, -10px) rotate(-6deg)' },
        },
        'float-fast': {
          '0%, 100%': { transform: 'translate(0px, 0px) rotate(0deg)' },
          '50%': { transform: 'translate(5px, -15px) rotate(3deg)' },
        },
        'background-shine': {
          'from': { backgroundPosition: '0 0' },
          'to': { backgroundPosition: '-200% 0' }
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
