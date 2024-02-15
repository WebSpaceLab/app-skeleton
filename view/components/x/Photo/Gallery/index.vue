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
    photos: Object,
    isPhotosName: {
        type: Boolean,
        default: false
    },
    isDate: {
        type: Boolean,
        default: false
    },
    action: {
        type: Boolean,
        default: false
    },
    container: {
        type: Boolean,
        default: true
    }
})

const emits = defineEmits(['remove', 'addedToLibrary'])

let isShowPreviewImage = ref(false)
let isShowModalPhotoDetails = ref(false)

const previewImage = ref({})
const photoEdit = ref(null)


function getPreviewImage(photo) {
    previewImage.value = photo
    isShowPreviewImage.value = true
}

function openEditImage(photo) {
    photoEdit.value = photo
    isShowModalPhotoDetails.value = true
}

function removePhoto(id) {
    if (confirm(`Czy jesteś pewny, że chcesz usunąć?`)) {

        emits('remove', id)
    }
}

function addedToLibrary(event) {
    isShowModalPhotoDetails.value = false
    photoEdit.value = null
    isShowPreviewImage.value = false
    isShowModalPhotoDetails.value = false
    emits('addedToLibrary', event)
}
</script>

<template>
    <div  
        class="w-full relative"
        :class="container ? 'container mx-auto' : ''"
    >
        <div class="w-full columns-1 sm:columns-2 lg:columns-4 gap-6">       
            <x-photo-gallery-card 
                v-for="(photo, index) in photos" 
                :key="index" 
                :photo="photo" 
                :action="action" 
                :isDate="isDate" 
                :isPhotosName="isPhotosName"
                @preview="event => getPreviewImage(event)"
            >
                <template #action>
                    <x-btn  @click="getPreviewImage(photo)" color="secondary" icon  :tooltip="{text: 'Podgląd'}" rounded>
                        <Icon name="mdi:eye"  class="text-2xl"/>
                    </x-btn>

                    <x-btn
                        @click="openEditImage(photo)"
                        class="h-9 w-9"
                        :tooltip="{text: 'Edycja'}"
                        color="secondary"
                        rounded
                        icon
                    >
                        <Icon name="material-symbols:edit" class="text-xl" />
                    </x-btn>

                    <x-btn
                        :tooltip="{text: 'Usuń'}"
                        class="h-9 w-9"
                        @click="removePhoto(photo.id)"
                        color="danger"
                        icon
                        rounded
                    >
                        <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                    </x-btn>
                </template>
            </x-photo-gallery-card>
        </div>

        <x-photo-preview
            :isShowPreviewImage="isShowPreviewImage"
            :photos="photos"
            :preview="previewImage"
            @close="(event) => isShowPreviewImage = event"
            @preview="event => previewImage = event"
        />
        
        <x-modal-photo-details
            :show="isShowModalPhotoDetails"
            :file="photoEdit"
            @close="event => isShowModalPhotoDetails = false"
            @addedToLibrary="event => addedToLibrary(event)"
            title="Photo details"
        />
    </div>
</template>