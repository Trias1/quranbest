import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        xs: "320px",
        sm: "640px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1496px",
      },
    },
    extend: {
      colors: {
        primary: "#10B981",
        secondary: "#8B5CF6",
        accent: "#F59E0B",
        destructive: "#EF4444",
        background: "#FFFFFF",
        "background-dark": "#1F2937",
        foreground: "#000000",
        "foreground-dark": "#F3F4F6",
        muted: "#6B7280",
        "muted-foreground": "#9CA3AF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        arabic: ["var(--font-uthman-taha)", ...defaultTheme.fontFamily.serif],
      },
      spacing: {
        safe: "env(safe-area-inset-bottom)",
      },
      minHeight: {
        "screen-safe": "100dvh",
      },
    },
  },
  plugins: [],
} satisfies Config

export default config
