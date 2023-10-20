<script setup>
definePageMeta({
    layout: "guest",
})
</script>

<template>
    <div class="relative w-full h-screen container mx-auto flex justify-center items-center">
        <div class="bg-prime-light dark:bg-prime-dark flex flex-col p-3 border-box space-y-10 rounded-10 shadow-2xl shadow-black">
            <div class="w-full box-border p-10">
                <x-form-auth-reset-password />
            </div>
        </div>
    </div>
</template>