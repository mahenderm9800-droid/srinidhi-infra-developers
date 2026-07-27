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
          50: '#f4f6fa',
          100: '#e5ebf4',
          200: '#cedae9',
          300: '#abc2d9',
          400: '#81a3c6',
          500: '#5e84b2',
          600: '#486b9c',
          700: '#3c5781',
          800: '#34496b',
          900: '#1e293b', // Navy / Charcoal
          950: '#0f172a',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#059669', // Emerald 600
          600: '#047857', // Emerald 700
          700: '#065f46',
          800: '#064e3b',
          900: '#022c22',
          955: '#011510',
        }
      },
      fontFamily: {
        serif: ['Outfit', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        sans: ['Outfit', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
