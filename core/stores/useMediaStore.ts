import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import { useFlashStore } from './useFlashStore'

const $axios = axios().provide.axios

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
        async get(page = 2, per_page = 8, fileType, month, term, orderBy, orderDir ) {
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
            })

            if(error.value) {
                console.error(error.value)
            } else {
                if(data.value) {
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

        async uploadFiles(files) {
            const { data, error } = await useFetchApi('/api/media', {
                method: 'POST',
                body: files,
            }) as any 
        }

    },

    persist: true
})