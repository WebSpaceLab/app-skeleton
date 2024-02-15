import { defineStore, acceptHMRUpdate } from 'pinia'
import { useFlashStore } from './useFlashStore'

export const useContactStore = defineStore('contact', {
    state: () => ({
        data: {
            name: '',
            description: '',
            logo: '/images/png/logo.png',
            address: '',
            openingHours: '',
            phone: '',
            map: '',
        },
        errors: null as object | null,
        isLoading: false,
    }),

    actions: {
        async get() {
            this.isLoading = true 

            try {
                const { data, error } = await useFetchApi('/api/contacts', {
                    method: 'GET',
                }) as any 
                
                if(data.value) {
                    if(data.value.contact?.length) {
                        this.$state.data.name = data.value.data.contact[0].name
                        this.$state.data.description = data.value.data.contact[0].description
                        this.$state.data.address = data.value.data.contact[0].address
                        this.$state.data.openingHours = data.value.data.contact[0].openingHours
                        this.$state.data.phone = data.value.data.contact[0].phone
                        this.$state.data.map = data.value.data.contact[0].map
                    } else {
                        this.$state.data.name = ''
                        this.$state.data.description = ''
                        this.$state.data.address = ''
                        this.$state.data.openingHours = ''
                        this.$state.data.phone = ''
                        this.$state.data.map = ''
                    }
                }
            } catch (error) {
                console.error(error)
                
            } finally {
                this.isLoading = false
            }
        },

        async create(form: object) {
            const { data, error, status } = await useFetchApi('/api/admin/contacts', {
                method: 'POST',
                body: form
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
            const { data, error, status } = await useFetchApi('/api/admin/contacts', {
                method: 'PATCH',
                body: form
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
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useContactStore, import.meta.hot))
}