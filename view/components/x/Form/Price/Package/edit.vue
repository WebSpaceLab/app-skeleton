<script setup>
const {$price } = useNuxtApp()
const emits = defineEmits(['addedToLibrary']);
const props = defineProps({
    pricePackage: {
        type: Object,
        default: null
    },
    isClose: {
        type: Boolean,
        default: false
    }
})

const form = reactive({
    title: props.pricePackage ? props.pricePackage.title : '',
    price: props.pricePackage ? props.pricePackage.price : '',
    actionUrl: props.pricePackage ? props.pricePackage.actionUrl : '',
    nameBtn: props.pricePackage ? props.pricePackage.nameBtn : '',
    isHighlighted: props.pricePackage ? props.pricePackage.isHighlighted : false,
})

const addedToLibrary = (event) => {
    emits('addedToLibrary', event)
}

const restForm = () => {
    form.title = props.pricePackage ? props.pricePackage.title : ''
    form.price = props.pricePackage ? props.pricePackage.price : ''
    form.actionUrl = props.pricePackage ? props.pricePackage.actionUrl : ''
    form.nameBtn = props.pricePackage ? props.pricePackage.nameBtn : ''
    form.isHighlighted = props.pricePackage ? props.pricePackage.isHighlighted : false
}

async function createdPricePackage() {
   const data = await $price.updatedPricePackage(form, props.pricePackage.id)

    if(data) {
        addedToLibrary(data)
    }
}

watch(() => props.pricePackage, (pricePackage) => {
    if(pricePackage) {
        form.title = pricePackage.title
        form.price = pricePackage.price
        form.actionUrl = pricePackage.actionUrl
        form.nameBtn = pricePackage.nameBtn
        form.isHighlighted = pricePackage.isHighlighted
    }
})

watch(() => props.isClose, (close) => {
    if(close) {
        restForm()
    }
})
</script>

<template>
    <div class="w-full flex justify-center items-center p-6 box-border" >
        <form  class="relative w-full h-full flex flex-col space-y-6" @submit.prevent="createdPricePackage()">
            <x-input
                class="mb-4"
                label="Tytuł"
                v-model="form.title"
                name="title"
                :error="$price.errors && $price.errors.title ? $price.errors.title[0] : null"
            />

            <x-input
                class="mb-4"
                label="Cena"
                v-model="form.price"
                name="price"
                :error="$price.errors && $price.errors.price ? $price.errors.price[0] : null"
            />

            <x-input
                class="mb-4"
                label="Url"
                v-model="form.actionUrl"
                name="actionUrl"
                :error="$price.errors && $price.errors.actionUrl ? $price.errors.actionUrl[0] : null"
            />

            <x-input
                class="mb-4"
                label="Nazwa przycisku"
                v-model="form.nameBtn"
                name="nameBtn"
                :error="$price.errors && $price.errors.nameBtn ? $price.errors.nameBtn[0] : null"
            />

            <div class="flex flex-row justify-center items-center w-full h-9 mb-6">
                <div class="flex w-full justify-end items-center ">
                    <span v-if="form.isHighlighted" class="mr-3 text-sm font-medium text-green-500">highlighted</span>
                    <span v-else class="mr-3 text-sm font-medium text-red-500">not highlighted</span>
                    
                    <label  @click="form.isHighlighted = !form.isHighlighted" for="toggle-social-create" class="inline-flex relative items-center mr-5 cursor-pointer">
                        <input  v-model="form.isHighlighted" type="checkbox" :value="form.isHighlighted" id="toggle-social-create" class="sr-only peer" checked>
                        
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                </div>
            </div>

            <div class="w-full space-y-6">
                <x-btn
                    :disabled="(!form.title && form.price)"
                    type="submit"
                    class="w-full"
                    color="success-outline"
                    :loading="$auth.isLoading"
                    rounded
                    shadow
                >
                    Save
                </x-btn>
            </div>
        </form>
    </div>
</template>