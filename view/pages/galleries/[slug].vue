<script setup>
const {slug} = useRoute().params;
const { $galleries } = useNuxtApp();

definePageMeta({
    layout: "default",
})

onMounted(async () => {
    await $galleries.getGallery(slug);
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
            <div class="w-full min-h-150">
                <article v-if="!$galleries.isLoading" class="  w-full h-full rounded-lg p-4 mt-4 ">
                    <header class="relative w-full flex flex-col justify-start items-start">
                        <div class="w-full flex justify-between items-center">
                            <div class="flex justify-start items-center space-x-3">
                                <h1 class="text-basic-light dark:text-basic-dark uppercase text-lg text-white px-2 pt-1 m-0 rounded-t-md" >
                                    {{$galleries.show.title}}
                                </h1>
    
                            </div>
                            
                            <div class="flex space-x-3">
                                <span class="text-xs text-info-600 flex items-center space-x-1">
                                    <Icon name="material-symbols:nest-clock-farsight-analog-outline" class="text-xl" />
                                    
                                    <p class="m-0">
                                        {{ $galleries.show.createdAtAgo }}
                                    </p>
                                </span> 
                            </div>
                        </div>
                        
                        <span class="w-full  m-0 border border-solid border-slate-600 border-b-1"  />

                        <div v-if="$galleries.show.article" class="w-full h-10 flex justify-start">
                            <nuxt-link :to="`/article/${$galleries.show.article.slug}`" class="w-auto  flex justify-center items-center decoration-none ">
                                <p class="text-sm font-semibold text-basic-light dark:text-basic-dark hover:text-hover-600">
                                    <Icon name="tabler:arrow-back" class="text-xl" />
                                    Przejdź do artykułu
                                </p>
                            </nuxt-link>
                        </div>
                        <!--
                            <div class="w-full flex justify-end p-1">
                                <p class="m-0 pl-2">Opracował: {{ $article.show.data?.author?.firstName }} {{ $article.show.data?.author?.lastName }}</p>
                                 
                            </div>
                        -->
    
                        <h3 class="w-full text-center font-extrabold prose-sm md:prose-md lg:prose-lg xl:prose-2xl m-5 focus:outline-none text-muted-light dark:text-muted-dark" v-html="$galleries.show.description"></h3>
                    </header>
    
                    <section class="relative w-full h-full p-6 box-border transition-all duration-500">
                        <x-photo-gallery
                            v-if="$galleries.show.photos.length != 0"
                            :photos="$galleries.show.photos"
                            class="w-full h-full"
                            isPhotosName
                            isDate
                        >
                        </x-photo-gallery>

                        <div v-else>
                            <div class="w-full h-full flex justify-center items-center">
                                <p class="text-xl uppercase font-semibold text-basic-light dark:text-basic-dark">Brak zdjęć w galerii</p>
                            </div>
                        </div>
                    </section>
                </article>
    
                
                <div v-else class="w-full h-full flex justify-center items-start">
                    <spinner w-full :loading="$galleries.isLoading" />
                </div>
            </div>
        </div>
    </div>
</template>