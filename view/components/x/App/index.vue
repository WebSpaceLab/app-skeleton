<script setup lang="ts">
const props = defineProps({
    loading: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
    <div id="app" class="w-screen box-border font-sans bg-background-light dark:bg-background-dark text-basic-light dark:text-basic-dark">
        <div v-if="!loading" class="w-full">
            <slot />
        </div>

        <div v-else class="w-full relative h-screen flex justify-start items-center">
            <div  class="z-1 overlay block overflow-hidden h-screen w-screen absolute bottom-0 right-0 bg-gradient-to-tl from-blue via-blue bg-dark" ></div>

            <Spinner :loading="loading" class="z-10"/>
        </div>
    </div>
</template>

<style>
    .overlay {
        clip-path: circle(50% at 20% 56%);
    }
</style>