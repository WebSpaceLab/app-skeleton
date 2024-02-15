<script setup>
const{ $article } = useNuxtApp()

const props = defineProps({
    previewImage: {
        type: Object,
    },
})

watch(() => $article.form.title, (event) => {
    $article.form.slug = event.toLowerCase().replace(/ /g, '-')
    $article.form.slug = $article.form.slug.replace(/[^\w-]+/g, '')
    $article.form.slug = $article.form.slug.replace(/--+/g, '-')

})

watch(() => $article.form.slug, (event) => {
    $article.form.slug = event.toLowerCase().replace(/ /g, '-')
    $article.form.slug = $article.form.slug.replace(/[^\w-]+/g, '')
    $article.form.slug = $article.form.slug.replace(/--+/g, '-')
})
</script>

<template>
    <form class="w-full flex flex-col justify-center items-center space-y-6 ">
        <div class="w-full">
            <x-input
                v-model="$article.form.title"
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
                v-model="$article.form.slug"
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
                v-model="$article.form.description"
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
                :content="$article.form.content" 
                @value-model="(event) => $article.form.content = event" 
                :photo="previewImage" 
                limit="20000" 
                :error="$article.errors && $article.errors?.content ? $article.errors.content : ''"    
            />
        </div>
        
    </form>
</template>