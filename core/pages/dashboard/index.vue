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
            <div class="container mx-auto flex flex-col space-y-6">
   
                <div class="w-full grid grid-cols-4 gap-6 bg-gray-200/20 dark:bg-gray-800/20 p-6 box-border rounded-xl">
                    <div class="h-60 bg-blue p-3 rounded-xl box-border">
                        <div>
                            <p>Trening dnia</p>
                        </div>
                    </div>
                    <div class="h-60 bg-yellow p-3 rounded-xl box-border">
                        <div>
                            <p>siła skile Testy ?? Rozwiane w duł</p>
                            <p>Bench press 1 RM: 160kg</p>
                        </div>
                    </div>
                    <div class="h-60 bg-red p-3 rounded-xl box-border">
                        <div>
                            <p>Aktywność</p>
                            <p>Ilość napisanych komentarzy</p>
                        </div>
                    </div>
                    <div class="h-60 bg-orange p-3 rounded-xl box-border">
                        <div>
                            
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-3 gap-6 bg-gray-200/20 dark:bg-gray-800/20 p-6 box-border rounded-xl">
                    <div class="h-90 bg-green p-3 col-span-1 rounded-xl box-border">
                        <div>
                            <p>Cytat dnia: </p>
                        </div>
                    </div>

                    <div class="h-90 bg-dark p-3 col-span-2 rounded-xl box-border">
                        <div>
                            <div>
                            <p>Ostatnio przeglądane artykuły: </p>
                        </div>
                        </div>
                    </div>
                </div>

            </div>

        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>