import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "#C04828",
          light: "#FAECE7",
          dark: "#712B13",
        },
        "warm-white": "#FAF8F5",
        "ops-canvas": "#F8F7F4",
        slate: "#2C2C2A",
        gray: {
          DEFAULT: "#5F5E5A",
          mid: "#D3D1C7",
          light: "#F1EFE8",
        },
        "mid-gray": "#D3D1C7",
        "light-gray": "#F1EFE8",
        teal: {
          DEFAULT: "#0F6E56",
          light: "#E1F5EE",
        },
        blue: {
          DEFAULT: "#185FA5",
          light: "#E6F1FB",
        },
        purple: {
          DEFAULT: "#534AB7",
          light: "#EEEDFE",
        },
        amber: {
          DEFAULT: "#BA7517",
          light: "#FAEEDA",
        },
        "black-ops": "#1A1917",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        sans: ["DM Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "2xs": "12px",
        xs: "14px",
        sm: "16px",
        md: "20px",
        lg: "24px",
        xl: "32px",
        "2xl": "40px",
        "3xl": "56px",
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        6: "24px",
        8: "32px",
        12: "48px",
        16: "64px",
        24: "96px",
      },
      borderRadius: {
        chip: "4px",
        input: "8px",
        card: "12px",
        sheet: "24px",
      },
      transitionDuration: {
        DEFAULT: "150ms",
        sheet: "300ms",
      },
    },
  },
  plugins: [],
};
export default config;
