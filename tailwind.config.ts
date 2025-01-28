import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'radial-gradient': 'radial-gradient(var(--tw-gradient-stops))',
      },
      fontSize: {
        // Mobile first approach (320px to 767px)
        'body-mobile': ['16px', '1.5'],      // Higher end: 14px-16px
        'h1-mobile': ['28px', '1.2'],        // Higher end: 22px-28px
        'h2-mobile': ['20px', '1.3'],        // Higher end: 16px-20px
        'secondary-mobile': ['14px', '1.4'],  // Higher end: 12px-14px

        // Tablet (768px to 1023px)
        'body-tablet': ['17px', '1.6'],      // Higher end: 15px-17px
        'h1-tablet': ['32px', '1.2'],        // Higher end: 24px-32px
        'h2-tablet': ['22px', '1.3'],        // Higher end: 16px-22px
        'secondary-tablet': ['15px', '1.4'],  // Higher end: 13px-15px

        // Desktop (1024px and above)
        'body-desktop': ['18px', '1.6'],      // Higher end: 16px-18px
        'h1-desktop': ['36px', '1.2'],        // Higher end: 28px-36px
        'h2-desktop': ['24px', '1.3'],        // Higher end: 18px-24px
        'secondary-desktop': ['16px', '1.4'],  // Higher end: 14px-16px
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translate(-50%, -20px)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out forwards',
      },
    },
  },
  plugins: [],
};

export default config;
