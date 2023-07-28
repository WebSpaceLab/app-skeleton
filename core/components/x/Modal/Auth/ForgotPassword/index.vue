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
        <div class="bg-background-light dark:bg-background-dark flex flex-col p-3 border-box space-y-10">
            <div class="w-full h-10 flex justify-end ">
                <x-btn @click="close" color="primary" icon strip rounded>
                    <Icon name="mdi:close-circle-outline" class="text-4xl"/>
                </x-btn>
            </div>

            <div class="w-full box-border p-10">
                <x-form-auth-forgot-password />
            </div>

            <div v-if="!$auth.response" class=" flex items-center justify-center py-5 left-0 bottom-0 border-t-solid w-full">
                <span class="text-[14px] text-gray-600">
                    Nie posiadasz kanta? 
                </span>
                
                <x-btn
                    @click="$navbar.showRegister()"
                    color="danger" strip
                >
                    Zarejestruj się 
                </x-btn>
            </div>
        </div>
    </x-modal>
</template>