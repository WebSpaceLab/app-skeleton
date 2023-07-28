import { defineStore, acceptHMRUpdate } from 'pinia'
import { useFlashStore } from './useFlashStore'

export const useContactStore = defineStore('contact', {
    state: () => ({
        id: 1,
        title: '',
        description: '',
        logo: '/images/png/logo.png',
        address: '',
        openingHours: '',
        phone: '',
        map: '',

        errors: [],
        loading: false,
    }),

    actions: {
        async get() {
            this.$state.loading = true 

            await useFetchApi('/api/contact').then((res: any) => {
                if(res.data.contact.length) {
                    this.$state.title = res.data.contact[0].title
                    this.$state.description = res.data.contact[0].description
                    this.$state.address = res.data.contact[0].address
                    this.$state.openingHours = res.data.contact[0].openingHours
                    this.$state.phone = res.data.contact[0].phone
                    this.$state.map = res.data.contact[0].map
                } else {
                    this.$state.title = ''
                    this.$state.description = ''
                    this.$state.address = ''
                    this.$state.openingHours = ''
                    this.$state.phone = ''
                    this.$state.map = ''
                }
                
                return res.data
            }).catch(error => {
                console.log(error)

                this.$state.errors = error.response.data
            }).finally (() => {
                this.$state.loading = false
            })
        },

        async create(form: object) {
            const res: any = await useFetchApi('/api/contact', {
                method: 'POST',
                body: form
            })

            useFlashStore().success(res.data.flash.message)

            if(res.data.data) {
               this.get() 
            }

            return res.data.data
        },

        async update(id: number, form: object) {
            const res: any = await useFetchApi(`/api/contact/${id}/update`, {
                method: 'PUT',
                body: form
            })

            useFlashStore().success(res.data.flash.message)

            if(res.data.data) {
               this.get() 
            }

            return res.data.data
        },

        async delete(id: number) {
            const res: any = await useFetchApi(`/api/contact`, {
                // preserveState: false,
                method: 'DELETE',
                body: {
                    contactIds: [id],
                },
            })

            useFlashStore().success(res.data.flash.message)

            if(res.data.data) {
               this.get() 
            }

            return res.data.data
        }
    },

    persist: true
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useContactStore, import.meta.hot))
}