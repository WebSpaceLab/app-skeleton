import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from '../plugins/axios'
import { useAuthStore } from './useAuthStore'
import { useFlashStore } from './useFlashStore'

const $axios = axios().provide.axios

export const useUsersStore = defineStore('users', {
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
            isLoading: false,
            errors: null as object | null,
            progressImage: 0 as number
        }
    },

    actions: {
        async get ( query: any, perPage: number, page: number) {
            this.isLoading = true

            try {
                let { data } = await useFetchApi(`/api/admin/users`, {
                    method: 'GET',
                    params: {
                        term: query.term,
                        month: query.month,
                        orderBy: query.orderBy,
                        orderDir: query.orderDir,
                        per_page: perPage,
                        page: page
                    }
                }) as any
                
                if(data.value) {
                    this.data = data.value.data.users
        
                    this.pagination.total = data.value.data.pagination.total
                    this.pagination.current_page = data.value.data.pagination.current_page
                    this.pagination.per_page = data.value.data.pagination.per_page
                    
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

            let {data, pending, status, error } = await useFetchApi(`/api/admin/users`, {
                method: 'POST',
                body: form
            }) as any

            
            if(error.value) {
                if (error.value.data.errors) {
                    this.errors = error.value.data.errors
                }
                
                if(error.value.data.flash) {
                    useFlashStore().error(error.value.data.flash.message)
                }

                console.error(error.value)
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                }
            }

            this.isLoading = pending.value
        },
        
        async update(id: number,form: object) {
            this.isLoading = true
            this.errors = null
            
            let {data, pending, status, error } = await useFetchApi(`/api/admin/users/${id}`, {
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

        async destroy(id: number, path: string) {
            this.isLoading = true
            this.errors = null

            let {data, pending, status, error } = await useFetchApi(`/api/admin/users/${id}`, {
                method: 'DELETE'
            }) as any

            
            if(error.value) {
                console.error(error.value)
                if (error?.value.data.response.status === 422) {
                    this.errors = error.value.data.response.file[0]
                }
                
                useFlashStore().error(error.value.data.flash.message)
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                    
                    return data.value.data
                }
            }

            this.isLoading = pending.value
        },

        async updateUserAvatar(id: number, form: any) {
            return await $axios.post(`/api/admin/users/${id}/avatar-update`, form, {
                headers: {
                    "Authorization": 'Bearer ' + useAuthStore().token,
                },
                onUploadProgress: (event: any) => {
                    this.progressImage = Math.round(event.loaded * 100 / event.total)
                },
            })
        },   
    },
    
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCategoriesStore, import.meta.hot))
}