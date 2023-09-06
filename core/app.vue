<script setup>
const {$general, $contact, $metaTags,  $social} = useNuxtApp()

onMounted(async () => {
    await $general.get()
    await $contact.get()
    await $metaTags.get()
    await $social.get()
})
</script>

<template>
    <x-app v-if="!$general.isLoading">
        <Head v-if="$general.data.name">
            <Title>{{ $general.data.name }}</Title>
            
            <Meta name="description" :content="$general.data.description" />
    
            <template v-for="(item, index) in $metaTags.data" :key="index" >
                <Meta v-if="item.name != 'description'" :name="item.name" :content="item.content" :charset="item.charset" :http_equiv="item.http_equiv" />
            </template>
        </Head>

        <NuxtLayout>   
            <NuxtPage />
        </NuxtLayout>
        
        <x-toast />
    </x-app>

    <div v-else class="w-screen h-screen flex justify-center items-center">
        <Spinner :loading="$general.isLoading"/>
    </div>
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
