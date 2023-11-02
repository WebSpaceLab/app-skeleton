import { defineStore } from 'pinia'

import { useFlashStore } from './useFlashStore'

export const useTeamStore = defineStore('team', {
    state: () => {
        return {
            team : [],

            activeTeam: [],

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

            let {data, pending, status, error } = await useFetchApi(`/api/team`, {
                method: 'GET'
            }) as any
         
            
            this.isLoading = pending.value
            
            if(error.value) {
                console.error(error.value)
            } else {
                if(data.value && status.value === 'success') {
                    this.$state.activeTeam = data.value.team
                }
            }
        },

        async getTeam(query: any, perPage: number, page: number) {
            this.isLoading = true
            
            let {data, pending, status, error } = await useFetchApi(`/api/admin/team`, {
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
                    this.team = data.value.team
        
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

            let {data, pending, status, error } = await useFetchApi(`/api/admin/team`, {
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
        
        async update(teamId: number, form: object) {
            this.isLoading = true
            this.errors = null
            
            let {data, pending, status, error } = await useFetchApi(`/api/admin/team/${teamId}`, {
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

        async destroy(teamId: number) {
            this.isLoading = true
            this.errors = null

            let {data, pending, status, error } = await useFetchApi(`/api/admin/team/${teamId}`, {
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
