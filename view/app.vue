<script setup>
const {$general, $metaTags,  $social, $categories, $homepage } = useNuxtApp()

onMounted(async () => {
    $general.isLoading = true
    
    try {
        await $general.get()
        await $metaTags.get()
        await $social.get()
        await $categories.getActiveCategories()
        await $homepage.get()
    } catch (error) {
        console.error(error)
    } finally {
        $general.isLoading = false
    }
})
</script>

<template> 
    <x-app :loading="$general.isLoading">
        <Head v-if="$general.data.name">
            <Title>{{ $general.data.name }}</Title>
            
            <Meta name="description" :content="$general.data.description" />
    
            <template v-for="(item, index) in $metaTags.data" :key="index" >
                <Meta
                    v-if="item.name != 'description'"
                    :charset="item.charset"
                    :content="item.content"
                    :http_equiv="item.http_equiv"
                    :name="item.name"
                />
            </template>
        </Head>

        <NuxtLayout>   
            <NuxtPage />
        </NuxtLayout>
        
        <x-toast />
    </x-app>
</template>

<style>
/* .page-enter-active,
.page-leave-active {
    transition: all 0.3s;
}

.page-enter-from {
    transform: translateX(100%);
    filter: blur(64px);
}

.page-leave-to {
    transform: translateX(-100%);
    filter: blur(64px);
}

.layout-enter-active,
.layout-leave-active {
    transition: all 0.3s;
}

.layout-enter-from {
    transform: translateX(-100%);
    filter: blur(64px);
}

.layout-leave-to {
    transform: translateX(100%);
    filter: blur(64px);
} */
</style>
