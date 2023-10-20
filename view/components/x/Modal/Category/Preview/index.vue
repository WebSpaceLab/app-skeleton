<script setup>
const emits = defineEmits(['close']);

defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '7xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        default: 'Add new assets'
    },
    minimization: {
        type: Boolean,
        default: false
    },
    category: Object
});

const close = (event) => {
    emits('close', event);
};

</script>

<template>
    <x-modal-dialog
        :show="show"
        max-width="max"
        :closeable="closeable"
        @close="close"
        :title="title"
        :minimization="minimization"
    >
        <div class="w-full">
            <section-category :category="category" />
        </div>
    </x-modal-dialog>
</template>