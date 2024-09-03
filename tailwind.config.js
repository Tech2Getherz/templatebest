/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    screens: {
      'xsm': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        lightCream: '#F0D49D',  /* gold */
        cream: '#D8B774',       /* darkGold */
        brownCream: '#B89D65',  /* mediumGold */
        brown: '#9C7F4E',       /* darkGold */
      
        dark: '#2C3E50',        /* navy */
        darkGrey: '#3A4B5C',    /* darkGrey */
        lightBlue: '#B89D65',   /* lightNavy */
        aquaBlue: '#9C7F4E'     /* mediumNavy */
      },
    },
  },
  plugins: [],
}
