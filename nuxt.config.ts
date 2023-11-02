// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
      enabled: true,

      timeline: {
        enabled: true
      }
    },
    srcDir: 'view/',
    // ssr: true,
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
        '@pinia-plugin-persistedstate/nuxt',
        'nuxt-icon',
        '@nuxtjs/color-mode',
        '@unocss/nuxt',
        
    ],

    imports: {
        dirs: ['stores'],
    },

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
            // Scan top-level modules
            'composables',
            // ... or scan modules nested one level deep with a specific name and file extension
            'composables/*/index.{ts,js,mjs,mts}',
            // ... or scan all modules within given directory
            'composables/**'
        ]
    },

    nitro: {
        baseURL: process.env.BACKEND_URL,
        prerender: {
          crawlLinks: true,
          failOnError: false, 
        }
    }
})