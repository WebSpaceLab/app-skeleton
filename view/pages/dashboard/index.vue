<script setup >
definePageMeta({
    layout: "authorization",
    middleware: ['auth']
})

// const { $dashboard } = useNuxtApp()

// onMounted(() => {
//     $dashboard.get()
// })
</script>

<template>
    
    <x-section-dashboard >
        <template #header-panel>
            
        </template>
        
        <template #main>
            <div class="flex flex-col space-y-6">
   
                <div class="w-full h-full">
                    <div class="rounded-xl overflow-hidden">
                        <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/screen-image-imac.png" class="dark:hidden  w-full rounded-xl" alt="">
                        <img src="https://flowbite.s3.amazonaws.com/docs/device-mockups/screen-image-imac-dark.png" class="hidden dark:block  w-full rounded-xl" alt="">
                    </div>
                </div>

            </div>

        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>