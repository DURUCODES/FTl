/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust according to your project structure
  ],
  theme: {
    extend: {
      keyframes: {
        erase: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(-100%)", opacity: "0" },
        },
        rewrite: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
      },
      animation: {
        erase: "erase 2s linear forwards", // Increased duration to 2 seconds
        rewrite: "rewrite 2s linear forwards 2s", // Increased duration and delay to 2 seconds
      },
    },
  },
  plugins: [],
};
