<script setup>
const{ $galleries } = useNuxtApp()

const props = defineProps({
    previewImage: {
        type: Object,
    },
})

watch(() => $galleries.show.title, (event) => {
    $galleries.show.slug = event.toLowerCase().replace(/ /g, '-')
    $galleries.show.slug = $galleries.show.slug.replace(/[^\w-]+/g, '')
    $galleries.show.slug = $galleries.show.slug.replace(/--+/g, '-')

})

watch(() => $galleries.show.slug, (event) => {
    $galleries.show.slug = event.toLowerCase().replace(/ /g, '-')
    $galleries.show.slug = $galleries.show.slug.replace(/[^\w-]+/g, '')
    $galleries.show.slug = $galleries.show.slug.replace(/--+/g, '-')
})
</script>

<template>
    <form class="w-full flex flex-col justify-center items-center space-y-6 ">
        <div class="w-full">
            <x-input
                v-model="$galleries.show.title"
                color="blue"
                label="Title"
                name="article_title_create"
                :error="$galleries.errors && $galleries.errors?.title ? $galleries.errors.title : ''"
                autofocus
            >
            </x-input>
        </div>

        <div class="w-full">
            <x-input
                v-model="$galleries.show.slug"
                color="blue"
                label="Slug"
                name="article_slug_create"
                :error="$galleries.errors && $galleries.errors?.slug ? $galleries.errors.slug : ''"
                autofocus
            >
            </x-input>
        </div>

        <div class="w-full">
            <x-textarea
                v-model="$galleries.show.description"
                color="blue"
                label="Description"
                name="article_description_create"
                :error="$galleries.errors && $galleries.errors?.description ? $galleries.errors.description : ''"
                maxlength="500"
                autofocus
            >
            </x-textarea>
        </div>
    </form>
</template>