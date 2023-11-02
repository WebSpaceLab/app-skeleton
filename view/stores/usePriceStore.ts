import { defineStore } from 'pinia'
import { useFlashStore } from './useFlashStore'

export const usePriceStore = defineStore('price', {
    state: () => ({
        all: [],
        activeAll: [
            {
                id: 0,
                title: 'Zajęcia plus wolne wejścia',
                subtitle: 'Do pierwszego zakupu karnetu doliczamy 10 zł za kartkę klubowa.',
                packages: [
                    {
                        id: 0,
                        title: 'Karnet miesięczny na strefę siły',
                        isHighlighted: false,
                        price: '95 zł/m-c',
                        actionUrl: '',
                        information: [
                            {info: 'Wejścia wolne'},
                            {info: 'Ważny 30 dni'},
                        ],
                    },
                    {
                        id: 1,
                        title: 'Karnet 4 wejścia na zajęcia w miesiącu',
                        isHighlighted: false,
                        price: '80 zł/m-c',
                        information: [
                            {info: '4 wejścia na zajęcia'},
                            {info: 'Ważny 30 dni'},
                        ],
                        actionUrl: ''
                    },
                    {
                        id: 2,
                        title: 'Karnet miesięczny - zajęcia',
                        isHighlighted: true,
                        price: '160 zł/m-c',
                        information: [
                            {info: 'Wszyskie zajęcia', isHighlighted: true},
                            {info: 'Wejścia wolne'},
                            {info: 'Ważny 30 dni'},
                        ],
                        actionUrl: ''
                    },
                ]
            },
            {
                id: 1,
                title: 'Karnety jednorazowe',
                subtitle: '',
                packages: [
                    {
                        id: 3,
                        title: 'Pojedyńcze wejscie wolne',
                        isHighlighted: false,
                        price: '19 zł',
                        information: [
                            {info: 'Wejścia wolne na strefę siły', isHighlighted: true},
                            {info: 'Wejście pojedyńcze'},
                
                        ],
                        actionUrl: ''
                    },
                    {
                        id: 4,
                        title: 'Pojedyńcze wejscie na zajęcia',
                        isHighlighted: false,
                        price: '30 zl',
                        information: [
                            {info: 'Wejście na dowolne zajecia'},
                            {info: 'Wejście pojedyńcze'},
                
                        ],
                        actionUrl: ''
                    },
                ]
            },
            {
                id: 2,
                title: 'Karnety personalne',
                subtitle: '',
                packages: [
                    {
                        id: 0,
                        title: 'Trening personalny',
                        isHighlighted: false,
                        price: '80 zł/h',
                        information: [
                            {info: 'Trening pod okiem wykwalifikowanego trenera'},
                            {info: 'Od zakupu do wykorzystania, ważny 3 miesiące.'},
                        ],
                        actionUrl: 'https://movementarenasuwalki.gymmanager.com.pl/Buypass/ChooseDate',
                        nameBtn: 'Umów się na trening'
                    },
                    {
                        id: 1,
                        title: 'Karnet 5 treningów personalnych ',
                        isHighlighted: false,
                        price: '375 zł',
                        information: [
                            {info: 'Trening pod okiem wykwalifikowanego trenera'},
                            {info: 'Od zakupu do wykorzystania, ważny 3 miesiące.'},
                            {info: 'Do wykorzystania 5 treningów.'},
                        ],
                        actionUrl: ''
                    },
                    {
                        id: 2,
                        title: 'Karnet 10 treningów personalnych',
                        isHighlighted: true,
                        price: '700 zł',
                        information: [
                            {info: 'Trening pod okiem wykwalifikowanego trenera'},
                            {info: 'Od zakupu do wykorzystania, ważny 3 miesiące.'},
                            {info: 'Do wykorzystania 10 treningów.'},
                        ],
                        actionUrl: 'https://movementarenasuwalki.gymmanager.com.pl/Buypass/Passes',
                        nameBtn: 'Kup karnet'
                    },
                ]
            }
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
        errors: null
    }),
    
    actions: {
        async get() {
            this.isLoading = true
            
            let {data, pending, status, error } = await useFetchApi(`/api/price`, {
                method: 'GET',
            }) as any

            this.isLoading = pending.value

            if(error.value) {
                console.error(error.value)
            } else {
                if(data.value && status.value === 'success') {
                    this.activeAll = data.value.price
                }
            }
            
        },
        async getAll(query:any, perPage: number, page: number ) {
            this.isLoading = true
            
            let {data, pending, status, error } = await useFetchApi(`/api/admin/price`, {
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

            this.isLoading = pending.value

            if(error.value) {
                console.error(error.value)
            } else {
                if(data.value && status.value === 'success') {
                    this.all = data.value.price
        
                    this.pagination.total = data.value.pagination.total
                    this.pagination.current_page = data.value.pagination.current_page
                    this.pagination.per_page = data.value.pagination.per_page
       
                    this.status = data.value.status
                    this.months = data.value.months
                    this.queryParams = data.value.queryParams
                }
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
                this.errors = error.value.data.errors
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                    navigateTo('/dashboard/price')
                    return data.value
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

        async createdPricePackageInformation(form: any,  packageId: number) {
            this.isLoading = true
            this.errors = null
            let {data, pending, status, error } =  await useFetchApi('/api/admin/price/package/information/' +  packageId, {
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

        async updatedPricePackage(form: any, pricePackageId: number) {
            this.isLoading = true
            this.errors = null
            let {data, pending, status, error } =  await useFetchApi('/api/admin/price/package/' + pricePackageId, {
                method: 'PATCH',
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

        async updatePriceList(form: any, priceId: number) {
            this.isLoading = true
            this.errors = null
            let {data, pending, status, error } =  await useFetchApi('/api/admin/price/' + priceId, {
                method: 'PATCH',
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

        async updatedPricePackageInformation(form: any, informationId: number) {
            this.isLoading = true
            this.errors = null
            let {data, pending, status, error } =  await useFetchApi('/api/admin/price/package/information/' + informationId, {
                method: 'PATCH',
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

        async deletedPriceList(priceId: number) {
            let {data, pending, status, error } =  await useFetchApi(`/api/admin/price/${priceId}`, {
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
        },

        async deletedPricePackage(packageId: number) {
            let {data, pending, status, error } =  await useFetchApi(`/api/admin/price/package/${packageId}`, {
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
        },

        async deletedPricePackageInformation(informationId: number) {
            let {data, pending, status, error } =  await useFetchApi(`/api/admin/price/package/information/${informationId}`, {
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
                    return data.value
                }
            }
        },

        async activePricePackage(packageId: number) {
            let {data, pending, status, error } =  await useFetchApi(`/api/admin/price/package/${packageId}/active`, {
                method: 'PATCH',
            }) as any

            if(error.value) {
                return error.value
            } else {
                if(data.value && status.value === 'success') {
                    useFlashStore().success(data.value.flash.message)
                    return data.value
                }
            }
        },
    },
})