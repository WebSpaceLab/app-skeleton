<script setup>
let isRegister = ref(true)
</script>

<template>
    <div
        id="AuthOverlay"
        class="relative lg:absolute h-250 flex items-center justify-center z-50 top-0 left-0 w-full bg-black/20 bg-opacity"
    >
        <div class="relative bg-background-light/90 dark:bg-background-dark/90s w-full max-w-[470px] h-[70%] p-4 rounded-lg shadow-xl shadow-black">
            <div class="w-full h-20 flex justify-between">
                <x-btn
                    link
                    to="/"
                    icon
                    strip
                    :tooltip="{text: 'Back to homepage'}"
                >
                    <Icon name="material-symbols:line-start-arrow-notch"  class="text-info-600 hover:text-info-300" size="26" /> 
                </x-btn>
            
         
                <x-btn
                    @click="$generalStore.isLoginOpen = false"
                    color="danger-outline"
                    icon
                    strip
                    :tooltip="{text: 'Close'}"
                >
                    <Icon name="mdi:close" class="text-red-600 hover:text-red-200" size="26" /> 
                </x-btn>
            </div>

            <div class="">
                <FormLogin v-if="isRegister" />
                <FormRegister v-else />

            </div>
            
            <div class="absolute flex items-center justify-center py-5 left-0 bottom-0 border-t-solid w-full">
                <span v-if="isRegister" class="text-[14px] text-gray-600">
                    Don't have an account?
                </span>

                <span v-else class="text-[14px] text-gray-600">
                    Are you have an account?
                </span>
                
                <x-btn
                    @click="isRegister = !isRegister"
                    color="danger" strip
                >
                    {{ isRegister ? 'Sign up' : 'Log in'  }}
                </x-btn>
            </div>
        </div>
    </div>
</template>