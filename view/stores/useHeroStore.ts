import { defineStore, acceptHMRUpdate } from 'pinia'

import { useFlashStore } from './useFlashStore'

export const useHeroStore = defineStore('hero', {
    state: () => {
        return {
            hero : [],

            activeHero: [],

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

            let {data, pending, status, error } = await useFetchApi(`/api/hero`, {
                method: 'GET'
            }) as any
         
            this.isLoading = pending.value
            
            if(error.value) {
                console.error(error.value)
            } else {
                if(data.value && status.value === 'success') {
                    this.$state.activeHero = data.value.hero
                }
            }
        },

        async getHero(query: any, perPage: number, page: number) {
            this.isLoading = true
            
            let {data, pending, status, error } = await useFetchApi(`/api/admin/hero`, {
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
                    this.hero = data.value.hero
        
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

            let {data, pending, status, error } = await useFetchApi(`/api/admin/hero`, {
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
        
        async update(heroId: number, form: object) {
            this.isLoading = true
            this.errors = null
            
            let {data, pending, status, error } = await useFetchApi(`/api/admin/hero/${heroId}`, {
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

        async destroy(heroId: number) {
            this.isLoading = true
            this.errors = null

            let {data, pending, status, error } = await useFetchApi(`/api/admin/hero/${heroId}`, {
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