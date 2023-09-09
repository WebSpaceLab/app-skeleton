<script setup lang="ts">
const props = defineProps({
    loading: {
        type: Boolean,
        default: true
    }
})
</script>

<template>
    <div id="app" class="w-screen overflow-hidden box-border font-sans">
        <div v-if="!loading" class="w-full">
            <slot />
        </div>

        <div v-else class="w-screen h-screen flex justify-center items-center">
            <Spinner :loading="loading"/>
        </div>
    </div>
</template>

<style>
    body {
        @apply bg-background-light dark:bg-background-dark text-basic-light dark:text-basic-dark box-border overflow-x-hidden m-0 p-0;
    }
</style>