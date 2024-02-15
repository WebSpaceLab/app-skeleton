<script setup>
const props = defineProps({
    article: Object,
    loading: {
        type: Boolean,
        default: true,
    },
});

let isHover = ref(false);
</script>

<template>
    <!-- ====== CardStart -->
    <div
        v-if="article"
        @mouseleave="isHover = false"
        @mouseover="isHover = true"
        :class="isHover ? 'transition-all duration-200 ease-in' : 'transition-all duration-200 ease-out'"
        class="relative h-full z-10 rounded-lg shadow-lg shadow-black group hover:shadow-xl hover:shadow-black hover:scale-103"
    >
        <NuxtLink
            v-if="!loading" 
            :to="`/article/${article?.slug}`"
            class="w-full h-full rounded-lg overflow-hidden"
        >
            <div class="w-full h-full rounded-lg overflow-hidden">
                <nuxt-img class="rounded-lg w-full h-full object-cover" :class="isHover ? 'scale-110 transition-all duration-200 ease-in' : 'scale-100 transition-all duration-200 ease-in'" :src="article?.media?.previewUrl ?? '/images/placeholder.png'" :alt="article?.media?.name ?? 'Image'" />
            </div>
    
            <span
                :class="isHover ? 'h-[90%] rounded-lg' : 'max-h-[80%] rounded-lg'"
                class="absolute left-[5%] bottom-[5%] w-[90%]  px-5 pt-1 pb-2 flex flex-col bg-slate-900/60 z-10 overflow-y-auto scrollbar rounded-lg transition-all duration-200 ease-in"
            >
                <div class="flex justify-between">
                    <p class="uppercase text-xs m-0" :style="{'color': article?.category?.color}">{{article?.category?.name}}</p>
    
                    <span class="text-xs text-info-600">
                        <Icon name="material-symbols:nest-clock-farsight-analog-outline" class="text-xl" />
                        {{ article?.createdAtAgo }}
                    </span>
                </div>
    
                <span class="w-full  m-0 border border-solid border-b-1" :style="{'border-color': article?.category?.color}" />
    
                
                <transition
                enter-active-class="transition ease-in duration-500"
                enter-from-class="transform opacity-0"
                enter-to-class="transform opacity-100"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="transform opacity-100"
                leave-to-class="transform opacity-0"
                >
                <p v-if="!isHover" class="w-full text-center sm:text-xs md:text-sm lg:text-md text-white">
                    {{ article?.title }}
                </p>

                <div v-else class="w-full h-full flex flex-col">
                        <!---
                            <p class="text-slate-200 text-sm">Opis:</p>
                        -->
                        <span class="w-full  m-0 border border-solid border-b-1" :style="{'border-color': article?.category?.color}" />
                        <p class="text-slate-300 text-sm w-full h-full text-wrap truncate" v-html="article?.description"></p>
                    </div>
                </transition>
            </span>
            <slot name="decoration">
                <transition
                    enter-active-class="transition ease-in duration-500"
                    enter-from-class="transform opacity-0"
                    enter-to-class="transform opacity-100"
                    leave-active-class="transition ease-in duration-300"
                    leave-from-class="transform opacity-100"
                    leave-to-class="transform opacity-0"
                >
                    <span v-if="isHover" class="w-[30%] h-[70%] absolute -left-0.5 -top-0.5 z-[-1] rounded-lg" :style="{
                            backgroundColor: article?.category?.color
                    }"/>
                   
                </transition>

                <transition
                    enter-active-class="transition ease-in duration-500"
                    enter-from-class="transform opacity-0"
                    enter-to-class="transform opacity-100"
                    leave-active-class="transition ease-in duration-300"
                    leave-from-class="transform opacity-100"
                    leave-to-class="transform opacity-0"
                >
                    <span v-if="isHover" class="w-[30%] h-[70%] absolute hidden lg:flex -right-0.5 -bottom-0.5 z-[-1] rounded-lg" :style="{
                            backgroundColor: article?.category?.color
                    }"/>
                </transition>
            </slot>
        </NuxtLink>

        <x-animation-loader-card v-else />
    </div>
    

<!-- ====== Card End -->
</template>
