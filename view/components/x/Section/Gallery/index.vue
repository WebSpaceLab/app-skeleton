<script setup>
import { storeToRefs } from 'pinia';
const { $media } = useNuxtApp()
const { data , pagination, months, queryParams  } = storeToRefs($media)

const emits = defineEmits(['addedToLibrary', 'close'])

const props = defineProps({
    grid: {
        type: String,
        default: '4'
    },
    fileType: {
        type: String,
        default: 'image/jpeg'
    },
    multiple: {
        type: Boolean,
        default: false
    },
    currentImages: {
        type: Array,
        default: () => []
    },
    show: {
        type: Boolean,
        default: false
    }
})

const page = ref(1)

const query = ref({
    term: queryParams.value.term ? queryParams.value.term : '',
    fileType: queryParams.value.fileType ? queryParams.value.fileType : null,
    month: queryParams.value.month ? queryParams.value.month : null
})

const gridCols = computed(() => {
    return {
        '6' : 'grid-cols-1 md::grid-cols-2 lg:grid-cols-4 xl:grid-cols-6',
        '4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        '3' : 'grid-cols-1 md:grid-cols-3',
        '2' : 'grid-cols-1 md:grid-cols-2',
        '1' : 'grid-cols-1',
    } [props.grid]
})

const perPage = ref()
const orderBy = ref('createdAt')
const orderDir = ref('desc')

let isShowModalDialog = ref(false)
let isShowPreviewImage = ref(false)
let isShowModalPhotoDetails = ref(false)
let fileEdit = ref(null)
let isShowActions = ref(false)
let selectAll = ref(false)

const preview = ref({})

const actions =  ref([])

const allMonths = computed(() => {
    return [
        {value: null, label: 'Any date'},
        // ...months.value,
    ];
}) 

async function  getMedia () {
    await $media.get(page.value, perPage.value, props.fileType, query.value.month, query.value.term, orderBy.value, orderDir.value, '/api/admin/media' )
 
    if(props.currentImages?.length) {
        getSelectedImages()
    }
}

function closeModalDialog (event) {
    isShowModalDialog.value = event
}

function switchPage(event) {
    page.value = event
    getMedia()
}

function switchPerPage (event)  {
    page.value = 1
    perPage.value = event
    getMedia()
}
function getSelectedImages() {
    data.value.forEach(file => {
        props.currentImages.forEach((currentImage) => {
            if(file.id == currentImage.id) {
                file.current = true
            }
        })
    })
}

function toggleSelectAll(e) {
    console.log(e.target.checked)
    data.value.forEach(file => file.selected = e.target.checked)
    
    showFieldAction()
}

function getPreviewImage(file) {
    preview.value = file
    isShowPreviewImage.value = true
}

function openEditFile(file) {
    fileEdit.value = file
    isShowModalPhotoDetails.value = true
}

async function deletedFile(mediaId) {
    if (confirm(`Czy na pewno chcesz usunąć ten plik?`)) {
        try {
            await $media.deletedMedia(mediaId)
        } catch (error) {
            console.error(error)
        } finally {
            getMedia()
        }
    }
}

async function executeAction(actionId) {
    const fileIds = data.value.filter(file => file.selected)
        .map(file => file.id);

    if (!actionId?.length) return;

    switch (actionId) {
        case 'delete':
            if (confirm(`Czy jesteś pewny, że chcesz usunąć?`)) {
                fileIds.forEach(async (fileId) => {                   
                    const deleteFile = await $media.deletedMedia(fileId)
        
                    if(deleteFile) {
                        isShowActions.value = false
                        selectAll.value = false

                        getMedia()
                    }
                })
            }
        break;

        case 'add photo':
                fileIds.forEach((fileId) => {
                    const photo = data.value.filter(item=> 
                        item.id === fileId
                    )

                    addedToLibrary(photo[0])
                })

                close()
        break;

        case 'add photos':
            const photos = ref([])
            fileIds.forEach((fileId) => {
                const photo = data.value.filter(item=> 
                    item.id === fileId
                )

                photos.value.push(photo[0])
            })

            addedToLibrary(photos.value)
            close()
        break;
    }
}

function showFieldAction() {
    const isSelectedFile = data.value.filter(file => file.selected)

    if(isSelectedFile?.length) {
        isShowActions.value = true
    } else {
        isShowActions.value = false
    }
}

const close = () => {
    emits('close', false)
};

const addedToLibrary = (event) => {
    if(event) {
        emits('addedToLibrary', event)
    }
}

function  addMultiple() {
    if(props.multiple) {
        actions.value = [
            {action: "delete", label: "Delete"},
            {action: "add photos", label: "Add photos"},
        ]
    } else {
        actions.value = [
            {action: "delete", label: "Delete"},
            {action: "add photo", label: "Add photo"},
        ]
    }
}

function selectCheckbox(mediaId) {
    if(props.multiple) {
        showFieldAction()
    } else {
        data.value.forEach(media => {
            if(media.id === mediaId) {
                media.selected = true
            } else {
                media.selected = false;
            }

            showFieldAction()
        })
    }
    
}

onMounted(() => {
    addMultiple()
    getMedia()
})

watch(() => query.value.term, () => {
    setTimeout(() => {
        page.value = 1
        getMedia()
    }, 300)
})

watch(() => query.value.month, () => {
    setTimeout(() => {
        page.value = 1
        getMedia()
    }, 300)
})

watch(() => orderBy.value, () => {
    page.value = 1
    getMedia()
})

watch(() => orderDir.value, () => {
    page.value = 1
    getMedia()
})

watch(() => props.show , () => {
    getMedia()
})

</script>

<template>
    <div class="w-full p-6 lg:p-10 box-border dark:bg-gray-800/20 transition-all duration-500 rounded-xl">
        <div class="w-full flex flex-col lg:flex-row justify-between mb-8 space-y-3">
            <div class="flex justify-center items-center space-x-3 ">
                <div class="flex flex-col lg:flex-row justify-center items-center bg-black/30 p-3 rounded-xl space-y-3 lg:space-y-0 lg:space-x-3">
                    <div v-if="multiple">
                        <div class="w-6 text-center  ">
                            <input v-model="selectAll" type="checkbox" @change="toggleSelectAll" class="w-6 h-6 bg-background-light dark:bg-background-dark text-muted-light dark:text-muted-dark rounded border-solid border-muted-light dark:border-muted-dark lg:w-4 lg:h-4 focus:ring-blue-500">
                        </div>
                    </div>

                    <select v-model="orderBy" name="orderBy" aria-label="orderBy" id="orderBy" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                        <option value="createdAt">Uploading</option>
                        <option value="name">Alphabetically</option>
                        <option value="updatedAt">Updates</option>
                    </select>

                    <select v-model="orderDir" name="orderDir" aria-label="orderDir" id="orderDir" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                        <option value="desc">Sort by descending</option>
                        <option value="asc">Sort by ascending</option>
                    </select>
                    <!--
                        <select v-model="query.month"  aria-label="Media date" id="date" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option v-for="month in allMonths" :key="month.value" :value="month.value">{{ month.label }}</option>
                        </select>
                    -->

                    <div class="w-auto">
                        <x-select-action :actions="actions" :isShowActions="isShowActions" @execute="executeAction" />
                    </div>
                </div>
            </div>

            <div class="flex justify-center items-center space-x-3">
                <x-search v-model="query.term" icon :filter="false" />
            </div>
        </div>

        <div class="w-full">
            <div v-if="$media.isLoading" class="w-full h-100 flex justify-center ">
                <Spinner :loading="$media.isLoading" />
            </div>

            <div v-else class="w-full">
                <div v-if="data" class="grid  gap-6" :class="gridCols">
                    <template
                        v-for="(file, index) in data"
                        :key="file.index = index"
                    >
                        <x-photo-card
                 
                            :file="file"
                            @showFieldAction="showFieldAction"
                        >
                            <template #selected>
                                <input v-if="!file.current" v-model="file.selected"  @change="selectCheckbox(file.id)" type="checkbox" class="w-6 h-6 bg-background-light dark:bg-background-dark text-muted-light dark:text-muted-dark rounded border-solid border-muted-light dark:border-muted-dark lg:w-4 lg:h-4 focus:ring-blue-500">
                                <Icon v-else name="streamline:interface-validation-check-check-form-validation-checkmark-success-add-addition" class="text-xl text-green" />
                            </template>
    
                            <template #action>
                                <x-btn  @click="getPreviewImage(file)" color="secondary-outline" icon  :tooltip="{text: 'Preview'}" rounded>
                                    <Icon name="mdi:eye"  class="text-2xl"/>
                                </x-btn>
    
                                <x-btn
                                    @click="openEditFile(file)"
                                    class="h-9 w-9"
                                    :tooltip="{text: 'Edit'}"
                                    color="secondary-outline"
                                    rounded
                                    icon
                                >
                                    <Icon name="material-symbols:edit" class="text-xl" />
                                </x-btn>
    
                                
                                <x-btn
                                    :tooltip="{text: 'Deleted'}"
                                    class="h-9 w-9"
                                    @click="deletedFile(file.id)"
                                    color="danger-outline"
                                    icon
                                    rounded
                                >
                                    <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                </x-btn>
                            </template>
                        </x-photo-card>
                    </template>
                </div>
            </div>

            <div v-if="data">
                <x-pagination :count="data?.length" :pagination="pagination"  @page="switchPage" @per_page="switchPerPage" />
            </div>

        </div>
        
        <x-modal-photo-dropzone
            :show="isShowModalDialog"
            @close="closeModalDialog"
            @addedToLibrary="addedToLibrary"
            title="Add new assets"
        />

        <x-modal-photo-details
            :show="isShowModalPhotoDetails"
            :file="fileEdit"
            @close="event => isShowModalPhotoDetails = event"
            @addedToLibrary="addedToLibrary"
            title="Editing a photo"
        />

        <div v-if="data && preview">
            <x-photo-preview
                :isShowPreviewImage="isShowPreviewImage"
                :photos="data"
                :preview="preview"
                @close="event => isShowPreviewImage = event"
                @preview="event => preview = event"
            />
        </div>
    </div>
</template>