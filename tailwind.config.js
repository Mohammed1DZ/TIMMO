/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  
  theme: {
    extend: {
      colors: {
        primary: '#080703',
        secondary: '#070602',
        accent: '#080704',
        background: '#ffffff',
        text: '#000000'
      }
    }
  },

    extend: {},
  },
  plugins: [],
}