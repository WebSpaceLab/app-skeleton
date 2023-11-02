import { acceptHMRUpdate, defineStore } from 'pinia'
import { v4 as uuid } from "uuid";

const defaultOptions = {
  closable: true,
  html: false,
  timeout: 3000,
  style: "info",
};


export const useFlashStore = defineStore('flash', {
  state: () => {
    return { items: [] as any
    }
  },
 
  actions: {
    add(message: any, style: string, options: any = {}) {
      options = { ...defaultOptions, style, ...options };

      const id: any = uuid() 
      
      this.items.unshift({
        id,
        message,
        ...options,
      })

      if (options.timeout !== false) {
        setTimeout(() => {
          this.remove(id);
        }, options.timeout);
      }
    },

    success(message: any, options: any = {}) {
      this.add(message, "success", options);
    },

    error(message: any, options: any = {}) {
      this.add(message, "error", options);
    },

    warning(message: any, options: any = {}) {
      this.add(message, "warning", options);
    },

    info(message: any, options: any = {}) {
      this.add(message, "info", options);
    },

    remove(id: any) {
      const index = this.items.findIndex((item: any) => item.id === id);

      if (index > -1) {
        this.items.splice(index, 1);
      }
    }
  },
})
