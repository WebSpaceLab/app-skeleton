<script setup>
const { $article, $auth } = useNuxtApp()

definePageMeta({
    layout: "authorization",
    middleware: [ 'auth']
    
})

onMounted(() => {
    $auth.giveAccess($auth.accessGranted('ROLE_ADMIN'))
})

</script>

<template>
    <x-section-dashboard v-if="$auth.accessGranted('ROLE_ADMIN')"  :container="false">
        <template #header-panel>

            <x-btn
                to="/dashboard/article/create"
                link
                class="h-9 group"
                color="secondary-outline"
                shadow
                :tooltip="{text: 'Show article'}"
                rounded
                icon
            >
                <template #icon>
                    <Icon name="material-symbols:post-add" class="text-xl " />
                </template>
            </x-btn>
        </template>

        <template #main>
            <div class="w-full container mx-auto">
                <article class="container mx-auto w-full rounded-lg p-4">
                    <header class="relative w-full flex flex-col justify-start items-start py-6">
                        <h1
                            class="pt-6 font-extrabold prose-sm md:prose-md lg:prose-lg xl:prose-2xl m-5 focus:outline-none text-basic-light dark:text-basic-dark " 
                            v-html="$article.form.title ? $article.form.title : 'No title'"
                        />
                    </header>

                    <section class="relative">
                        <div
                            v-html="$article.form.content ? $article.form.content : 'No content'"
                            class="prose-sm lg:prose-lg xl:prose-2xl m-5 text-muted dark:text-muted-dark focus:outline-none"
                        />
                    </section>
                </article>
            </div>
        </template>

        <template #sidebar>
            
        </template>
    </x-section-dashboard>
</template>