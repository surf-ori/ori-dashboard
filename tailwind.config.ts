import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        display: ['Nunito', 'Nunito Sans', 'system-ui', 'sans-serif'],
        sans: ['Source Sans Pro', 'Source Sans 3', 'system-ui', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        // SURF specific colors
        'surf-orange': "hsl(var(--surf-orange))",
        'surf-black': "hsl(var(--surf-black))",
        'surf-grey': "hsl(var(--surf-grey))",
        'surf-orange-700': "hsl(var(--surf-orange-700))",
        'surf-orange-500': "hsl(var(--surf-orange-500))",
        'surf-orange-300': "hsl(var(--surf-orange-300))",
        'surf-orange-200': "hsl(var(--surf-orange-200))",
        'surf-orange-100': "hsl(var(--surf-orange-100))",
        'surf-orange-050': "hsl(var(--surf-orange-050))",
        'surf-red': "hsl(var(--surf-red))",
        'surf-yellow': "hsl(var(--surf-yellow))",
        'surf-blue': "hsl(var(--surf-blue))",
        'surf-green-dark': "hsl(var(--surf-green-dark))",
        'surf-green-light': "hsl(var(--surf-green-light))",
        'surf-purple': "hsl(var(--surf-purple))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontSize: {
        xs: ["var(--fs-caption)", { lineHeight: "1.4" }],
        sm: ["var(--fs-body-sm)", { lineHeight: "1.5" }],
        base: ["var(--fs-body)", { lineHeight: "1.5" }],
        lg: ["var(--fs-body-lg)", { lineHeight: "1.5" }],
        xl: ["var(--fs-h6)", { lineHeight: "1.25" }],
        "2xl": ["var(--fs-h5)", { lineHeight: "1.25" }],
        "3xl": ["var(--fs-h4)", { lineHeight: "1.2" }],
        "4xl": ["var(--fs-h3)", { lineHeight: "1.2" }],
        "5xl": ["var(--fs-h2)", { lineHeight: "1.15" }],
        "6xl": ["var(--fs-h1)", { lineHeight: "1.1" }],
        "7xl": ["var(--fs-display)", { lineHeight: "1.05" }],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;