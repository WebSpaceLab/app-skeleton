import { defineStore, acceptHMRUpdate } from 'pinia'

import { useFlashStore } from './useFlashStore'

export const useFeatureStore = defineStore('feature', {
    state: () => {
        return {
            feature : [],

            activeFeature: [
                // {
                //     id: 1,
                //     name: 'Box',
                //     subtitle: 'Lorem ipsum dolor sit amet consectetur',
                //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            
                //     media: {
                //             id: 1,
                //             previewUrl: 'https://localhost:8000/uploads/istockphoto-1307450706-170667a-9ebf10e069fd6e6cd75fd2ce79372384.jpg',
                //             type: 'image/jpg',
                //             name: 'istockphoto-1307450706-170667a-9ebf10e069fd6e6cd75fd2ce79372384.jpg',
                //         },
                    
                // },
            
                // {
                //     id: 2,
                //     name: 'Powerlifting',
                //     subtitle: 'Lorem ipsum dolor sit amet consectetur',
                //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
              
                //     media: {
                //             id: 2,
                //             previewUrl: 'https://localhost:8000/uploads/pobrane-6f3b4e411ac016458a71b8d577aa34cd.jpg',
                //             type: 'image/jpg',
                //             name: 'istockphoto-1307450706-170667a-9ebf10e069fd6e6cd75fd2ce79372384.jpg',
                //         },
                
                // },
            
                // {
                //     id: 3,
                //     name: 'Stretching',
                //     subtitle: 'Lorem ipsum dolor sit amet consectetur',
                //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            
                //     media: {
                //             id: 3,
                //             previewUrl: 'https://localhost:8000/uploads/Depositphotos_479028382_L-882c1ca1fe2206d4c8e0b7e511524c4e.jpg',
                //             type: 'image/jpg',
                //             name: 'istockphoto-1307450706-170667a-9ebf10e069fd6e6cd75fd2ce79372384.jpg',
                //         },
              
                // },
            
                // {
                //     id: 6,
                //     name: 'Cross-box',
                //     subtitle: 'Lorem ipsum dolor sit amet consectetur',
                //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            
                //     media: {
                //             id: 6,
                //             previewUrl: 'https://localhost:8000/uploads/360_F_171176650_QXGmZl3vr4RVZo5i6RyxsaHnkMw5dEDt-104ad01d517e085b10c56c8ee025962c.jpg',
                //             type: 'image/jpg',
                //             name: 'istockphoto-1307450706-170667a-9ebf10e069fd6e6cd75fd2ce79372384.jpg',
                //         },
                // },
            
                // {
                //     id: 4,
                //     name: 'Kalistenika',
                //     subtitle: 'Lorem ipsum dolor sit amet consectetur',
                //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            
                //     media: {
                //         id: 4,
                //         previewUrl: 'https://localhost:8000/uploads/kalistenika-5-096be92926c4836ac0e50e2a926de87d.jpg',
                //         type: 'image/jpg',
                //         name: 'istockphoto-1307450706-170667a-9ebf10e069fd6e6cd75fd2ce79372384.jpg',
            
                //     } ,
                // },
            
                // {
                //     id: 5,
                //     name: 'Ninja OCR',
                //     subtitle: 'Lorem ipsum dolor sit amet consectetur',
                //     description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
                //     media: {
                //             id: 5,
                //             previewUrl: 'https://localhost:8000/uploads/MaoriRace-blog2-1024x768-8868972dabe2b03ae49872bcb8aeb30a.jpg',
                //             type: 'image/jpg',
                //             name: 'istockphoto-1307450706-170667a-9ebf10e069fd6e6cd75fd2ce79372384.jpg',
                //         },
                    
                // }
            ],

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

            let {data, pending, status, error } = await useFetchApi(`/api/feature`, {
                method: 'GET'
            }) as any
         
            
            this.isLoading = pending.value
            
            if(error.value) {
                console.error(error.value)
            } else {
                if(data.value && status.value === 'success') {
                    this.$state.activeFeature = data.value.feature
                }
            }
        },

        async getFeature(query: any, perPage: number, page: number) {
            this.isLoading = true
            
            let {data, pending, status, error } = await useFetchApi(`/api/admin/feature`, {
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
                    this.feature = data.value.feature
        
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

            let {data, pending, status, error } = await useFetchApi(`/api/admin/feature`, {
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
        
        async update(aboutId: number, form: object) {
            this.isLoading = true
            this.errors = null
            
            let {data, pending, status, error } = await useFetchApi(`/api/admin/feature/${aboutId}`, {
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

        async destroy(featureId: number) {
            this.isLoading = true
            this.errors = null

            let {data, pending, status, error } = await useFetchApi(`/api/admin/feature/${featureId}`, {
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