<script setup>
    defineProps({
        to: String,
    });
</script>

<template>
    <NuxtLink
        :to="to"
        class="relative flex justify-center items-center w-full decoration-none py-2 text-sm leading-5 focus:outline-none focus:border-focus transition hover:bg-hover-800 hover:text-hover-200 cursor-pointer"
        :class="[]"
    >
        <slot />
    </NuxtLink>
</template>