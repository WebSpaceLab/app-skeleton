<script setup>
const props = defineProps({
    items: {
        type: Array,
        require: true,
        default: () => []
    },
    head: {
        type: Array
    },
    body: {
        type: Boolean,
        default: true
    },
    food: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    responsiveSmallTable: {
        type: Boolean,
        default: false
    }, 
    selected: {
        type: Boolean,
        default: true
    },
    justify: {
        type: String,
        default: 'center'
    },
    count: {
        type: Number,
        default: 0
    }
})

const emits = defineEmits([
    'select-all'
])

function toggleSelectAll (e) {
    emits('select-all', e)
}
</script>


<template>
    <div class="w-full">
        <div v-if="!loading" class="w-full overflow-auto" :class="[
            responsiveSmallTable ? '' : 'hidden md:block'
        ]">
            <div v-if="count == 0" class="w-full h-screen lg:h-150 flex justify-center items-center">
                <p class="text-2xl font-bold">
                    Brak danych do wyświetlenia
                </p>   
            </div>

            <div v-else class="w-full">
                <table  class="min-w-full  divide-y divide-gray-200 rounded-lg shadow-xl shadow-black table-fixed border-spacing-y-2">
                    <thead class="w-full bg-gradient-to-r from-prime-light/80 to-second-light/80 dark:from-prime-dark/80 dark:to-second-dark/80 ">
                        <x-table-head v-if="head" @select-all="toggleSelectAll" :selected="selected" :head="head" :justify="justify"/>
                        
                        <slot v-else name="head"></slot>
                    </thead>
            
                    <tbody class="bg-prime-light dark:bg-prime-dark divide-y divide-blue-200 rounded-lg">
                        <slot ></slot>
                    </tbody>
            
                    <tfoot v-if="food" class="bg-prime-light dark:bg-prime-dark divide-y divide-blue-200 rounded-lg">
                        <slot name="food"></slot>
                    </tfoot>
                </table>
    
                <div>
                    <slot name="pagination"></slot>
                </div>
            </div>
        </div>
            
        <div v-else class="w-full h-screen lg:h-150">
            <Spinner :loading="loading" />
        </div>
    </div>
</template>