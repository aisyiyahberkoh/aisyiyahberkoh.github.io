/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./layouts/**/*.html', './content/**/*.md'],
  theme: {
    extend: {
      colors: {
        primary: '#00843D',
        'primary-dark': '#00662F',
        secondary: '#C9A84C',
        'secondary-light': '#D4BA6D',
        cream: '#FCFAF2',
        navy: '#1A2B3D',
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
