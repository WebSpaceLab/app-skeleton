<script setup>
import { storeToRefs } from 'pinia';

const { $galleries, $auth } = useNuxtApp()
const { data , isLoading, pagination, months, queryParams,  status } = storeToRefs($galleries)

definePageMeta({
    layout: "authorization",
    middleware: [ 'auth']
    
})

onMounted(() => {
    $auth.giveAccess($auth.accessGranted('ROLE_EDITOR'))
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

async function  getGalleries() {
     await $galleries.get(query.value, perPage.value, page.value)
}


async function switchPage(event) {
    page.value = event
    await getGalleries()
}

async function switchPerPage (event)  {
    page.value = 1
    perPage.value = event
    await getGalleries()
}

function toggleSelectAll(e) {
    data.value.forEach(item => item.selected = e.target.checked)
    
    showFieldAction()
}

async function destroy(galleryId) {
    if (confirm(`Czy na pewno chcesz usunąć ten plik?`)) {     
        await $galleries.destroy(galleryId)
        await getGalleries()
    }
}

async function executeAction(actionId) {
    const galleriesId = data.value.filter(item => item.selected)
        .map(item => item.id);

    if (!actionId?.length) return;

    switch (actionId) {
        case 'delete':
        if (confirm(`Czy jesteś pewny, że chcesz usunąć?`)) {
            galleriesId.forEach(async (galleryId) => {   
                try {
                    await $article.destroy(galleryId)
                } finally {
                    isShowActions.value = false
                    selectAll.value = false
                    await getGalleries()
                }                                        
            })
        }
        break;
    }
}

function showFieldAction() {
    const isSelected = data.value.filter(item => item.selected)

    if(isSelected?.length) {
        isShowActions.value = true

    } else {
        isShowActions.value = false
    }
}

onMounted(async () => {
    await getGalleries()
})

watch(() => query.value.term, () => {
    setTimeout(async () => {
        page.value = 1
        await getGalleries()
    }, 300)
})

watch(() => query.value.month, () => {
    setTimeout(async () => {
        page.value = 1
        await getGalleries()
    }, 300)
})

watch(() => query.value.status, () => {
    setTimeout(async () => {
        page.value = 1
        await getGalleries()
    }, 300)
})

watch(() => query.value.orderBy, async () => {
    page.value = 1
    await getGalleries()
})

watch(() => query.value.orderDir, async () => {
    page.value = 1
    await getGalleries()
})
</script>

<template>
    <x-section-dashboard v-if="$auth.accessGranted('ROLE_EDITOR')"  :container="false">
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
                to="/dashboard/gallery/create"
                link
                class="h-9 group"
                color="secondary-outline"
                shadow
                :tooltip="{text: 'Utwórz nową galerię'}"
                rounded
                icon
            >
                <template #icon>
                    <Icon name="solar:gallery-add-linear" class="text-xl " />
                </template>
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


                <div class="w-full h-full flex">
                    <div class="transition-all duration-500 w-full" >

                        <div v-if="Array.isArray(data)"  class="w-full h-full transition-all duration-500" >
                            <div v-if="data.length == 0" class="w-full h-full lg:h-150 flex justify-center items-center">
                                <p class="text-2xl font-bold">
                                    Brak danych do wyświetlenia
                                </p>   
                            </div>

                            <div v-else class="w-full h-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 xl:gap-8">
                               
                                <x-card-photo-gallery
                                    v-for="(gallery, index) in data"
                                    :key="index"
                                    :gallery="gallery"
                                    :to="`/dashboard/gallery/${gallery.slug}`"
                                    @destroy="destroy"
                                    action
                                    footer
                                >
                                    <template #action>
                                        <x-btn
                                            @click="destroy(gallery.id)"
                                            class="h-9 w-9"
                                            :tooltip="{text: 'Usuń'}"
                                            color="danger"
                                            icon
                                            rounded
                                        >
                                            <Icon name="material-symbols:restore-from-trash-outline-sharp"  class="text-2xl" />
                                        </x-btn>
                                    </template>

                                    <template #footer>
                                        <div class="w-full h-full flex justify-end items-center"> 

                                            <div v-if="gallery.isPublished" class="text-blue px-2">
                                                Opublikowane
                                            </div>
                                            <div v-else class="text-red px-2">
                                                Nie opublikowane
                                            </div>
                                        </div>
                                    </template>
                                </x-card-photo-gallery>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>

        <template #sidebar>
        </template>
    </x-section-dashboard>
</template>