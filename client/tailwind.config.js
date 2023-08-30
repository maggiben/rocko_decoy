/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackPrimary: '#141414',
        blackSecondary: '#545454',
        blackTertiary: '#848484',
        whitePrimary: '#FFFFFF',
        whiteSecondary: '#E6E6E6',
        whiteTertiary: '#F9F9F9',
        grayPrimary: '#EEEEEE',
        blue:'#2C3B8D'
      },
      fontFamily: {
        inter: ['Inter var','sans-serif'],
      },

    },
  },
  plugins: [],
}