<script setup>
const props = defineProps({
    item: Object
});

let isHover = ref(false);

const { classTextColor } = useClassColor();

</script>

<template>
    <!-- ====== CardStart -->
    <x-link
        :to="{ path: item.path }"
        @mouseleave="isHover = false"
        @mouseover="isHover = true"
        :class="isHover ? 'shadow-2xl shadow-black transition-all duration-200 ease-in' : 'transition-all duration-200 ease-out'"
        class="relative w-full h-full rounded-lg z-10"
    >
        <div class="w-full h-full absolute top-0 left-0 rounded-lg overflow-hidden">
            <img
                :alt="item?.preview_image?.name"
                :class="isHover ? 'scale-110 transition-all duration-200 ease-in' : 'scale-100 transition-all duration-200 ease-in'"
                :src="item?.preview_image?.preview_url"
                class="rounded-lg w-full h-full object-cover"
            />
        </div>

        <div class="w-full h-full absolute top-0 left-0 z-1 bg-black/30 flex justify-center items-center rounded-lg" >
            <p class="sm:text-xs text-center text-white md:text-sm lg:text-lg" :class="classTextColor(item.color)">
                {{ item?.name }}
            </p>
        </div>
    </x-link>
<!-- ====== Card End -->
</template>