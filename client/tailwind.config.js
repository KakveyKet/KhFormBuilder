/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // 1. Define your custom theme colors using semantic names
      colors: {
        theme: {
          primary: "#6200EA", // Originally purple
          info: "#3B82F6", // Originally blue
          success: "#10B981", // Originally green
          error: "#F43F5E", // Originally rose
          danger: "#F43F5E", // Sharing the same value as error
          secondary: "#F59E0B", // Originally orange

          // UI Colors
          border: "#E2E8F0", // Light slate border
          text: "#334155", // Slate 700 text
          muted: "#64748B", // Slate 500 muted text
        },
      },
      // 2. Define your font families
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        lora: ["Lora", "serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
