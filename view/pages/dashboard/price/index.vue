<script setup>
import { storeToRefs } from 'pinia';

const { $price, $auth } = useNuxtApp()
const { data, pagination, months, queryParams,  status } = storeToRefs($price)

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
    orderDir: queryParams.value.orderDir ? queryParams.value.orderDir : 'asc'
})

const perPage = ref(8)

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

let isShowModalPriceCreate = ref(false)

async function getPriceList() {
    await $price.get(query.value, perPage.value, page.value)
}


async function addedToLibrary () {
    await getPriceList()
    await $price.get()
}

async function switchPage(event) {
    page.value = event
    await getPriceList()
}

async function switchPerPage (event)  {
    page.value = 1
    perPage.value = event
    await getPriceList()
}

onMounted(async () => {
    await getPriceList()
})

watch(() => query.value.term, () => {
    setTimeout(async () => {
        page.value = 1
        await getPriceList()
    }, 300)
})

watch(() => query.value.month, () => {
    setTimeout(async () => {
        page.value = 1
        await getPriceList()
    }, 300)
})

watch(() => query.value.status, () => {
    setTimeout(async () => {
        page.value = 1
        await getPriceList()
    }, 300)
})

watch(() => query.value.orderBy, async () => {
    page.value = 1
    await getPriceList()
})

watch(() => query.value.orderDir, async () => {
    page.value = 1
    await getPriceList()
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
                            <option value="title">Alphabetically</option>
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
                @click="event => isShowModalPriceCreate = true"
                class="h-9 group"
                color="secondary-outline"
                shadow
                :tooltip="{text: 'Add new price package'}"
                rounded
                icon
            >  
                <Icon name="material-symbols:add-circle-rounded" class="text-xl " />
            </x-btn>
        </template>

        <template #main>
            <div class=" h-full box-border dark:bg-gray-800/20 transition-all duration-500 rounded-xl" >
                <section v-if="data.length" id="price-list" class="container mx-auto snap-start h-full w-full flex flex-col justify-center items-center scroll-mt-0 relative  m-auto   py-20 px-5 box-border">
                    <template v-for="price in data" :key="price.id">
                        <x-card-price-list 
                            :price="price" 
                            @addedToLibrary="addedToLibrary" 
                        />
                    </template>
                </section>

                <div class="w-full h-full flex">
                    <div class="transition-all duration-500 w-full" >
                        <div class="w-full h-full transition-all duration-500" >                
                            <div v-if="data">
                                <x-pagination :count="data.length" :pagination="pagination"  @page="switchPage" @per_page="switchPerPage" />
                            </div>
                        </div>
                    </div>
                </div>

                <x-modal-price-create
                    :show="isShowModalPriceCreate"
                    @close="event => isShowModalPriceCreate = false"
                    @addedToLibrary="addedToLibrary"
                />
            </div>
        </template>

        <template #sidebar>
            
        </template>
    </x-section-dashboard>
</template>