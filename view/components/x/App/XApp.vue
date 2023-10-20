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

        <div v-else class="w-full h-screen flex justify-center items-center">
            <Spinner :loading="loading"/>
        </div>
    </div>
</template>

<style>
    /* body {
        @apply w-screen  m-0 p-0;
    } */
</style>