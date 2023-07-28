<script setup>
const props = defineProps({
    modelValue: {
        type: String,
        required: true
    },
    error: {
        type: String,
    },
})

const emits = defineEmits([
    'update:modelValue'
])
</script>

<template>
    <div class="w-full h-9">
        <label for="transition_select" class="sr-only">Transition select</label>

       <select
            :value="modelValue"
            @input="event => emits('update:modelValue', event.target.value)"
            id="transition_select"
            class="w-60 bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus peer"
            aria-label="transition_select"
            name="transition_select"
        >  
            <option value="fade-up">fade-up</option>
            <option value="fade-down">fade-down</option>
            <option value="fade-right">fade-right</option>
            <option value="fade-left">fade-left</option>
            <option value="fade-up-right">fade-up-right</option>
            <option value="fade-up-left">fade-up-left</option>
            <option value="fade-down-right">fade-down-right</option>
            <option value="fade-down-right">fade-down-left</option>
            <option value="flip-left">flip-left</option>
            <option value="flip-right">flip-right</option>
            <option value="flip-up">flip-up</option>
            <option value="flip-down">flip-down</option>
            <option value="zoom-in">zoom-in</option>
            <option value="zoom-in-up">zoom-in-up</option>
            <option value="zoom-in-down">zoom-in-down</option>
            <option value="zoom-in-left">zoom-in-left</option>
            <option value="zoom-in-right">zoom-in-right</option>
            <option value="zoom-out">zoom-out</option>
            <option value="zoom-out-up">zoom-out-up</option>
            <option value="zoom-out-down">zoom-out-down</option>
            <option value="zoom-out-right">zoom-out-right</option>
            <option value="zoom-out-left">zoom-out-left</option>
        </select>

        <span v-if="error" class="text-danger-600 text-[14px] font-semibold ml-4">{{ error }}</span>
    </div>
</template>