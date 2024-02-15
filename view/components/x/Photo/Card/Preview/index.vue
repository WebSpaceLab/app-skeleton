<script setup>
const props = defineProps({
    file: Object
})

let isShowImage = ref(false)
</script>

<template>
    <div v-if="file" class="w-full relative">
        <nuxt-img  :src="file.previewUrl" :alt="file.name" class="w-20 h-15 object-cover rounded-xl"/>
    </div>
</template>