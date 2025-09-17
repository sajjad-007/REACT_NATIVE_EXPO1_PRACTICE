/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}', // <-- Add this line //Most important line for connecting two device for nativewind
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#030014',
        secondary: '#151312',
        light: {
          100: '#D6C7FF',
          200: '#A8B5DB',
          300: '#9CA4AB',
        },
        dark: {
          100: '#221F3D',
          200: '#0F0D23',
        },
        accent: '#AB8BFF',
        ratingBox: '#221F3D',
        searchBar: '#0F0D23',
        text: '#9CA4AB',
        darkAccent: '#AB8BFF',
        accentText: '#A8B5DB',
        secondaryText: '#D6C7FF',
      },
    },
  },
  plugins: [],
};
