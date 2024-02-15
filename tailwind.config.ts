import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
    theme: {
        extend: {
            aspectRatio: {
                auto: 'auto',
                square: '1 / 1',
                video: '16 / 9'
            }
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
                '600' : '#2563eb',
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
    }
}