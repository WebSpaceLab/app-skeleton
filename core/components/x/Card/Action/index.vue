<script setup>
let isMouseover = ref(false)
</script>

<template>
    <div 
        @mouseover="isMouseover = true" 
        @mouseleave="isMouseover = false" 
        class="relative bg-prime-light dark:bg-prime-dark w-full  p-4 rounded-lg mb-10 md:grid md:grid-cols-3 md:gap-6 border-dashed border-muted-light dark:border-muted-dark box-border" 
        :class="[
            isMouseover ? 'shadow-xl shadow-black' : ''
        ]"
    >
        <XCardActionHeader>
            <template #title>
                <slot name="title" />
            </template>
            <template #description>
                <slot name="description" />
            </template>
        </XCardActionHeader>

        <div class="mt-5 md:mt-0 md:col-span-2 box-border">
            <slot name="content" />
        </div>
    </div>
</template>