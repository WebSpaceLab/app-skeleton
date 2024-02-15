<script setup>
const props = defineProps({
    article: Object,
    loading: {
        type: Boolean,
        default: false,
    },
});

let isHover = ref(false);

const { classTextColor } = useClassColor();

</script>

<template>
    <!-- ====== CardStart -->
    <div class="w-full h-56">
        <NuxtLink
             v-if="!loading"
             :to="`/article/${article.slug}`"
             @mouseover="isHover = true"
             @mouseleave="isHover = false"
             :class="isHover ? 'shadow-2xl shadow-black transition-all duration-200 ease-in' : 'transition-all duration-200 ease-out'"
             class="relative w-full h-full flex rounded-lg z-10 hover:scale-103"
         >
             <div class="w-full h-full rounded-lg overflow-hidden">
                 <nuxt-img  class="rounded-lg w-full h-full object-cover" :class="isHover ? 'scale-110 transition-all duration-200 ease-in' : 'scale-100 transition-all duration-200 ease-in'" :src="article?.media?.previewUrl ?? '/images/placeholder.png'" :alt="article?.media?.name ?? 'Image'" />
             </div>
     
             <span class="absolute w-full left-0 bottom-0 px-3 pt-1 pb-2 flex flex-col bg-slate-900/60 z-10 overflow-hidden rounded-b-lg">
                 <div class="flex justify-between ">
                    <p class="uppercase text-xs m-0" :style="{'color': article?.category?.color}">
                        {{article?.category?.name}}
                    </p>
                    
                     <span class="text-xs text-info-600">
                         <Icon name="material-symbols:nest-clock-farsight-analog-outline" class="text-xl" />
                         {{ article?.createdAtAgo }}
                     </span>
                 </div>
     
                 <span class="w-full m-0 border border-solid border-b-1" :style="{'border-color': article?.category?.color}" />
     
                 <p class="sm:text-xs md:text-sm lg:text-md text-white">
                     {{ article?.title }}
                 </p>
             </span>
             <slot name="decoration"></slot>
         </NuxtLink>
     
         <x-animation-loader-card-medium v-else />
    </div>
<!-- ====== Card End -->
</template>
