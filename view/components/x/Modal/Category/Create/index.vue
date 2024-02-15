<script setup>
const { $categories } = useNuxtApp()

const emits = defineEmits(['close', 'addedToLibrary']);

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '4xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        default: ''
    },
});

const close = () => {
    // resetForm()
    emits('close', false)
}

const form = reactive({
    name: '',
    slug: '',
    color: '',
    description: '',
    isActive: false,
})

const resetForm = () => {
    form.name = ''
    form.slug = ''
    form.color = ''
    form.description = ''
    form.isActive = false
    $categories.errors = null
}

const create = async () => {
    await $categories.create(form)

    if($categories.errors) {
        return
    }

    if(!$categories.isLoading) {
        addedToLibrary()
        resetForm()
        close()
    }   
}

const addedToLibrary = () => {
    emits('addedToLibrary', true)
}


watch(() => form.name, (event) => {
    form.slug = event.toLowerCase().replace(/ /g, '-')
    form.slug = form.slug.replace(/[^\w-]+/g, '')
    form.slug = form.slug.replace(/--+/g, '-')

})

watch(() => form.slug, (event) => {
    form.slug = event.toLowerCase().replace(/ /g, '-')
    form.slug = form.slug.replace(/[^\w-]+/g, '')
    form.slug = form.slug.replace(/--+/g, '-')
})
</script>

<template>
    <x-modal-dialog
        :show="show"
        :max-width="maxWidth"
        :closeable="closeable"
        @close="close"
        :title="title"
    >
        <form class="w-full h-full flex flex-col justify-center items-start space-y-6 py-6">
            <div class="w-full h-full flex flex-col justify-start items-start space-y-6">
                <div class="w-full flex space-x-3">
                    <x-input
                        v-model="form.name"
                        color="blue"
                        label="Name"
                        :error="$categories.errors && $categories.errors.name ? $categories.errors.name: ''"
                    />
                    <x-input
                        v-model="form.slug"
                        color="blue"
                        label="Slug"
                        :error="$categories.errors && $categories.errors.slug ? $categories.errors.slug: ''"
                    />
                </div>
            </div>
          
            <div class="w-full">
                <x-textarea
                    v-model="form.description"
                    label="Description"
                    :error="$categories.errors && $categories.errors.description ? $categories.errors.description : ''"
                    :rows="5"
                />
            </div>

            <div class="flex justify-start items-center space-x-7">
                <div class="flex w-full justify-end items-center ">
                    <span v-if="form.isActive" class="mr-3 text-sm font-medium text-green-500">active status</span>
                    <span v-else class="mr-3 text-sm font-medium text-red-500">status not active</span>

                    <label @click="form.isActive = !form.isActive" for="toggle-social-create" class="inline-flex relative items-center mr-5 cursor-pointer">
                        <input v-model="form.isActive" type="checkbox" :value="form.isActive" id="toggle-social-create" class="sr-only peer" checked>
                        
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                </div>

                <div >
                    <input v-model="form.color" type="color">
                </div>
            </div>
        </form>

       <template #footer>
            <div class="flex space-x-3">
                <x-btn @click="resetForm" type="submit" color="primary-outline" rounded >Reset</x-btn>
                <x-btn @click.prevent="create" @keydown.enter="create" type="submit" color="primary-outline" rounded :loading="$categories.isLoading" :disabled="!form.name">Create</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>