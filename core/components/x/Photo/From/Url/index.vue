<script setup>
const nameUrl = ref('')
const url = ref('')

</script>

<template>
    <div class="w-full flex flex-col space-y-6 p-6 box-border">
        <div class="w-full">
            <x-input label="Name URL" v-model="nameUrl"/>
        </div>
        <div>
            <x-input label="URL" v-model="url"/>
        </div>
    </div>
</template>