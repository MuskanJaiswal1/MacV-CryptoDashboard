/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
    },
    colors: {
      'success': '#16a34a',
      'danger': '#dc2626',
    },
  },
},
  plugins: [],
}
