<script setup>
const {  $general } = useNuxtApp()

const form = ref({
    name: $general.data.name,
    description: $general.data.description,
})

async function  create () {
    await $general.create(form.value)
}

async function  update () {
    await $general.update(form.value)
}
</script>

<template>
    <form class="w-full flex flex-col justify-start items-start space-y-6" >
        <div class="w-full h-40  flex justify-start items-start space-x-6">
   
            <div class="h-full">
                <img :src="$general.data.logoUrl"  alt="favicon" class="w-40 h-full object-cover" />
            </div>

            <div class="w-full h-full flex flex-col inset-y-0">
                <div class="w-full h-10 flex justify-end items-center px-1 box-border space-x-3">
                    <label class="bg-primary-800 dark:bg-primary-800 cursor-pointer  border-solid px-4 h-7 inline-flex items-center rounded-lg border border-primary-400 shadow-sm text-sm font-medium text-primary-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                        Change file

                        <input ref="file" @input="onSelectedFile" type="file" name="file" class="sr-only">
                    </label>
                                           
                    <x-btn
                        v-if="!form.name || !form.description"
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
                    <x-input
                        v-model="form.name"
                        label="Nazwa strony"
                        name="general_title"
                        :error="$general.errors && $general.errors.name ? $general.errors.name : ''"
                    />
                </div>
            </div>
        </div>

        <div  class="w-full">
            <x-textarea
                v-model="form.description"
                :maxlength="150"
                label="Opis strony"
                name="general_description"
                :error="$general.errors && $general.errors.description ? $general.errors.description : ''"
            />
        </div>
    </form>
</template>