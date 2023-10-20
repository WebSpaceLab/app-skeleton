<script setup>
import axios from '~/plugins/axios'

const {$media, $auth, $flash } = useNuxtApp()
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

const errors = ref(null)
const SwitchFile = ref()
const fileDetails = reactive({
    id: '',
    previewUrl: '',
    description: '',
    name: '',
    mimeType: '',
    size: '',
    author: {},
    createdAtAgo: '',
    updatedAtAgo: '',
})
const media = reactive({
    progress: null,
    uploaded: false,
    error: null
})

// let isShowModalPhotoCropper = ref(false)
let uploadedImage = ref(null)
// let uploadedImageUrl = ref(null)
const close = () => {
    emits('close', false)
}

let isDisabled = ref(true)


async function updated () {
    errors.value = null
    try {
        await $media.updatedMedia(props.file.id, {
            name: fileDetails.name,
            description: fileDetails.description,
        })

        emits('addedToLibrary')
        resetFileDetails()
        close()
    } catch (error) {
        resetFileDetails()
    }
}

function onSelectedFiles($event) {
    uploadedImage.value = $event.target.files[0]

    // uploadedImageUrl.value = URL.createObjectURL(uploadedImage.value)
    // TODO: Jeśli utworzony zostanie 'cropper' w Symfony to należało by włączyć ten komponent
    // isShowModalPhotoCropper.value = true
    
    uploadImage()
}

function uploadImage(data = null) {    
    let form = new FormData;
    form.append('file', uploadedImage.value)

    $axios.post(`/api/media/${ props.file.id }`, form, {
        headers: {
            "Authorization": 'Bearer ' + $auth.token,
        },
        onUploadProgress: (event) => {
            media.progress = Math.round(event.loaded * 100 / event.total);
        },
    })
    .then(({data}) => {
        emits('addedToLibrary', data.media)

        fileDetails.id = data.media.id
        fileDetails.previewUrl = data.media.previewUrl
        fileDetails.description = data.media.description
        fileDetails.name = data.media.name
        fileDetails.mimeType = data.media.mimeType
        fileDetails.size = data.media.size
        fileDetails.author = data.media.author
        fileDetails.createdAtAgo = data.media.createdAtAgo
        fileDetails.updatedAtAgo = data.media.updatedAtAgo
        
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
    fileDetails.id = ''
    fileDetails.previewUrl = ''
    fileDetails.description = ''
    fileDetails.name = ''
    fileDetails.mimeType = ''
    fileDetails.size = ''
    fileDetails.author = {}
    fileDetails.createdAtAgo = ''
    fileDetails.updatedAtAgo = ''
}



watch(() => props.file, (file) => {
    if(file) {
        fileDetails.id = file.id ? file.id: ''
        fileDetails.createdAtAgo = file.createdAtAgo ? file.createdAtAgo : ''
        fileDetails.updatedAtAgo= file.updatedAtAgo ? file.updatedAtAgo : ''
        fileDetails.size = file.size ? file.size : ''
        fileDetails.mimeType = file.mimeType ? file.mimeType : ''
        fileDetails.name = file.name ? props.file.name : ''
        fileDetails.author = file.author ? file.author : {}
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
       <div class="w-full h-full grid grid-cols-1 gap-4  md:flex md:flex-row md:justify-center md:items-start md:space-x-6">
            <div >
                <x-card-media class="h-60" :file="fileDetails" :isFieldSelected="false" >
                    <template #action>
                        <label class="px-2 h-9 inline-flex items-center rounded-xl border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <Icon name="material-symbols:cameraswitch-sharp"  class="text-2xl"/>

                            <input ref="SwitchFile" @input="onSelectedFiles" type="file" name="SwitchFile"  class="sr-only">
                        </label>
                    </template>
                </x-card-media>
                
                <template >
                    <div v-if="!media.uploaded && !media.error" class="w-full bg-gray-400/60 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center">
        
                        <div class="inline-block h-full bg-indigo-600 absolute top-0 left-0" :style="`width: ${media.progress}%`"></div>
        
                        <div class="relative z-10 text-xs font-semibold text-center text-white drop-shadow text-shadow">{{ media.progress }}%</div>
                    </div>

                    <div v-if="media.error" class="relative text-xs lg:text-md text-red-600">{{ media.error }}</div>
                </template>
            </div>

            <div class="w-full h-full flex flex-col justify-center space-y-6 py-6 box-border">
                <div class="w-full p-6 box-border grid grid-cols-2 gap-4 bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark rounded-lg">
                    <span class="text-muted-light dark:text-muted-dark">
                        <p class="uppercase  m-0  text-white drk:text-black text-bold">Size</p>  {{ fileDetails.size }}
                    </span>

                    <span v-if="fileDetails.author" class="text-muted-light dark:text-muted-dark">
                        <p class="uppercase m-0  text-white drk:text-black text-bold ">Add file</p>  {{ fileDetails.author.username }}
                    </span>

                    
                    <span class="text-muted-light dark:text-muted-dark">
                        <p class="uppercase m-0  text-white drk:text-black text-bold">Created date</p>  {{ fileDetails.createdAtAgo  }}
                    </span>

                    <span class="text-muted-light dark:text-muted-dark">
                        <p class="uppercase m-0  text-white drk:text-black text-bold">Updated date</p>  {{ fileDetails.updatedAtAgo  }}
                    </span>

                    <span class="text-muted-light dark:text-muted-dark">
                        <p class="uppercase m-0  text-white drk:text-black text-bold">Mime-Type</p> {{ fileDetails.mimeType }}
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
<!--
TODO: Jeśli utworzony zostanie 'cropper' w Symfony to należało by włączyć ten komponent
    <x-modal-photo-cropper
        :show="isShowModalPhotoCropper"
        :file="uploadedImageUrl"
        :media="media"
        @close="event => isShowModalPhotoCropper = event"
        @uploadCropImage="uploadCropImage"
        title="Photo cropper"
    />
-->
        
        <template #footer>
                <div class="flex space-x-3">
                    <x-btn @click="updated" @keydown.enter="updated" type="submit" color="primary-outline" rounded :loading="$media.isLoading" :disabled="isDisabled
                    ">Update</x-btn>
                </div>
        </template>
    </x-modal-dialog>
</template>