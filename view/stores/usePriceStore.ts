import { defineStore, acceptHMRUpdate } from 'pinia'
import { useFlashStore } from './useFlashStore'

export const usePriceStore = defineStore('price', {
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
        status: [],
        isLoading: false,
        errors: null
    }),
    
    actions: {
        async get(query:any, perPage: number, page: number ) {
            this.isLoading = true

            try {
                let { data } = await useFetchApi(`/api/admin/price`, {
                    method: 'GET',
                    query: {
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
                    this.data = data.value.data.price
        
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

        async createdPriceList(form: any) {
            this.isLoading = true
            this.errors = null
            let {data, pending, status, error } =  await useFetchApi('/api/admin/price', {
                method: 'POST',
                body: form
           }) as any

            this.isLoading = pending.value
           
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
                    navigateTo('/dashboard/price')
                    return data.value.data
                }
            }
        },

        async createdPricePackage(form: any, priceId: number) {
            this.isLoading = true
            this.errors = null
            let {data, pending, status, error } =  await useFetchApi('/api/admin/price/package/' + priceId, {
                method: 'POST',
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
                    return data.value.data
                }
            }

            this.isLoading = pending.value
        },

        async createdPricePackageInformation(form: any,  packageId: number) {
            this.isLoading = true
            this.errors = null

            let {data, pending, status, error } =  await useFetchApi('/api/admin/price/package/information/' +  packageId, {
                method: 'POST',
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

                    return data.value.data
                }
            }

            this.isLoading = pending.value
        },

        async updatedPricePackage(form: any, pricePackageId: number) {
            this.isLoading = true
            this.errors = null

            let {data, pending, status, error } =  await useFetchApi('/api/admin/price/package/' + pricePackageId, {
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

                    return data.value.data
                }
            }

            this.isLoading = pending.value
        },

        async updatePriceList(form: any, priceId: number) {
            this.isLoading = true
            this.errors = null

            let {data, pending, status, error } =  await useFetchApi('/api/admin/price/' + priceId, {
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

                    return data.value.data
                }
            }

            this.isLoading = pending.value
        },

        async updatedPricePackageInformation(form: any, informationId: number) {
            this.isLoading = true
            this.errors = null

            let {data, pending, status, error } =  await useFetchApi('/api/admin/price/package/information/' + informationId, {
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

                    return data.value.data
                }
            }

            this.isLoading = pending.value
        },

        async deletedPriceList(priceId: number) {
            this.isLoading = true

            let {data, pending, status, error } =  await useFetchApi(`/api/admin/price/${priceId}`, {
                method: 'DELETE',
            }) as any

            if(error.value) {
                if(error.value.data) {  
                    if (error?.value.data.response.status === 422) {
                        this.errors = error.value.data.response.file[0]
                    }
                    
                    if(error.value.data.flash) {
                        useFlashStore().error(error.value.data.flash.message)
                    }
                }
                
                console.error(error)
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)

                    return data.value.data
                }
            }

            this.isLoading = pending.value
        },

        async deletedPricePackage(packageId: number) {
            this.isLoading = true

            let {data, pending, status, error } =  await useFetchApi(`/api/admin/price/package/${packageId}`, {
                method: 'DELETE',
            }) as any

            if(error.value) {
                if(error.value.data) {  
                    if (error?.value.data.response.status === 422) {
                        this.errors = error.value.data.response.file[0]
                    }
                    
                    if(error.value.data.flash) {
                        useFlashStore().error(error.value.data.flash.message)
                    }
                }
                
                console.error(error)
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)

                    return data.value.data
                }
            }

            this.isLoading = pending.value
        },

        async deletedPricePackageInformation(informationId: number) {
            this.isLoading = true

            let {data, pending, status, error } =  await useFetchApi(`/api/admin/price/package/information/${informationId}`, {
                method: 'DELETE',
            }) as any

            if(error.value) {
                if(error.value.data) {  
                    if (error?.value.data.response.status === 422) {
                        this.errors = error.value.data.response.file[0]
                    }
                    
                    if(error.value.data.flash) {
                        useFlashStore().error(error.value.data.flash.message)
                    }
                }
                
                console.error(error)
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)

                    return data.value.data
                }
            }

            this.isLoading = pending.value
        },

        async activePriceList(priceId: number) {
            let {data, pending, status, error } =  await useFetchApi(`/api/admin/price/${priceId}/active`, {
                method: 'PATCH',
            }) as any

            if(error.value) {
                return error.value
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                    return data.value.data
                }
            }
        },

        async activePricePackage(packageId: number) {
            this.isLoading = true
            let {data, pending, status, error } =  await useFetchApi(`/api/admin/price/package/${packageId}/active`, {
                method: 'PATCH',
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
    },
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(usePriceStore, import.meta.hot))
}