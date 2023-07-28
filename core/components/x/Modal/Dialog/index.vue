<script setup>
const emit = defineEmits(['close']);

defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '2xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String
    },

});

const close = () => {
    emit('close', false);
};

const minimization = ref(false)

</script>

<template>
    <x-modal
        :show="show"
        :minimization="minimization"
        :max-width="maxWidth"
        :closeable="closeable"
        @close="close"
    >   
        <div class="bg-prime-light dark:bg-prime-dark max-h-[calc(100vh-40px)] flex flex-col">
            <div class="h-full">
                <div class="h-10 px-3 py-2 flex justify-between items-center text-lg bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark ">
                    <h3 class="text-bold text-basic-light dark:text-basic-dark">
                        <slot name="title">{{ title }}</slot>
                    </h3>

                    <div class="flex space-x-4">
                        <!--
                            <x-btn @click="minimization = !minimization" color="warning-outline" :tooltip="{ text: 'Minimization'}" rounded>_</x-btn>
                        -->
                        <x-btn @click="close" color="warning-outline" rounded>x</x-btn>
                    </div>
                </div>
    
                <div class="max-h-200 px-6 overflow-y-auto">
                    <slot  />
                </div>
            </div>
    
            <div class="flex h-15 border-box justify-between items-center bg-gradient-to-r from-prime-light to-second-light dark:from-prime-dark dark:to-second-dark px-4 py-3">
                <x-btn @click="close" color="warning-outline" rounded>Cancel</x-btn>
                <slot name="footer" />
            </div>
        </div>
    </x-modal>
</template>