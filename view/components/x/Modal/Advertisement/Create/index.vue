<script setup>
const { $advertisement } = useNuxtApp()

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

let dragging = ref(false)

const file = ref(null)

const previewImage = ref('/no-image-icon.png')

const close = () => {
    resetForm()
    emits('close')
}

const form = reactive({
    name: '',
    description: '',
    file: '',
    targetUrl: '',
    startAt: '',
    endAt: '',
    status: 'no active',
    isActive: false,
    pagePaths: [],
    adPositions: [],
})

const resetForm = () => {
    form.name = ''
    form.description = ''
    form.file = null
    form.targetUrl = ''
    form.startAt = ''
    form.endAt = ''
    form.status = 'no active'
    form.isActive =  false
    form.pagePaths = []
    form.adPositions = []
    previewImage.value = '/no-image-icon.png'
}

const create = async () => {
    await $advertisement.create(form)
    
    if($advertisement.errors) {
        return
    }

    addedToLibrary(true)
    close()
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

const getUploadedImage = (e) => {
    form.file = e.target.files[0]
    previewImage.value = URL.createObjectURL(form.file)
}

// TODO: fix this function to drag and drop image
// function onDroppedFiles($event) {
//     dragging.value = false;
//     // console.log($event.target.files[0])
//     let files = [...$event.dataTransfer.items]
//         .filter(item => item.kind === 'file')
//         .map(item => item.getAsFile());

//         getUploadedImage(files);
// }
</script>

<template>
    <x-modal-dialog
        :show="show"
        max-width="max"
        :closeable="closeable"
        @close="close"
        :title="title"
    >
        <form class="w-full h-full flex flex-col justify-center items-start space-y-6 py-6">
            <div class="w-full h-60 mb-10">
                <div v-if="form.file" class="w-full h-full flex justify-center items-center">
                    <img :src="previewImage" class="w-full h-full object-cover" alt="">
                </div>

                <div
                    v-else 
                    @drop.prevent="onDroppedFiles"
                    @dragover.prevent="dragging = true"
                    @dragleave.prevent="dragging = false"
                    :class="[dragging ? 'border-indigo-500' :'border-basic-light dark:border-basic-dark', 'flex flex-col items-center py-6 px-6 rounded-xl border-2 border-dashed']"
                >
                    <svg
                        class="w-12 h-12 text-gray-500"
                        aria-hidden="true" fill="none" stroke="currentColor"
                        viewBox="0 0 48 48"
                    >

                        <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        />

                    </svg>

                    <p class="text-xl text-gray-700">Select image to upload</p>

                    <p class="mb-2 text-gray-700">or</p>

                    <label class="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 cursor-pointer hover:shadow-xl shadow-black shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        Select files

                        <input
                            @input="getUploadedImage"
                            class="sr-only"
                            name="file"
                            ref="file"
                            type="file"
                            accept="image/png, image/jpeg, image/jpg"
                        >
                    </label>

                    <p class="text-xs text-gray-600 mt-4">Maximum upload image size: 512MB.</p>
                </div>
            </div>

            <div class="w-full h-full flex flex-col space-y-6">
                <x-input
                    label="Name"
                    placeholder="Name"
                    v-model="form.name"
                    :error="$advertisement.errors?.name ? $advertisement.errors.name[0] : ''"
                />

                <x-input
                    label="Target url"
                    placeholder="Target Url"
                    v-model="form.targetUrl"
                    :error="$advertisement.errors?.targetUrl ? $advertisement.errors.targetUrl[0] : ''"
                />
                
                <x-textarea
                    label="Description"
                    placeholder="Description"
                    v-model="form.description"
                    :error="$advertisement.errors?.description ? $advertisement.errors.description[0] : ''"
                />


                <div class="w-full flex space-x-3">
                    <x-input
                        label="Start at"
                        placeholder="Start at"
                        v-model="form.startAt"
                        :error="$advertisement.errors?.startAt ? $advertisement.errors.startAt[0] : ''"
                        type="date"
                    />
                    
                    <x-input
                        label="End at"
                        placeholder="End at"
                        v-model="form.endAt"
                        :error="$advertisement.errors?.endAt ? $advertisement.errors.endAt[0] : ''"
                        type="date"
                    />
                </div>
            </div>
        </form>

       <template #footer>
            <div class="flex space-x-3">
                <x-btn @click="resetForm" type="submit" color="primary-outline" rounded >Reset</x-btn>
                <x-btn @click="create" @keydown.enter="create" type="submit" color="primary-outline" rounded :loading="loading" :disabled="!form.name">Create</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>