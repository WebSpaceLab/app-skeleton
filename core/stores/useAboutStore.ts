import { defineStore, acceptHMRUpdate } from 'pinia'

import { useFlashStore } from './useFlashStore'

export const useAboutStore = defineStore('about', {
    state: () => {
        return {
            about : [],

            activeAbout: [],

            pagination: {
                total: null,
                current_page: null,
                per_page: null,
                first_page: 1,
            },

            months: [],
            queryParams: {},
            status: []
        }
    },

    actions: {
        async get() {
            let res: any = await useFetchApi(`/api/about`, {
                method: 'GET'
            })
         
            this.$state.activeAbout = res.data.about
        },

        async getAbout(query: any, perPage: any) {
            let res: any = await useFetchApi(`/api/dashboard/about`, {
                method: 'GET',
                params: {
                    term: query.term,
                    status: query.status,
                    month: query.month,
                    orderBy: query.orderBy,
                    orderDir: query.orderDir,
                    per_page: perPage
                }
            })
         
            this.$state.about = res.data.about

            this.$state.pagination.total = res.data.pagination.total
            this.$state.pagination.current_page = res.data.pagination.current_page
            this.$state.pagination.per_page = res.data.pagination.per_page

            this.$state.months = res.data.months
            this.$state.status = res.data.status
            this.$state.queryParams = res.data.queryParams   
        },

        async store(form: object) {
            const res: any = await useFetchApi(`/api/dashboard/about`, {
                method: 'GET',
                body: form
            })
            
            if(res.data.flash.message) {
                useFlashStore().success(res.data.flash.message)
            }

            return res.data
        },
        
        async update(aboutId: number, form: object) {
            const res: any = await useFetchApi(`/api/dashboard/about/${aboutId}/update`, {
                method: 'PUT',
                body: form
            })

            if(res.data.flash.message) {
                useFlashStore().success(res.data.flash.message)
            }

            return res.data
        },

        async destroy(aboutId: number) {
            const res: any = await useFetchApi(`/api/dashboard/about`, {
                method: 'PUT',
                body: {
                    aboutIds: [aboutId],
                },
            })

            if(res.data.flash.message) {
                useFlashStore().success(res.data.flash.message)
            }
   
            return res.data.data
        }
    },

    persist: true
  })

  if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAboutStore, import.meta.hot))
}