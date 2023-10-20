<script setup>
const { $auth } = useNuxtApp()

definePageMeta({
    layout: "authorization",
    middleware: [ 'auth']
    
})

onMounted(() => {
    $auth.giveAccess($auth.accessGranted('ROLE_ADMIN'))
})
</script>

<template>
    <x-section-dashboard v-if="$auth.accessGranted('ROLE_ADMIN')" title="Settings">
        <template #header-panel>
            
        </template>

        <template #main>
            <div class="w-full container mx-auto">
                <x-tabs :tabs="['General information', 'Contact information', 'Meta Tags', 'Social media']" :uppercase="false">
                    <template #tab-0>
                      <x-section-setting-general />
                    </template>
                    
                    <template #tab-1>    
                        <x-section-setting-information />
                    </template>
    
                    <template #tab-2>    
                        <x-section-setting-meta />
                    </template>

                        
                    <template #tab-3>
                        <x-section-setting-social />
                    </template>
    
                </x-tabs>
            </div>
        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>