module.exports = {
  content: [
    // app content
    "./src/app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.   
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    // include packages if not transpiling
    "./src/modules/ui/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        shake: "shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.2s ease-out",
        fadeOut: "fadeOut 0.2s ease-out",
        surveyLoading: "surveyLoadingAnimation 0.5s ease-out forwards",
        surveyExit: "surveyExitAnimation 0.5s ease-out forwards",
      },
      blur: {
        xxs: "0.33px",
        xs: "2px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      boxShadow: {
        "card-sm": "0px 0.5px 12px -5px rgba(30,41,59,0.20)",
        "card-md": "0px 1px 25px -10px rgba(30,41,59,0.30)",
        "card-lg": "0px 2px 51px -19px rgba(30,41,59,0.40)",
        "card-xl": "0px 20px 25px -5px rgba(0, 0, 0, 0.10), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      colors: {
        brand: {
          DEFAULT: "#00E6CA",
          light: "#00E6CA",
          dark: "#00C4B8",
        },
        focus: "var(--f2c-focus, #1982fc)",
        error: "rgb(from var(--f2c-error) r g b / <alpha-value>)",
        brandnew: "var(--f2c-brand, #038178)",
        primary: {
          DEFAULT: "#0f172a",
          foreground: "#fefefe",
        },
        destructive: {
          DEFAULT: "#FF6B6B", // A softer, coral-like red
          foreground: "#FFF5F5",
        },
        secondary: {
          DEFAULT: "#f1f5f9",
          foreground: "#0f172a",
        },
        accent: {
          DEFAULT: "#f4f6f8", // light gray background
          foreground: "#0f172a", // same as primary default for consistency
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        shake: {
          "10%, 90%": {
            transform: "translate3d(-1px, 0, 0)",
          },

          "20%, 80%": {
            transform: "translate3d(2px, 0, 0),",
          },

          "30%, 50%, 70%": {
            transform: "translate3d(-4px, 0, 0)",
          },

          "40%, 60%": {
            transform: "translate3d(4px, 0, 0)",
          },
        },
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        surveyLoadingAnimation: {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        surveyExitAnimation: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(-50px)", opacity: "0" },
        },
      },
      width: {
        "sidebar-expanded": "4rem",
        "sidebar-collapsed": "14rem",
      },
      transitionProperty: {
        width: "width",
      },
      maxWidth: {
        "8xl": "88rem",
      },
      screens: {
        xs: "430px",
      },
      scale: {
        97: "0.97",
      },
      gridTemplateColumns: {
        20: "repeat(20, minmax(0, 1fr))",
      },
    },
  },
  safelist: [{ pattern: /max-w-./, variants: "sm" }],
  darkMode: "class", // Set dark mode to use the 'class' strategy
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}