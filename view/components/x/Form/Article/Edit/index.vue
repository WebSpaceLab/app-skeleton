<script setup>
const{ $article } = useNuxtApp()

const props = defineProps({
    previewImage: {
        type: Object,
    },
})

watch(() => $article.edit.title, (event) => {
    $article.edit.slug = event.toLowerCase().replace(/ /g, '-')
    $article.edit.slug = $article.edit.slug.replace(/[^\w-]+/g, '')
    $article.edit.slug = $article.edit.slug.replace(/--+/g, '-')

})

watch(() => $article.edit.slug, (event) => {
    $article.edit.slug = event.toLowerCase().replace(/ /g, '-')
    $article.edit.slug = $article.edit.slug.replace(/[^\w-]+/g, '')
    $article.edit.slug = $article.edit.slug.replace(/--+/g, '-')
})
</script>

<template>
    <form class="w-full flex flex-col justify-center items-center space-y-6 ">
        <div class="w-full">
            <x-input
                v-model="$article.edit.title"
                color="blue"
                label="Title"
                name="article_title_create"
                :error="$article.errors && $article.errors?.title ? $article.errors.title : ''"
                autofocus
            >
            </x-input>
        </div>

        <div class="w-full">
            <x-input
                v-model="$article.edit.slug"
                color="blue"
                label="Slug"
                name="article_slug_create"
                :error="$article.errors && $article.errors?.slug ? $article.errors.slug : ''"
                autofocus
            >
            </x-input>
        </div>

        <div class="w-full">
            <x-textarea
                v-model="$article.edit.description"
                color="blue"
                label="Description"
                name="article_description_create"
                :error="$article.errors && $article.errors?.description ? $article.errors.description : ''"
                maxlength="500"
                autofocus
            >
            </x-textarea>
        </div>
        
        <div class="w-full">
            <x-text-editor 
                :content="$article.edit.content" 
                @value-model="(event) => $article.edit.content = event" 
                :photo="previewImage" 
                limit="20000" 
                :error="$article.errors && $article.errors?.content ? $article.errors.content : ''"    
            />
        </div>
        
    </form>
</template>