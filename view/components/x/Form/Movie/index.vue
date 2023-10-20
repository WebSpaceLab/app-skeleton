<script setup>
const $media = useNuxtApp().$media
const emits = defineEmits(['addedToLibrary', 'close'])
let activeType = ref()

const form = ref({
    name: '',
    mediaUrl: '',
    type: 'video/youTube'
})

const types =  computed(() => {
    return [
        // { value: 'application/pdf', label: 'Image', icon: 'vscode-icons:file-type-pdf2', label: 'Pdf Url' },
        { value: 'video/youTube', icon: 'logos:youtube-icon', label: 'YouTube Video Id'},
    ]
})

const uploadMovieFile = async (form) => {
    const data = await $media.uploadMovieFile(form)
    emits('addedToLibrary', data.media)

    resetForm()
    emits('close', false)
}

const addType = (type) => {
    form.value.type = type.value
    activeType.value = type
}

const resetForm = () => {
    form.value.name = ''
    form.value.mediaUrl = ''
    form.value.type = ''
}

onMounted(() => {
    addType(types.value[0])
})
</script>

<template>
    <div class="w-full">
        <form class="w-full flex flex-col space-y-6 p-6 box-border" @submit.prevent="uploadMovieFile(form)">
            <div class="w-full flex space-x-3 px-4 box-border">
                <template v-for="(type, index) in types" :key="index">
                    <span class="cursor-pointer">
                        <Icon 
                            @click="addType(type)" 
                            :name="type.icon" 
                            class="text-5xl px-2 py-1 rounded-xl hover:bg-hover-600" 
                            :class="[
                                form.type === type.value ? 'bg-hover-600' : 'bg-hover-500',
                                form.type === type.value ? 'text-white' : 'text-gray-500',
                            ]" 
                        />
                    </span>
                </template>
            </div>

            <div class="w-full">
                <x-input
                    v-model="form.name"
                    color="blue"
                    label="Name"
                    type="text"
                    icon
                    name="movie_name"
                    :error="$auth.errors && $auth.errors?.name ? $auth.errors.name[0] : ''"
                    autofocus
                >
                    <template #icon>
                        <Icon name="material-symbols:drive-file-rename-outline" class="text-xl" />
                    </template>
                </x-input>
            </div>

            <div class="w-full">
                <x-input
                    v-model="form.mediaUrl"
                    color="blue"
                    :label="activeType ? activeType.label : 'Media Url'"
                    type="text"
                    icon
                    name="movie_movieUrl"
                    :error="$auth.errors && $auth.errors?.mediaUrl ? $auth.errors.mediaUrl[0] : ''"
                    autofocus
                >
                    <template #icon>
                        <Icon :name="activeType ? activeType.icon : 'material-symbols:docs'" class="text-xl" />
                    </template>
                </x-input>
            </div>

            <div class="w-full flex justify-end">
                <x-btn type="submit" color="secondary-outline" rounded :loading="$media.isLoading">Upload</x-btn>
            </div>
        </form>
    </div>
</template>