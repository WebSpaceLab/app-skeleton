<script setup>
</script>

<template>
    <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 scale-x-0"
        enter-to-class="transform opacity-100 scale-x-100"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="transform opacity-100 scale-x-100"
        leave-to-class="transform opacity-0 scale-x-0 "
    >
        <div
            v-if="$navbar.isNavbarDropdown"
            @mousemove="$navbar.activate()"
            @mouseleave="$navbar.close()"
            class=" w-full absolute bottom-0 left-0 lg:flex justify-center  translate-x-[100%] lg:translate-x-0 lg:translate-y-[100%] bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-sm shadow-xl shadow-black border-solid-y border-slate-600 dark:border-slate-400 z-50"
        >
            <div class="h-full w-full lg:container lg:mx-auto flex justify-center">
                <slot />
            </div>
        </div>
    </transition>
</template>