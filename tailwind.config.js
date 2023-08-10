/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        fieldButton: '#F0F0F0',
        bgHover: '#FFEFC6',
        textColor: '#2B2B2B',
        bluebg: '#1475DC'
      },
      boxShadow: {
        primary: '0px 2px 4px 0px rgba(0, 0, 0, 0.15)', // Your custom shadow color
      },
      borderColor: {
        inBorder: 'var(--grey-500, #E0E0E0)', // Your custom border color
      },
    },
  },
  plugins: [],
};
