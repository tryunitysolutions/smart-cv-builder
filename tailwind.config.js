import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        heading: ["Poppins", "sans-serif"]
      },
      colors: {
        primary: "#2563EB",
        accent: "#6366F1",
        lightBg: "#FFFFFF",
        lightText: "#1F2937",
        darkBg: "#111827",
        darkCard: "#1F2937",
        darkText: "#F3F4F6"
      }
    },
  },
  plugins: [],
}
