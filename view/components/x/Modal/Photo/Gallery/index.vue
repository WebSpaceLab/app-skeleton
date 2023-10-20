<script setup>
const emits = defineEmits(['close', 'addedToLibrary']);

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
    multiple: Boolean,
    currentImages: Array
});

const close = (event) => {
    emits('close', event);
};

const addedToLibraryGallery = (event) => {
    if(event) {
        emits('addedToLibrary', event);
    }
}

const addedToLibraryDropzone = (event) => {
    if(event) {
        emits('addedToLibrary', [event.id]);
    }
}
</script>

<template>
    <x-modal-dialog
        :show="show"
        :max-width="maxWidth"
        :closeable="closeable"
        @close="close"
        :title="title"
        :minimization="minimization"
    >
        <x-tabs :tabs="['library', 'add from assets']">
            
            <template #tab-0>
                <x-section-gallery  @addedToLibrary="addedToLibraryGallery" @close="close" :multiple="multiple" :currentImages="currentImages" />
            </template>
            
            <template #tab-1>
                <div class="py-6">
                    <x-photo-dropzone @addedToLibrary="addedToLibraryDropzone" :multiple="multiple"/>
                </div>
            </template>
        </x-tabs>
    </x-modal-dialog>
</template>