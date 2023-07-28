<script setup>
const props = defineProps({
    packages: Object
})
</script>

<template>
    <div class="relative max-w-full relative flex justify-center items-start gap-8 group">
        <template v-for="(pack, index) in packages" :key="index">
            <div class="group-hover:blur-sm hover:!blur-none group-hover:scale-85 hover:!scale-100 duration-500">
                <x-card-price :pack="pack" :index="index"></x-card-price>
            </div>
        </template>
    </div>
</template>
