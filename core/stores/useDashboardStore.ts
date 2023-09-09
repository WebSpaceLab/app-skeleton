import { defineStore, acceptHMRUpdate } from 'pinia'

export const useDashboardStore = defineStore('dashboard', { 
    state: () => ({
        items: [],
        sidebar: {
            isShow: true,
            isRail: true,
            isRightSide: true,
            links: [
                {  title: 'Homepage',  icon: 'ic:sharp-home', name: 'index', path: '/', type: 'basic', access: 'ROLE_USER', children: []},
                {  title: 'Dashboard', icon: 'mdi:desktop-mac-dashboard', name: 'dashboard', path: '/dashboard', access: 'ROLE_USER', type: 'basic', children: [] },
                {  title: 'Media', icon: 'material-symbols:media-link', name: 'dashboard.media', path: '/dashboard/media', access: 'ROLE_USER', type: 'basic', children: [] },
                {  title: 'Profile', icon: 'material-symbols:manage-accounts-rounded', name: 'dashboard.profile', path: '/dashboard/profile', access: 'ROLE_USER', type: 'settings', children: [] },
                {  title: 'Settings', icon: 'material-symbols:settings-suggest-outline-sharp', name: 'dashboard.settings', access: 'ROLE_ADMIN', path: '/dashboard/settings', type: 'settings', children: [] },
            ]
        }
    }),

    actions: {
        async get() {
            // const { data } =  await useFetchApi('/api/dashboard')

            // console.log(data.value)
        },

        right() {
            this.sidebar.isRightSide = true;
        },
        
        left() {
            this.sidebar.isRightSide = false;
        },
        
        switchSide() {
            this.sidebar.isRightSide === true ? this.right() : this.left();
        },
        
        reduce() {
            this.sidebar.isRail = true;
        },
        
        enlarge() {
            this.sidebar.isRail = false;
        },
        
        changeSizeSidebar() {
            this.sidebar.isRail === false ? this.reduce() : this.enlarge();
        },
        
    },
    
    persist: true
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDashboardStore, import.meta.hot))
}