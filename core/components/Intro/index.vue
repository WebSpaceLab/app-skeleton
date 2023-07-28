<script setup lang="ts">
    let start = ref(false)
    let etap2 = ref(false)
    let etap3 = ref(false)
    let end = ref(false)
    let ripple = ref(false)

    onMounted(() => {

        setTimeout(() => {
            start.value = true
        }, 1)

        setTimeout(() => {
            ripple.value = true
        }, 1500)

        setTimeout(() => {
            ripple.value = false
        }, 1600)

        setTimeout(() => {
            ripple.value = true
        }, 2500)

        setTimeout(() => {
            ripple.value = false
        }, 2600)

        setTimeout(() => {
            ripple.value = true
        }, 3750)

        setTimeout(() => {
            ripple.value = false
        }, 3850)

        setTimeout(() => {
            etap2.value = true
            ripple.value = true
        }, 5000)

        setTimeout(() => {
            ripple.value = false
        }, 5100)

        setTimeout(() => {
            etap3.value = true
        }, 5500)

        setTimeout(() => {
            end.value = true
        }, 5700)
    })
</script>

<template>
    <div class="w-screen h-screen flex  justify-center items-center lg:hidden">
        <spinner />
    </div>
    <div class="w-screen h-screen hidden lg:flex justify-center items-center">
        <div class="logo w-50 scale-100  lg:scale-400">
            <transition 
                enter-active-class="transition ease-out duration-200"
                enter-from-class="transform scale-300 -translate-x-full"
                enter-to-class="transform scale-100 translate-x-0"
            >
                <div v-if="etap3" class="w-full h-6 text-3xl font-extrabold">
                    THE
                </div>
            </transition>

            <div class="w-full h-full">
                <div class=" h-10 flex flex-row  items-center" :class="etap3 ? 'justify-end' : 'justify-center'"> 
                    <div class="w-9 h-9 relative flex font- justify-center items-center rounded-full transition-all duration-200 linear" :class="etap2 ? etap3 ? 'scale-100' : 'scale-200' : ''" >
                        <span v-if="ripple" class="ripple"></span>
                        <img v-if="start" src="/images/gif/heart.gif" class="heart w-7 h-7 text-red-800 absolute z-1" alt="hart">
                        <div v-if="etap2" class="w-9 h-9 absolute top-0 left-0 flex font- justify-center items-center rounded-full bg-red-500"></div>
                    </div>

                    <transition 
                        enter-active-class="transition ease-out duration-200"
                        enter-from-class="transform scale-300 translate-y-full"
                        enter-to-class="transform scale-100 translate-y-0"

                    >
                        <div v-if="etap3" class="text-5xl font-black">
                            NE
                        </div>
                    </transition>
                </div>

                <transition 
                    enter-active-class="transition ease-out duration-200"
                    enter-from-class="transform scale-300 translate-x-full"
                    enter-to-class="transform scale-100 translate-x-0 "
                >
                    <div v-if="etap3" class="w-full text-[9px] flex justify-end">
                        PRODUCTIONS
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped>
.logo {
    font-family: 'Lexend Exa', sans-serif;
}

.heart {
    animation: heart 5s linear;
}

.etap-2 {
    animation: etap2 0.3s linear;
}

.ripple {
    position: absolute;
    transform: translate(-50%, -50%) ;
    pointer-events: none;
    border-radius: 50%;
    animation: ripple 0.02s linear;
    background-color: rgba(31, 117, 151, 0.267);
    z-index: 7;
    top: 50%;
    left: 50%;
}

@keyframes ripple {
    0% {
        width: 0;
        height: 0;
        opacity: 0.1;
    }
    25% {
        width: 25vw;
        height: 25vh;
        opacity: 0.8;
    }
    50% {
        width: 50vw;
        height: 50vh;
        opacity: 0.6;
    }
    75% {
        width: 75vw;
        height: 70vh;
        opacity: 0.4;
    }
    100% {
        width: 100vw;
        height: 100vh;
        opacity: 0.2;
    }
}

@keyframes etap2 {

}

@keyframes heart {
    0% {
        width: 50%;
        height: 50%;
        transform: translate(0, 0) scale(1);
        opacity: 1;
    }

    22% {
        width: 75%;
        height: 75%;
        transform: translate(5%, -5%) scale(1);
        opacity: 1;
    }
    25% {
        width: 75%;
        height: 75%;
        transform: translate(15%, -15%) scale(1.1);
        opacity: 0.8;
    }
    27% {
        width: 75%;
        height: 75%;
        transform: translate(15%, -15%) scale(1.05);
        opacity: 0;
    }
    30% {
        width: 75%;
        height: 75%;
        transform: translate(15%, -15%) scale(1);
        opacity: 1;
    }

    47% {
        width: 100%;
        height: 100%;
        transform: translate(-10%, 10%) scale(1);
        opacity: 1;
    }
    50% {
        width: 100%;
        height: 100%;
        transform: translate(-15%, 15%) scale(1.1);
        opacity: 0.8;
    }
    52% {
        width: 100%;
        height: 100%;
        transform: translate(-15%, 15%) scale(1.05);
        opacity: 0;
    }
    55% {
        width: 100%;
        height: 100%;
        transform: translate(-15%, 15%) scale(1);
       opacity: 1;
    }


    72% {
        width: 150%;
        height: 150%;
        transform: translate(10%, -10%) scale(1);
        opacity: 1;
    }
    75% {
        width: 150%;
        height: 150%;
        transform: translate(15%, -15%) scale(1.1);
        opacity: 0.8;
    }
    78% {
        width: 150%;
        height: 150%;
        transform: translate(15%, -15%) scale(1.05);
        opacity: 0;
    }
    80% {
        width: 150%;
        height: 150%;
        transform: translate(15%, -15%) scale(1);
        opacity: 1;
    }


    92% {
        width: 200%;
        height: 200%;
        transform: translate(5%, -5%) scale(1);
        opacity: 1;
    }
    95% {
        width: 200%;
        height: 200%;
        transform: translate(0, 0) scale(1.1);
        opacity: 0.8;
    }
    98% {
        width: 200%;
        height: 200%;
        transform: translate(0, 0) scale(1.05);
        opacity: 0;
    }
    100% {
        width: 200%;
        height: 200%;
        transform: translate(0, 0) scale(1);
        opacity: 1;
    }
}
</style>