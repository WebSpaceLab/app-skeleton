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
    file: {
        type: Object
    },
    title: {
        type: String,
        default: 'Photo details'
    },
    personal: Object,
});

const close = () => {
    emits('close', false)
}
</script>

<template>
    <x-modal-dialog
        :show="show"
        :max-width="maxWidth"
        :closeable="closeable"
        @close="close"
        :title="title"
    >
       <div class="w-full h-full py-6 grid grid-cols-1 gap-4  md:flex md:flex-row md:justify-center md:items-start md:space-x-6">
            <div>
                <img :src="personal.media.previewUrl" :alt="personal.media.name" class="h-40 object-cover rounded-xl">
            </div>

            <div>
                <h2 class="text-2xl font-bold text-basic-light dark:text-basic-dark">{{personal.name}}</h2>
                <p class="text-sm text-muted-light dark:text-muted-dark">{{ personal.description }}</p>
            </div>
        </div> 
    </x-modal-dialog>
</template>