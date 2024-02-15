import { defineStore, acceptHMRUpdate } from 'pinia'

import { useFlashStore } from './useFlashStore'

export const useGalleriesStore = defineStore('galleries', {
    state: () => {
        return {
            data : [],
            
            published: [],

            form: useCookie (
                'gallery-form', 
                {
                    default: () => ({
                        title: '',
                        slug: '',
                        description: '',
                        isPublished: false,
                        photos: [],
                    }),
                    watch: true,
                }
            ),

            show: {
                id: null,
                title: '',
                slug: '',
                description: '',
                isPublished: false,
                createdAtAgo: '',
                updatedAtAgo: '',
                photos: [],
                article: null as object | null,
            },

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
        async getPublished(query: any, perPage: number, page: number) {
            this.isLoading = true

            try {
                let { data } = await useFetchApi('/api/galleries', {
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
                    this.published = data.value.data.galleries
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

        async get( query: any, perPage: number, page: number) {
            this.isLoading = true
            
            try {
                let { data } = await useFetchApi(`/api/editor/galleries`, {
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
                    this.data = data.value.data.galleries
        
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

        async getGallery(slug: string) {
            this.isLoading = true
            this.errors = null

            try {
                let { data } = await useFetchApi(`/api/galleries/${slug}`, {
                    method: 'GET'
                }) as any
                
                if(data.value) {
                    this.show.id = data.value.data.gallery.id
                    this.show.title = data.value.data.gallery.title
                    this.show.slug = data.value.data.gallery.slug
                    this.show.description = data.value.data.gallery.description
                    this.show.createdAtAgo = data.value.data.gallery.createdAtAgo
                    this.show.photos = data.value.data.gallery.media
                    this.show.article = data.value.data.gallery.article
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

            let {data, pending, status, error } = await useFetchApi(`/api/editor/galleries`, {
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
                    this.resetForm()
                    navigateTo('/dashboard/gallery')
                }
            }

            this.isLoading = pending.value
        },

        async edit(slug: string) {
            this.isLoading = true
            this.errors = null
            this.resetShow()
           

            try {
                let { data } = await useFetchApi(`/api/editor/galleries/${slug}`, {
                    method: 'GET'
                }) as any
                
                if(data.value) {
                    this.show.id = data.value.data.gallery.id
                    this.show.title = data.value.data.gallery.title
                    this.show.slug = data.value.data.gallery.slug
                    this.show.description = data.value.data.gallery.description
                    this.show.isPublished = data.value.data.gallery.isPublished 
                    this.show.createdAtAgo = data.value.data.gallery.createdAtAgo
                    this.show.updatedAtAgo = data.value.data.gallery.updatedAtAgo
                    this.show.photos = data.value.data.gallery.media
                }
            } catch (error) {
                console.error(error)
                
            } finally {
                this.isLoading = false   
            }
        },
        
        async update(slug: number, form: object) {
            this.isLoading = true
            this.errors = null
            
            let {data, pending, status, error } = await useFetchApi(`/api/editor/galleries/${slug}`, {
                method: 'PATCH',
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
                    navigateTo('/dashboard/gallery')
                    useFlashStore().success(data.value.flash.message)
                }
            }

            this.isLoading = pending.value
        },

        async removePhotoFromGallery(slug: string, id: number) {
            this.isLoading = true
            this.errors = null

            let {data, pending, status, error } = await useFetchApi(`/api/editor/galleries/${slug}/photo/${id}`, {
                method: 'DELETE'
            }) as any

            
            if(error.value) {
                console.error(error.value)
                if (error?.value.data.response.status === 422) {
                    this.errors = error.value.data.response.file[0]
                }
                
                useFlashStore().error(error.value.data.flash.message)

                console.error(error.value)
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                }
            }

            this.isLoading = pending.value
        },

        async destroy(id: number) {
            this.isLoading = true
            this.errors = null

            let {data, pending, status, error } = await useFetchApi(`/api/editor/galleries/${id}`, {
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
                }
            }

            this.isLoading = pending.value
        },

        resetForm() {
            this.form.title = ''
            this.form.slug = ''
            this.form.description = ''
            this.form.isPublished  = false
            this.form.photos = []
        },

        resetShow() {
            this.show.id = null
            this.show.title = ''
            this.show.slug = ''
            this.show.description = ''
            this.show.isPublished  = false
            this.show.photos = []
        }

    },
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCategoriesStore, import.meta.hot))
}