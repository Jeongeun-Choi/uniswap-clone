/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "gray-100": "#f9f9f9",
        "gray-300": "#cecece",
        "gray-700": "#7d7d7d",
        "gray-900": "#262626",
        "pink-100": "#ffefff",
        "pink-900": "#fc72ff",
      },
    },
  },
  plugins: [],
};
