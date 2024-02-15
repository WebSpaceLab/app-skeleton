import { defineStore, acceptHMRUpdate } from 'pinia'
import { useFlashStore } from './useFlashStore'

export const useSocialStore = defineStore('social', {
    state: () => {
        return { 
            data: [],
   
            isLoading: false,
            errors: null as object | null,
            buffer: null as any
        }
    },

    actions: {
        async get() {
            this.isLoading = true

            const { data, error, pending} = await useFetchApi('/api/socials', {
                method: 'GET',
            }) as any 

            if(error.value) {
                useFlashStore().error('Wystąpił błąd podczas ładowania ustawień strony.')
            } else {
                if(data.value) {
                    this.data = data.value.data.socials
                }

                return data.value
            }

            this.isLoading = false
        },

        async getAll() {
            this.isLoading = true

            try {
                const { data } = await useFetchApi('/api/admin/socials', {
                    method: 'GET',
                }) as any 

    
                if(data.value) {
                    this.data = data.value.data.socials
                }
                
            } catch (error) { 
                useFlashStore().error('Wystąpił błąd podczas ładowania ustawień strony.')
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },

        async create(form: Object) {
            const {data, error, status} = await useFetchApi('/api/admin/socials', {
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
            
            this.getAll()
            this.errors = null
        },
    
        async update(id: number, form: object) {
            this.isLoading = true
            this.buffer = {
                id: id,
                type: 'update'
            }

            const {data, error, status} = await useFetchApi('/api/admin/socials/' + id, {
                method: 'PATCH',
                body: form,
            }) as any 

            if(error.value) {
                this.errors = error.value.data.errors

                useFlashStore().error('Błąd z strony serwera.')
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                }
            }
            
            this.getAll()
            this.isLoading = false
            this.buffer = null
            this.errors = null
        },

        async deleted(id: number) {
            this.isLoading = true
            this.buffer = {
                id: id,
                type: 'delete'
            }

            if (confirm(`Czy na pewno chcesz usunąć ten social?`)) {
                const {data, error, status} = await useFetchApi(`/api/admin/socials/` + id, {
                    method: 'DELETE',
                }) as any

                if(error.value) {
                    console.error(error.value)

                    useFlashStore().error('Błąd. Nie udało się usunąć socialu.')
                } else {
                    if(data.value && status.value === 'success') {
                        useFlashStore().success(data.value.flash.message)
                    }
                }

                this.getAll()
            }
            this.isLoading = false
            this.buffer = null
        },
    },

    persist: true
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useSocialStore, import.meta.hot))
}