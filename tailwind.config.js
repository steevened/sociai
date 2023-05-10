/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'app-bg': '#f5f78f8',
        'app-blue': '#218dfa',
      },
      boxShadow: {
        'app-shadow': 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'app-top': 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
        'app-right': 'inset -1px 0 0 rgba(255, 255, 255, 0.1)',
        'app-bottom': 'inset 0 -1px 0 rgba(255, 255, 255, 0.1)',
        'app-image': '0 0 0 1px rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans'],
      },
    },
  },
  plugins: [],
};
