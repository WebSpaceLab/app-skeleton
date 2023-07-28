import axios from "axios"

export default defineNuxtPlugin((NuxtApp) => {
    axios.defaults.withCredentials = true
    axios.defaults.baseURL = process.env.NUXT_PUBLIC_API
   
    return {
        provide: { 
            axios: axios
        },
    }
})