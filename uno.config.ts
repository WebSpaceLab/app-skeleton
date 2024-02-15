import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from 'unocss'


import { presetScrollbar } from 'unocss-preset-scrollbar'
import { presetForms } from '@julr/unocss-preset-forms'
import presetMini from '@unocss/preset-mini'


export default defineConfig({
    presets: [
        presetMini(),
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
        }),
        presetTypography(),
        presetWebFonts({
            fonts: {
              sans: 'Golos Text',
              serif: 'Golos Text',
              mono: 'DM Mono',
            },
        }),
        presetScrollbar(),
        presetForms()
    ],

    shortcuts: [],

    rules: [
    ],

    transformers: [
        transformerDirectives(),
        transformerVariantGroup(),
    ],

    theme: {
        extend: {
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                blob: "blob 4s infinite",
                snake1: "snake1 2s linear infinite",
                snake2: "snake2 2s linear infinite",
                snake3: "snake3 2s linear infinite",
                snake4: "snake4 2s linear infinite",
            },
            keyframes: {
                spin: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },

                blob: {
                    "0%": {
                      transform: "translate(0px, 0px) scale(1)",
                    },
                    "33%": {
                      transform: "translate(30px, -50px) scale(1.2)",
                    },
                    "66%": {
                      transform: "translate(-20px, 20px) scale(0.8)",
                    },
                    "100%": {
                      transform: "translate(0px, 0px) scale(1)",
                    },
                  },
                  snake1: {
                    "0%": {
                      transform: "translateX(-100%)",
                    },
                    "100%": {
                      transform: "translateX(100%)",
                    },
                  },
                  snake2: {
                    "0%": {
                      transform: "translateY(-100%)",
                    },
                    "100%": {
                      transform: "translateY(100%)",
                    },
                  },
                  snake3: {
                    "0%": {
                      transform: "translateX(100%)",
                    },
                    "100%": {
                      transform: "translateX(-100%)",
                    },
                  },
                  snake4: {
                    "0%": {
                      transform: "translateY(100%)",
                    },
                    "100%": {
                      transform: "translateY(-100%)",
                    },
                  },
            },
            fontFamily: {
                'sans': ['Golos Text', 'sans-serif'],
                'serif': ['Golos Text', 'serif'],
                'mono': ['DM Mono', 'monospace'],
            },
        },    
        colors: {
            'basic': {
                'light' : '#020617',
                'dark' : '#f8fafc'
            },

            'muted':  {
                'light' : '#475569',
                'dark' : '#94a3b8'
            },
            
            'prime': {
                'light' : '#fff',
                'dark': '#1e293b'
            },
            
            'second': {
                'light' : '#60a5fa',
                'dark' : '#60a5fa'
            },

            'background': {
                'light' : '#fff',
                'dark' : '#0f172a'
            },

            'primary': {
                '200' : '#bbf7d0',
                '400' : '#a3e635',
                '600' : '#65a30d',
                '800' : '#3f6212'
            },
            'secondary': {
                '200' : '#bae6fd',
                '400' : '#60a5fa',
                '600' : '#0284c7',
                '800' : '#1e40af'
            },
            'success': {
                '300' : '#86efac',
                '600' : '#22c55e',
                '900' : '#14532d'
            },

            'error': {
                '300' : '#fda4af',
                '600' : '#e11d48',
                '900' : '#881337'
            },

            'info': {
                '300' : '#67e8f9',
                '600' : '#0891b2',
                '900' : '#164e63'
            },
            'warning': {
                '300' : '#fcd34d',
                '600' : '#d97706',
                '900' : '#78350f'
            },
            'danger': {
                '300' : '#fda4af',
                '600' : '#e11d48',
                '900' : '#881337'
            },
            
            'active': {
                '200' : '#fecaca',
                '400' : '#f87171',
                '600' : '#f87171',
                '800' : '#991b1b',
            },
            'hover': {
                '200' : '#c7d2fe',
                '400' : '#818cf8',
                '600' : '#818cf8',
                '800' : '#3730a3',
            },
            'focus': {
                '200' : '#c084fc',
                '400' : '#c084fc',
                '600' : '#c084fc',
                '800' : '#6b21a8',
            },
            'yellow': {
                '200' : '#fef08a',
                '400' : '#facc15',
                '600' : '#ca8a04',
                '800' : '#854d0e',
            },
        }
    },
})
