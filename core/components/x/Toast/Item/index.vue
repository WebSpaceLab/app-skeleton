<script setup>
const props = defineProps({
    item: Object
});

const emit = defineEmits(['remove']);

const bgStyle = computed(() => {
    return {
        'error' : 'bg-error-300',
        'success' : 'bg-success-300',
        'warning' : 'bg-warning-300',
        'info' : 'bg-info-300',
        'none' : ''
    } [props.item.style]
})

const textStyle = computed(() => {
    return {
        'error' : 'text-error-900',
        'success' : 'text-success-900',
        'warning' : 'text-warning-900',
        'info' : 'text-info-900',
        'none' : ''
    } [props.item.style]
})


const iconStyle = computed(() => {
    return {
        'error' : 'text-error-600',
        'success' : 'text-success-600',
        'warning' : 'text-warning-600',
        'info' : 'text-info-600',
        'none' : ''
    } [props.item.style]
})

const iconName = computed(() => {
    return {
        'error' : 'material-symbols:error-outline',
        'success' : 'material-symbols:library-add-check-outline-sharp',
        'warning' : 'material-symbols:error-outline',
        'info' : 'material-symbols:library-add-check-outline-sharp',
        'none' : ''
    } [props.item.style]
})

function close() {
    // if(props.item.closable) {
        emit('remove', props.item.id)
    // }
}
</script>

<template>
   <div
        :class="bgStyle"
        class="rounded-lg py-2 flex w-full max-h-40"
    >
        <div class="w-full flex items-start justify-between">
            <div class="px-2 flex justify-center items-center space-x-2">
                <div class="flex justify-center p-2">
                    <span class="flex " :class="iconStyle">
                        <Icon :name="iconName"  class="text-3xl"></Icon>
                    </span>
                </div>

                <div v-if="item.html" v-html="item.html"></div>

                <p v-else class="pl-2 font-medium text-sm" :class="textStyle">
                    {{ item.message }}
                </p>
            </div>

            <div class="flex px-2">
                <x-btn
                    class="flex p-2 focus:outline-none transition rounded-full text-danger-900 hover:text-hover-600"
                    @click="close()"
                    strip
                    icon
                >
                    <Icon name="material-symbols:close" class="text-2xl"></Icon>
                </x-btn>
            </div>
        </div>
    </div>
</template>