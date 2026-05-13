/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f6ff',
          100: '#e0ecff',
          200: '#c7deff',
          300: '#a3cfff',
          400: '#7ab5ff',
          500: '#5b99ff',
          600: '#4274d9',
          700: '#2d5cb8',
          800: '#234a96',
          900: '#1d3d7a',
          950: '#14264d',
        },
        accent: {
          50: '#faf8ff',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { transform: 'translateY(10px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          'from': { transform: 'translateY(-10px)', opacity: '0' },
          'to': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'sm-glow': '0 2px 8px rgba(91, 153, 255, 0.15)',
        'md-glow': '0 4px 16px rgba(91, 153, 255, 0.25)',
        'lg-glow': '0 8px 24px rgba(91, 153, 255, 0.35)',
      }
    },
  },
  plugins: [],
}