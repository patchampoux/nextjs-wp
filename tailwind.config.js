/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages-old/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: "var(--font-aboreto)",
        body: ["var(--font-poppins)"]
      }
    }
  },
  plugins: []
};
