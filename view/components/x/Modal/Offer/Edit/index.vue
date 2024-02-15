<script setup>
import axios from '~/plugins/axios'

const { $offers } = useNuxtApp()

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
    offer: {
        type: Object
    },
    title: {
        type: String,
        default: 'Photo details'
    }
});

let isSwitch = ref(false);
let loading = ref(false)
let disabled = ref(true)
let isShowModalCategoryEdit = ref(false)
let isShowModalCategoryPreview = ref(false)

const previewCategory = ref({})
const offerPreview = ref({})

const form = reactive({
    status: false,
    title: '',
    description: '',
    transition: null,
    media_id: null
})

const errors = ref(null)
const media = ref([])

const isHoverCard = ref({
    id: null , hover: false
})

const hoverCard = (event) => {
    isHoverCard.value = event
}

const close = () => {
    emits('close', false)
}

const update = async () => {
    await $offers.updatedOffer(offerPreview.value.id, form)
    if($offers.errors) {
        return
    }
    emits('addedToLibrary', true)
    close()
}

async function deletedImage(event) {
    await $offers.deletedPhotosFromOffer(offerPreview.value.id, event)
    emits('addedToLibrary', true)
}

function openEditCategory(category) {
    previewCategory.value = category
    isShowModalCategoryEdit.value = true
}

function openCategoryPreview(category) {
    previewCategory.value = category

    isShowModalCategoryPreview.value = true
}

async function deletedCategory(categoryId) {
    if (confirm(`Czy na pewno chcesz usunąć ten plik?`)) {
        try {
            await $categories.deletedCategory(categoryId)
        } catch (error) {
            console.error(error)
        } finally {
            emits('addedToLibrary', true)
        }
    }
}

watch(() => props.offer, () => {
    offerPreview.value = props.offer
    form.title = props.offer.title
    form.transition = props.offer.transition
    form.media_id = props.offer.preview_image.id
    form.description = props.offer.description ? props.offer.description : ''

    if(props.offer.status == 1) {
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

watch(() => form.title , () => {
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
                <x-photo-card-edit :preview="offerPreview.preview_image" @addedToLibrary="(event) => form.media_id = event.id" :isFieldSelected="false" />

                <template v-for="(item, index) in media" :key="index" >
                    <div v-if="!item.uploaded && !item.error" class="w-full bg-gray-400/60 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center">
        
                        <div class="inline-block h-full bg-indigo-600 absolute top-0 left-0" :style="`width: ${item.progress}%`"></div>
        
                        <div class="relative z-10 text-xs font-semibold text-center text-white drop-shadow text-shadow">{{ item.progress }}%</div>
        
                    </div>
        
                    <div v-if="item.error" class="relative text-xs lg:text-md text-red-600">{{ item.error }}</div>
                </template>
            </div>

            <div class="w-full h-full flex flex-col justify-center space-y-6 py-6">
                <div class="w-full p-6 box-border grid grid-cols-2 gap-4 bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark rounded-lg">
                    <span class="text-muted-light dark:text-muted-dark">
                        <p class="uppercase m-0  text-white drk:text-black text-bold">ID</p>  {{ offerPreview?.id }}
                    </span>

                    <span class="text-muted-light dark:text-muted-dark">
                        <p class="uppercase m-0  text-white drk:text-black text-bold ">Path</p> {{ offerPreview?.path }}  
                    </span>

                    
                    <span class="text-muted-light dark:text-muted-dark">
                        <p class="uppercase m-0  text-white drk:text-black text-bold">Created</p>  {{ offerPreview?.created_at  }}
                    </span>
                    
                    
                    <span class="text-muted-light dark:text-muted-dark">
                        <p class="uppercase m-0  text-white drk:text-black text-bold">Last updated</p> 
                        
                        <span v-if="offerPreview?.created_at !== offerPreview?.updated_at">
                            {{ offerPreview?.updated_at }}
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
                        <x-input v-model="form.title" label="Title" color="blue" />
                    </div>

                    <div>
                        <x-textarea v-model="form.description" label="Description" color="blue" :rows="5" :cols="20" />
                    </div>
                </div>
            </div>
         
        </div> 

        <div v-if="offerPreview?.categories?.length" class="w-full  relative bg-background-light dark:bg-background-dark z-10 rounded-xl">
            <div class=" w-full h-full relative px-8 lg:px-15 py-12 box-border">
                <div class="w-full grid grid-cols-2 gap-6">
                    <div
                        v-for="category in offerPreview.categories "
                        :key="category.id"
                        :data-aos="category.transition"
                        class="w-full h-[300px] bg-blue-600 rounded-xl"
                        data-aos-delay="200"
                        data-aos-duration="1000"
                    >
                        <x-card-edit :item="category"  @hover="hoverCard">
                            <template #action>
                                <transition
                                    enter-active-class="transition ease-in duration-500"
                                    enter-from-class="transform opacity-0 scale-95"
                                    enter-to-class="transform opacity-100 scale-100"
                                    leave-active-class="transition ease-in duration-800"
                                    leave-from-class="transform opacity-100 scale-100"
                                    leave-to-class="transform opacity-0 scale-95"
                                >
                                    <div v-if="isHoverCard.id === category.id " class="absolute top-0 right-0 z-20 bg-black/80 w-12 h-28 flex flex-col justify-center items-center rounded-lg">
                                        <x-btn  @click="openCategoryPreview(category)" color="secondary" icon strip :tooltip="{text: 'Preview'}" rounded>
                                            <Icon name="mdi:eye"  class="text-2xl"/>
                                        </x-btn>
        
                                        <x-btn
                                            @click="openEditCategory(category)"
                                            class="h-9 w-9"
                                            :tooltip="{text: 'Edit'}"
                                            color="secondary"
                                            strip
                                            rounded
                                            icon
                                        >
                                            <Icon name="material-symbols:edit" class="text-xl" />
                                        </x-btn>
                                        
                                        <x-btn  @click="deletedCategory(category.id)" color="danger" icon strip :tooltip="{text: 'Deleted'}" rounded>
                                            <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                        </x-btn>
                                    </div>
                                </transition>
                            </template>
                        </x-card-edit>
                    </div>
                </div>
            </div>

            <x-modal-category-preview
                 :show="isShowModalCategoryPreview"
                 @close="(event) => isShowModalCategoryPreview = event"
                 :category="previewCategory"
                 max-width="max"
                 :title="`Category preview: ${previewCategory?.name}`"
             />
     
             <x-modal-category-edit
                 :show="isShowModalCategoryEdit"
                 @close="(event) => isShowModalCategoryEdit = event"
                 :category="previewCategory"
                 max-width="max"
                 :title="`Category edit: ${previewCategory?.name}`"
             />
        </div>

        <div v-else>
            <x-photo-gallery-edit grid="4" :media="offerPreview.images" @deleted="deletedImage" /> 
       </div>

       <template #footer>
            <div class="flex space-x-3">
                <x-btn @click="update" @keydown.enter="update" type="submit" color="primary-outline" rounded :loading="loading" :disabled="disabled">Update</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>