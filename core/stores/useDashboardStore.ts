import { defineStore, acceptHMRUpdate } from 'pinia'

export const useDashboardStore = defineStore('dashboard', { 
    state: () => ({
        items: [],
        sidebar: {
            isShow: true
        }
    }),

    actions: {
        async get() {
            // const { data } =  await useFetchApi('/api/dashboard')

            // console.log(data.value)
        }
    },
    
    persist: true
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot))
}