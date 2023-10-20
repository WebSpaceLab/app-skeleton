<script setup>
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';
const emits = defineEmits(['close', 'uploadCropImage']);

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '3xl',
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
    media: Object,
    multiple: Boolean,
    file: Object,
});

let cropper = ref(null)

const close = () => {
    emits('close');
};

const uploadedCropImage = () => {
    const { coordinates } = cropper.value.getResult()
    let data = new FormData()

    
    data.append('height', coordinates.height || '')
    data.append('width', coordinates.width || '')
    data.append('left', coordinates.left || '')
    data.append('top', coordinates.top || '')  

    emits('uploadCropImage', data)
    close()
}

function change({ coordinates, canvas }) {
    console.log(coordinates, canvas)
}
</script>

<template>
    <x-modal-dialog
        :show="show"
        max-width="7xl"
        :closeable="closeable"
        @close="close"
        :title="title"
        :minimization="minimization"
    >
        <div class="w-full h-[430px]">
            <Cropper
                class="h-[430px]"
                ref="cropper"
                :src="file"
            />

            <template  >
                <div v-if="!media.uploaded && !media.error" class="w-full bg-gray-400/60 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center">
    
                    <div class="inline-block h-full bg-indigo-600 absolute top-0 left-0" :style="`width: ${media.progress}%`"></div>
    
                    <div class="relative z-10 text-xs font-semibold text-center text-white drop-shadow text-shadow">{{ media.progress }}%</div>
    
                </div>
    
                <div v-if="media.error" class="relative text-xs lg:text-md text-red-600">{{ media.error }}</div>
            </template>
        </div>

        <template #footer>
            <div class="flex space-x-3">
                <x-btn @click="uploadedCropImage" @keydown.enter="uploadedCropImage" type="submit" color="primary-outline" rounded :loading="loading">Apply</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>