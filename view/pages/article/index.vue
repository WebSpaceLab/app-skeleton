<script setup>
import { storeToRefs } from 'pinia';

const { $article } = useNuxtApp()
const { allPublished , pagination, months, queryParams } = storeToRefs($article)

definePageMeta({
    layout: "default",
})


const page = ref(1)

const query = ref({
    term: queryParams.value.term ? queryParams.value.term : '',
    month: queryParams.value.month ? queryParams.value.month : null,
    orderBy: queryParams.value.orderBy ? queryParams.value.orderBy : 'createdAt',
    orderDir: queryParams.value.orderDir ? queryParams.value.orderDir : 'desc'
})

const perPage = ref(12)

const allMonths = computed(() => {
    return [
        {value: null, label: 'Any date'},
        ...months.value,
    ];
}) 

async function  getPublishedArticles() {
     await $article.getPublishedArticles(query.value, perPage.value, page.value)
}


async function switchPage(event) {
    page.value = event
    await getPublishedArticles()
}

async function switchPerPage (event)  {
    page.value = 1
    perPage.value = event
    await getPublishedArticles()
}


onMounted(async () => {
    await getPublishedArticles()
})

watch(() => query.value.term, () => {
    setTimeout(async () => {
        page.value = 1
        await getPublishedArticles()
    }, 300)
})

watch(() => query.value.month, () => {
    setTimeout(async () => {
        page.value = 1
        await getPublishedArticles()
    }, 300)
})

watch(() => query.value.orderBy, async () => {
    page.value = 1
    await getPublishedArticles()
})

watch(() => query.value.orderDir, async () => {
    page.value = 1
    await getPublishedArticles()
})
</script>

<template>
    <section class="w-screen min-h-screen container flex flex-col justify-start items-center pt-6 px-6">
        <div class="relative w-full flex justify-end">
            <div class="w-60">
                <x-search  v-model="query.term" :filter="false" icon >
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
                        </div>
                    </template>
                </x-search>
            </div>

        </div>

        <div class="w-full mt-6">
            <header class="w-full flex flex-col">
                <div class="mb-1 w-full bg-slate-500 flex justify-center items-center rounded-t-lg">
                    <h2 class="text-2xl m-0 text-background-light dark:text-background-dark uppercase font-extrabold">Artykuły</h2>
                </div>
    
                <span class="border border-solid border-b-1 border-slate-500"/>
            </header>
    
            <div v-if="!$article.isLoading" class=" h-full p-6 lg:p-10 box-border dark:bg-gray-800/20 transition-all duration-500 rounded-xl" >
                <div v-if="allPublished" class="w-full h-full flex">
                    <div class="transition-all duration-500 w-full" >
                        <div class="w-full h-full transition-all duration-500" >
                            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 xl:gap-4 xl:px-6">
                                <div v-for="(article, index) in allPublished" :key="index" class="w-full h-full"  data-aos="zoom-in" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
                                    <CardArticle :article="article" :loading="$article.isLoading"/>
                                </div>
                            </div>
                
                            <div v-if="allPublished">
                                <x-pagination :count="allPublished?.length" :pagination="pagination"  @page="switchPage" @per_page="switchPerPage" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            <div v-else class="w-full h-full flex justify-center items-center">
                <spinner :loading="$article.isLoading" class="w-20 h-20" />
            </div>
        </div>
    </section>
</template>