// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
      enabled: true,

      timeline: {
        enabled: true
      }
    },

    srcDir: 'view/',

    ssr: false,
    
    experimental: {
        componentIslands: true
    },
    
    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: ['defineStore', 'acceptHMRUpdate'],
            }
        ],
        '@nuxt/image',
        '@pinia-plugin-persistedstate/nuxt',
        'nuxt-icon',
        '@nuxtjs/color-mode',
        '@unocss/nuxt',
        
    ],

    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        },

        layoutTransition: { name: 'layout', mode: 'out-in' },
        pageTransition: { name: 'page', mode: 'out-in' },
    },

    plugins: [{ src: "@/plugins/aos", ssr: false, mode: "client" }],
    
    css: [
        '@/../assets/styles/app.css',
    ],

    runtimeConfig: {
        indexable: true,
        public: {
            apiUrl: process.env.BACKEND_URL,
            appUrl: process.env.FRONTEND_URL
        }
    },

    colorMode: {
        classSuffix: ''
    },

    imports: {
        dirs: [
            'stores',
            // Scan top-level modules
            'composables',
            // ... or scan modules nested one level deep with a specific name and file extension
            'composables/*/index.{ts,js,mjs,mts}',
            // ... or scan all modules within given directory
            'composables/**'
        ]
    },

    image: {
        inject: true,

        format: ['webp, jpg', 'png', 'jpeg'],
        // domains: [process.env.BACKEND_URL],
        screens: {
            'xs': 320,
            'sm': 640,
            'md': 768,
            'lg': 1024,
            'xl': 1280,
            'xxl': 1536,
            '2xl': 1536
        },
    },

    nitro: {
        baseURL: process.env.BACKEND_URL,
        prerender: {
          crawlLinks: true,
          failOnError: false, 
        }
    }
})