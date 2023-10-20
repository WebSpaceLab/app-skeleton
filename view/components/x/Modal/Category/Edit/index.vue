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
    }
});

const loading = ref(false)
const disabled = ref(true)
const previewCategory = ref({})
const form = reactive({
    status: false,
    name: '',
    description: '',
    transition: null,
    media_id: null
})
const SwitchFile = ref()
const errors = ref(null)
const media = ref([])
let isSwitch = ref(false);

const close = () => {
    emits('close')
}

const update = () => {
    $categories.updatedCategory(previewCategory.value.id, form)
    emits('addedToLibrary', true)
    close()
}

function onSelectedFiles($event) {
    let files2 = [...$event.target.files]

    uploadFile(files2)
    
    SwitchFile.value = null
}

function uploadFile(files) {
 
 files.forEach(file => {
     media.value.unshift({
         file: file,
         progress: 0,
         error: null,
         uploaded: false,
         preview_url: '',
     });
 });

 
 media.value
     .filter(media => !media.uploaded)
     .forEach(async media => {
         let formFile = new FormData;

         formFile.append('file', media.file)

         $axios.post(`/api/media/${ previewCategory.value.preview_image.id }/update-file`, formFile, {
             onUploadProgress: (event) => {
                 media.progress = Math.round(event.loaded * 100 / event.total);
             },
         })
         .then(({data}) => {
             media.uploaded = true;
             media.id = data.file.id;
             media.preview_url = data.file.preview_url;
             previewCategory.value.preview_image = data.file
             $flash.success(data.flash.message)
         })
         .catch(error => {
             media.error = 'Uploaded Fail. Please try again later;';
             if (error?.response.status === 422) {
                 media.error = error.response.data.errors.file[0];
             }
             
             $flash.error(media.error)
         })
     })
 ;
}

async function deletedImage(event) {
    await $categories.deletedPhotosFromCategory(previewCategory.value.id, event)
}

watch(() => props.category, () => {
    previewCategory.value = props.category
    form.transition = props.category.transition
    form.name = props.category.name
    form.description = props.category.description ? props.category.description : ''
    form.media_id = props.category.preview_image.id

    if(props.category.status == 1) {
        isSwitch.value = true
        form.status = isSwitch.value
    } else {
        isSwitch.value = false
        form.status = isSwitch.value
    }
})

watch(() => form.status , () => {
    disabled.value = false
})

watch(() => form.name , () => {
    disabled.value = false
})

watch(() => form.description , () => {
    disabled.value = false
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
            <x-photo-card :file="previewCategory.preview_image" :isFieldSelected="false" >
                <template #action>
                    <label class=" px-2 h-9 inline-flex items-center rounded-xl border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        <Icon name="material-symbols:cameraswitch-sharp"  class="text-2xl"/>

                        <input ref="SwitchFile" @input="onSelectedFiles" type="file" name="SwitchFile"  class="sr-only">
                    </label>
                </template>
            </x-photo-card>

            <template v-for="(item, index) in media" :key="index" >
                <div v-if="!item.uploaded && !item.error" class="w-full bg-gray-400/60 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center">
    
                    <div class="inline-block h-full bg-indigo-600 absolute top-0 left-0" :style="`width: ${item.progress}%`"></div>
    
                    <div class="relative z-10 text-xs font-semibold text-center text-white drop-shadow text-shadow">{{ item.progress }}%</div>
    
                </div>
    
                <div v-if="item.error" class="relative text-xs lg:text-md text-red-600">{{ item.error }}</div>
            </template>
         </div>

         <div class="w-full h-full flex flex-col justify-center space-y-6 py-6">
            <div class="w-full p-6 box-border grid grid-cols-2 gap-12 bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark rounded-lg">
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold">ID</p>  {{ previewCategory?.id }}
                </span>

                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold ">Slug</p> {{ previewCategory?.slug }}  
                </span>

                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold ">Belongs to the offer </p> {{ previewCategory?.offer.title }}  
                </span>

                
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold">Created</p>  {{ previewCategory?.created_at  }}
                </span>
                
                
                <span class="text-muted-light dark:text-muted-dark">
                    <p class="uppercase m-0  text-white drk:text-black text-bold">Last updated</p> 
                    
                    <span :class="previewCategory?.created_at !== previewCategory?.updated_at ? 'text-red' : ''">
                        {{ previewCategory?.updated_at }}
                    </span>
                </span>

                <div class="flex flex-row justify-center items-center w-full mb-6">
                    <div class="flex w-full justify-start items-center ">
                        <span v-if="isSwitch" class="mr-3 text-sm font-medium text-green-500">Status</span>
                        <span v-else class="mr-3 text-sm font-medium text-red-500">Status</span>

                        <label for="toggle-social-create" class="inline-flex relative items-center mr-5 cursor-pointer">
                            <input @click="isSwitch = !isSwitch" v-model="form.status" type="checkbox" :value="isSwitch" id="toggle-social-create" class="sr-only peer" checked>
                            
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        </label>
                    </div>

                    <p v-if="errors && errors.status " class="text-sm text-error-600 m-0 ">{{ errors?.status[0] }}</p>
                </div>

                <div class="w-full h-full flex justify-center items-center mb-6">
                    <x-select-transition
                        v-model="form.transition"
                        :error="errors && errors.transition ? errors.transition[0]: ''"
                    />
                </div>
            </div>

            <div class="flex flex-col space-y-6">
                <div>
                    <x-input v-model="form.name" label="Name" color="blue" />
                </div>

                <div>
                    <x-textarea v-model="form.description" label="Description" color="blue" :rows="5" :cols="20" />
                </div>
            </div>
         </div>
       </div> 

       <div>
            <x-photo-gallery-edit grid="4" :media="previewCategory.images" @deleted="deletedImage" /> 
       </div>

       <template #footer>
            <div class="flex space-x-3">
                <x-btn @click="update" @keydown.enter="update" type="submit" color="primary-outline" rounded :loading="loading" :disabled="disabled">Update</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>