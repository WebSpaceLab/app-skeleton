<script setup>
const props = defineProps({
    name: String,
    uppercase: {
        type: Boolean,
        default: true
    },
    sort: {
        type: Array
    }
})
</script>

<template>
    <th  class="px-5 py-3 w-10 text-center">
       <div class="w-full flex justify-start items-center space-x-4">
            <span class="text-sm" :class="uppercase ? 'uppercase' : ''">
                {{ name }}
            </span>

            <span v-if="sort" class="flex flex-col space-y-0">
                <Icon v-if="sort?.upper" name="material-symbols:play-arrow" class="-rotate-90 text-sm text-indigo-600"/>
                <Icon v-if="sort?.lower" name="material-symbols:play-arrow" class="rotate-90  text-sm text-indigo-600"/>
            </span>
       </div> 
    </th>
</template>