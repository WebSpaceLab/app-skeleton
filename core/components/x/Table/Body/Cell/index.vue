<script setup>
const props = defineProps({
    uppercase: {
        type: Boolean,
        default: false
    },
    justify: {
        type: String,
        default: 'start'
    },
    items: {
        type: String,
        default: 'center'
    }
})

const { justifyContent, alignItems } = useClassPosition()

</script>

<template>
    <th class="px-5 py-3 w-10 text-center text-muted-light dark:text-muted-dark ">
       <div
            class="w-full flex justify-start items-center space-x-4"
            :class="[
                justifyContent(justify),
                alignItems(items)
            ]"
       >
            <span class="text-sm w-auto" :class="uppercase ? 'uppercase' : ''">
                <slot></slot>
            </span>
       </div> 
    </th>
</template>