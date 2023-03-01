/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: ["light", "dark", "garden"],
  plugins: [require("daisyui")],
};
