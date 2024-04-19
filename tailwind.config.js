/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        "4xl": "1900px",
        "3xl": "1700px",
      },
      colors: {
        transparent: "transparent",
        mainBG: "#757EC9",
        secBG: "#F6F5F5",
        white: "#ffffff",
        dark: "#000000",
      },
      fontFamily: {
        Montserrat: "Montserrat, sans-serif",
      },
    },
  },
  plugins: [],
};
// Montserrat: "Montserrat", "sans-serif"
