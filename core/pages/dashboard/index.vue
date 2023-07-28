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
    
    <x-section-dashboard title="Dashboard">
        <template #header-panel>
            
        </template>
        
        <template #main>
            <div class="container mx-auto">
                <div>
                    <h1>Dashboard</h1>
                    <pre>
            user : {{ $auth.user }}
            
            isLoggedIn : {{ $auth.isLoggedIn }}
            isLoading: {{ $auth.isLoading }}
       
        
            
                </pre>
                </div>

            </div>

        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>