import { defineStore } from 'pinia'
import { useFlashStore } from './useFlashStore'

export const useMetaTagsStore = defineStore('metaTags', {
    state: () => ({
        data: [],
        isLoading: false,
        errors: null as object | null,
        buffer: null as any
    }),
    
    actions: {
        async get() {
            const { data, error } = await useFetchApi('/api/meta-tags', {
                method: 'GET',
            }) as any 

            if(error.value) {
                useFlashStore().error('Wystąpił błąd podczas ładowania ustawień strony.')
            } else {
                if(data.value) {
                    this.data = data.value.metaTags
                }
    
                return data.value
            }
        },

        async create(form: Object) {
            const {data, error, status} = await useFetchApi('/api/admin/meta-tags', {
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
        
        async update(id: number, form: object) {
            this.isLoading = true
            this.buffer = {
                id: id,
                type: 'update'
            }

            const {data, error, status} = await useFetchApi('/api/admin/meta-tags/' + id, {
                method: 'PATCH',
                body: form,
            }) as any 

            if(error.value) {
                this.errors = error.value.data.errors

                useFlashStore().error('Błąd')
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                }
            }
            
            this.get()
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

            if (confirm(`Czy na pewno chcesz usunąć ten meta tag?`)) {
                const {data, error, status} = await useFetchApi(`/api/admin/meta-tags/` + id, {
                    method: 'DELETE',
                }) as any
    
                if(error.value) {
                    console.error(error.value)
    
                    useFlashStore().error('Błąd. Nie udało się usunąć meta tagu.')
                } else {
                    if(data.value && status.value === 'success') {
                        useFlashStore().success(data.value.flash.message)
                    }
                }

                this.get()
            }
            this.isLoading = false
            this.buffer = null
        }

    },
})
