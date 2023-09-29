<script setup>
const {$general, $contact, $metaTags,  $social } = useNuxtApp()

const loading = ref(true);
// const LoadProgress = ref(0)

onMounted(async () => {

    await $general.get()
    await $contact.get()
    await $metaTags.get()
    await $social.get()

    // LoadProgress.value = Math.round(event.loaded * 100 / event.total);
    loading.value = false
})
</script>

<template> 
    <x-app :loading="loading">
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
.page-enter-active,
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
}
</style>
