import { defineStore } from 'pinia'
import { useFlashStore } from './useFlashStore'

export const useMediaStore = defineStore('media', {
    state: () => ({
        data: [],
        pagination: {
            total: null,
            current_page: null,
            per_page: null,
            first_page: 1,
        },
        fileTypes: [],
        months: [],
        queryParams: {},
        isLoading: false
    }),
    
    actions: {
        async get(page = 2, per_page = 8, fileType: string, month: string, term: string, orderBy: string, orderDir: string ) {
            this.isLoading = true
            
            let {data, pending, status, error } = await useFetchApi(`/api/media`, {
                method: 'GET',
                query: {
                    per_page: per_page,
                    page: page,
                    fileType: fileType,
                    month: month,
                    term: term,
                    orderBy: orderBy,
                    orderDir: orderDir
                }
            }) as any

            this.isLoading = pending.value

            if(error.value) {
                console.error(error.value)
            } else {
                if(data.value && status.value === 'success') {
                    this.data = data.value.media
        
                    this.pagination.total = data.value.pagination.total
                    this.pagination.current_page = data.value.pagination.current_page
                    this.pagination.per_page = data.value.pagination.per_page
       
                    this.fileTypes = data.value.fileTypes
                    this.months = data.value.months
                    this.queryParams = data.value.queryParams
                }
            }
        },
        
        // async updatedMedia(mediaId, form) {
        //     const res = await $axios.put(`/api/media/${mediaId}/update`, form)

        //     useFlashStore().success(res.data.flash.message)

        //     if(res.data.data) {
        //        this.getMedia() 
        //     }

        //     return res.data
        // },

        // async deletedMedia(mediaId) {
        //     const res = await $axios.delete(`/api/media`, {
        //         preserveState: false,
        //         data: {
        //             mediaIds: [mediaId],
        //         },
        //     })

        //     useFlashStore().success(res.data.flash.message)

        //     if(res.data.data) {
        //        this.getMedia() 
        //     }

        //     return res.data.data
        // }, 

        async uploadFiles(files: object) {
            const { data, error } = await useFetchApi('/api/media', {
                method: 'POST',
                body: files,
            }) as any 

            if(error.data) {
                useFlashStore().error(error.value.data.errors.flash.message)
            } else {
                if(data.value) {
                    return data.value
                }
            }
        }
    },

    persist: true
})