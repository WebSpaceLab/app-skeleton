<script setup>
const { $price } = useNuxtApp()
const emits = defineEmits(['addedToLibrary']);
const form = reactive({
    title: '',
    subtitle: '',
    isActive: false,
})

const createdPriceList = async () => {
    const data = await $price.createdPriceList(form)

    if(data) {
        addedToLibrary(data)
    }
}

const addedToLibrary = (event) => {
    emits('addedToLibrary', event)
}
</script>

<template>
    <div class="w-full flex justify-center items-center py-6 box-border" >
        <form  class="relative w-full h-full flex flex-col space-y-6" @submit.prevent="createdPriceList(form)">
            <x-input
                class="mb-4"
                label="Tytuł"
                v-model="form.title"
                name="title"
                :error="$price.errors && $price.errors.title ? $price.errors.title[0] : null"
            />

            <x-input
                class="mb-4"
                label="Podtytuł"
                v-model="form.subtitle"
                name="subtitle"
                :error="$price.errors && $price.errors.subtitle ? $price.errors.subtitle[0] : null"
            />

            <div class="flex flex-row justify-center items-center w-full h-9 mb-6">
                <div class="flex w-full justify-end items-center ">
                    <span v-if="form.isActive" class="mr-3 text-sm font-medium text-green-500">active status</span>
                    <span v-else class="mr-3 text-sm font-medium text-red-500">status not active</span>
                    
                    <label for="toggle-social-create" class="inline-flex relative items-center mr-5 cursor-pointer">
                        <input @click="form.isActive = !form.isActive" v-model="form.isActive" type="checkbox" :value="form.isActive" id="toggle-social-create" class="sr-only peer" checked>
                        
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                </div>
            </div>

            <div class="w-full space-y-6">
                <x-btn
                    :disabled="(!form.title)"
                    type="submit"
                    class="w-full"
                    color="success-outline"
                    :loading="$auth.isLoading"
                    rounded
                    shadow
                >
                    Created price list
                </x-btn>
            </div>
        </form>
    </div>
</template>