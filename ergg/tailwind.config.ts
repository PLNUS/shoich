import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        ml: ["SUIT-Regular"],
        mb: ["Pretendard-Black"],
        msb: ["Pretendard-Bold"],
        mr: ["Pretendard-Regular"],
        rb: ["TTTogether"],
        jl: ["NIXGONM-Vb"],
        num: ["bitbit"]
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      animation: {
        fade: 'fadeIn 0.25s ease-in-out',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeIn: {
          '0%': { opacity: "0%" },
          '100%': { opacity: "110%" },
        },
      }),
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
export default config
