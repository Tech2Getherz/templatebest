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
      'sm': '6p40px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        lightCream: '#283618',   /* very light cream */
        cream: '#606c38',        /* warm orange/gold */
        brownCream: '#dda15e',  /* darker orange/brown */
        brown: '#bc6c25',       /* muted green/olive */
      
        dark: '#fefae0',        /* very dark green */
        darkGrey: '#dda15e',    /* muted green/olive */
        lightBlue: '#bc6c25',    /* warm orange/gold */
        aquaBlue: '#606c38'     /* darker orange/brown */
      },
    },
  },
  plugins: [],
}
