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
        loading: false,
    }),

    actions: {
        async get() {
            this.$state.loading = true 

            const { data, error } = await useFetchApi('/api/contacts', {
                method: 'GET',
            }) as any 

            if(error.value) {
                console.error(error.value)
            } else {
                if(data.value) {
                    if(data.value.contact.length) {
                        this.$state.data.name = data.value.contact[0].name
                        this.$state.data.description = data.value.contact[0].description
                        this.$state.data.address = data.value.contact[0].address
                        this.$state.data.openingHours = data.value.contact[0].openingHours
                        this.$state.data.phone = data.value.contact[0].phone
                        this.$state.data.map = data.value.contact[0].map
                    } else {
                        this.$state.data.name = ''
                        this.$state.data.description = ''
                        this.$state.data.address = ''
                        this.$state.data.openingHours = ''
                        this.$state.data.phone = ''
                        this.$state.data.map = ''
                    }
                }
    
                return data.value
            }

            this.$state.loading = false
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