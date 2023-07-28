<script setup>
import axios from '~/plugins/axios'

const {$about } = useNuxtApp()

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
    preview: Object
});

const loading = ref(false)
const errors = ref(null)
let isSwitch = ref(false)

const aboutPreview = ref({})
const form = reactive({
    name: '',
    description: '',
    media_id: null,
    status: false,
})

const close = () => {
    emits('close', false)
}

const resetForm = () => {
    form = {
        name: '',
        description: '',
        media_id: null,
        status: false,
    }
}

const update = async () => {
    errors.value = null
    loading.value = true
    await $about.update(aboutPreview.value.id, form).then((data) => {
        loading.value = false
        emits('addedToLibrary', true)
        close()
    }).catch(err => {
        errors.value = err.response.data.errors
    }).finally(() => {
        resetForm()
    })
}

watch(() => props.show, () => {
    aboutPreview.value = props.preview
    form.name = props.preview.name
    form.description = props.preview.description
    form.media_id = props.preview.preview_image.id

    if(props.preview.status) {
        isSwitch.value = true
        form.status = isSwitch.value
    } else {
        isSwitch.value = false
        form.status = isSwitch.value
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
                    <x-photo-card-edit
                        :isFieldSelected="false"
                        :preview="aboutPreview.preview_image"
                        @addedToLibrary="(event) => form.media_id = event.id"
                    />
                </div>

                <div class="w-full h-full flex flex-col justify-start items-start space-y-6">
                    <div class="w-full ">
                        <x-input
                            v-model="form.name"
                            color="blue"
                            label="Name"
                            :error="errors && errors.name ? errors.name[0]: ''"
                        />
                    </div>

                    <div class="flex flex-row justify-center items-center w-full h-9 mb-6">
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

       <template #footer>
            <div class="flex space-x-3">
                <x-btn @click="update" @keydown.enter="update" type="submit" color="primary-outline" rounded :loading="loading" :disabled="!form.name || !form.media_id">Update</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>