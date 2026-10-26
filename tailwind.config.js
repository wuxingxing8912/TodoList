/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 页面背景（米色）
        app: '#F4EFE7',
        // 文字：常规 #666666，强调 #000000
        ink: {
          DEFAULT: '#000000',
          muted: '#666666',
        },
        // 主色：清新蓝
        brand: {
          DEFAULT: '#3B82F6',
          dark: '#2563EB',
          soft: '#E8F1FF',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0, 0, 0, 0.04), 0 8px 24px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
