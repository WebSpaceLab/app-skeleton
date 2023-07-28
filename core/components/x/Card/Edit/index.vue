<script setup>
const props = defineProps({
    item: Object,
})

const emit = defineEmits(['hover'])

const { classTextColor } = useClassColor()

let isHover = ref(false)

watch(() => isHover.value, (hover) => {
    emit('hover', { id: props.item.id, hover })
})
</script>

<template>
    <!-- ====== CardStart -->
    <div
        @mouseleave="isHover = false"
        @mouseover="isHover = true"
        :class="isHover ? 'shadow-2xl shadow-black transition-all duration-200 ease-in' : 'transition-all duration-200 ease-out'"
        class="relative w-full h-full rounded-lg z-10 shadow-lg shadow-slate-700"
    >
        <div class="w-full h-full rounded-lg overflow-hidden">
            <img
                :alt="item.preview_image.name"
                :class="isHover ? 'scale-110 transition-all duration-200 ease-in' : 'scale-100 transition-all duration-200 ease-in'"
                :src="item.preview_image.preview_url"
                class="rounded-lg w-full h-full object-cover"
            />
        </div>

        <span
            :class="isHover ? 'h-[90%] rounded-lg' : ''"
            class="w-[90%] absolute left-[5%]  bottom-[5%] box-border px-5 pt-1 pb-2 bg-black/60 z-10 overflow-hidden"
        >
            <p class="sm:text-xs md:text-sm lg:text-xl text-bold text-center text-white">
                {{ item.title ? item.title : item.name }}
            </p>

            <x-border v-if="isHover" yt="2" yb="2" color="blue" />

            <transition
                enter-active-class="transition ease-in duration-500"
                enter-from-class="transform opacity-0"
                enter-to-class="transform opacity-100"
                leave-active-class="transition ease-in duration-100"
                leave-from-class="transform opacity-100"
                leave-to-class="transform opacity-0"
            >
                <div v-if="isHover" class="w-full relative ">
                    <div>
                        <p class="text-white text-sm" v-html="item.description"></p>
                    </div>
                </div>
            </transition>
        </span>
        <slot name="action"></slot>
    </div>
<!-- ====== Card End -->
</template>