<script setup>
const props = defineProps({
    article: {
        type: Object,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    action: {
        type: Boolean,
        default: false
    },  
    footer: {
        type: Boolean,
        default: false
    }
})
</script>

<template>
    <article class="w-full bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mt-4 ">
        <header class="relative w-full flex flex-col justify-start items-start">
            <div class="w-full flex justify-between items-center">
                <div class="flex justify-start items-center space-x-3">
                    <p class="uppercase text-lg text-white px-2 pt-1 m-0 rounded-t-md" :style="{'color': article.category?.color}">
                        {{article.category?.name}}
                    </p>

                </div>
                
                <div class="flex space-x-3">
                    <span class="text-xs text-info-600 flex items-center space-x-1">
                        <Icon name="material-symbols:nest-clock-farsight-analog-outline" class="text-xl" />
                        
                        <p class="m-0">
                            {{ article.createdAtAgo }}
                        </p>
                    </span> 

                    <span class="flex justify-center items-center space-x-1 text-xs text-info">
                        <Icon name="majesticons:comments" class="text-xl" />
                        
                        <p class="m-0">
                            Komentarze: 0
                        </p>
                    </span>
                </div>
            </div>
            
            <span class="w-full  m-0 border border-solid border-b-1" :style="{'border-color': article.category?.color}" />
            
            <div class="w-full flex justify-end p-1">
                <p class="m-0 pl-2">Opracował: {{ article.author?.firstName }} {{article.author?.lastName }}</p>
                    
            </div>

            <h1 class="w-full pt-6 text-center font-extrabold prose-sm md:prose-md lg:prose-lg xl:prose-2xl m-5 focus:outline-none text-basic-light dark:text-basic-dark " v-html="article.title"></h1>
        </header>

        <section class="relative">
            <p
                v-html="article.content"
                class="prose-sm lg:prose-lg xl:prose-2xl m-5 text-muted dark:text-muted-dark focus:outline-none"
            />
     
        </section>
    </article>
</template>