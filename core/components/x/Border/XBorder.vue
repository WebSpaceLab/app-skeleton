<script setup>
const props = defineProps({
    yt: {
        type: String,
        default: '8'
    },

    yb: {
        type: String,
        default: '8'
    },
    color: {
        type: String,
        default: 'green'
    }
});

const { classBorderColor } = useClassColor();

const ytClass = computed(() => {
    return {
        '0': 'pt-0',
        '2': 'pt-2',
        '4': 'pt-4',
        '8': 'pt-8',
    }[props.yt.toString()];
});

const ybClass = computed(() => {
    return {
        '0': 'pb-0',
        '2': 'pb-2',
        '4': 'pb-4',
        '8': 'pb-8',
    }[props.yb.toString()];
});
</script>

<template>
    <div class="">
        <div :class="[ybClass, ytClass]">
            <div class="border" :class="classBorderColor(color)" />
        </div>
    </div>
</template>
