<script setup>
const props = defineProps({
    file: Object,
    isFieldSelected: {
        type: Boolean,
        default: true
    }
})

let selected = ref(false)
let isShowFieldAction = ref(false)

watch(() => props.selected, (e) => {
    selected.value = e
})

</script>

<template>
    <div @mouseover="isShowFieldAction = true"  @mouseleave="isShowFieldAction = false" class="w-full relative bg-black  rounded-xl overflow-hidden flex flex-col">
        <div v-if="isFieldSelected" class="absolute left-0 top-2 w-10 text-center z-10">
           <slot name="selected"></slot>
        </div>

        <div v-if="isShowFieldAction" class="w-12 absolute top-0 right-0 flex flex-col justify-center items-center space-y-2 z-10 px-1 py-2 bg-black/80">
            <slot name="action"></slot>
        </div>

        <div class="w-full h-full relative flex justify-center">
            <img v-if="file.mimeType === 'image/jpeg' || file.mimeType === 'image/png' || file.mimeType === 'image/webp'" :src="file.previewUrl" :alt="file.name" class="h-full object-cover" />

            <video v-if="file.mimeType === 'video/mp4'" class="w-full aspect-video" controls>
                <source :src="file.previewUrl" :type="file.mimeType" :title="file.name">
            </video>

            <iframe 
                v-if="file.movieUrl" 
                :src="file.movieUrl" 
                class="w-full aspect-video"
                frameborder="0"
                allowfullscreen
            ></iframe>
        </div>

        <div v-if="file.mimeType === 'image/jpeg' || file.mimeType === 'image/png'" class="absolute bottom-0 left-0 h-10 w-full flex justify-center items-center bg-black/60">
            <p class="px-2 text-white w-80 truncate">{{ file.name }}</p>
        </div>

    </div>
</template>