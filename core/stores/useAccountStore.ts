import { defineStore, acceptHMRUpdate } from 'pinia'
import axios from '../plugins/axios'
import { useFlashStore } from './useFlashStore'
import { IUser } from 'types/IUser'

const $axios = axios().provide.axios

export const useAccountStore = defineStore('account', {
    state: () => {
        return {
            user: null as any | null,

            progressImage: 0 as number 
        }
    },

    actions : {
        init(user: IUser) {
            this.user = user
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
      
        async updateUser(username: string, description: string) {
            if(this.user) {
                return await useFetchApi(this.user['@id'], {
                    method: 'PATCH',
                    body: {
                        username,
                        description
                    }
                })
            }
        },
    },

    persist: true
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAccountStore, import.meta.hot))
}