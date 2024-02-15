<script setup>
definePageMeta({
    layout: "default",
})

const advertisements = ref([
    {
        id: 1,
        name: 'ads tobar',
        url: 'https://via.placeholder.com/1170x300',
        position: 'top',
    },
    {
        id: 2,
        name: 'ads sidebar',
        url: 'https://via.placeholder.com/300x600',
        position: 'sidebar',
    },
]);
</script>

<template>
    <div class="w-screen min-h-screen container mx-auto px-10">
        <section-hero 
            :town="$homepage.data.hero.town" 
            :history="$homepage.data.hero.history" 
            :technology="$homepage.data.hero.technology" 
            :culture="$homepage.data.hero.culture" 
            :sport="$homepage.data.hero.sport" 
            :nature="$homepage.data.hero.nature" 
            :advertisements="advertisements" 
            :loading="$homepage.isLoading" 
        />

        <section-last-articles />

        <section-last-articles-town />

        <section-last-articles-history />
        <section-about 
            :about="$homepage.data.about" 
            :loading="$homepage.isLoading"
        />

        <div class="fixed bottom-5 right-10 z-50 flex justify-center items-center space-x-5">
            <x-btn-scroll-page :sectionIds="['hero', 'article-cards', 'article-cards-history', 'article-cards-town', 'o-nas']" />
        </div>
        <!--
            <section-contact />
            
            <lazy-section-features />
            
            <lazy-section-team />
            
            <lazy-section-price-list />
            <section-movie />
        -->
    </div>
</template>