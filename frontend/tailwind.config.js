// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx}', // Include all your JS and JSX files
  ],
 
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
        satoshi: ['Satoshi Variable', 'sans-serif'],
      },
      colors: {
        primary: 'black', // .primaryBgColor
        secondary: 'white', // .secondaryColor
        third: 'gray', // .thardColor
      },
    },
  },
  plugins: [],
};
