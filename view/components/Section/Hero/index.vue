<script setup>
const props = defineProps({
    history: {
        type: Object,
        require: true,
        default: () => {}
    },
    sport: {
        type: Object,
        require: true,
        default: () => {}
    },
    nature: {
        type: Object,
        require: true,
        default: () => {}
    },
    town: {
        type: Object,
        require: true,
        default: () => {}
    },
    technology: {
        type: Object,
        require: true,
        default: () => {}
    },
    culture: {
        type: Object,
        require: true,
        default: () => {}
    },
    advertisements: {
        type: Array,
        require: true,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: true,
    },
});

// const loading = ref(true);

</script>

<template>
 <!-- ====== Hero Section Start -->
    <div id="hero" class="relative ">
        <div v-for="item in advertisements"  :key="item.id" class="relative w-full flex justify-center items-center mb-10">
            <a v-if="item.position === 'top'" href="" rel="nofollow" alt="ads tobar" target="_blank">
                <img  :src="item.url" class="w-full lg:h-full object-cover" :alt="item.name">
            </a>
        </div>

        <div class="flex h-full flex-col sm:flex-row justify-center items-start px-4 space-x-8 xl:space-x-14">
            <div class="w-full h-full grid md:grid-cols-2 lg:grid-cols-3 xl:grid-rows-3 xl:grid-cols-4 gap-8">
                <div class="relative w-full h-full lg:col-span-2 lg:row-span-2 rounded-lg" data-aos="zoom-in"  data-aos-duration="500">
                    <CardArticle v-if="history" :article="history" :loading="history.isLoading" class="hidden lg:flex">
                        <template #decoration>
                            <span class="absolute hidden lg:flex -left-5 -top-5 z-[-1]">
                                <DecorationDots />
                            </span>
                        </template>
                    </CardArticle>

                    <CardArticleMedium v-if="history" :article="history" class="flex lg:hidden" :loading="history.isLoading"/>
                </div>

                <div class="relative w-full h-full rounded-lg" data-aos="zoom-in" data-aos-duration="1000">
                    <CardArticleMedium v-if="sport" :article="sport" :loading="sport.isLoading"></CardArticleMedium>
                </div>

                <div class="relative w-full h-full rounded-lg" data-aos="zoom-in"  data-aos-duration="1000">
                    <CardArticleMedium v-if="nature" :article="nature" :loading="nature.isLoading"></CardArticleMedium>
                </div>
 
                <div class="relative w-full h-full lg:col-span-2 lg:row-span-2 rounded-lg" data-aos="zoom-in" data-aos-duration="500">
                    <CardArticle v-if="town" :article="town" :loading="town.isLoading">
                        <template #decoration>
                            <span class="absolute hidden lg:flex lg:-right-5 -bottom-5 z-[-1]">
                                <DecorationDots />
                            </span>
                        </template>
                    </CardArticle>
                </div>

                <div class="relative w-full h-full rounded-lg" data-aos="zoom-in" data-aos-duration="1000">
                    <CardArticleMedium v-if="technology" :article="technology" :loading="technology.isLoading"></CardArticleMedium>
                </div>

                <div class="relative w-full h-full rounded-lg" data-aos="zoom-in" data-aos-duration="1000">
                    <CardArticleMedium v-if="culture" :article="culture" :loading="culture.isLoading"></CardArticleMedium>
                </div>
            </div>

            <div  class="rounded-lg w-[300px] h-[600px] overflow-hidden mt-8 sm:mt-0" >
                <div v-for="item in advertisements" :key="item.id">
                    <a v-if="item.position === 'sidebar'" href="" rel="nofollow" target="_blank">
                        <img  :src="item.url" class="w-full lg:h-full object-cover" :alt="item.name">
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- ====== Hero Section End -->
</template>