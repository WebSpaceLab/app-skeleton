<script setup>

const props = defineProps({
    about: {
        type: Array,
        require: true,
        default: () => []
    }
})

let isSwitchFirstText = ref(false)
let isSwitchSecondText = ref(true)
let isSwitchLastText = ref(false)
let count = ref(1)
let isChoice = ref(false)
let interval = ref()

function switchText(key) {
    switch (key) {
        case 3:
            isSwitchFirstText.value = true
            isSwitchSecondText.value = false
            isSwitchLastText.value = false
            break;

        case 1:
            isSwitchFirstText.value = false
            isSwitchSecondText.value = true
            isSwitchLastText.value = false
            
            break;

        case 2:
            isSwitchFirstText.value = false
            isSwitchSecondText.value = false
            isSwitchLastText.value = true
            break;

        default:
            break;
    }
}

function switchToMousemoveTarget(key) {
    if(key) {
        count.value = key
        isChoice.value = true
        switchText(key)
    }
}

function start() {
    interval.value = setInterval(() => {
        count.value ++

        if(count.value > 3) {
            count.value = 1
        }

        switchText(count.value)

    }, 3000)
}

onMounted(() => {
    start()
})

watch(() => isChoice.value, () => {
    if(!isChoice.value) {
        start()
    } else {
        clearInterval(interval.value)
    }
})

</script>

<template>
    <section id="o-nas" class="w-full relative scroll-mt-50 snap-start my-20 lg:mb-0">
        <header class="w-full mb-10 flex flex-col">
            <div class="mb-1 w-full bg-indigo-500 flex justify-center items-center rounded-t-lg">
                <h2 class="text-2xl m-0 text-background-light dark:text-background-dark uppercase font-extrabold"> O Nas </h2>
            </div>

            <span class="border border-solid border-b-1 border-indigo-500"/>
        </header>

        
        <div v-if="about?.length != 0" class="w-full relative px-8 md:py-50 box-border z-10 rounded-lg">
            <span class="absolute hidden lg:flex -left-5 -top-5 -z-1">
                <DecorationDots color="#6366f1" />
            </span>

            <div class="w-full h-full flex flex-col md:flex-row justify-center items-center -space-y-4 lg:space-y-0">
                <div class="w-full md:w-1/2 scale-50 md:scale-100 flex justify-center items-center ">
                    <div  class="relative h-100 flex justify-center items-center -space-x-20">
                        <div class="flex flex-col lg:space-y-20">
                            <div
                                v-if="about[0]"
                                @mousemove="switchToMousemoveTarget(3)"
                                @mouseleave="isChoice = false"
                                :class="isSwitchFirstText ? 'scale-100 z-10 animated-2' : 'scale-80 blur-sm -z-1'"
                                class="relative flex flex-col justify-center items-end duration-500 border-box rounded-lg"
                            >
                                <img :src="about[0]?.media?.previewUrl" :alt="about[0]?.media.name" data-aos="fade-down-right" data-aos-duration="1000" class="h-80 z-10 object-cover shadow-xl shadow-black rounded-lg">
                            </div>
    
                            <div
                                v-if="about[2]"
                                @mousemove="switchToMousemoveTarget(2)"
                                @mouseleave="isChoice = false"
                                :class="isSwitchLastText ? 'scale-100  z-10 animated-2' : 'scale-80 blur-sm -z-1'"
                                class=" flex flex-col justify-center items-start duration-500 border-box rounded-lg"
                            >
                                <img :src="about[2]?.media?.previewUrl" :alt="about[2]?.media.name" data-aos="fade-up-left" data-aos-duration="1000" class="h-80 object-cover shadow-xl shadow-black rounded-lg">
                            </div>
                        </div>
    
                        <div
                            v-if="about[1]"
                            @mousemove="switchToMousemoveTarget(1)"
                            @mouseleave="isChoice = false"
                            :class=" isSwitchSecondText? 'sale-100 z-10 animated-1' : 'scale-80 blur-sm -z-1'"
                            class="duration-500 border-box rounded-lg"
                        >
                            <img :src="about[1]?.media?.previewUrl" :alt="about[1]?.media.name" class="h-80 object-cover shadow-xl shadow-black rounded-lg" data-aos="zoom-in" data-aos-delay="500" data-aos-duration="1000">
                        </div>
                    </div>
                </div>
                
                <div class="w-full md:w-1/2 flex flex-col justify-center items-center lg:space-y-2 md:space-y-10 gap-4 lg:gap-8 group box-border" data-aos="zoom-in" data-aos-delay="500" data-aos-duration="1000">
                    <div 
                        v-if="about[0]"
                        @mousemove="switchToMousemoveTarget(3)"
                        @mouseleave="isChoice = false"
                        :class="isSwitchFirstText ? 'scale-100 shadow-xl shadow-black' : 'scale-85 blur-sm'"
                        class="w-full text-center px-7 py-4 box-border  z-10 bg-background-light dark:bg-background-dark  dark:to-second-dark rounded-lg group-hover:blur-sm hover:!blur-none group-hover:scale-85 hover:!scale-100  duration-500"
                    >
                        <p>{{ about[0]?.description }}</p>
                    </div>

                    <div 
                        v-if="about[1]"
                        @mousemove="switchToMousemoveTarget(1)"
                        @mouseleave="isChoice = false"
                        :class="isSwitchSecondText ? 'scale-100 shadow-xl shadow-black z-20' : 'scale-85 blur-sm'"
                        class="w-full text-center px-7 py-4 box-border text-bold z-10 bg-background-light dark:bg-background-dark  rounded-lg group-hover:blur-sm hover:!blur-none group-hover:scale-85 hover:!scale-100 duration-500"
                    >
                        <p>{{ about[1]?.description }}</p>

                    </div>

                    <div
                        v-if="about[2]"
                        @mousemove="switchToMousemoveTarget(2)"
                        @mouseleave="isChoice = false"
                        :class="isSwitchLastText ? 'scale-100 shadow-xl shadow-black' : 'scale-85 blur-sm'"    
                        class="w-full text-center px-7 py-4 box-border text-bold z-10 bg-background-light dark:bg-background-dark  dark:to-second-dark rounded-lg group-hover:blur-sm hover:!blur-none group-hover:scale-85 hover:!scale-100  duration-500"
                    >
                        <p>{{ about[2]?.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.animated-1 {
animation: animated-first 0.5s linear;
}

.animated-2 {
    
animation: animated-second 0.5s linear;
}

@keyframes animated-first {
    0% {
        transform: translateX(0px) scale(.9);
    }

    25% {
        transform: translateX(75px) scale(1);
    }

    50% {
        transform: translateX(150px) scale(1.1);

    }

    75% {
        transform: translateX(75px) scale(1.05);
    }

    100% {
        transform: translateX(0px) scale(1);

    }
}

@keyframes animated-second {
    0% {
        transform: translateX(0px) scale(.9);
    }

    25% {
        transform: translateX(-75px) scale(1);
    }

    50% {
        transform: translateX(-150px) scale(1.1);

    }

    75% {
        transform: translateX(-75px) scale(1.05);
    }

    100% {
        transform: translateX(0px) scale(1);

    }
}
</style>