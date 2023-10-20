<script setup>
definePageMeta({
    layout: "authorization",
    middleware: ['auth']
})

</script>

<template>
    <x-section-dashboard title="Profil">
        <template #header-panel>

        </template>

        <template #main>
            <div class="w-full p-6 flex flex-col space-y-8 box-border container mx-auto bg-gray-200/20 dark:bg-gray-800/20 rounded-xl">
                <div class="w-full">
                    <x-section-profile-update-information />
                </div>

                <div class="w-full">
                    <x-section-profile-update-password />
                </div>
            </div>

        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>