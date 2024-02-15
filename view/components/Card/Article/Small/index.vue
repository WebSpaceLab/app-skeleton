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
    <div class="w-full h-full">
        <NuxtLink
            v-if="!loading"
            :to="`/article/${article?.slug}`"
            @mouseleave="isHover = false"
            @mouseover="isHover = true"
            :class="isHover ? 'shadow-2xl shadow-black transition-all duration-200 ease-in ' : 'transition-all duration-200 ease-out'"
            class="relative w-full h-full decoration-none flex flex-row space-x-3 rounded-lg z-10"
        >
            <div class="w-full h-full flex flex-row space-x-3 rounded-lg p-2 z-10 bg-background-light dark:bg-background-dark">
                <div class="w-40 h-full rounded-lg overflow-hidden">
                    <nuxt-img
                        :alt="article?.media?.name ?? 'Image'"
                        :class="isHover ? 'scale-110 transition-all duration-200 ease-in' : 'scale-100 transition-all duration-200 ease-in'"
                        :src="article.media.previewUrl ?? '/images/placeholder.png'"
                        class="rounded-lg w-full h-full object-cover hover:scale-103"
                    />
                </div>
        
                <div class="w-full p-4 flex flex-col" >
                    <div class="flex justify-between">
                        <p class="uppercase text-xs m-0" :style="{'color': article?.category?.color}">{{article?.category?.name}}</p>
        
                        <span class="text-xs text-info-600">
                            <Icon name="material-symbols:nest-clock-farsight-analog-outline" class="text-xl" />
                            {{ article?.createdAtAgo }}
                        </span>
                    </div>
        
                    <span class="w-full  m-0 border border-solid border-b-1" :style="{'border-color': article?.category?.color}" />
        
                    <p class="sm:text-xs md:text-sm lg:text-md text-basic-light dark:text-basic-dark">
                        {{ article?.title }}
                    </p>
                </div>
            </div>
            <slot name="decoration">
                <transition
                    enter-active-class="transition ease-in duration-500"
                    enter-from-class="transform opacity-0"
                    enter-to-class="transform opacity-100"
                    leave-active-class="transition ease-in duration-300"
                    leave-from-class="transform opacity-100"
                    leave-to-class="transform opacity-0"
                >
                    <span v-if="isHover" class="w-[30%] h-[70%] absolute -left-7 -top-5 z-[-1] rounded-lg" >
                        <DecorationDots :color="article?.category?.color"/>
                    </span>
                    
                </transition>
    
            </slot>
        </NuxtLink>
    
        <x-animation-loader-card-small v-else />
    </div>
<!-- ====== Card End -->
</template>
