/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#fdfbf7',
          100: '#f7f4ec',
          200: '#ede6d3',
          300: '#e0d2b0',
          400: '#d1ba8d',
          500: '#c5a570',
          600: '#b88f5a',
          700: '#997449',
          800: '#7d5e3f',
          900: '#674d36',
        },
        nude: '#E6DCC3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
}
