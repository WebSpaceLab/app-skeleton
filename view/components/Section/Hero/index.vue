<script setup>
    const { $hero } =  useNuxtApp()

    onMounted(async () => {
        try {
            await $hero.get()
        } catch (error) {
            console.error(error)
        }
    })
</script>

<template>
    <section id="hero" class="h-full w-screen pb-20 relative dark:from-prime-dark dark:to-second-dark backdrop-blur-sm rounded-lg" >
        <!-- Background -->
        <img src="/images/logo-strefa-sily.png" alt="logo strefy siły" class="absolute top-10 left-0 z-20 h-50">
        
        <div class="z-10 overlay block -translate-y-30 overflow-hidden h-screen w-screen absolute bottom-0 right-0 bg-gradient-to-tl from-blue via-blue bg-dark" ></div>
        
        <div class="w-full h-screen  z-12 flex justify-between">
            <div class="w-full h-[90%] relative flex flex-col lg:flex-row lg:justify-start items-start lg:items-start">
                <div class="w-60 md:w-70 lg:w-80 xl:w-90 2xl:w-100 absolute bottom-10 left-5 lg:left-20 z-13">
                    
                    <h1 class="flex space-x-3 text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold lg:mb-2 text-transparent bg-clip-text bg-gradient-to-r from-muted-dark to-basic-dark rounded-xl">
                        <span class="text-slate-800">S</span>trefa
                        <span class=" text-slate-800">S</span>iły
                    </h1>

                    <img src="/images/Designer3.png" alt="Image" class="-z-1 hidden md:block absolute bottom-0 left-50  md:h-60 lg:h-100 xl:h-140 2xl:h-180">
                    
                    <div class="px-6 py-2  bg-background-light/80  dark:bg-background-dark/80 rounded-lg">
                        <p class="text-md lg:text-lg  xl:text-xl 2xl:text-2xl text-bold text-justify text-basic-light dark:text-muted-dark ">
                            {{ $general.data.description }}
                        </p>
                    </div>
                </div>
            </div>

            <div class="z-0 absolute top-0 right-0  w-full h-full -translate-y-30 flex flex-col justify-center items-center box-border">
                <div class="absolute top-0 right-0 w-full h-full bg-transparent rounded-xl flex justify-end ">
                    <div class="hidden md:block w-[75%] h-full">
                        <x-slider-carousel justify-buttons="center" :items="$hero.activeHero"> 
                            
                            <template v-for="(item, index) in $hero.activeHero" :key="index" #[`slide-${index}`]>               
                                <div class="w-full h-full">
                                    <NuxtPicture  :src="item.media.previewUrl" :alt="item.media.name" class="w-full h-full" :imgAttrs="{id: item.media.id, class:'w-full h-full object-cover'}"/>

                                    <transition
                                        enter-active-class="ease-in duration-500"
                                        enter-from-class="blur-500"
                                        enter-to-class="opacity-100 translate-x-0 blur-0"
                                        leave-active-class="ease-in duration-500"
                                        leave-from-class="translate-x-0 blur-0"
                                        leave-to-class="blur-500"
                                    >
                                        <div 
                                            
                                            class="w-100 absolute flex flex-col  justify-center items-end top-60 right-5 xl:right-20 rounded-full"
                                        >
                                            <h2 
                                                data-aos="fade-up-left"
                                                data-aos-easing="linear"
                                                data-aos-duration="500"
                                                data-aos-delay="200"
                                                class="text-2xl px-6 py-4 flex justify-center items-center text-basic-light dark:text-basic-dark rounded-lb-3xl rounded-tr-3xl box-border"
                                                :class="$navbar.isScroll ? 'bg-background-light/40 dark:bg-background-dark/40' : ' bg-background-light/80 dark:bg-background-dark/80'"
                                            >
                                                {{item.name}}
                                            </h2>

                                            <div 
                                                data-aos="fade-up-left"
                                                data-aos-easing="linear"
                                                data-aos-duration="500"
                                                data-aos-delay="400"
                                                class="w-70 xl:mt-20 translate-x-50 px-4 py-2 rounded-lb-3xl rounded-tr-3xl box-border"
                                                :class="$navbar.isScroll ? 'bg-background-light/40 dark:bg-background-dark/40' : ' bg-background-light/80 dark:bg-background-dark/80'"
                                            >
                                                <p class="text-xl text-basic-light dark:text-basic-dark">
                                                    {{item.description}}
                                                </p>
                                            </div>
                                        </div>
                                    </transition>

                                </div>
                            </template>
                        </x-slider-carousel>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
    .overlay {
        clip-path: circle(50% at 3% 56%);
    }
    .overlay-2 {
        clip-path: circle(60% at 100% 0%);
    }
</style>
