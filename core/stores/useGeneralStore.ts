import { defineStore, acceptHMRUpdate } from 'pinia'

export const useGeneralStore = defineStore('general', { 
    state: () => ({
        title: '',
        faviconUrl: '/favicon.ico',
        description: '',
        isLoading: false,
        suggested: null,
        following: null,
        sidebar: [
            {  title: 'Homepage',  icon: 'ic:sharp-home', name: 'index', path: '/', type: 'basic', role: 'user', children: []},
            {  title: 'Dashboard', icon: 'mdi:desktop-mac-dashboard', name: 'dashboard', path: '/dashboard', role: 'user', type: 'basic', children: [] },
            {  title: 'Profile', icon: 'material-symbols:manage-accounts-rounded', name: 'dashboard.profile', path: '/dashboard/profile', type: 'settings', children: [] },
        ]
    }),

    actions: {
        async get() {
            return await useFetchApi('/api/homepage')
        }
    },
    
    persist: true
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useGeneralStore, import.meta.hot))
}