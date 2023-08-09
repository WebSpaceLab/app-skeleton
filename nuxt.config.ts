// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    srcDir: 'core/',

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
        
        meta: [
            { name: 'description', content: '' },
            { name: 'keywords',  content: '' },
        ],
        },

        pageTransition: { name: 'page', mode: 'out-in' },
    },
    
    css: [
        '@/../assets/styles/app.css',
    ],

    runtimeConfig: {
        indexable: true,
        public: {
            api: process.env.NUXT_PUBLIC_API
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
    }
})
