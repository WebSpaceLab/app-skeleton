<script setup>
    const {$price } =  useNuxtApp()
    
    onMounted(async () => {
        await $price.get()
    })
</script>

<template>
     <section v-if="$price.activeAll" id="price-list" class="snap-start min-h-screen w-full flex flex-col justify-center items-center scroll-mt-0 relative block m-auto w-screen py-20 px-5 box-border">
        <div class="overlay-4  block overflow-hidden h-screen w-screen absolute bottom-0 right-0 bg-gradient-to-bl from-blue via-blue bg-dark"/>
        
        <h1 class="font-extrabold tracking-tight mb-0 text-3xl xl:text-5xl lg:text-4xl">Cennik</h1>


        <template v-for="(price, index) in $price.activeAll" :key="index">
            <div class="w-auto h-auto mb-10">
                <div class="mb-10">
                    <h2 v-if="price.title" class="text-3xl text-center text-bold light:text-muted-light dark:text-muted-dark mb-2">{{ price.title }}</h2>
                    <h3 v-if="price.subtitle" class="text-xl text-center text-bold light:text-gray-600 dark:text-gray-400 m-0">{{ price.subtitle }}</h3>
                </div>
    
                <div class="relative w-auto grid grid-flow-row auto-rows-max grid-cols-1 md:grid-cols-2 lg:grid-flow-col justify-center items-center gap-8 group box-border">
                    <template v-for="(pack, index) in price.packages" :key="index">
                        <div class="h-full group-hover:blur-sm hover:!blur-none group-hover:scale-95 hover:!scale-100 duration-500 box-border">
                            <x-card-price :pack="pack" :index="index">
                                <template #information >
                                    <div v-for="(info, index) in pack.information" :key="index" >                                        
                                        <p 
                                            class="w-full px-5 relative flex flex-wrap flex-row semibold text-sm" 
                                            :class="[info.isHighlighted ?
                                                        pack.isHighlighted ? ' text-primary-600 ' : 'text-secondary-600' 
                                                        : 'text-blueGray-700 dark:text-blueGray-500'
                                            ]"
                                        >
                                            <span class="absolute top-0 -left-3">
                                                <Icon 
                                                    name="clarity:success-line" 
                                                    class="text-xl " 
                                                    :class="[info.isHighlighted ?
                                                    pack.isHighlighted ? ' text-primary-600 ' : 'text-secondary-600' 
                                                    : 'text-blueGray-700 dark:text-blueGray-500'
                                                    ]" 
                                                />
                                            </span>
    
                                            {{ info.info }}
                                        </p>
                                    </div>
                                </template>
                            </x-card-price>
                        </div>
                    </template>
                </div>
            </div>
        </template>
     </section>
</template>

<style lang="scss" scoped>
    .overlay-4 {
        clip-path: circle(50% at 103% 100%);
    }
</style>