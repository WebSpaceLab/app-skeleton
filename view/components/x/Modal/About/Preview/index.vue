<script setup>
const emits = defineEmits(['close']);

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '4xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    category: {
        type: Object
    },
    title: {
        type: String,
        default: 'Photo details'
    },
});

const close = () => {
    emits('close', false)
}
</script>

<template>
    <x-modal-dialog
        :show="show"
        max-width="max"
        :closeable="closeable"
        @close="close"
        :title="title"
    >   
        <div class="w-full container mx-auto px-30">
            <section-about :about="$homepage.data.about" />
        </div>

       <template #footer>
            <div class="flex space-x-3">
            </div>
       </template>
    </x-modal-dialog>
</template>