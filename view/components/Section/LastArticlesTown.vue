<script setup>
</script>

<template>
    <!-- ====== Cards Section Start -->
    <section id="article-cards-town" class="relative flex flex-col justify-center items-center py-6 lg:pt-20">
        <header class="w-full mb-10 flex flex-col">
            <div class="mb-1 w-full bg-green-600 flex justify-center items-center rounded-t-lg">
                <h2 class="text-2xl m-0 text-background-light dark:text-background-dark uppercase font-extrabold"> Miasto</h2>
            </div>

            <span class="border border-solid border-b-1 border-green-600"/>
        </header>

        <div class="w-full">
            <div  class="w-full">
                <div  class="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <div v-for="(article, index) in $homepage.data.town" :key="index" class="w-full h-56 rounded-lg"  data-aos="zoom-in" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
                        <CardArticleMedium v-if="article"  :article="article" :loading="article.isLoading" >
                            <template v-if="(index === 0)" #decoration>
                                <span class="absolute hidden lg:flex -left-5 -top-5 z-[-1]">
                                    <DecorationDots />
                                </span>
                            </template>
                        </CardArticleMedium>
                    </div>
                </div>

                <div class="w-full flex justify-end items-center">
                    <x-btn link strip class="text-primary-600" to="/">Zobacz więcej >></x-btn>
                </div>
            </div>
        </div>
    </section>
    <!-- ====== Cards Section End -->
</template>
