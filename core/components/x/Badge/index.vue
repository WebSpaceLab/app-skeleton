<script setup>
const props = defineProps({
    name: {
        type: String,
        default: 'Default'
    },
    color: {
        type: String,
        default: 'blue'
    }
});

let {  classTextColor, classBorderColor,  } = useClassColor();
</script>

<template>
    <span
        class="inline-flex items-center py-1 px-2 mr-2 text-sm font-medium cursor-pointer  rounded"
        :class="[
             classTextColor(color), classBorderColor(color)
        ]"
    >
        {{ name }}
        <div>
            <slot name="action"></slot>
        </div>
    </span>
</template>