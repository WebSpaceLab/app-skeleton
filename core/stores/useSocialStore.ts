import { defineStore, acceptHMRUpdate } from 'pinia'
import { useFlashStore } from './useFlashStore'

export const useSocialStore = defineStore('social', {
  state: () => {
    return { 
        social: []
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async getSocialMedia() {
      let res: any = await useFetchApi(`/api/social`)

      this.$state.social = res.data.social

      return res
    },
    
    async createdSocialMedia(form: object) {
      const res: any = await useFetchApi('/api/social', {
        method: 'POST',
        body: form
      })
      
      useFlashStore().success(res.data.flash.message)

      this.getSocialMedia()
      
      return res.data.data
    },
    
    async updatedSocialMedia(socialId: number, form: object) {
      const res: any = await useFetchApi(`/api/social/${socialId}/update`, {
        method: 'PUT',
        body: form
      })

      useFlashStore().success(res.data.flash.message)
      
      this.getSocialMedia()
      
      return res.data.data
    },

    async deletedSocialMedia(socialId: number) {
      const res: any  = await useFetchApi(`/api/social`, {
        method: 'DELETE',
        // preserveState: false,
        body: {
          socialIds: [socialId],
        },
      })

      if(res.data.flash.message) {
          useFlashStore().success(res.data.flash.message)
      }
      
      this.getSocialMedia()
      
      return res.data.data
    }
  },
  persist: true
})

if(import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSocialStore, import.meta.hot))
}