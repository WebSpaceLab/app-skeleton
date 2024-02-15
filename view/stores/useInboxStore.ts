import { defineStore } from 'pinia'
import { useFlashStore } from './useFlashStore'
import { t } from '@unocss/preset-mini/dist/shared/preset-mini.5daNC9yh'

export const useInboxStore = defineStore('inbox', {
    state: () => ({
        data: [],
        pagination: {
            total: null,
            current_page: null,
            per_page: null,
            first_page: 1,
        },
        months: [],
        queryParams: {},
        read: [],
        isLoading: false,
        errors: null
    }),
    
    actions: {
        async get(query:any, perPage: number, page: number ) {
            this.isLoading = true
            
            try {
                let { data } = await useFetchApi(`/api/admin/inbox`, {
                    method: 'GET',
                    query: {
                        term: query.term,
                        read: query.read,
                        month: query.month,
                        orderBy: query.orderBy,
                        orderDir: query.orderDir,
                        per_page: perPage,
                        page: page
                    }
                }) as any
                
                if(data.value) {
                    this.data = data.value.data.inbox
        
                    this.pagination.total = data.value.data.pagination.total
                    this.pagination.current_page = data.value.data.pagination.current_page
                    this.pagination.per_page = data.value.data.pagination.per_page
       
                    this.read = data.value.data.read
                    this.months = data.value.data.months
                    this.queryParams = data.value.data.queryParams
                }
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false   
            }
        },

        async send(form: any) {
            this.isLoading = true
            this.errors = null
            let {data, pending, status, error } =  await useFetchApi('/api/inbox', {
                method: 'POST',
                body: form
           }) as any

            this.isLoading = pending.value
           
           if(error.value) {
                this.errors = error.value.data.errors
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                    return data.value
                }
            }
        },

        async mailHasBeenReed(mailId: number) {
            let {data, pending, status, error } =  await useFetchApi(`/api/admin/inbox/${mailId}`, {
                method: 'PATCH',
                body: {
                    mailId: mailId
                }
            }) as any

            if(error.value) {
                console.error(error.value)
            } else {
                if(data.value && status.value === 'success') {
                    return data.value
                }
            }
         },

        async deletedMail(mailId: number) {
            let {data, pending, status, error } =  await useFetchApi(`/api/admin/inbox/${mailId}`, {
                method: 'DELETE',
            }) as any

            if(error.value) {
                return error.value
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                    return data.value
                }
            }
        }
    },
})