<script setup>
    const props = defineProps({
        offers: Array
    })

    let isHoverCard = ref({
        id: 0 , hover: true
    })

    function hoverCard(event) {
        isHoverCard.value = event
    }

    onMounted(() => {
        setInterval(() => {
            if(props.offers.length > isHoverCard.value.id) {
                isHoverCard.value.id ++
                isHoverCard.value.hover = true
                hoverCard(isHoverCard.value)
            }

        }, 1000)
    })
</script>

<template>
     <section v-if="offers.length != 0" id="offer" class="w-full lg:max-h-screen relative scroll-mt-50 snap-start">
         <header class="relative w-full my-4 flex justify-center">

            <h1 style="background-image: url('/images/vector/background.jpg')"  class="relative w-[50%] bg-fixed  bg-no-repeat bg-cover bg-center text-center  py-10 text-white text-3xl text-bold uppercase rounded-lg">
                <span class="bg-black/30 px-5 py-3 rounded-lg">
                    Oferta 
                </span>

                <img src="/images/png/tribal-flower.png" alt="tribal flower" class="absolute -top-20 rotate-60 -left-5 w-30">
                <img src="/images/png/tribal-flower.png" alt="tribal flower" class="absolute -bottom-20 rotate-240  -right-5 w-30">

            </h1>
        </header>

        <div class="w-full h-full relative px-8 md:px-8 py-12 box-border z-10 bg-prime-light dark:from-prime-dark dark:to-second-dark backdrop-blur-sm rounded-lg" >
            <div class="w-full h-full grid  lg:grid-cols-3 lg:grid-rows-2 gap-20 p-6 box-border">
                <div v-for="item in offers" :key="item.id" class="w-full h-[400px] bg-blue-600 rounded-xl" data-aos-delay="200" :data-aos="item.transition" data-aos-duration="1000">
                    <card :item="item" @hover="hoverCard">
                        <template #decoration>
                            <!--
                                <transition
                                    enter-active-class="transition ease-in duration-500"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-800"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95"
                                >
    
                                    <img v-if="isHoverCard.id === item.id" src="/images/png/remka.png" alt="Ramka" class="absolute -top-15 -right-10 rotate-90 z-10" />
                                    
                                </transition>
    
                                <transition
                                    enter-active-class="transition ease-in duration-800"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-500"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95"
                                >
                                <img v-if="isHoverCard.id === item.id" src="/images/png/remka.png" alt="Ramka" class="absolute -bottom-15 -left-10 rotate-270 z-10" />
                            </transition>
                            -->

                        </template>
                    </card>
                </div>
            </div>
        </div>
     </section>
</template>
