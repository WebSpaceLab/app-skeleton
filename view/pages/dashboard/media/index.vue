<script setup>
import { storeToRefs } from 'pinia';
const { $media, $auth } = useNuxtApp()
const { data, isLoading, pagination, fileTypes, months, queryParams  } = storeToRefs($media)

definePageMeta({
    layout: "authorization",
    middleware: ['auth']
})

const page = ref(1)

const query = ref({
    term: queryParams.value.term ? queryParams.value.term : '',
    fileType: queryParams.value.fileType ? queryParams.value.fileType : null,
    month: queryParams.value.month ? queryParams.value.month : null
})

const perPage = ref()
const orderBy = ref('createdAt')
const orderDir = ref('DESC')

const tabs = computed(() => {
    return [
        data.value.filter(file => file.mimeType === 'image/jpeg' || file.mimeType === 'image/png' || file.mimeType === 'image/webp'),
        data.value.filter(file => file.mimeType === 'video/mp4'),
        data.value.filter(file => file.mimeType === 'video/youTube'),
    ]
})

let isShowModalDialog = ref(false)
let isShowPreviewImage = ref(false)
let IsShowTable = ref(false)
let isShowModalPhotoDetails = ref(false)
let fileEdit = ref(null)
let isShowActions = ref(false)
let selectAll = ref(false)

const preview = ref({})

const actions =  ref([
    {action: "delete", label: "Delete"},
])

const allFileTypes =  computed(() => {
    return [
        {value: null, label: 'Any type'},
        ...fileTypes.value,
    ];
})

const allMonths = computed(() => {
    return [
        {value: null, label: 'Any date'},
        ...months.value,
    ];
}) 

async function  getMedia () {
    if($auth.accessGranted('ROLE_ADMIN')) {
        await $media.get(page.value, perPage.value, query.value.fileType, query.value.month, query.value.term, orderBy.value, orderDir.value, '/api/admin/media' )
    } else {
        await $media.get(page.value, perPage.value, query.value.fileType, query.value.month, query.value.term, orderBy.value, orderDir.value )
    }
}

onMounted(() => {
    getMedia()
})

watch(() => query.value.term, () => {
    setTimeout(() => {
        page.value = 1
        getMedia()
    }, 300)
})

watch(() => query.value.fileType, () => {
    page.value = 1
    getMedia()
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

function addedToLibrary () {
    getMedia()
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

function toggleSelectAll(e) {
    data.value.forEach(file => file.selected = e.target.checked)
    
    showFieldAction()
}

function getPreviewImage(file) {
    preview.value = file
    isShowPreviewImage.value = true
}

function switchBetweenTablesPerTabs( ) {
    IsShowTable.value = !IsShowTable.value
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
                try {
                    
                    const deleteFile = await $media.deletedMedia(fileId)
        
                    if(deleteFile) {
                        isShowActions.value = false
                        selectAll.value = false
                        getMedia()
                    }

                } catch (error) {
                    console.error(error)
                }
            })
        }
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

// function switchBetweenTablesPerTabs( ) {

// }
</script>

<template>
    <x-section-dashboard >
        <template #header-panel>

            <!--
                TODO: Dodaj możliwość dodawania folderów do zdjęć
                <x-btn
                    class="h-9"
                    color="secondary-outline"
                    shadow
                    rounded
                    icon-left
                >
                    <template #icon-left>
                        <Icon name="material-symbols:create-new-folder" class="text-xl" />
                    </template>
    
                    Add new folder
                </x-btn>
            -->
            <x-search class="" v-model="query.term" icon >
                <template #selectedAction>
                    <div class="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-4 xl:px-6">
                        <select v-model="orderBy" name="orderBy" aria-label="orderBy" id="orderBy" class="w-full h-10 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option value="createdAt">Uploading</option>
                            <option value="name">Alphabetically</option>
                            <option value="updatedAt">Updates</option>
                        </select>
    
                        <select v-model="orderDir" name="orderDir" aria-label="orderDir" id="orderDir" class="w-full h-10 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option value="desc">Sort by descending</option>
                            <option value="asc">Sort by ascending</option>
                        </select>
    
                        <select v-model="query.fileType"  aria-label="Media type" id="type" class="w-full h-10 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option v-for="fileType in allFileTypes" :key="fileType.value" :value="fileType.value">{{ fileType.label }}</option>
                        </select>
    
                        <select v-model="query.month"  aria-label="Media date" id="date" class="w-full h-10 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option v-for="month in allMonths" :key="month.value" :value="month.value">{{ month.label }}</option>
                        </select>
                    </div>
                </template>

                <template #answer>
                    <div v-if="data" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 xl:gap-4 px-6">
                        <x-card-media
                            v-for="(file, index) in data"
                            :key="file.index = index"
                            :file="file"
                            @showFieldAction="showFieldAction"
                            class="h-50"
                        >
                            <template #selected>
                                <input v-model="file.selected"  @change="showFieldAction" type="checkbox" class="w-6 h-6 bg-background-light/50 dark:bg-background-dark/50 text-muted-light dark:text-muted-dark rounded border-solid border-muted-light dark:border-muted-dark lg:w-4 lg:h-4 focus:ring-blue-500">
                            </template>

                            <template #action>
                               <!--
                                    <x-btn  @click="getPreviewImage(file)" color="secondary" icon  :tooltip="{text: 'Udostępnij'}" rounded>
                                        <Icon name="mdi:share-variant"  class="text-2xl"/>
                                    </x-btn>
                                -->
                                <x-btn  @click="getPreviewImage(file)" color="secondary" icon  :tooltip="{text: 'Podgląd'}" rounded>
                                    <Icon name="mdi:eye"  class="text-2xl"/>
                                </x-btn>

                                <x-btn
                                    @click="openEditFile(file)"
                                    class="h-9 w-9"
                                    :tooltip="{text: 'Edycja'}"
                                    color="secondary"
                                    rounded
                                    icon
                                >
                                    <Icon name="material-symbols:edit" class="text-xl" />
                                </x-btn>

                                
                                <x-btn
                                    :tooltip="{text: 'Usuń'}"
                                    class="h-9 w-9"
                                    @click="deletedFile(file.id)"
                                    color="danger"
                                    icon
                                    rounded
                                >
                                    <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                </x-btn>
                            </template>
                        </x-card-media>
                    </div>
                </template>
            </x-search>

            <x-btn
                @click="isShowModalDialog = true"
                class="h-9 w-9"
                color="secondary-outline"
                :tooltip="{text: 'Add new assets'}"
                shadow
                rounded
                icon
            >
                <Icon name="material-symbols:attach-file-add-rounded" class="text-xl" />
            </x-btn>

            <x-btn
                @click="switchBetweenTablesPerTabs"
                class="h-9 w-9"
                :tooltip="{text: IsShowTable ? 'Grid preview':'List preview'}"
                color="secondary-outline"
                shadow
                rounded
                icon
            >
                <Icon v-if="IsShowTable" name="material-symbols:grid-view-rounded" class="text-xl" />
                <Icon v-else name="material-symbols:view-list-rounded" class="text-xl" />
            </x-btn>
        </template>

        <template #main>
            <div class="w-full h-full p-6 lg:p-10 box-border dark:bg-gray-800/20 transition-all duration-500 rounded-xl">
                <div class="w-full h-full">
                    <div v-if="data?.length != 0" class="flex   justify-start items-center py-1">
                        <div v-if="!IsShowTable" class="flex bg-black/30 pr-2 justify-center items-center mr-4 space-x-2 rounded-xl">
                            <div class="w-6 text-center  p-3 rounded-xl mr-2">
                                <input v-model="selectAll" type="checkbox" @change="toggleSelectAll" class="w-3 h-3 bg-background-light dark:bg-background-dark text-muted-light dark:text-muted-dark rounded border-solid border-muted-light dark:border-muted-dark lg:w-4 lg:h-4 focus:ring-blue-500">
                            </div>

                            <span class="text-muted-light dark:text-muted-dark">
                                Select all
                            </span>
                        </div>

                        <div >
                            <x-select-action :actions="actions" :isShowActions="isShowActions" @execute="executeAction" />
                        </div>
                    </div>

                    <div class="w-full h-full">
                        <x-table
                            v-if="IsShowTable"
                            :head="['preview', 'name', 'size', 'deleted', 'Used', 'created', 'last update', '' ]"
                            @select-all="toggleSelectAll"
                            :loading="isLoading"
                            :count="data?.length"
                         >
                         
                             <x-table-body v-for="(file, index) in data" :key="file.index = index">
                                 <x-table-body-cell  justify="center">
                                     <input v-model="file.selected" @change="showFieldAction" type="checkbox" class="hidden md:block w-6 h-6 bg-background-light dark:bg-background-dark text-blue-600 rounded border-gray-300 lg:w-4 lg:h-4 focus:ring-blue-500">
                                 </x-table-body-cell>
         
                                 <x-table-body-cell justify="center">
                                     <x-photo-card-preview v-if="file.mimeType === 'image/jpeg' || file.mimeType === 'image/png' || file.mimeType === 'image/webp'" :file="file" />

                                     <x-card-media v-else  :file="file" />
                                 </x-table-body-cell>
         
                                 <x-table-body-cell justify="center">
                                     {{ file.name }}
                                 </x-table-body-cell>
         
                                 <x-table-body-cell>
                                     {{ file.size }} KB
                                 </x-table-body-cell>

                                 <x-table-body-cell justify="center">
                                    <span :class="file.isDelete ? 'text-danger-600' : ''">
                                        {{ file.isDelete ? 'Yes' : 'No' }}
                                    </span>
                                 </x-table-body-cell>

                                 <x-table-body-cell justify="center">
                                    <span :class="file.isUsed ? 'text-danger-600' : ''">
                                        {{ file.isUsed ? 'Yes' : 'No' }}
                                    </span>
                                 </x-table-body-cell>
         
                                 <x-table-body-cell justify="center">
                                     {{ file.createdAtAgo }}
                                 </x-table-body-cell>
         
                                 <x-table-body-cell justify="center">
                                    {{ file.updatedAtAgo }}
                                 </x-table-body-cell>
         
                                 <x-table-body-cell justify="center">
                                     <div class="w-full justify-center items-center">
                                         <x-btn  @click="getPreviewImage(file)" color="secondary" icon strip :tooltip="{text: 'Preview'}" rounded>
                                             <Icon name="mdi:eye"  class="text-2xl"/>
                                         </x-btn>
         
                                         <x-btn
                                             @click="openEditFile(file)"
                                             class="h-9 w-9"
                                             :tooltip="{text: 'Edit'}"
                                             color="secondary"
                                             strip
                                             rounded
                                             icon
                                         >
                                             <Icon name="material-symbols:edit" class="text-xl" />
                                         </x-btn>
         
                                         <x-btn  @click="deletedFile(file.id)" color="danger" icon strip :tooltip="{text: 'Deleted'}" rounded>
                                             <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                         </x-btn>
                                     </div>
                                 </x-table-body-cell>
                             </x-table-body>

                            <template #pagination>
                                <x-pagination :count="data?.length" :pagination="pagination"  @page="switchPage" @per_page="switchPerPage" />
                            </template>
                        </x-table>

                         <div v-else class="w-full h-200">                    
                             <x-tabs :tabs="['Zdjęcia', 'filmy', 'Url']" :uppercase="true">
                                <template v-for="(tab, index) in tabs" :key="index" #[`tab-${index}`] >
                                    <div v-if="tab" class="w-full h-full">
                                        <div v-if="tab.length == 0" class="w-full h-full lg:h-150 flex justify-center items-center">
                                            <p class="text-2xl font-bold">
                                                Brak danych do wyświetlenia
                                            </p>   
                                        </div>
        
                                        <div class="w-full h-full p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 xl:gap-6" v-else>
                                            <x-card-media
                                                v-for="(file, index) in tab"
                                                :key="file.index = index"
                                                :file="file"
                                                @showFieldAction="showFieldAction"
                                                class="h-60 w-full"
                                            >
                                                <template #selected>
                                                    <input v-model="file.selected"  @change="showFieldAction" type="checkbox" class="w-6 h-6 bg-background-light/50 dark:bg-background-dark/50 text-muted-light dark:text-muted-dark rounded border-solid border-muted-light dark:border-muted-dark lg:w-4 lg:h-4 focus:ring-blue-500">
                                                </template>
                        
                                                <template #action>
                                                    <!--
                                                        <x-btn  @click="getPreviewImage(file)" color="secondary" icon  :tooltip="{text: 'Udostępnij'}" rounded>
                                                            <Icon name="mdi:share-variant"  class="text-2xl"/>
                                                        </x-btn>
                                                    -->
                                                    <x-btn  @click="getPreviewImage(file)" color="secondary" icon  :tooltip="{text: 'Podgląd'}" rounded>
                                                        <Icon name="mdi:eye"  class="text-2xl"/>
                                                    </x-btn>
                        
                                                    <x-btn
                                                        @click="openEditFile(file)"
                                                        class="h-9 w-9"
                                                        :tooltip="{text: 'Edycja'}"
                                                        color="secondary"
                                                        rounded
                                                        icon
                                                    >
                                                        <Icon name="material-symbols:edit" class="text-xl" />
                                                    </x-btn>
                        
                                                    
                                                    <x-btn
                                                        :tooltip="{text: 'Usuń'}"
                                                        class="h-9 w-9"
                                                        @click="deletedFile(file.id)"
                                                        color="danger"
                                                        icon
                                                        rounded
                                                    >
                                                        <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                                    </x-btn>
                                                </template>
                                            </x-card-media>                   
                                        </div>
                                    </div>
                                </template>
                            </x-tabs>
                                                                        
                            <div >
                                <x-pagination :count="data?.length" :pagination="pagination"  @page="switchPage" @per_page="switchPerPage" />
                            </div> 
                        </div>
                    </div>

                </div>
                
                <x-modal-photo-dropzone
                    :show="isShowModalDialog"
                    @close="event => isShowModalDialog = event"
                    @addedToLibrary="addedToLibrary"
                    :multiple="true"
                    title="Add new assets"
                />

                <x-modal-photo-details
                    :show="isShowModalPhotoDetails"
                    :file="fileEdit"
                    @close="event => isShowModalPhotoDetails = false"
                    @addedToLibrary="addedToLibrary"
                    title="Photo details"
                />

                <div v-if="$media.data && preview">
                    <x-photo-preview
                        :isShowPreviewImage="isShowPreviewImage"
                        :photos="$media.data"
                        :preview="preview"
                        @close="event => isShowPreviewImage = event"
                        @preview="event => preview = event"
                    />
                </div>
            </div>
        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>