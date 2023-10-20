<script setup>
const props = defineProps({
    category: Object
})
</script>

<template>
    <section v-if="category" class="w-screen">
        <header class="relative w-full flex flex-col justify-start items-center overflow-hidden z-10">
            <img
                :alt="category?.preview_image?.name"
                :src="category?.preview_image?.preview_url"
                class="absolute -top-40 left-0 w-full min-h-screen object-cover -z-1"
            > 
                       
            <div class="w-full h-[500px] bg-black/30  z-10 flex justify-center items-center">
                <h1 class="w-full h-full flex justify-center items-center text-center uppercase bg-scroll text-4xl lg:text-7xl text-white">
                    {{ category?.name }}
                </h1>
            </div>
        </header>

        <div class="relative z-20">
            <div v-if="category?.description" class="-translate-y-20 flex justify-center z-10">
                <span  class="relative w-[90%] h-50 bg-background-light text-center dark:bg-background-light shadow-xl shadow-black rounded-3xl flex justify-center items-center">
                    <img src="/images/png/remka.png" alt="Ramka" class="absolute -bottom-15 -left-10 rotate-270 z-10" />
                    {{ category?.description }}

                    <img src="/images/png/remka.png" alt="Ramka" class="absolute -top-15 -right-10 rotate-90 z-10" />
                </span>
            </div>
            
            <x-photo-gallery
                :photos="category?.images"
                class="-translate-y-10"
            />
        </div>
    </section>
</template>