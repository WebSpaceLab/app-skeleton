<script setup>
const {slug} = useRoute().params;
const { $article } = useNuxtApp();

definePageMeta({
    layout: "default",
})

onMounted(async () => {
    await $article.getArticle(slug);
});
</script>

<template>
    <div class="relative w-screen min-h-screen container mx-auto flex flex-col">
        <!--Article
            <div v-if="(article.data.advertisements !== null)">
                <div v-if="article.data.advertisements.position === 'top'" class="relative w-full flex justify-center items-center mb-10">
                    <a  href="" rel="nofollow" alt="ads tobar" target="_blank">
                        <img  :src="article.data.advertisements.url" class="w-full lg:h-full object-cover" :alt="article.data.advertisements.name">
                    </a>
                </div>
            </div>
        -->
        


        <div class="relative w-full flex flex-col md:flex-row space-x-2">
            <div class="w-full">
                <x-section-article v-if="!$article.isLoading" :article="$article.show?.data" />
    
                <div v-else class="w-full flex justify-center items-start">
                    <spinner w-full :loading="$article.isLoading" />
                </div>
            </div>

            <div class="w-full md:w-96 relative">
                <aside class="w-full sticky top-32 flex flex-col space-y-4 z-10">
                    <!--
                        <div v-if="(article.data.advertisements !== null)">
                            <div v-if="article.data.advertisements.position === 'sidebar'"  class="w-full flex justify-center items-center rounded-lg p-2 bg-secondary dark:bg-secondary-dark">
                                <div class="rounded-lg w-[300px] h-[600px] overflow-hidden sm:mt-0">
                                    <a href="" rel="nofollow" target="_blank">
                                        <img  :src="article.data.advertisements.url" class="w-full lg:h-full object-cover" :alt="article.data.advertisements.name">
                                    </a>
                                </div>
                            </div>
                        </div>
                    -->
                    
                    <div v-if="$article.show?.data?.gallery" class="w-full rounded-lg flex flex-col space-y-2 p-2 bg-secondary dark:bg-secondary-dark">
                        <header class="w-full mb-1">
                            <div class="mb-1 w-full bg-slate-500 flex justify-center items-center rounded-t-lg">
                                <h2 class="text-xl text-background dark:text-background-dark uppercase font-medium">
                                    Galeria zdjęć
                                </h2>
                            </div>

                            <x-border yb="0" yt="0" color="slate" />
                        </header>

                        <div  class="w-full">
                            <x-card-photo-gallery
                                v-if="$article.show?.data?.gallery.media.length != 0"
                                :gallery="$article.show?.data?.gallery"
                                :to="`/galleries/${$article.show?.data?.gallery.slug}`"
                            />
                        </div>
                    </div>

                    <div class="w-full sticky top-32 rounded-lg flex flex-col space-y-2 p-2 bg-secondary dark:bg-secondary-dark">
                        <header class="w-full m-0 flex flex-col">
                            <div class="mb-1 w-full bg-slate-500 flex justify-center items-center rounded-t-lg">
                                <h2 class="text-2xl m-0 text-background-light dark:text-background-dark uppercase font-extrabold"> Wiadomości </h2>
                            </div>

                            <span class="border border-solid border-b-1 border-slate-500"/>
                        </header>

                        <div v-for="(article, index) in $article.show?.latest" :key="index"   class="w-full bg-primary dark:bg-primary-dark rounded-lg max-h-32">
                            <CardArticleSmaller  :article="article" />
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    </div>
</template>