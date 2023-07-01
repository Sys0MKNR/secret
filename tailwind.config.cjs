/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{html,ts,js,svelte}'],
  theme: {
    extend: {
      colors: {
        main: '#0b0816',
        accent: '#ff3f81'
      }
    }
  },
  plugins: []
}
