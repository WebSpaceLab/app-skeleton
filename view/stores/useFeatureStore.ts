import { defineStore, acceptHMRUpdate } from 'pinia'

import { useFlashStore } from './useFlashStore'

export const useFeatureStore = defineStore('feature', {
    state: () => {
        return {
            feature : [],

            activeFeature: [],

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
        async get() {
            this.isLoading = true

            let {data, pending, status, error } = await useFetchApi(`/api/feature`, {
                method: 'GET'
            }) as any
         
            
            this.isLoading = pending.value
            
            if(error.value) {
                console.error(error.value)
            } else {
                if(data.value && status.value === 'success') {
                    this.$state.activeFeature = data.value.feature
                }
            }
        },

        async getFeature(query: any, perPage: number, page: number) {
            this.isLoading = true
            
            let {data, pending, status, error } = await useFetchApi(`/api/admin/feature`, {
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
         
            this.isLoading = pending.value

            if(error.value) {
                console.error(error.value)
            } else {
                if(data.value && status.value === 'success') {
                    this.feature = data.value.feature
        
                    this.pagination.total = data.value.pagination.total
                    this.pagination.current_page = data.value.pagination.current_page
                    this.pagination.per_page = data.value.pagination.per_page
       
                    this.status = data.value.status
                    this.months = data.value.months
                    this.queryParams = data.value.queryParams
                }
            }
        },

        async create(form: object) {
            this.isLoading = true
            this.errors = null

            let {data, pending, status, error } = await useFetchApi(`/api/admin/feature`, {
                method: 'POST',
                body: form
            }) as any

            this.isLoading = pending.value

            if(error.value) {
                if (error.value.data.errors) {
                    this.errors = error.value.data.errors
                }

                if(error.value.data.flash) {
                    useFlashStore().error(error.value.data.flash.message)
                }
                return error.value
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)

                    return data.value
                }
            }
        },
        
        async update(aboutId: number, form: object) {
            this.isLoading = true
            this.errors = null
            
            let {data, pending, status, error } = await useFetchApi(`/api/admin/feature/${aboutId}`, {
                method: 'PATCH',
                body: form
            }) as any

            this.isLoading = pending.value

            if(error.value) {
                if (error.value.data.errors) {
                    this.errors = error.value.data.errors
                }

                if(error.value.data.flash) {
                    useFlashStore().error(error.value.data.flash.message)
                }

                return error.value
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)

                    return data.value
                }
            }
        },

        async destroy(featureId: number) {
            this.isLoading = true
            this.errors = null

            let {data, pending, status, error } = await useFetchApi(`/api/admin/feature/${featureId}`, {
                method: 'DELETE'
            }) as any

            this.isLoading = pending.value

            if(error.value) {
                console.error(error.value)
                if (error?.value.data.response.status === 422) {
                    this.errors = error.value.data.response.file[0]
                }
                
                useFlashStore().error(error.value.data.flash.message)
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)

                    return data.value
                }
            }
        }
    },
})
  
if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useFeatureStore, import.meta.hot))
}