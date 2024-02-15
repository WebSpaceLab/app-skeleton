<script setup>
const {$hero } = useNuxtApp()

const emits = defineEmits(['close', 'addedToLibrary']);

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

let isSwitch = ref(false)
let isShowPreviewImage = ref(false)
let isShowModalPhotoDetails = ref(false)
let isShowModalPhotoGallery = ref(false)

const previewImage = ref({
    previewUrl: '/no-image-icon.png',
    name: 'No image'
})

const close = () => {
    resetForm()
    emits('close', false)
}

const form = reactive({
    name: '',
    description: '',
    mediaId: null,
    isActive: false,
})

const resetForm = () => {
    form.name = ''
    form.description = ''
    form.mediaId = null
    form.isActive = false
    previewImage.value.previewUrl = '/no-image-icon.png'
    previewImage.value.name = 'No image'
    $hero.errors = null
}

const create = async () => {
    await $hero.create(form)

    if($hero.errors) {
        return
    }

    close()
    emits('addedToLibrary', true)
}

async function deletedPreviewImage(mediaId) {
    if (confirm(`Czy na pewno chcesz usunąć ten plik?`)) {
        try {
            await $mediaStore.deletedMedia(mediaId)

            resetPreviewImage()
        } catch (error) {
            console.error(error)
        }
    }
}

function resetPreviewImage() {
    previewImage.value = {
        previewUrl: '/no-image-icon.png',
        name: 'No image'
    }
}

function openEditPreviewImage(file) {
    previewImage.value = file
    isShowModalPhotoDetails.value = true
}

const addedToLibrary = (event) => {
    if(event) {
        previewImage.value = event
        form.mediaId = previewImage.value.id
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
    >
        <form class="w-full h-full flex flex-col justify-center items-start space-y-6 py-6">
            <div class="w-full h-60 flex justify-center items-start space-x-6">
                <div class="w-full h-full">
                    <x-photo-card
                        :file="previewImage"
                    >
                        <template #action>
                            <x-btn v-if="previewImage.id" @click="isShowPreviewImage = true" color="secondary-outline" icon  :tooltip="{text: 'Preview'}" rounded>
                                <Icon name="mdi:eye"  class="text-2xl"/>
                            </x-btn>
    
                            <x-btn
                                v-if="previewImage.id"
                                @click="openEditPreviewImage(previewImage)"
                                class="h-9 w-9"
                                :tooltip="{text: 'Edit'}"
                                color="secondary-outline"
                                rounded
                                icon
                            >
                                <Icon name="material-symbols:edit" class="text-xl" />
                            </x-btn>
    
                            
                            <x-btn
                                v-if="previewImage.id"
                                :tooltip="{text: 'Deleted'}"
                                class="h-9 w-9"
                                @click="deletedPreviewImage(previewImage.id)"
                                color="danger-outline"
                                icon
                                rounded
                            >
                                <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                            </x-btn>
                        </template>
                    </x-photo-card>
    
                    <p v-if="$hero.errors && $hero.errors.mediaId " class="text-sm text-error-600 m-0 ">{{ $hero.errors.mediaId }}</p>
                </div>

                <div class="w-full h-full flex flex-col justify-between items-start space-y-6">
                    <div>
                        <x-btn
                            @click="isShowModalPhotoGallery = true"
                            class="h-9"
                            color="secondary-outline"
                            shadow
                            rounded
                            icon-left
                        >
                            <template #icon-left>
                                <Icon name="material-symbols:attach-file-add-rounded" class="text-xl" />
                            </template>

                            Add Image from media
                        </x-btn>
                    </div>

                    <div class="w-full ">
                        <x-input
                            v-model="form.name"
                            color="blue"
                            label="Name"
                            :error="$hero.errors && $hero.errors.name ? $hero.errors.name : ''"
                        />
        
                    </div>

                    <div class="flex flex-row justify-center items-center w-full h-9 mb-6">
                        <div class="w-1/3 h-full">
                            <div class="flex w-full justify-start items-center ">
                                <span v-if="isSwitch" class="mr-3 text-sm font-medium text-green-500">Status</span>
                                <span v-else class="mr-3 text-sm font-medium text-red-500">Status</span>
        
                                <label for="toggle-social-create" class="inline-flex relative items-center mr-5 cursor-pointer">
                                    <input @click="isSwitch = !isSwitch" v-model="form.isActive" type="checkbox" :value="isSwitch" id="toggle-social-create" class="sr-only peer" checked>
                                    
                                    <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
        
                            <p v-if="$hero.errors && $hero.errors.isActive " class="text-sm text-error-600 m-0 ">{{ $hero.errors.isActive }}</p>
                        </div>
                    </div>
                </div>
            </div>
            

            <div class="w-full">
                
                <div class="flex w-full justify-start items-center space-x-4">
                    <x-textarea
                        v-model="form.description"
                        label="Description"
                        :error="$hero.errors && $hero.errors.description ? $hero.errors.description : ''"
                        :rows="5"
                    />
                </div>
            </div>
        </form>

        <x-modal-photo-gallery
            :show="isShowModalPhotoGallery"
            @close="(event) => isShowModalPhotoGallery = event"
            @addedToLibrary="addedToLibrary"
            max-width="max"
            title="Gallery"
            :multiple="false"
        />

        <x-modal-photo-details
            :show="isShowModalPhotoDetails"
            :file="previewImage"
            @close="(event) => isShowModalPhotoDetails = event"
            @addedToLibrary="addedToLibrary"
            title="Photo edit"
        />

        <div v-if="previewImage">
            <x-photo-preview
                :isShowPreviewImage="isShowPreviewImage"
                :preview="previewImage"
                :photos="[previewImage]"
                @close="event => isShowPreviewImage = event"
            />
        </div>

       <template #footer>
            <div class="flex space-x-3">
                <x-btn @click="resetForm" type="submit" color="primary-outline" rounded >Reset</x-btn>
                <x-btn @click.prevent="create" @keydown.enter="create" type="submit" color="primary-outline" rounded :loading="$hero.isLoading" :disabled="!form.name || !form.mediaId">Create</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>