import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Andika is a literacy-friendly font with distinct b/d/p/q and single-story a/g.
        reader: ['"Andika"', '"Comic Sans MS"', "system-ui", "sans-serif"],
        dyslexic: ['"OpenDyslexic"', '"Andika"', "system-ui", "sans-serif"],
      },
      fontSize: {
        // Oversized type for early readers.
        word: ["3.5rem", { lineHeight: "1.1" }],
        "word-lg": ["5rem", { lineHeight: "1.05" }],
      },
      minHeight: {
        tap: "4rem", // 64px minimum tap target
      },
      minWidth: {
        tap: "4rem",
      },
      colors: {
        brand: {
          DEFAULT: "#7c3aed",
          light: "#a78bfa",
          dark: "#5b21b6",
        },
      },
      keyframes: {
        wiggle: {
          "0%,100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        pop: {
          "0%": { transform: "scale(0.6)", opacity: "0" },
          "70%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
      animation: {
        wiggle: "wiggle 0.6s ease-in-out infinite",
        pop: "pop 0.4s ease-out",
      },
    },
  },
  plugins: [],
} satisfies Config;
