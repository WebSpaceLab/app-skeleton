<script setup>
const props = defineProps({
    container: {
        type: Boolean,
        default: false,
    }
});

</script>

<template>
    <div
        class="relative w-full flex min-h-screen transition-all duration-500 box-border "
        :class="[
            $dashboard.sidebar.isRightSide ? 'justify-start' : 'justify-end',

            container ? 'container mx-auto' : ''
        ]"
    >
        <slot />
    </div>
</template>