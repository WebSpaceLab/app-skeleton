<script setup>
import axios from '~/plugins/axios'

const {$categories, $flash } = useNuxtApp()
const $axios = axios().provide.axios

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
    offer: {
        type: Object 
    }
});

const loading = ref(false)
const errors = ref(null)

let isSwitch = ref(false)
let isShowPreviewImage = ref(false)
let isShowModalPhotoDetails = ref(false)
let isShowModalPhotoGallery = ref(false)

const previewImage = ref({
    preview_url: '/no-image-icon.png',
    name: 'No image'
})

const close = () => {
    emits('close')
}

const resetForm = () => {
    form.name = ''
    form.description = ''
    form.media_id = null
    form.status = false
    form.offer_id = null
    form.transition ='fade-up'
}

const create = async () => {
    errors.value = null
    loading.value = true
    await $categories.addCategory(form).then((data) => {
        loading.value = false
        emits('addedToLibrary', true)
        resetForm()
        close()
    }).catch(err => {
        errors.value = err.response.data.errors
    })
}

const form = reactive({
    name: '',
    description: '',
    media_id: null,
    status: false,
    offer_id: null,
    transition: 'fade-up',
})


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
        preview_url: '/no-image-icon.png',
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
        form.media_id = previewImage.value.id
    }
}

watch(() => props.show, () => {
    if(props.offer) {
        form.offer_id = props.offer.id
    }
})
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
    
                    <p v-if="errors && errors.media_id " class="text-sm text-error-600 m-0 ">{{ errors.media_id[0] }}</p>
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
                            :error="errors && errors.name ? errors.name[0]: ''"
                        />
        
                    </div>

                    <div class="flex flex-row justify-center items-center w-full h-9 mb-6">
                        <div class="w-1/3 h-full">
                            <div class="flex w-full justify-start items-center ">
                                <span v-if="isSwitch" class="mr-3 text-sm font-medium text-green-500">Status</span>
                                <span v-else class="mr-3 text-sm font-medium text-red-500">Status</span>
        
                                <label for="toggle-social-create" class="inline-flex relative items-center mr-5 cursor-pointer">
                                    <input @click="isSwitch = !isSwitch" v-model="form.status" type="checkbox" :value="isSwitch" id="toggle-social-create" class="sr-only peer" checked>
                                    
                                    <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                </label>
                            </div>
        
                            <p v-if="errors && errors.status " class="text-sm text-error-600 m-0 ">{{ errors.status[0] }}</p>
                        </div>
        
                        <div class="w-2/3 h-full flex justify-center items-center mb-6">
                            <x-select-transition
                                v-model="form.transition"
                                :error="errors && errors.transition ? errors.transition[0]: ''"
                            />
                        </div>
        
                    </div>
                </div>
            </div>
            

            <div class="w-full">
                
                <div class="flex w-full justify-start items-center space-x-4">
                    <x-textarea
                        v-model="form.description"
                        label="Description"
                        :error="errors && errors.description ? errors.description[0] : ''"
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
                <x-btn @click="create" @keydown.enter="create" type="submit" color="primary-outline" rounded :loading="loading" :disabled="!form.name || !form.media_id">Create</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>