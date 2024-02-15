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
        default: 'Price package - edit'
    },
    
    pricePackage: {
        type: Object,
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
        <x-form-price-package-edit :pricePackage="pricePackage" @addedToLibrary="addedToLibrary" :is-close="!show" />
    </x-modal-dialog>
</template>