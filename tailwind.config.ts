const defaultTheme = require("tailwindcss/defaultTheme");
const svgToDataUri = require("mini-svg-data-uri");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: 
      
      {
        customPalette: {
          500: "#2E073F",  // Dark purple
          400: "#7A1CAC",  // Medium purple
          300: "#AD49E1",  // Light purple
          200: "#EBD3F8",  // Light lavender
        },
      }
,      
      backgroundImage: {
        'gradient-dark-purple': `linear-gradient(90deg, rgba(46,7,63,1) 0%, rgba(122,28,172,1) 35%, rgba(173,73,225,1) 100%);`,
        'gradient-teal-light': `linear-gradient(45deg, #176B87, #64CCC5)`,
        'gradient-teal-gray': `linear-gradient(45deg, #64CCC5, #EEEEEE)`,
        'gradient-full': `linear-gradient(45deg, #053B50, #176B87, #64CCC5, #EEEEEE)`,
        'dark-purple-gradient': 'linear-gradient(135deg, #0a0018, #000000)',
        'font-background' : 'linear-gradient(310.6deg, rgba(100, 0, 233, 0.94) 6.8%, rgba(166, 0, 188, 0.66) 57.8%)'
      },
      
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ matchUtilities, theme }: { matchUtilities: any, theme: any }) {
      matchUtilities(
        {
          "bg-grid": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-grid-small": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="8" height="8" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
            )}")`,
          }),
          "bg-dot": (value: string) => ({
            backgroundImage: `url("${svgToDataUri(
              `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="16" height="16" fill="none"><circle fill="${value}" id="pattern-circle" cx="10" cy="10" r="1.6257413380501518"></circle></svg>`
            )}")`,
          }),
        },
        { values: flattenColorPalette(theme("backgroundColor")), type: "color" }
      );
    },
  ],
};

function addVariablesForColors({ addBase, theme }: { addBase: (base: any) => void, theme: (path: string) => any }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}
