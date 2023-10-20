<script setup>
const {$about } = useNuxtApp()

const emits = defineEmits(['close', 'addedToLibrary']);

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: 'xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },

    title: {
        type: String,
        default: 'Price package create'
    },
    priceListId: {
        type: Number,
        default: null
    }
});


const close = () => {
    emits('close', false)
}

const addedToLibrary = (event) => {
    emits('addedToLibrary', event)
    close()
}
</script>

<template>
    <x-modal-dialog
        :show="show"
        :max-width="maxWidth"
        :closeable="closeable"
        @close="close"
        :title="title"
        :footer="false"
    >
        <x-form-price-package-create :priceListId="priceListId" @addedToLibrary="addedToLibrary" />
    </x-modal-dialog>
</template>