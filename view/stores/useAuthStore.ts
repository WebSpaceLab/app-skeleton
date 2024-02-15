import { defineStore, acceptHMRUpdate } from 'pinia'
import { ICredentials, IRegistrationInfo } from '../types/IAuth'
import { IUser } from '../types/IUser'
import { useFlashStore } from './useFlashStore'
import { useNavbarStore } from './useNavbarStore'
import { useAccountStore } from './useAccountStore'
import { IApiToken } from '../types/IApiToken'


export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            user: {
                '@id': '',
                email: '',
                username: '',
                firstName: '',
                lastName: '',
                avatarUrl: '',
                bio: '',
                roles: [],
            
                articles: [],
                comments: [],
                
                createdAtAgo: '',
                updatedAtAgo: ''
            },
            isLoggedIn: false,
            isLoading: false,
            errors: null as object | null,
            response: null as object |null,
            status: null as string | null, 
            token: null as string | null,
            iri: null as string | null,
            roles: [],
            tokenExpiresAt: '',
            isAuthorization: false
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
            
            const {error, status, data } = await useFetchApi('/auth/login', {
                method: 'POST',
                body: credentials,
            }) as IApiToken | any
            
            if(error.value) {
                this.errors = error.value.data.error
            } else {
                if(status.value === 'success' && data.value ) {
                    // const token = useCookie('Api-Token')
                    // const iri = useCookie('Iri')

                    // token.value =  data.value.apiToken
                    // iri.value = data.value.iri

                    if(data.value.data.apiToken && data.value.data.iri) {
                        this.token = data.value.data.apiToken
                        this.iri = data.value.data.iri
                        this.getUser()
                        this.checkIsLoggedIn()
                        useAccountStore().init(this.user as IUser | any)
                        
                        navigateTo('/dashboard')
                        useFlashStore().success(data.value.flash?.message)
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
                        this.user['@id'] = data.value.data.iriFromResource
                        this.user.roles = data.value.data.roles
                        this.roles = data.value.data.roles
                        this.user.email = data.value.data.email
                        this.user.username = data.value.data.username
                        this.user.firstName = data.value.data.firstName
                        this.user.lastName = data.value.data.lastName

                        this.user.avatarUrl = data.value.data.avatarUrl
                        this.user.bio = data.value.data.bio
                        this.user.articles = data.value.data.articles
                        this.user.comments = data.value.data.comments
                        this.user.createdAtAgo = data.value.data.createdAtAgo
                        this.user.updatedAtAgo = data.value.data.updatedAtAgo
                        this.tokenExpiresAt = data.value.data.apiTokenExpiresAt

                        this.giveAccess(true)
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
                this.restUser()
                this.isLoggedIn = false
                this.token = null
                this.iri = null
                this.roles = []

                const {error, status, data} = await useFetchApi('/auth/logout', {method: 'POST'}) as any                   

                if(error.value) {
                    console.error(error.value)
                } else {
                    if(data.value && status.value == 'success') {
                        navigateTo('/')
                        useFlashStore().success(data.value.flash.message)
                    }
                }

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

            const { status, error, data } = await useFetchApi('/reset-password', {
                method: 'POST',
                body: resetData,
            })
            
            if (error.value) {
                this.errors = error.value.data.errors;
            } else {
                if(status.value === 'success') {
                    console.log(data.value)
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
        },

        restUser() {
            this.user = {
                '@id': '',
                email: '',
                username: '',
                firstName: '',
                lastName: '',
                avatarUrl: '',
                bio: '',
                roles: [],
            
                articles: [],
                comments: [],
                
                createdAtAgo: '',
                updatedAtAgo: ''
            }
        },

        accessGranted(role: string) {
            const isGranted = ref(false)

            this.roles.forEach(r => {
                if(r === role) {
                    isGranted.value = true
                }
            })
            
            return isGranted.value; 
        },

        giveAccess(access: boolean) {
            if(!access) {
                return navigateTo('/dashboard/error/401', {replace: true})
            }
        }
    }, 

    getters: {
    },

    persist: true
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}