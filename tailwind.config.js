/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        surface: "var(--surface)",
        surfaceAlt: "var(--surface-alt)",
        hairline: "var(--hairline)",
        text: "var(--text)",
        textDim: "var(--text-dim)",
        accent: "var(--accent)",
        accentDim: "var(--accent-dim)",
        success: "var(--success)",
        verified: "var(--success)",
        vault: "#f87171",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};
