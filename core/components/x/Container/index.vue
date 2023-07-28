<script setup>
const props = defineProps({
    isShowSidebar: {
        type: Boolean,
        default: false,
    },
    isRailSidebar: {
        type: Boolean,
        default: false,
    },
    container: {
        type: Boolean,
        default: false,
    }
});

</script>

<template>
    <div
        class="relative w-full duration-300 px-8 pt-6"
        :class="[
            isShowSidebar ?
                isRailSidebar ? 'is-rail-sidebar' : 'is-show-sidebar'
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