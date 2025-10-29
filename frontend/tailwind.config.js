/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'soft-gray': '#E0E0E0',
        'warm-cream': '#F6F1E7',
        'muted-lavender': '#BCA4E6',
        'soft-mint': '#A8D5BA',
        'coral': '#FF6F61',
        'emotion-joy': '#FFE66D',
        'emotion-calm': '#A8D5BA',
        'emotion-neutral': '#E0E0E0',
        'emotion-anxious': '#FFD89C',
        'emotion-sad': '#B8B8D9',
      },
      fontFamily: {
        sans: ['Inter', 'Open Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'xl': '12px',
        '2xl': '16px',
        '3xl': '24px',
      },
    },
  },
  plugins: [],
};
