<script setup>
    const props = defineProps({
        title: String,
        description: String
    })
    // const {isShowIntroLogo } = useIntro()
    
    // function play() { 
    //     var introVideo = document.getElementById("intro-video")

    //     introVideo.play()
    // } 
</script>

<template>
    <section id="hero" class="h-full w-full pb-20 bg-prime-light dark:from-prime-dark dark:to-second-dark backdrop-blur-sm rounded-lg" >
        <img src="/images/png/remka.png" alt="Ramka" class="hidden lg:block lg:absolute -top-12 -left-12 z-10" >
        <img src="/images/vector/flowers.webp" alt="Kwiaty" class="absolute lg:hidden left-[0] -top-30 w-100">
        
        <!--
            <img src="/images/vector/background.jpg" alt="Kwiaty" class="fixed top-0 left-0 w-screen opacity-30 "/>
        -->
    
        <div class="w-full h-full md:px-6  flex flex-col justify-between  ">
            <div class="w-full h-full flex flex-col lg:flex-row lg:justify-between items-center lg:items-end">
                <div data-aos="fade-down-right" class="w-[80%] h-full lg:w-2/5 flex flex-col justify-center items-center lg:justify-end lg:items-start z-10 lg:translate-y-20">
                    <div class="relative">
                        <img src="/images/vector/flowers.webp" alt="Kwiaty" class="hidden lg:block lg:absolute -top-50 -left-50 w-150">

                        <h1 class="text-4xl sm:text-5xl lg:text-7xl font-bold m-0 mt-8 mb-10 lg:mb-2 p-3 backdrop-blur-xl text-transparent bg-clip-text bg-gradient-to-r from-muted-light to-basic-light dark:from-muted-dark dark:to-basic-dark   lg:translate-x-6 rounded-xl">
                            {{ title }}
                        </h1>
                    </div>
                    
                    <div class="backdrop-blur rounded-xl p-6 bg-gradient-to-r from-prime-light/80 to-second-light/80 dark:from-prime-dark/80 dark:to-second-dark/80">
                        <p class="text-md lg:text-2xl text-bold text-center  text-basic-light dark:text-muted-dark ">
                            {{ description }}
                        </p>
                    </div>
                </div>
                
                <div class="w-full h-full lg:w-3/5 m-8 lg:m-0 flex flex-col justify-start items-center">
                    <div data-aos="fade-up-left" class="hidden md:block relative  md:w-150 xl:w-200 2xl:w-250 mx-5 my-20">
                        <img src="/images/png/remka.png" alt="Ramka" class="absolute -top-15 -right-10 rotate-90 z-10">

                        <video  id="intro-video" class="w-full rounded-xl " src="/movie/hero.mp4" controls autoplay muted></video>
                    </div>

                    <div data-aos="zoom-in-up" class="relative w-[80%] h-full flex flex-col md:flex-row justify-around items-center md:items-end gap-6">
                        <nuxt-link to="/oferta/strojenia/strojenie-sal-bankietowych" class="relative w-70 h-70 md:w-50 md:h-50 xl:w-60 xl:h-60 flex items-center justify-center rounded-full cursor-pointer bg-second-light/5 dark:bg-second-dark/5 hover:bg-yellow-50 transition-all duration-1000">
                            <p class="absolute  w-30 h-full text-bold text-center text-2xl md:text-lg xl:text-2xl flex items-center justify-center rounded-full text-transparent bg-clip-text bg-gradient-to-r from-basic-light to-muted-light dark:from-muted-dark dark:to-basic-dark">Dekoracje weselne</p>
                            <img src="/images/vector/wianek.webp" alt="Wianek" class="absolute -bottom-1 left-0 w-full h-full rounded-full">
                        </nuxt-link>

                        <nuxt-link to="/oferta/wiazanki/wiazanki-slubne" data-aos="zoom-in-up" class="relative w-70 h-70 md:w-50 md:h-50 xl:w-60 xl:h-60 flex items-center justify-center rounded-full cursor-pointer bg-second-light/5 dark:bg-second-dark/5 hover:bg-yellow-50 transition-all duration-1000">
                            <p class="absolute w-30 h-full text-bold text-center text-2xl md:text-lg xl:text-2xl flex items-center justify-center rounded-full text-transparent bg-clip-text bg-gradient-to-r from-basic-light to-muted-light dark:from-muted-dark dark:to-basic-dark">Bukiety weselne</p>
                            <img src="/images/png/rose.png" alt="Wianek" class="absolute bottom-0 left-0 w-full h-full rounded-full">
                        </nuxt-link>

                        <nuxt-link to="/oferta/balony" data-aos="zoom-in-up" class="relative w-70 h-70 md:w-50 md:h-50 xl:w-60 xl:h-60 flex items-center justify-center rounded-full cursor-pointer bg-second-light/5 dark:bg-second-dark/5 hover:bg-yellow-50 transition-all duration-1000">
                            <p class="absolute w-full h-full text-bold text-center text-2xl md:text-lg xl:text-2xl flex items-center justify-center rounded-full text-transparent bg-clip-text bg-gradient-to-r from-basic-light to-muted-light dark:from-muted-dark dark:to-basic-dark">Balony</p>
                            <img src="/images/vector/wianek.webp" alt="Wianek" class="absolute -bottom-1 left-0 w-full h-full rounded-full">
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>