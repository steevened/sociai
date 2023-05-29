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
        'app-shadow': 'inset 0 0 0 1px rgba(255, 255, 255, 0.2)',
        'app-shadow-2': 'inset 0 0 0 1px rgba(255, 255, 255, 0.5)',
        'app-top': 'inset 0 1px 0 rgba(255, 255, 255, 0.2)',
        'app-right': 'inset -1px 0 0 rgba(255, 255, 255, 0.2)',
        'app-bottom': 'inset 0 -1px 0 rgba(255, 255, 255, 0.2)',
        'app-image': '0 0 0 1px rgba(255, 255, 255, 0.2)',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans'],
      },
    },
  },
  plugins: [],
};
