<script setup>
    import { computed, ref } from 'vue';

    const props = defineProps({
        text: {
            type: String,
            default: 'Tooltip'
        },
        position: {
            type: String,
            default: 'bottom'
        }
    });

    const classPosition = computed(() => {
        return {
            'bottom': 'translate-y-4 -translate-x-1/2 left-1/2',
            'top': '-translate-y-[220%] -translate-x-1/2 left-1/2',
            'left': '-translate-x-[120%] top-1/2 -translate-y-1/2',
            'right': 'translate-x-[120%] top-1/2 -translate-y-1/2',
        } [props.position]
    });
</script>

<template>
    <div
        class="absolute flex justify-center items-center w-max z-50 py-2 px-3 text-xs font-medium text-slate-300  bg-slate-600 border border-slate-400  rounded-lg shadow-lg shadow-slate-600"
        :class="classPosition"
    >
        {{ text }}
    </div>
</template>