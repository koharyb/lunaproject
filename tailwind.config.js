/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./docs/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        "ibm-plex-mono": ['"IBM Plex Mono"', "monospace"],
      },

      colors: {
        "custom-green": "#27a121",
        "custom-shadow": "#1e8c15",
      },

      animation: {
        'spin-slow': 'spin 10s linear infinite',
      },
    
    },
  },
  plugins: [],
};
