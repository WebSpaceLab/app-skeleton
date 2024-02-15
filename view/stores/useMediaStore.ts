import { defineStore, acceptHMRUpdate } from 'pinia'
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
        isLoading: false,
        errors: null as object | null,
    }),
    
    actions: {
        async get(page = 2, per_page = 8, fileType: string, month: string, term: string, orderBy: string, orderDir: string, path = `/api/media`) {
            this.isLoading = true

            try {
                let { data } = await useFetchApi(path, {
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
                
                if(data.value) {
                    this.data = data.value.data.media
        
                    this.pagination.total = data.value.data.pagination.total
                    this.pagination.current_page = data.value.data.pagination.current_page
                    this.pagination.per_page = data.value.data.pagination.per_page
       
                    this.fileTypes = data.value.data.fileTypes
                    this.months = data.value.data.months
                    this.queryParams = data.value.data.queryParams
                }
            } catch (error) {
                console.error(error)
                
            } finally {
                this.isLoading = false
            }
        },
        
        async updatedMedia(mediaId = null, form = null) {
            this.isLoading = true
            
            let {data, pending, status, error } = await useFetchApi(`/api/media/${mediaId}`, {
                method: 'PATCH',
                body: form
            }) as any

            this.isLoading = pending.value

            if(error.value) {
                console.error(error.value)
                useFlashStore().error(error.value.data.flash.message)

                return error.value
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                    
                    return data.value
                }
            }
        },

        async deletedMedia(mediaId = null) {
            const { data, error, status } = await useFetchApi('/api/media/' + mediaId, {
                method: 'DELETE'
            }) as any 

            if(error.value) {
                useFlashStore().error(error.value.data.flash.message)

                console.error(error.value)
                return error.value
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                    
                    return status.value
                }
            }
        }, 

        async uploadMovieFile(files: object) {
            this.isLoading = true
            const { data, error } = await useFetchApi('/api/media/movie', {
                method: 'POST',
                body: files,
            }) as any 
            
            this.isLoading = false

            if(error.data) {
                useFlashStore().error(error.value.data.errors.flash.message)
            } else {
                if(data.value) {
                    useFlashStore().success(data.value.flash.message)
                    return data.value.data
                }
            }

        }
    },
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMediaStore, import.meta.hot))
}