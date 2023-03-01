/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx}", "./public/**/*.{html,js,tsx}"],
  theme: ["light", "dark", "garden"],
  plugins: [require("daisyui")],
};
