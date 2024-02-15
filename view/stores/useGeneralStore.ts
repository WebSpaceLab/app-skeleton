import { defineStore, acceptHMRUpdate } from 'pinia'
import { useFlashStore } from './useFlashStore'

export const useGeneralStore = defineStore('general', { 
    state: () => ({
        data: {
            name: '',
            logoUrl: '',
            description: '',
        },

        isLoading: true,
        suggested: null,
        following: null,
        errors: null as object | null,
    }),

    actions: {
        async get() {
            try {
                const { data } = await useFetchApi('/api/generals', {
                    method: 'GET',
                }) as any 
                
                if(data.value) {
                    if(data.value.general?.length) {
                        this.$state.data.name = data.value.general[0].name
                        this.$state.data.description = data.value.general[0].description
                        this.$state.data.logoUrl = data.value.general[0].logoUrl
                    } else {
                        this.$state.data.name = ''
                        this.$state.data.description = ''
                        this.$state.data.logoUrl = '/favicon.ico'
                    }
                }
            } catch (error) {
                useFlashStore().error('Wystąpił błąd podczas ładowania ustawień strony.')
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },

        async create(form: Object) {
            const {data, error, status} = await useFetchApi('/api/admin/generals', {
                method: 'POST',
                body: form,
            }) as any 

            if(error.value) {
                this.errors = error.value.data.errors

                if(error.value.data.errors.flash) {
                    useFlashStore().error(error.value.data.errors.flash.message)
                }
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                }
            }
            
            this.get()
            this.errors = null
        },
        
        async update(form: object) {
            const {data, error, status} = await useFetchApi('/api/admin/generals', {
                method: 'PATCH',
                body: form,
            }) as any 

            if(error.value) {
                this.errors = error.value.data.errors

                if(error.value.data.errors.flash) {
                    useFlashStore().error(error.value.data.errors.flash.message)
                }
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                }
            }
            
            this.get()
            this.errors = null
        },
    },
    
    persist: true
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
}