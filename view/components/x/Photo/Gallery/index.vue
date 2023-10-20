<script setup>
const props = defineProps({
    name: {
        type: String,
        default: 'Name Section'
    },
    description: {
        type: String,
        default: 'Adding description section' 
    },
    transition: {
       type: Boolean,
       defaultL: true
    },
    photos: Object
})

let isShowPreviewImage = ref(false)
const previewImage = ref()

function getPreviewImage(photo) {
    previewImage.value = photo
    isShowPreviewImage.value = true
}
</script>

<template>
    <div  class="w-full container mx-auto relative">
        <div class=" lg:columns-4 gap-x-8 pt-2">
            <figure data-aos="fade-left" class="rounded-xl [break-inside:avoid]" v-for="photo in photos" :key="photo.id">
                <img 
                    @click="getPreviewImage(photo)"
                    class="w-full rounded-lg cursor-pointer duration-300 hover:shadow-lg hover:shadow-black"
                    :src="photo.previewUrl"
                    :alt="photo.name"
                />

                <!--
                    <figcaption class="mt-2">{{ photo.name }}</figcaption>
                -->


                <p class="text-sm text-gray-500 line-clamp-2">{{ photo.description }}</p>
            </figure>

        </div>

        <div class="w-full flex justify-center items-center">
            <Spinner class="w-10 h-10 "  :loading="false"/>
        </div>

        <x-photo-preview
            :isShowPreviewImage="isShowPreviewImage"
            :photos="photos"
            :preview="previewImage"
            @close="(event) => isShowPreviewImage = event"
            @preview="event => previewImage = event"
        />    
    </div>
</template>