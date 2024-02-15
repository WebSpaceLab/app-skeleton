import { defineStore, acceptHMRUpdate } from 'pinia'

import { useFlashStore } from './useFlashStore'

export const useFeatureStore = defineStore('feature', {
    state: () => {
        return {
            data : [],

            pagination: {
                total: null,
                current_page: null,
                per_page: null,
                first_page: 1,
            },

            months: [],
            queryParams: {},
            status: [],
            isLoading: false,
            errors: null as object | null,
        }
    },

    actions: {
        async get(query: any, perPage: number, page: number) {
            this.isLoading = true

            try {
                let { data } = await useFetchApi(`/api/admin/feature`, {
                    method: 'GET',
                    params: {
                        term: query.term,
                        status: query.status,
                        month: query.month,
                        orderBy: query.orderBy,
                        orderDir: query.orderDir,
                        per_page: perPage,
                        page: page
                    }
                }) as any
                
                if(data.value) {
                    this.data = data.value.data.features
                    
                    this.pagination.total = data.value.data.pagination.total
                    this.pagination.current_page = data.value.data.pagination.current_page
                    this.pagination.per_page = data.value.data.pagination.per_page
                    
                    this.status = data.value.data.status
                    this.months = data.value.data.months
                    this.queryParams = data.value.data.queryParams
                }
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },

        async create(form: object) {
            this.isLoading = true
            this.errors = null

            let {data, pending, status, error } = await useFetchApi(`/api/admin/feature`, {
                method: 'POST',
                body: form
            }) as any

            if(error.value) {
                if(error.value.data) {
                    if (error.value.data.errors) {
                        this.errors = error.value.data.errors
                    }
                    
                    if(error.value.data.flash) {
                        useFlashStore().error(error.value.data.flash.message)
                    }
                }
                
                console.error(error.value)
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                }
            }

            this.isLoading = pending.value
        },
        
        async update(aboutId: number, form: object) {
            this.isLoading = true
            this.errors = null
            
            let {data, pending, status, error } = await useFetchApi(`/api/admin/feature/${aboutId}`, {
                method: 'PATCH',
                body: form
            }) as any

            if(error.value) {
                if(error.value.data) {
                    if (error.value.data.errors) {
                        this.errors = error.value.data.errors
                    }
                    
                    if(error.value.data.flash) {
                        useFlashStore().error(error.value.data.flash.message)
                    }
                }
                
                console.error(error.value)
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                }
            }

            this.isLoading = pending.value
        },
        
        async destroy(featureId: number) {
            this.isLoading = true
            this.errors = null

            let {data, pending, status, error } = await useFetchApi(`/api/admin/feature/${featureId}`, {
                method: 'DELETE'
            }) as any
            
            if(error.value) {
                if(error.value.data) {  
                    if (error?.value.data.response.status === 422) {
                        this.errors = error.value.data.response.file[0]
                    }
                    
                    if(error.value.data.flash) {
                        useFlashStore().error(error.value.data.flash.message)
                    }
                }
                
                console.error(error)
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                }
            }

            this.isLoading = pending.value
        }
    },
})
  
if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useFeatureStore, import.meta.hot))
}