/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          gray1: '#f5f5f7',
          gray2: '#eeeeee',
          gray3: '#cccccc',
          gray4: '#86868b',
          dark1: '#1d1d1f',
          dark2: '#1b1b1c',
          dark3: '#323232',
          blue: '#0071e3',
          green: '#34C759',
          orange: '#FF9500',
          purple: '#AF52DE',
          pink: '#FF2D55',
        }
      },
      fontFamily: {
        'openai': ['"OpenAI Sans"', '-apple-system', 'BlinkMacSystemFont', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'sf-pro': ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'SF Pro Display', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['80px', { lineHeight: '1.05', letterSpacing: '-0.015em', fontWeight: '600' }],
        'display': ['64px', { lineHeight: '1.07', letterSpacing: '-0.015em', fontWeight: '600' }],
        'display-sm': ['48px', { lineHeight: '1.08', letterSpacing: '-0.012em', fontWeight: '600' }],
        'headline': ['40px', { lineHeight: '1.1', letterSpacing: '-0.011em', fontWeight: '600' }],
        'title-lg': ['32px', { lineHeight: '1.125', letterSpacing: '-0.009em', fontWeight: '600' }],
        'title': ['28px', { lineHeight: '1.14', letterSpacing: '-0.008em', fontWeight: '600' }],
        'body-lg': ['21px', { lineHeight: '1.52', letterSpacing: '-0.01em', fontWeight: '400' }],
        'body': ['17px', { lineHeight: '1.47', letterSpacing: '-0.01em', fontWeight: '400' }],
      },
      backdropBlur: {
        'apple': '20px',
      },
      transitionTimingFunction: {
        'apple': 'cubic-bezier(0.28, 0.11, 0.32, 1)',
      },
    },
  },
  plugins: [],
}