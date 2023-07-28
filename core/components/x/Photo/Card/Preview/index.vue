<script setup>
const props = defineProps({
    file: Object
})

let isShowImage = ref(false)
</script>

<template>
    <div class="w-full relative">
        <img  @mouseover="isShowImage = true" @mouseleave="isShowImage = false" :src="file.preview_url" :alt="file.name" class="w-20 h-15 object-cover rounded-xl">

        <transition
            enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0 scale-0 translate-x-0 translate-y-0 blur-200"
            enter-to-class="opacity-100 scale-110 blur-0"
            leave-active-class="ease-in duration-300"
            leave-from-class="opacity-100 scale-110 blur-0"
            leave-to-class="opacity-0 scale-0 translate-x-0 translate-y-0 blur-200"
        >
            <div v-if="isShowImage" class="w-50 absolute top-0 right-0 translate-x-[110%] translate-y-[-20%] z-10 rounded-xl">
                <img :src="file.preview_url" :alt="file.name" class="w-full h-auto object-cover rounded-xl shadow-xl shadow-black">
            </div>
        </transition>
    </div>
</template>