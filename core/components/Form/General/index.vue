<script setup>
import { storeToRefs } from 'pinia';

const {  $generalStore } = useNuxtApp()
const { title, faviconUrl, description  } = storeToRefs($generalStore)

const form = ref({
    title: title.value,
    description: description.value,
})

async function  create () {
    await $generalStore.createdGeneral(form.value)
}

async function  update () {
    await $generalStore.update(1, form.value)
}
</script>

<template>
    <form class="w-full flex flex-col justify-start items-start space-y-6">
        <div class="w-full h-40  flex justify-start items-start space-x-6">
   
            <div class="h-full">
                <img :src="faviconUrl"  alt="favicon" class="w-40 h-full object-cover" />
            </div>

            <div class="w-full h-full flex flex-col inset-y-0">
                <div class="w-full h-10 flex justify-end items-center px-1 box-border space-x-3">
                        <!--
                            <label class="bg-white px-4 h-9 inline-flex items-center rounded border border-gray-300 shadow-sm text-sm font-medium text-gray-700 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                Change file
        
                                <input ref="file" @input="onSelectedFile" type="file" name="file" class="sr-only">
                            </label>
                        -->
                                           
                    <x-btn
                        v-if="!title || !description"
                        :tooltip="{text: 'create'}"
                        @click.prevent="create"
                        color="primary-outline"
                        icon
                        rounded
                    >
                        <Icon name="material-symbols:add-circle" class="text-xl" />
                    </x-btn>

                    <x-btn
                        v-else
                        :tooltip="{text: 'update'}"
                        @click.prevent="update"
                        color="primary-outline"
                        icon
                        rounded
                    >
                        <Icon name="material-symbols:sync-rounded" class="text-xl" />
                    </x-btn>
                </div>

                <div class="w-full h-full flex justify-center items-end">
                    <x-input v-model="form.title" label="Site Title" name="general_title" />
                </div>
            </div>
        </div>

        <div  class="w-full">
            <x-textarea v-model="form.description" label="Site Description" name="general_description" />
        </div>
    </form>
</template>