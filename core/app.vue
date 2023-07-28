<script setup>
  const {$general, $social } = useNuxtApp()

</script>

<template>
  <x-app v-if="!$general.isLoading">
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
  transition: all 0.5s;
}

.page-enter-from {
  transform: translateY(100%);
}

.page-leave-to {
  transform: translateY(100%);
}
</style>
