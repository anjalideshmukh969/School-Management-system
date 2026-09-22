/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["'Source Serif 4'", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd",
          400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8",
          800: "#1e40af", 900: "#1e3a8a",
        },
        amber: {
          50: "#fffbeb", 100: "#fef3c7", 500: "#f59e0b", 600: "#d97706", 700: "#b45309",
        },
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: { "0%": { opacity: 0, transform: "translateY(24px)" }, "100%": { opacity: 1, transform: "translateY(0)" } },
        float: { "0%, 100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-12px)" } },
      },
    },
  },
  plugins: [],
};
