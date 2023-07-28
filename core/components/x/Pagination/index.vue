<script setup>
const props = defineProps({
    pagination: {
        type: Object,
        default: false
    },
    count: Number,
})

const emits = defineEmits([
    'page', 'per_page'
])

const input = ref(null)
const isShowInput = ref(null)

const prevPage = computed(() => { return props.pagination.current_page === 1 ? null : props.pagination.current_page - 1 })
const totalPages = computed(() => { return Math.ceil(props.pagination.total / props.pagination.per_page) })
const nextPage = computed(() => { return props.pagination.current_page >= totalPages ? null : props.pagination.current_page + 1 })

const  previewPages = ref([])

function getPage(page) {
    if(page === props.pagination.current_page) {
        isShowInput.value = true
        input.value = page
    } else {
        isShowInput.value = false
        emits('page', page)
        getPreviewPages()
    }
}

function getPreviewPages() {
    previewPages.value = []

    for (let index = 1; index <= Math.ceil(props.pagination.total / props.pagination.per_page); index++) {
        if(Math.ceil(props.pagination.total / props.pagination.per_page) <= 5) {
            previewPages.value.push(index)
        } else {
            if(index === 1) {
                previewPages.value.push(index)
            }

            if(props.pagination.current_page - 1 === index && index !== 1 && index !== totalPages ) {
                if(index > 2 ) {
                    previewPages.value.push('...')
                }

                previewPages.value.push(index)
            }

            if(props.pagination.current_page === index && index !== 1 && index !== totalPages ) {
                previewPages.value.push(index)
            }

            if(props.pagination.current_page + 1 === index && index !== 1 && index !== totalPages ) {
                previewPages.value.push(index)

                if(index < Math.ceil(props.pagination.total / props.pagination.per_page) - 1 ) {
                    previewPages.value.push('...')
                }
            }

            if(Math.ceil(props.pagination.total / props.pagination.per_page) === index) {
                previewPages.value.push(index)
            }

        }
        
    }
}


// watch(() => input.value, (page) => {
//     const numberPage = Number(page)

//     if(numberPage >= 0 && numberPage <= props.pagination.total_pages ) {
//         getPage(page)
    
//     }
// })

watch(() => props.pagination.per_page, (perPage) => {
    emits('per_page', perPage)
    getPreviewPages()
})

onMounted(() => {
    getPreviewPages()
})
</script>

<template>
    <div v-if="pagination" class="w-full h-20 flex justify-between items-center mt-4 box-border">
        <div class="flex">
            <div class="hidden mr-2 text-sm bg-prime-light dark:bg-prime-dark px-4 py-1 text-muted-light dark:text-muted-dark lg:block rounded shadow-xl shadow-black">
               <p> Displaying {{ count }} item(s) of {{ pagination.total }} </p> 
            </div>
    
            <div class="hidden h-12 lg:flex justify-center items-center space-x-2 mr-2 text-sm bg-prime-light dark:bg-prime-dark px-4 py-1 text-muted-light dark:text-muted-dark rounded shadow-xl shadow-black">
                <select v-model="pagination.per_page" aria-label="Media date" id="date" class="w-28  bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                    <option :value="1">1</option>
                    <option :value="4">4</option>
                    <option :value="8">8</option>
                    <option :value="12">12</option>
                    <option :value="48">48</option>
                    <option :value="96">96</option>
                </select>

               <p> Entries per page</p> 
            </div>
        </div>

        <div v-if="previewPages.length > 1"  class="flex space-x-1 items-top  flex justify-center items-center">
            <x-btn v-if="prevPage" @click="getPage(prevPage)" icon strip color="primary">
                <Icon name="material-symbols:arrow-back-ios-rounded" class="" /> 
            </x-btn>
            
            <template
                v-for="(page, index) in previewPages"
                :key="index"
            >   
                <div
                    @click="getPage(page)"
                    v-html="page"
                    class="py-1 px-3 mx-1 rounded cursor-pointer"
                    :class="{'font-bold text-muted-light dark:text-muted-dark dark:bg-blue-600 cursor-default bg-prime-light dark:bg-prime-dark shadow-xl shadow-black' : page === pagination.current_page, 'text-muted-light dark:text-muted-dark border-gray-400 dark:bg-gray-700 cursor-default' : !page , 'hidden' : page === null }"
                />
            </template>

            <!--
            -->
            <input v-if="isShowInput && totalPages > 5" @keydown.enter=" getPage(input)"  type="text" v-model="input" class="w-10 text-muted-light dark:text-muted-dark border-gray-400 dark:bg-gray-700 rounded shadow-xl shadow-black" >

            <x-btn v-if="nextPage" @click="getPage(nextPage)" icon strip color="primary">
                <Icon name="material-symbols:arrow-forward-ios-rounded" class="" /> 
            </x-btn>
            
        </div>
    </div>
</template>