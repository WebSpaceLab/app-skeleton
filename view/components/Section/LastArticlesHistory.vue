<script setup>

</script>

<template>
    <!-- ====== Cards Section Start -->
    <section id="article-cards-history" class="relative flex flex-col justify-center items-center py-6 lg:pt-20">
        <header class="w-full mb-10 flex flex-col">
            <div class="mb-1 w-full bg-orange-500 flex justify-center items-center rounded-t-lg">
                <h2 class="text-2xl m-0 text-background-light dark:text-background-dark uppercase font-extrabold">Historia</h2>
            </div>

            <span class="border border-solid border-b-1 border-orange-500"/>
        </header>

            <div class="grid md:grid-cols-3 lg:grid-cols-4  lg:grid-rows-2 gap-6">
                <div data-aos="zoom-in" data-aos-anchor-placement="bottom-bottom" data-aos-duration="500" class="sm:row-span-2 sm:col-span-2 h-56 sm:h-118">
                    <CardArticle :article="$homepage.data.history.first" :loading="$homepage.data.history.first.isLoading" >
                        <template #decoration>
                            <span class="absolute hidden lg:flex -left-5 -top-5 z-[-1]">
                                <DecorationDots color="#f97316" />
                            </span>
                        </template>
                    </CardArticle>
                </div>


                <div v-for="(article, index) in $homepage.data.history.last" :key="index" class=" h-56" data-aos="zoom-in" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
                    <CardArticleMedium  :article="article" :loading="article.isLoading" />
                </div>
            </div>

        <footer  class="w-full flex justify-end items-center">
            <div class="w-full flex justify-end">
                <x-btn link strip class="text-primary-600" to="/">Zobacz więcej >></x-btn>
            </div>
        </footer>
    </section>
    <!-- ====== Cards Section End -->
</template>
