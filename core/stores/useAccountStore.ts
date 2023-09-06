import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from '../plugins/axios'
import { useFlashStore } from './useFlashStore'
import { IUser } from '../types/IUser'

const $axios = axios().provide.axios

export const useAccountStore = defineStore('account', {
    state: () => {
        return {
            user: null as any | null,

            roles: [],
            progressImage: 0 as number 
        }
    },

    actions : {
        init(user: IUser) {
            this.user = user
            this.renameRoles()
        },

        renameRoles() {
            if(this.user) {
                this.roles = []
                this.user.roles.forEach((role: string) => {
                    this.roles.push(role.substring(5))
                }) 
            }
        },

        async updateUserImage(form: any) {
            if(this.user) {
                return await $axios.post(`${this.user['@id']}/update-image`, form, {
                    onUploadProgress: (event: any) => {
                        this.progressImage = Math.round(event.loaded * 100 / event.total)
                    },
                })
            }
        },   
      
        async updateUser(username: string, bio: string, firstName: string, lastName: string) {
            if(this.user) {
                return await useFetchApi(this.user['@id'], {
                    method: 'PATCH',
                    body: {
                        username,
                        bio,
                        firstName,
                        lastName
                    }
                })
            }
        },

        async updatePassword(form: any) {
            if(this.user) {
                return await useFetchApi(`${this.user['@id']}/update-password`, {
                    method: 'PATCH',
                    body: form
                })
            }
        },
    },

    persist: true
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}