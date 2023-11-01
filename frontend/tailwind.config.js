/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './src/*.{js,jsx,ts,tsx}'],
  variants: {
    extend: {
      transform: ["group-hover"],
      translate: ["group-hover"],
      border: ["first"],
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans"],
      },
      scrollbar: {
        width: '1px',
        thumb: {
          backgroundColor: '#c1c1c1',
          borderRadius: '10px',
        },
    },
  },
}
}