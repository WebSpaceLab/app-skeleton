<script setup>
const {$feature } = useNuxtApp()

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

const featurePreview = ref({})

const form = reactive({
    name: '',
    description: '',
    mediaId: null,
    isActive: false,
})

const close = () => {
    resetForm()
    emits('close', false)
}

const resetForm = () => {
    form.name = ''
    form.description = ''
    form.mediaId = null
    form.isActive = false
    featurePreview.value = {}
    $feature.errors = null
}

const update = async () => {
    try {
        await $feature.update(featurePreview.value.id, form)

        if($feature.errors) {
            return
        }
        
        emits('addedToLibrary', true)
        // close()
        
    } catch (error) {
        console.log(error)
    }
}

const addedToLibrary = async (event) => {
    form.mediaId = event
    emits('addedToLibrary', true)
}

watch(() => props.show, () => {
    featurePreview.value = props.preview
    form.name = props.preview.name
    form.description = props.preview.description
    form.mediaId = props.preview.media.id
    form.isActive = props.preview.isActive
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
                        :preview="featurePreview.media"
                        @addedToLibrary="addedToLibrary"
                    />
                </div>

                <div class="w-full h-full flex flex-col justify-start items-start space-y-6">
                    <div class="w-full">
                        <x-input
                            v-model="form.name"
                            color="blue"
                            label="Name"
                            :error="$feature.errors && $feature.errors.name ? $feature.errors.name: ''"
                        />
                    </div>
                    
                    <div class="flex flex-row justify-center items-center w-full h-9 mb-6">
                        <div class="flex w-full justify-end items-center ">
                            <span v-if="form.isActive" class="mr-3 text-sm font-medium text-green-500">active status</span>
                            <span v-else class="mr-3 text-sm font-medium text-red-500">status not active</span>

                            <label @click="form.isActive = !form.isActive" for="toggle-social-create" class="inline-flex relative items-center mr-5 cursor-pointer">
                                <input v-model="form.isActive" type="checkbox" :value="form.isActive" id="toggle-social-create" class="sr-only peer" checked>
                                
                                <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="w-full">
                <x-textarea
                    v-model="form.description"
                    label="Description"
                    :error="$feature.errors && $feature.errors.description ? $feature.errors.description : ''"
                    :rows="5"
                />
            </div>
        </form>

       <template #footer>
            <div class="flex space-x-3">
                <x-btn @click="update" @keydown.enter="update" type="submit" color="primary-outline" rounded :loading="$feature.isLoading" :disabled="!form.name || !form.mediaId">Update</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>