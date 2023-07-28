<script setup>
const emits = defineEmits([

])

const props = defineProps({
    data: {
        type: Array
    },
    action: {
        type: Boolean,
        default: false
    }
})

const items = ref([])

let loading = ref(false)

function addingField () {
    loading.value = true
    const item = {}
    if(items.value.length < 1) {

        items.value.push(item)
    }

    loading.value = false
}

function cancel(index) {
    loading.value = true

    items.value.filter((item, i, arr) => {
        if(item.index === index) {
            arr.splice(i, 1)
            return true
        }

        return false
    })

    loading.value = false
}
</script>

<template>
    <div  class="w-full flex flex-col space-y-3 px-6 box-border">
        <div v-if="loading" class="flex justify-center items-center transition-all duration-500"><Spinner :loading="loading"></Spinner></div>
        <div v-else v-for="(item, index) in items" :key="item.index = index" class="w-full transition-all duration-500">
            <div class="w-full px-6 box-border">
                <slot></slot>
            </div>
    
            <div v-if="action" class="w-full flex justify-end items-center space-x-6 mt-6">
                <x-btn @click.prevent="cancel(index)" color="warning-outline" shadow rounded >Cancel</x-btn>
                <slot name="action"></slot>
            </div>
        </div>

        <div v-if="items.length < 1" class="w-full transition-all duration-500">
            <x-btn @click="addingField()" class="w-full bg-slate-600/50 border-slate-600/50 text-background-dark " :disabled="items.length < 1 ? false : true" rounded icon-left :icon-right="loading">
                <template #icon-left>
                    <Icon name="material-symbols:add-circle" class="text-2xl text-background-dark"/>
                </template>

                Adding more fields

                <template #icon-right>
                    <Icon v-if="loading" name="svg-spinners:bars-rotate-fade" class="text-2xl text-background-dark"/>
                </template>
            </x-btn>
        </div>
    </div>
</template>