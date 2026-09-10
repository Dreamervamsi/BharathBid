/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gem: {
          dark: '#0f172a',
          navy: '#1e293b',
          accent: '#2563eb',
          success: '#16a34a',
          danger: '#dc2626',
          warning: '#d97706',
          bg: '#f8fafc',
          border: '#e2e8f0'
        }
      }
    },
  },
  plugins: [],
}
