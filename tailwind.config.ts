import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          red: '#DC143C',
          gold: '#FF9933',
        },
        tech: {
          blue: '#1A237E',
          purple: '#6B46C1',
        },
        warm: '#FAF9F6',
        success: '#2ECC71',
        alert: '#F39C12',
        esewa: '#60BB46',
        khalti: '#5D2E8E',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
