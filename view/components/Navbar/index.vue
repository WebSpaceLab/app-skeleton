<script setup>
const {$navbar} = useNuxtApp()

const props = defineProps({
    isShowMenu: Boolean,
    container: {
        type: Boolean,
        default: false 
    }
})

onMounted(() => {
    $navbar.scrollNavbar()
})
</script>

<template>
    <nav id="main-nav" class="w-screen  box-border backdrop-blur h-20 shadow-lg shadow-black " :class="$navbar.isScroll ? 'fixed top-0 left-0 bg-background-light/40 dark:bg-background-dark/40' : 'relative lg:h-30 bg-background-light dark:bg-background-dark/60'">
        <div class="h-full w-full flex items-center justify-center lg:justify-between " :class="[container ? 'container mx-auto ' : '']">
            <div class="hidden lg:flex w-60 z-10">
                <slot name="logo" />
            </div>
        
            <div class="lg:hidden absolute top-6 left-0 px-3">
                <x-btn @click="$navbar.openMenuSm" class="btn-primary-outline" strip ring icon>
                    <template #icon>
                        <Icon name="la:bars" class="text-xl"/>
                    </template>
                </x-btn>
            </div>

            <div class="w-full hidden lg:block">
                <transition
                    enter-active-class="transition ease-out duration-300"
                    enter-from-class="transform  -translate-y-200"
                    enter-to-class="transform  translate-y-0"
                    leave-active-class="transition ease-in duration-300"
                    leave-from-class="transform -translate-y-0"
                    leave-to-class="transform -translate-y-100"
                >
                    <div class="relative w-full flex justify-around items-center " :class="isShowMenu || $navbar.isScroll ? 'show-content px-3' : 'hidden-content'">
                        <div class="flex w-full h-20 justify-center items-center space-x-10">
                            <slot name="content" />
                        </div>
    
                        <div class="w-70 flex  justify-end pr-6">
                            <slot name="action" />
                        </div>
                    </div>
                </transition>
            </div>

            <div class="absolute top-5 right-0 lg:hidden flex justify-center items-center box-border">
                <slot name="action" />
            </div>
        </div>

        
        <transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="transform -translate-x-100"
            enter-to-class="transform -translate-x-0"
            leave-active-class="transition ease-in duration-300"
            leave-from-class="transform -translate-x-0"
            leave-to-class="transform -translate-x-100"
        >
            <div v-if="$navbar.isShowSm" class="h-screen  fixed top-0 left-0 lg:hidden z-60 bg-background-light/90 dark:bg-background-dark/90">
                <div class="w-full h-screen relative flex flex-col justify-start items-start ">
                    <div class="h-10 absolute top-3 left-3">
                        <x-btn @click="$navbar.closeMenuSm" class="btn-danger-outline" strip ring icon>
                            <template #icon>
                                <Icon name="ic:baseline-close" class="text-xl"/>
                            </template>
                        </x-btn>
                    </div>

                    <!--    
                        <div class="relative w-60 -translate-x-10">
                            <slot name="logo" />
                        </div>
                    -->
                    <div class="mt-10 w-screen">

                        <slot name="content" />
                    </div>
                </div>
            </div>
        </transition>

        <div class="hidden lg:flex w-screen">

            <slot name="dropdown-field"></slot>
        </div>
    </nav>
</template>

<style scoped>
/* .show-content {
    animation: show-content 1s linear;
}

.hidden-content {
    animation: hidden-content 1s linear;
}

.logo-in-left {
    animation: in-left .5s linear;
} */

@keyframes show-content {
    0% {
        width: 0;
        transform: translateY(-50px);
        opacity: 0;
    }
    25% {
        width: 10%;
        transform: translateY(0);
        opacity: 0;
    }
    50% {
        width: 50%;
        transform: translateY(0);
        opacity: 0.3;
    }

    75% {
        width: 75%;
        transform: translateY(0);
        opacity: .6;
    }

    100% {
        width: 100%;
        transform: translateY(0);
        opacity: .9;
    }
}

@keyframes hidden-content {
    0% {
        width: 100%;
        transform: translateY(0);
        opacity: 1;
    }
    25% {
        width: 75%;
        transform: translateY(0);
        opacity: 1;
    }
    50% {
        width: 50%;
        transform: translateY(0);
        opacity: 1;
    }

    75% {
        width: 10%;
        transform: translateY(0);
        opacity: 0;
    }

    100% {
        width:  0;
        transform: translateY(-50px);
        opacity: 0;
    }
}


@keyframes in-left {
    0% {
        transform: translateX(50vw);
    }
    25% {
        transform: translateX(37vw);
    }
    50% {
        transform: translateX(25vw);
    }

    75% {
        transform: translateX(12vw);
    }

    100% {
        transform: translateX(0);
    }
}
</style>