<script setup>
definePageMeta({
    layout: "authorization",
    middleware: ['auth']
})

</script>

<template>
    <x-section-dashboard title="Profil" container="true">
        <template #header-panel>

        </template>

        <template #main>
            <div class="w-full flex flex-col space-y-8">
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