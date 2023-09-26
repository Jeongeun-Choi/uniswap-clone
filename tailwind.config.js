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
      boxShadow: {
        custom:
          "0px 0px 10px 0px rgb(252 114 255 / 0.04), 0px 40px 120px 0px rgb(252 114 255 / 0.12)",
      },
      gridTemplateColumns: {
        layout: "minmax(400px, 1fr) 480px minmax(300px, 1fr)",
        list: "auto minmax(auto, 1fr) auto minmax(0px, 72px)",
      },
    },
  },
  plugins: [],
};
