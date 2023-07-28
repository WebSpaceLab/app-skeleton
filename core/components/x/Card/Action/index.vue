<script setup>
let isMouseover = ref(false)
</script>

<template>
    <div 
        @mouseover="isMouseover = true" 
        @mouseleave="isMouseover = false" 
        class="relative bg-prime-light dark:bg-prime-dark w-full mx-3 p-4 rounded-lg mb-10 md:grid md:grid-cols-3 md:gap-6 border-dashed border-muted-light dark:border-muted-dark" 
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

        <div class="mt-5 md:mt-0 md:col-span-2">
            <slot name="content" />
        </div>

        <div class="col-span-3 p-5 box-border left-0 bottom-0 border-t-dashed border-t-muted-light dark:border-t-muted-dark w-full ">
            <slot name="actions"/>
        </div>
    </div>
</template>