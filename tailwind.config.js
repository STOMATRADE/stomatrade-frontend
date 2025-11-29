/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0E0E0E',
        secondaryBg: '#171717',
        tertiaryBg: '#3d3d3d',
        primary: '#00C427',
        secondaryGreen: '#006923',
        accent: '#00C427',
      },
      fontSize: {
        '10xl': '8rem',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
        'abhaya-libre': ['Abhaya Libre', 'Georgia', 'serif'],
        'alegraya-sans': ['Alegreya Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.25em',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(0, 196, 39, 0.3), 0 20px 60px rgba(0, 0, 0, 0.35)',
      },
    },
  },
  plugins: [],
};
