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
        class="relative w-full min-h-screen duration-300 box-border md:ml-8 px-8 pt-6"
        :class="[
            $dashboard.sidebar.isShow ?
            $dashboard.sidebar.isRail ? 'md:is-rail-sidebar' : 'md:is-show-sidebar'
                : '',
            container ? 'container mx-auto' : ''
        ]"
    >
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.is-show-sidebar {
    width: calc(100% - 250px);
}

.is-rail-sidebar {
    width: calc(100% - 60px);
}
</style>