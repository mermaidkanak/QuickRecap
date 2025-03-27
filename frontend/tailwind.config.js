/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fcf0f4',
          100: '#fad5e5',
          200: '#f7b8d2',
          300: '#f292b6',
          400: '#ec6895',
          500: '#e13c73',
          600: '#c22557',
          700: '#9c1c44',
          800: '#7a1736',
          900: '#60142b',
        },
        pastel: {
          pink: '#FFD6EC',
          lavender: '#E0D6FF',
          mint: '#D6FFE9',
          blue: '#D6F2FF',
          peach: '#FFE9D6',
          yellow: '#FFF9D6',
        },
        dark: {
          bg: '#222639',
          card: '#2E325A',
          text: '#E6E9FF',
        }
      },
      fontFamily: {
        sans: ['Nunito', 'Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'softer': '0 6px 24px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
    },
  },
  plugins: [],
} 