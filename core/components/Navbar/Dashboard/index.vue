<script setup>
const {$navbar} = useNuxtApp()

const props = defineProps({
    isShowSidebar: {
        type: Boolean,
    },
    isRailSidebar:  {
        type: Boolean,
    },
})

onMounted(() => {
    $navbar.scrollNavbar()
})
</script>

<template>
    <div
        :class="[
            $navbar.isScroll ? 'fixed top-0 right-0 backdrop-blur ' : 'relative',
            isShowSidebar ?
                isRailSidebar ? 'is-rail-sidebar ' : 'is-show-sidebar'
                : 'w-screen',
        ]"
        id="main-nav"
        class="h-20 duration-300 shadow-black shadow-lg  bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark"
    >
        <div class=" h-full flex items-center justify-center lg:justify-between ">
            <div class="relative  hidden lg:flex">
                <slot name="bar" />
            </div>
        
            <div  class="lg:hidden absolute top-6 left-0 px-3">
                <slot name="bar" />
            </div>

            <div class="w-full hidden lg:block">
                <div class="relative w-full flex justify-around items-center">
                    <div class="flex w-full justify-center items-center space-x-10">
                        <slot name="content" />
                    </div>

                    <div class="w-70 flex  justify-end pr-6">
                        <slot name="action" />
                    </div>
                </div>
            </div>

            <div class="absolute top-5 right-5 lg:hidden flex justify-center items-center mr-4">
                <slot name="action" />
            </div>
        </div>

    </div>


</template>

<style scoped>
.is-show-sidebar {
    width: calc(100vw - 250px);
}

.is-rail-sidebar {
    width: calc(100vw - 60px);
}
</style>