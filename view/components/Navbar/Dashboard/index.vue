<script setup>

</script>

<template>
    <div
        :class="[
            $navbar.isScroll ? 'backdrop-blur' : '',
        ]"

        class="w-full fixed top-0 left-0 h-20 transition-all duration-500 shadow-black shadow-lg  bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark"
    >
        <div class=" h-full flex items-center justify-center lg:justify-between ">
            <div class="relative  hidden lg:flex">
                <slot name="bar" />
            </div>
        
            <div  class="lg:hidden absolute top-6 left-0">
                <slot name="bar" />
            </div>

            <div class="w-full hidden lg:block ">
                <div class="relative w-full flex justify-around items-center">
                    <div class="flex w-full justify-center items-center space-x-10 ">
                        <slot name="content" />
                    </div>

                    <div class="w-70 flex justify-end items-center pr-6 box-border ">
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