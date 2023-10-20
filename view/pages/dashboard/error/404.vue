<script setup>
    definePageMeta({
        layout: "authorization",
        middleware: ['auth']
    })
</script>

<template>
    <div class="w-full h-screen flex justify-center items-center text-xl">
        <h1>
            Error: 404 Not found
        </h1>
    </div>
</template>