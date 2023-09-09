<script setup>
import axios from '~/plugins/axios'

const {$mediaStore, $userStore, $flash } = useNuxtApp()
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
    file: {
        type: Object
    },
    title: {
        type: String,
        default: 'Photo details'
    }
});

const loading = ref(false)
const errors = ref(null)
const SwitchFile = ref()
const fileDetails = reactive({
    previewUrl: '',
    description: '',
    name: '',
    mime_type: '',
    size: '',
    created_at: '',
})
const media = reactive({
    progress: null,
    uploaded: false,
    error: null
})

let isShowModalPhotoCropper = ref(false)
let uploadedImage = ref(null)
let uploadedImageUrl = ref(null)
const close = () => {
    emits('close', false)
}

let isDisabled = ref(true)


async function updated () {
    loading.value = true
    errors.value = null

    await $mediaStore.updatedMedia(props.file.id, {
        id: props.file.id,
        name: fileDetails.name,
        description: fileDetails.description,
    }).then(({media}) => {
        console.log(media)
        emits('addedToLibrary', media)
        resetFileDetails()
        close()
    }).catch((error) => {
        errors.value = error.response.data.errors
    }).finally(() => {
        loading.value = false
        disabled.value = true
    })

}

function onSelectedFiles($event) {
    uploadedImage.value = $event.target.files[0]

    uploadedImageUrl.value = URL.createObjectURL(uploadedImage.value)

    isShowModalPhotoCropper.value = true
}

function uploadCropImage(data) {    
    data.append('image', uploadedImage.value || '')

    $axios.post(`/api/media/${ props.file.id }/update-file`, data, {
        onUploadProgress: (event) => {
            media.progress = Math.round(event.loaded * 100 / event.total);
        },
    })
    .then(({data}) => {
        emits('addedToLibrary', data.file)

        fileDetails.previewUrl = data.file.previewUrl
        fileDetails.description = data.file.description
        fileDetails.name = data.file.name
        fileDetails.mime_type = data.file.mime_type
        fileDetails.size = data.file.size
        fileDetails.created_at = data.file.created_at
        
        $flash.success(data.flash.message)
    })
    .catch(error => {
        media.error = 'Uploaded Fail. Please try again later;';

        if (error?.response.status === 422) {
            media.error = error.response.data.errors.file[0];
        }
        
        $flash.error(media.error)
    }).finally(() => {
        media.uploaded = true
    })
}

const resetFileDetails = () => {
    
    fileDetails.previewUrl = ''
    fileDetails.description = ''
    fileDetails.name = ''
    fileDetails.mime_type = ''
    fileDetails.size = ''
    fileDetails.created_at = ''
}



watch(() => props.file, (file) => {
    if(file) {
        fileDetails.created_at = file.created_at ? file.created_at : ''
        fileDetails.size = file.size ? file.size : ''
        fileDetails.mime_type = file.mime_type ? file.mime_type : ''
        fileDetails.name = file.name ? props.file.name : ''
        fileDetails.description = file.description ? file.description : ''
        fileDetails.previewUrl = file.previewUrl ? file.previewUrl : ''
    }
})

watch(() => fileDetails.name, () => {
    if(!fileDetails.name || fileDetails.name === props.file.name) {
        isDisabled.value = true
    } else [
        isDisabled.value = false
    ]
})

watch(() => fileDetails.description, () => {
    if(!fileDetails.description || fileDetails.description === props.file.description) {
        isDisabled.value = true
    } else [
        isDisabled.value = false
    ]
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
       <div class="w-full h-full flex flex-row justify-center items-start space-x-6">
         <div >
            <x-photo-card :file="fileDetails" :isFieldSelected="false" >
                <template #action>
                    <label class=" px-2 h-9 inline-flex items-center rounded-xl border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <Icon name="material-symbols:cameraswitch-sharp"  class="text-2xl"/>

                        <input ref="SwitchFile" @input="onSelectedFiles" type="file" name="SwitchFile"  class="sr-only">
                    </label>
                </template>
            </x-photo-card>
            
            <template  >
                <div v-if="!media.uploaded && !media.error" class="w-full bg-gray-400/60 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center">
    
                    <div class="inline-block h-full bg-indigo-600 absolute top-0 left-0" :style="`width: ${media.progress}%`"></div>
    
                    <div class="relative z-10 text-xs font-semibold text-center text-white drop-shadow text-shadow">{{ media.progress }}%</div>
    
                </div>
    
                <div v-if="media.error" class="relative text-xs lg:text-md text-red-600">{{ media.error }}</div>
            </template>
         </div>

         <div class="w-full h-full flex flex-col justify-center space-y-6 py-6">
            <div class="w-full p-6 box-border grid grid-cols-2 gap-4 bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark rounded-lg">
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase  m-0  text-white drk:text-black text-bold">Size</p>  {{ fileDetails.size }}
                </span>

                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold ">Dimensions</p>  
                </span>

                
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold">Date</p>  {{ fileDetails.created_at  }}
                </span>

                
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold">Mime-Type</p> {{ fileDetails.mime_type }}
                </span>

                
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold">Asset ID</p>  {{ fileDetails.id }}
                </span>
            </div>

            <div class="flex flex-col space-y-6">
                <div>
                    <x-input v-model="fileDetails.name" label="Name" color="blue" :error="errors && errors.name ? errors.name[0] : ''" />
                </div>

                <div>
                    <x-textarea v-model="fileDetails.description" label="Description" color="blue" :rows="5" :cols="20" :error="errors && errors.description ? errors.description[0] : ''" />
                </div>
            </div>
         </div>
       </div> 

       <x-modal-photo-cropper
            :show="isShowModalPhotoCropper"
            :file="uploadedImageUrl"
            :media="media"
            @close="event => isShowModalPhotoCropper = event"
            @uploadCropImage="uploadCropImage"
            title="Photo cropper"
        />
       
       <template #footer>
            <div class="flex space-x-3">
                <x-btn @click="updated" @keydown.enter="updated" type="submit" color="primary-outline" rounded :loading="loading" :disabled="isDisabled
                ">Update</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>