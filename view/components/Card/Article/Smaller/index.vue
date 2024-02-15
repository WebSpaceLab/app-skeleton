<script setup>
const props = defineProps({
    article: Object,
    loading: {
        type: Boolean,
        default: false,
    },
});

let isHover = ref(false);
</script>

<template>
    <!-- ====== CardStart -->
    <div class="w-full h-full">
        <NuxtLink
            v-if="!loading"
            :to="`/article/${article?.slug}`"
            @mouseleave="isHover = false"
            @mouseover="isHover = true"
            :class="isHover ? 'shadow-2xl shadow-black transition-all duration-200 ease-in' : 'transition-all duration-200 ease-out'"
            class="relative decoration-none w-full h-28 flex flex-col rounded-lg z-10 hover:scale-103"
        >
            <div class="relative decoration-none w-full h-28 flex flex-col rounded-lg z-10 overflow-hidden bg-background-light dark:bg-background-dark">
                <div class="w-full h-8 flex flex-col z-1">
                    <div class="w-full h-full px-3 flex justify-between items-end">
                        <p class="uppercase text-xs m-0" :style="{'color': article?.category?.color}">{{article?.category?.name}}</p>
            
                        <span class="text-xs text-info-600">
                            <Icon name="material-symbols:nest-clock-farsight-analog-outline" class="text-xl" />
                            {{ article?.createdAtAgo }}
                        </span>
                    </div>
            
                    <span class="w-full  m-0 border border-solid border-b-1" :style="{'border-color': article?.category?.color}" />
                </div>
        
                <div class="w-full h-20 flex space-x-2 p-2 box-border">
                    <div class="w-1/4 h-full rounded-lg overflow-hidden">
                        <nuxt-img
                            :alt="article?.media?.name ?? 'Image'"
                            :class="isHover ? 'scale-110 transition-all duration-200 ease-in' : 'scale-100 transition-all duration-200 ease-in'"
                            :src="article?.media?.previewUrl ?? '/images/placeholder.png'"
                            class="rounded-lg w-full h-full object-cover"
                        />
                    </div>
        
                    <div class="w-3/4 h-full flex justify-start" >
                        <p class="w-full h-full text-justify sm:text-xs md:text-sm lg:text-md text-basic-light dark:text-basic-dark truncate">
                            {{ article?.title }}
                        </p>
                    </div>
                </div>
            </div>
    
            <slot name="decoration">
                <transition
                    enter-active-class="transition ease-in duration-200"
                    enter-from-class="transform opacity-0"
                    enter-to-class="transform opacity-100"
                    leave-active-class="transition ease-in duration-200"
                    leave-from-class="transform opacity-100"
                    leave-to-class="transform opacity-0"
                >
                    <span v-if="isHover" class="w-[104%] h-[104%] absolute -left-[2%] -top-[2%] z-[-1] rounded-lg" :style="{
                            backgroundColor: article?.category?.color
                    }"/>
                    
                </transition>
            </slot>
        </NuxtLink>
    
        <x-animation-loader-card-smaller v-else />
    </div>
<!-- ====== Card End -->
</template>
