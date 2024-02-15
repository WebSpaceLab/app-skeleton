<script setup>
const props = defineProps({
    name: {
        type: String,
        default: 'Default'
    },
    color: {
        type: String,
        default: 'blue'
    }
});
</script>

<template>
    <span
        class="w-auto h-5 inline-flex items-center py-0 px-1 space-x-1  font-medium cursor-pointer  rounded-xl"
        :class="[
            color ? `badge-${color}` : 'badge-secondary-outline',
        
        ]"
    >
        <p class="text-xs p-0 m-0">
            {{ name }}
        </p>

        <span class="w-full">
            <slot name="action"></slot>
        </span>
    </span>
</template>