<script setup>
const movies = ref([
    {
        id: 0,
        quote: '',
        video: {
            name: '',
            url: 'https://localhost:8000/uploads/VID_20220111_090224-3f50366f3b5cf318aa3ab8076a28acd7.mp4'
        }
    },
    {
        id: 1,
        quote: '',
        video: {
            name: '',
            url: 'https://localhost:8000/uploads/VID_20220111_085707_Trim-53323356bc62bd4319cb4817c7e623b1.mp4'
        }
    },
])
</script>

<template>
    <section id="movie" ref="movieSection" class="snap-start scroll-mt-0 relative hidden md:block w-full ">
        <div class="relative flex flex-col justify-center items-end w-full h-full ">
            <div class="absolute top-10 text-center w-full my-3 md:my-12 z-10">
                <h2 class="font-extrabold tracking-tight mb-2 text-3xl xl:text-5xl lg:text-4xl">Nasze filmy</h2>
               
            </div>

            <div class="relative flex  z-10  w-screen md:h-[390px] lg:h-[730px]">
                <x-slider-scale :items="movies"/>
            </div>
            
            <div class="overlay hidden md:block overflow-hidden h-screen w-screen absolute left-0 top-0 bg-gradient-to-tl from-blue via-blue bg-dark" ></div>
            <!-- <div class="overlay hidden md:block overflow-hidden h-screen w-screen absolute opacity-30 bottom-0 right-0" :class="`${isDark ? 'bg-gradient-to-tl from-blue via-blue bg-dark' : ''}`"></div> -->
        </div>
    </section>
</template>

<style lang="scss" scoped>
.overlay {
    clip-path: circle(50% at 103% 0);
}
</style>