<script setup>
const {$dashboard} = useNuxtApp()

onMounted(() => {
$dashboard.get()
})
</script>

<template>
    <div>
        <h1>Home</h1>
    </div>
</template>