<script setup>
const props = defineProps({
    offer: Object
})

let isHoverCard = ref({
    id: 0 , hover: true
})

function hoverCard(event) {
    isHoverCard.value = event
}
</script>

<template>
    <div>
        <section v-if="offer?.categories?.length != 0"  class="relative w-full h-full container mx-auto flex flex-col justify-start items-center overflow-hidden rounded-lg z-10">
            <header class="w-full">
                <img :src="offer?.preview_image?.preview_url" :alt="offer?.preview_image?.name" class="absolute -top-40 left-0 w-full min-h-screen object-cover rounded-t-lg -z-1">
                
                <div class="w-full h-[500px] bg-black/50 rounded-t-lg z-10 flex justify-center items-center">
                    <h1 class="w-full h-full flex justify-center items-center text-center uppercase bg-scroll text-4xl lg:text-7xl text-white">
                        {{ offer?.title }}
                    </h1>
                </div>
            </header>
            
            <div class="w-full  relative bg-background-light dark:bg-background-dark z-10">
                <div class="-translate-y-30 w-full h-full relative px-8 lg:px-15 py-12 box-border">
                    <div class="w-full flex flex-col lg:flex-row justify-center items-center space-y-10 lg:space-y-0 lg:space-x-20">
                        <div v-for="category in offer?.categories" :key="category.id" class="w-full h-[400px] bg-blue-600 rounded-xl" data-aos-delay="200" :data-aos="category.transition" data-aos-duration="1000">
                            <card :item="category" @hover="hoverCard">
                                <template #decoration>
                                    <transition
                                        enter-active-class="transition ease-in duration-500"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-800"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95"
                                    >
                                        <img v-if="isHoverCard.id === category.id" src="/images/png/remka.png" alt="Ramka" class="absolute -top-15 -right-10 rotate-90 z-10" />
                                    </transition>
                                    
                                    <transition
                                        enter-active-class="transition ease-in duration-800"
                                        enter-from-class="transform opacity-0 scale-95"
                                        enter-to-class="transform opacity-100 scale-100"
                                        leave-active-class="transition ease-in duration-500"
                                        leave-from-class="transform opacity-100 scale-100"
                                        leave-to-class="transform opacity-0 scale-95"
                                    >
                                        <img v-if="isHoverCard.id === category.id" src="/images/png/remka.png" alt="Ramka" class="absolute -bottom-15 -left-10 rotate-270 z-10" />
                                    </transition>
                                </template>
                            </card>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section v-else class="w-screen">
            <header class="relative w-full flex flex-col justify-start items-center overflow-hidden z-10">
                <img v-if="offer?.preview_image" :src="offer?.preview_image?.preview_url" :alt="offer?.preview_image?.name" class="absolute -top-40 left-0 w-full min-h-screen object-cover  -z-1">
                
                <div class="w-full h-[500px] bg-black/30   z-10 flex justify-center items-center">
                    <h1 class="w-full h-full flex justify-center items-center text-center uppercase bg-scroll text-4xl lg:text-7xl text-white">
                        {{ offer?.title }}
                    </h1>
                </div>
            </header>

            <div class="relative z-20">
                <div v-if="offer?.description" class="-translate-y-20 flex justify-center z-10">
                    <span class="relative w-[90%] h-50 bg-background-light dark:bg-background-light text-center shadow-xl shadow-black rounded-3xl flex justify-center items-center">
                        <img src="/images/png/remka.png" alt="Ramka" class="absolute -bottom-15 -left-10 rotate-270 z-10" />
                        
                        {{ offer?.description }}

                        <img src="/images/png/remka.png" alt="Ramka" class="absolute -top-15 -right-10 rotate-90 z-10" />
                    </span>
                </div>
                
                <x-photo-gallery
                    :photos="offer?.images"
                    class="-translate-y-10"
                />
            </div>
        </section>
    </div>
</template>