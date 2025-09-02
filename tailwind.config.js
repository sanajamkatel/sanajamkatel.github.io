/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#FFB6C1', // Baby pink
        'primary-light': '#FFC0CB', // Light pink
        'primary-dark': '#FF69B4', // Hot pink
        'baby-pink': '#FFB6C1',
        'light-pink': '#FFC0CB',
        'hot-pink': '#FF69B4',
        'pale-pink': '#FFE4E1',
        'rose-pink': '#FFB6C1',
        'olive-green': '#556B2F',
        'light-olive': '#6B8E23',
        'dark-olive': '#2F4F2F',
      },
      fontFamily: {
        'kufi': ['Reem Kufi', 'system-ui', 'sans-serif'],
        'sans': ['Reem Kufi', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
} 