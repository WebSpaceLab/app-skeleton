<script setup>
const emits = defineEmits(['close']);

defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
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
    offer: Object
});

const close = (event) => {
    emits('close', event)
}

let isHoverCard = ref(false)

function hoverCard(event) {
    isHoverCard.value = event.hover
}
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
            <section-offer :offer="offer" />
        </div> 
    </x-modal-dialog>
</template>