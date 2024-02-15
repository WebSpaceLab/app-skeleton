import { defineStore, acceptHMRUpdate } from 'pinia'

export const useHomepageStore = defineStore('homepage', {
    state: () => {
        return {
            category: {},

            data: {
                hero: {
                    town: {
                        isLoading: true   
                    },
                    history: {
                        isLoading: true   
                    },
                    technology: {
                        isLoading: true   
                    },
                    culture: {
                        isLoading: true   
                    },
                    sport: {
                        isLoading: true   
                    },
                    nature: {
                        isLoading: true   
                    },
                },
                latest: {
                    first: {
                        isLoading: true   
                    },
                    last: [
                        { isLoading: true },
                        { isLoading: true },
                        { isLoading: true },
                        { isLoading: true },
                    ]
                },
                town: [
                    { isLoading: true },
                    { isLoading: true },
                    { isLoading: true },
                    { isLoading: true },
                    { isLoading: true },
                ],
                history: {
                    first: {
                        isLoading: true   
                    },
                    last: [
                        { isLoading: true },
                        { isLoading: true },
                        { isLoading: true },
                        { isLoading: true },
                    ]
                },
                about: [],
            },

            isLoading: false,
            errors: null as object | null,
        }
    },

    actions: {
        async get() {
            this.isLoading = true
            try {
                let { data } = await useFetchApi(`/api/homepage`, {
                    method: 'GET'
                }) as any
                
                if(data.value) {
                    if(data.value.data?.hero) {
                        data.value.data.hero.forEach(element => {
                            if(element.category.name === 'Miasto') {
                                this.data.hero.town = { ...element, isLoading: false};
                            }
                    
                            if(element.category.name === 'Historia') {
                                this.data.hero.history = { ...element, isLoading: false};
                            }
                    
                            if(element.category.name === 'Technologia') {
                                this.data.hero.technology = { ...element, isLoading: false};
                            }
                    
                            if(element.category.name === 'Kultura') {
                                this.data.hero.culture = { ...element, isLoading: false};
                            }
                    
                            if(element.category.name === 'Sport') {
                                this.data.hero.sport = { ...element, isLoading: false};
                            }
                    
                            if(element.category.name === 'Natura') {
                                this.data.hero.nature = { ...element, isLoading: false};
                            }
                        })
                    }

                    if(data.value.data?.latest) {
                        data.value.data?.latest.forEach((element, index ) => {
                            if(index === 0) {
                                this.data.latest.first = {...element, isLoading: false};
                            } else {
                                this.data.latest.last.map((item, i) => {
                                    if(i === index - 1) {
                                        this.data.latest.last[i] = {...element, isLoading: false};
                                    }
                                });
                            }
                        });
                    }

                    if(data.value.data?.town) {
                        data.value.data?.town.forEach((element, index ) => {
                            if(index < 5) {
                                this.data.town[index] = {...element, isLoading: false};
                            }
                        });
                    }
                    
                    if(data.value.data?.history) {
                        
                        data.value.data?.history.forEach((element, index ) => {
                            if(index === 0) {
                                this.data.history.first = {...element, isLoading: false};
                            } else {
                                this.data.history.last.map((item, i) => {
                                    if(i === index - 1) {
                                        this.data.history.last[i] = {...element, isLoading: false};
                                    }
                                });
                            }
                        });
                    }
                    
                    this.data.about = data.value.data?.about
                }
            } catch (error) {
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },
    }
})

if(import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useHomepageStore, import.meta.hot))
}