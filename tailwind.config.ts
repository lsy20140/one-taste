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
        black: "#121212",
        skeleton: "#e4e4e7",
        kakaoBtn: "#fee500",
        kakaoBtnText: "#000000D9",
      },
      fontFamily: {
        Pretendard: ["Pretendard"],
      },
      keyframes: {
        skeleton: {
          "0%": { opacity: "0.3" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0.3" },
        },
      },
      animation: {
        skeleton: "skeleton 2s ease infinite forwards",
      },
    },
  },
  plugins: [],
};
export default config;
