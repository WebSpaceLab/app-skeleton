<script setup>

</script>

<template>
<!-- ====== Cards Section Start -->
<section id="article-cards" class="relative flex flex-col justify-center items-center py-6 lg:pt-40">
    <header class="w-full mb-10 flex flex-col">
        <div class="mb-1 w-full bg-slate-500 flex justify-center items-center rounded-t-lg">
            <h2 class="text-2xl m-0 text-background-light dark:text-background-dark uppercase font-extrabold"> Wiadomości </h2>
        </div>

        <span class="border border-solid border-b-1 border-slate-500"/>
    </header>

    <section >
        <div class="w-full max-h-150 grid lg:grid-cols-2  lg:grid-rows-4 gap-6">
            <div data-aos="zoom-in" data-aos-anchor-placement="bottom-bottom" data-aos-duration="500" class="row-span-4">
                <CardArticle :article="$homepage.data.latest.first" :loading="$homepage.data.latest.first.isLoading" >
                    <template #decoration>
                        <span class="absolute hidden lg:flex -left-5 -top-5 z-[-1]">
                            <DecorationDots color="#64748b" />
                        </span>
                    </template>
                </CardArticle>
            </div>

            <div v-for="(article, index) in $homepage.data.latest.last" :key="index" data-aos="zoom-in" data-aos-duration="1000" >
                <CardArticleSmall  :article="article" :loading="article.isLoading" />
            </div>
        </div>
    </section>

    <footer v-if="$homepage.data.latest?.length !== 0" class="w-full flex flex-col justify-center items-center">
        <div class="w-full flex justify-end">
            <x-btn link strip class="text-primary-600" to="/article">Zobacz więcej >></x-btn>
        </div>
    </footer>
</section>
<!-- ====== Cards Section End -->
</template>
