import { defineStore, acceptHMRUpdate } from 'pinia'
import { ICredentials, IRegistrationInfo } from 'types/IAuth'
import { IUser } from 'types/IUser'
import { useFlashStore } from './useFlashStore'
import { useNavbarStore } from './useNavbarStore'
import { useAccountStore } from './useAccountStore'
import { IApiToken } from 'types/IApiToken'


export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: null as IUser | null,
            isLoggedIn: false,
            isLoading: false,
            errors: null as object | null,
            response: null as object |null,
            status: null as string | null, 
            token: null as string | null,
            iri: null as string | null,
            role: null as object | null
        }
    },
    
    actions: {
        async register(info: IRegistrationInfo) {
            this.isLoading = true
            this.status = null
            this.response = null

            const { error, status } = await useFetchApi('/auth/register', {
                method: 'POST',
                body: info,
            })

            if(error.value) {
                this.errors = error.value.data.errors
            } else {
                if(status.value === 'success') {
                    const statusText = `Rejestracja przebiegła pomyślnie. Potwierdź w mailu weryfikacyjnym `
                    useFlashStore().success(statusText)
             
                    this.response = {
                        status: statusText
                    }
                }
            }
            
            this.status = status.value
            this.isLoading = false
        },
        
        async login(credentials: ICredentials) {
            this.isLoading = true
            this.status = null
            this.response = null

            // await this.getCSRFCookie()
            
            const {error, status, data } = await useFetchApi('/auth/login', {
                method: 'POST',
                body: {
                    "email": "adam@web-space.com",
                    "password": "secret"
                },
            }) as IApiToken | any
            
            if(error.value) {
                this.errors = error.value.data.errors
            } else {
                if(status.value === 'success' && data.value ) {
                    // const token = useCookie('Api-Token')
                    // const iri = useCookie('Iri')

                    // token.value =  data.value.apiToken
                    // iri.value = data.value.iri

                    if(data.value.apiToken && data.value.iri) {
                        this.token = data.value.apiToken
                        this.iri = data.value.iri
                        this.getUser()
                        this.checkIsLoggedIn()
                        useAccountStore().init(this.user as IUser | any)
                        
                        navigateTo('/dashboard')
                        useFlashStore().success(`Logowanie urzytkownika , przebiegło pomyślnie. Witaj :)`)
                        useNavbarStore().switchLogin(false)
                    }
                }
            }
            
            this.status = status.value
            this.isLoading = false
        },
    
        async getUser() { 
            this.status = null

            if(this.iri) {
                const { data, status, error } = await useFetchApi(this.iri) as IUser | any 

                if(error.value) {
                    this.logout()
                } else {
                    if(data.value && status.value == 'success') {
                        this.user = data.value
                        this.checkIsLoggedIn()
                        useAccountStore().init(this.user as IUser | any)
                    } 
                }
                
                this.status = status.value
            }
        },
    
        async init() {
            this.isLoading = true

            if(this.iri && this.token) {
                await this.getUser()
            } 
            
            this.isLoading = false
        },
    
        async  logout() {
            if(this.isLoggedIn) {
                this.isLoading = true
                this.status = null
                this.response = null
                this.user = null
                this.isLoggedIn = false
                this.token = null
                this.iri = null
                this.role = null

                const {error, status} = await useFetchApi('/auth/logout', {method: 'POST'})                   

                if(error.value) {
                    console.error(error.value)
                }

                navigateTo('/')
                useFlashStore().success(`Wylogowanie przebiegło pomyślnie.`)
                
                this.status = status.value
                this.isLoading = false
            }
        },

        async forgotPassword(email: object) {
            this.isLoading = true
            this.status = null
            this.response = null
            
            const { status, error, data } = await useFetchApi('/forgot-password', {
                method: 'POST',
                body: email
            })

            if(error.value) {
                this.errors = error.value.data.errors
            } else {
                if(status.value === 'success' && data.value) {
                    this.response = data.value
                }
            }
            
            this.status = status.value
            this.isLoading = false
        },

        async resetPassword(resetData: any) {
            this.isLoading = true
            this.status = null
            this.response = null

            const { status, error} = await useFetchApi('/reset-password', {
                method: 'POST',
                body: resetData,
            })
            
            if (error.value) {
                this.errors = error.value.data.errors;
            } else {
                if(status.value === 'success') {
                    navigateTo('/')
                    useNavbarStore().showLogin()
                    const statusText = ref(`Zmiana hasła powiodła się. Teraz możesz się zalogować.`)
                    useFlashStore().success(statusText.value)
                    this.response = {
                        status: statusText.value
                    }
                }
  
            }

            this.status = status.value
            this.isLoading = false
        },
        
        checkIsLoggedIn() {
            if(this.token && this.iri) {
                this.isLoggedIn = true
            } else {
                this.isLoggedIn = false
            }
        },

        reset () {
            this.errors = null
            
            setTimeout(() => {
                this.response = null
            }, 20000)
        }
    }, 

    getters: {
    },

    persist: true
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}