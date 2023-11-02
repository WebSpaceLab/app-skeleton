<script setup>
import { storeToRefs } from 'pinia';

const { $about, $auth } = useNuxtApp()
const { about , activeAbout, pagination, months, queryParams,  status } = storeToRefs($about)

definePageMeta({
    layout: "authorization",
    middleware: [ 'auth']
    
})

onMounted(() => {
    $auth.giveAccess($auth.accessGranted('ROLE_ADMIN'))
})

const page = ref(1)

const query = ref({
    term: queryParams.value.term ? queryParams.value.term : '',
    month: queryParams.value.month ? queryParams.value.month : null,
    status: queryParams.value.status ? queryParams.value.status : null,
    orderBy: queryParams.value.orderBy ? queryParams.value.orderBy : 'createdAt',
    orderDir: queryParams.value.orderDir ? queryParams.value.orderDir : 'desc'
})

const perPage = ref(8)

let isShowModalAboutEdit = ref(false)
let isShowModalAboutPreview = ref(false)
let aboutPreview = ref(null)
let isShowModalAboutCreate = ref(false)
let isShowActions = ref(false)
let selectAll = ref(false)

const actions =  ref([
    {action: "delete", label: "Delete"},
])

const allMonths = computed(() => {
    return [
        {value: null, label: 'Any date'},
        ...months.value,
    ];
}) 

const allStatus = computed(() => {
    return [
        {value: null, label: 'All status'},
        ...status.value,
    ];
});

async function  getAbout() {
     await $about.getAbout(query.value, perPage.value, page.value)
}


async function addedToLibrary () {
    await getAbout()
    await $about.get()
    isShowModalAboutCreate.value = false
    isShowModalAboutEdit.value = false
}

async function switchPage(event) {
    page.value = event
    await getAbout()
}

async function switchPerPage (event)  {
    page.value = 1
    perPage.value = event
    await getAbout()
}

function toggleSelectAll(e) {
    about.value.forEach(item => item.selected = e.target.checked)
    
    showFieldAction()
}

async function openModalAboutPreview() {
    await $about.get()
    isShowModalAboutPreview.value = true
}

async function destroy(item) {
    if (confirm(`Czy na pewno chcesz usunąć ten plik?`)) {     
        await $about.destroy(item.id)
        await getAbout()
    }
}

async function executeAction(actionId) {
    const aboutIds = about.value.filter(item => item.selected)
        .map(item => item.id);

    if (!actionId.length) return;

    switch (actionId) {
        case 'delete':
        if (confirm(`Czy jesteś pewny, że chcesz usunąć?`)) {
            aboutIds.forEach(async (aboutId) => {                    
                const deleted = await $about.destroy(aboutId)
     
                isShowActions.value = false
                selectAll.value = false
                await getAbout()            
            })
        }
        break;
    }
}

function edit(item) {
    aboutPreview.value = item

    isShowModalAboutEdit.value = true
}

function showFieldAction() {
    const isSelected = about.value.filter(item => item.selected)

    if(isSelected.length) {
        isShowActions.value = true

    } else {
        isShowActions.value = false
    }
}

onMounted(async () => {
    await getAbout()
})

watch(() => query.value.term, () => {
    setTimeout(async () => {
        page.value = 1
        await getAbout()
    }, 300)
})

watch(() => query.value.month, () => {
    setTimeout(async () => {
        page.value = 1
        await getAbout()
    }, 300)
})

watch(() => query.value.status, () => {
    setTimeout(async () => {
        page.value = 1
        await getAbout()
    }, 300)
})

watch(() => query.value.orderBy, async () => {
    page.value = 1
    await getAbout()
})

watch(() => query.value.orderDir, async () => {
    page.value = 1
    await getAbout()
})
</script>

<template>
    <x-section-dashboard v-if="$auth.accessGranted('ROLE_ADMIN')"  :container="false">
        <template #header-panel>
            <x-search class="" v-model="query.term" :answer="false" icon >
                <template #selectedAction>
                    <div class="relative grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-4 xl:px-6">
                        <select v-model="query.orderBy" name="orderBy" aria-label="orderBy" id="orderBy" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option value="createdAt">Uploading</option>
                            <option value="name">Alphabetically</option>
                            <option value="updatedAt">Updates</option>
                        </select>

                        <select v-model="query.orderDir" name="orderDir" aria-label="orderDir" id="orderDir" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option value="desc">Sort by descending</option>
                            <option value="asc">Sort by ascending</option>
                        </select>

                        <select v-model="query.month"  aria-label="Media date" id="date" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option v-for="month in allMonths" :key="month.value" :value="month.value">{{ month.label }}</option>
                        </select>

                        <select v-model="query.status" aria-label="Media type" id="type" class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option v-for="status in allStatus" :key="status.value" :value="status.value">{{ status.label }}</option>
                        </select>
                    </div>
                </template>
            </x-search>

            <x-btn
            @click="isShowModalAboutCreate = true"
                class="h-9 group"
                color="secondary-outline"
                shadow
                :tooltip="{text: 'Add new description'}"
                rounded
                icon
            >
                <Icon name="material-symbols:add-circle-rounded" class="text-xl " />
            </x-btn>

            <x-btn @click="openModalAboutPreview" color="primary-outline" :tooltip="{text: 'Show about section preview'}"  icon shadow rounded>
                <Icon name="icon-park-twotone:preview-open" class="text-2xl" />
            </x-btn>
        </template>

        <template #main>
            <div class=" h-full p-6 lg:p-10 box-border dark:bg-gray-800/20 transition-all duration-500 rounded-xl" >
                <div class="w-full flex justify-between mb-8">
                    <div class="flex justify-center items-center space-x-3 ">
                        <div class="flex justify-center items-center space-x-3 ">
                            <x-select-action :actions="actions" :isShowActions="isShowActions" @execute="executeAction" />
                        </div>
                    </div>
                </div>


                <div v-if="about" class="w-full h-full flex">
                    <div class="transition-all duration-500 w-full" >
                        <div class="w-full h-full transition-all duration-500" >
                            <x-table
                                    :head="['name', 'Image', 'description', 'status', 'created', 'updated', '' ]"
                                    @select-all="toggleSelectAll"
                                    justify="center"
                                >
                                
                                    <x-table-body v-for="(item, index) in about" :key="item.index = index" :class="item.status == 0 ? 'bg-black/30' : ''">
                                        <x-table-body-cell  justify="center">
                                            <input v-model="item.selected" @change="showFieldAction" type="checkbox" class="w-6 h-6 bg-background-light dark:bg-background-dark text-blue-600 rounded border-gray-300 lg:w-4 lg:h-4 focus:ring-blue-500">
                                        </x-table-body-cell>
                
                                        <x-table-body-cell justify="center">
                                            {{ item.name }}
                                        </x-table-body-cell>
                                        
                                        <x-table-body-cell justify="center">
                                            <x-photo-card-preview :file="item.media" />
                                        </x-table-body-cell>

                                        <x-table-body-cell justify="start">
                                            {{ item.description }}
                                        </x-table-body-cell>

                                        <x-table-body-cell justify="center">
                                            <div :class="[item.isActive ? 'text-success-600' : 'text-danger-600']">
                                                {{ item.isActive ? 'active' : 'not active' }}
                                            </div>
                                        </x-table-body-cell>

                                        <x-table-body-cell justify="center">
                                            {{ item.createdAtAgo }}
                                        </x-table-body-cell>

                                        <x-table-body-cell justify="center">
                                            {{ item.updatedAtAgo }}
                                        </x-table-body-cell>
                
                                        <x-table-body-cell justify="center">
                                            <div class="w-full justify-center items-center">
                                                <x-btn  @click="edit(item)" color="secondary" icon strip :tooltip="{text: 'Edit'}" rounded>
                                                    <Icon name="ic:baseline-mode-edit"  class="text-2xl" />
                                                </x-btn>

                                                <x-btn  @click="destroy(item)" color="danger" icon strip :tooltip="{text: 'Deleted'}" rounded>
                                                    <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                                </x-btn>
                                            </div>
                                        </x-table-body-cell>
                                    </x-table-body>
                                </x-table>
                
                                <div v-if="about">
                                    <x-pagination :count="about.length" :pagination="pagination"  @page="switchPage" @per_page="switchPerPage" />
                                </div>
                        </div>
                    </div>
                </div>

                <x-modal-about-create
                    :show="isShowModalAboutCreate"
                    @close="(event) => isShowModalAboutCreate = event"
                    @addedToLibrary="addedToLibrary"
                    :title="`Creating a new description in about section.`"
                />

                <x-modal-about-preview
                    :show="isShowModalAboutPreview"
                    @close="(event) => isShowModalAboutPreview = event"
                    title="About section preview."
                />

                <x-modal-about-edit
                    :show="isShowModalAboutEdit"
                    :preview="aboutPreview"
                    @close="(event) => isShowModalAboutEdit = event"
                    @addedToLibrary="addedToLibrary"
                    :title="`Edit: ${aboutPreview?.name}`"
                />
            </div>
        </template>

        <template #sidebar>
            
        </template>
    </x-section-dashboard>
</template>