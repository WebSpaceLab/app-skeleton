<script setup>
const {$account, $flash } = useNuxtApp()
let canSeeThePassword = ref(false)
let canSeeTheConfirmPassword = ref(false)
let canSeeTheCurrentPassword = ref(false)
let isCorrectPassword = ref(false)
let isCorrectConfirmPassword = ref(false)
let isUpdated = ref(false)

const form = ref({
    current_password: '',
    password: '',
    password_confirmation: '',
})

const errors = ref({})

const formReset = () => {
    form.value = {
        current_password: '',
        password: '',
        password_confirmation: '',
    }
}

const updatePassword = async () => {
    errors.value = {}
    const {status, error, data} = await $account.updatePassword(form)

    if(error.value) {
        errors.value = error.value.data.errors
    } else {
        if(status.value == 'success') {
            $flash.success(data.value.massage)
        }

        formReset()
    }
}



watch(() => form.value.password, (value) => {
    if(value?.length >= 8) {
        isCorrectPassword.value = true
    } else {
        isCorrectPassword.value = false
    }
})

watch(() => form.value.password_confirmation, (value) => {
    if(value?.length >= 8) {
        if(form.value.password === value) {
            isCorrectConfirmPassword.value = true
            isUpdated.value = true
        }
    } 
})
</script>

<template>
    <x-card-action >
        <template #title>
            Aktualizacja hasło
        </template>

        <template #description>
            Upewnij się, że Twoje konto używa ponad 8 literowego hasła, aby zachować bezpieczeństwo.
        </template>

        <template #content>
            <form class="px-4 py-5 sm:p-6 bg-secondary dark:bg-secondary-dark shadow sm:rounded-lg space-y-6" @submit.prevent="updatePassword()">
                <x-input
                    v-model="form.current_password"
                    :type="canSeeTheCurrentPassword ? 'text' : 'password'"
                    color="blue"
                    label="Aktualne hasło"
                    icon
                    name="input_current_password"
                    right-icon
                    :error="errors && errors.current_password ? errors.current_password : ''"
                >
                    <template #icon>
                        <Icon name="teenyicons:password-solid" class="text-xl" />
                    </template>
    
                    <template #right-icon>
                        <Icon v-if="canSeeTheCurrentPassword" @click="canSeeTheCurrentPassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
                        <Icon v-else @click="canSeeTheCurrentPassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
                    </template>
                </x-input>
    
                <x-input
                    v-model="form.password"
                    :type="canSeeThePassword ? 'text' : 'password'"
                    color="blue"
                    label="Nowe hasło"
                    icon
                    name="input_password"
                    right-icon
                    :error="errors && errors?.password ? errors?.password[0] : ''"
                >
                    <template #icon>
                        <Icon name="teenyicons:password-solid" class="text-xl" />
                    </template>
    
                    <template #right-icon>
                        <div class="flex space-x-3">
                            <icon v-if="isCorrectPassword" name="clarity:success-line" class="duration-300 text-xl text-success-600" />
                            
                            <Icon v-if="canSeeThePassword" @click="canSeeThePassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
                            <Icon v-else @click="canSeeThePassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
                        </div>
                    </template>
                </x-input>
                
                <div v-if="isCorrectPassword" class="transition-all duration-300 ">
                    <x-input
                        v-model="form.password_confirmation"
                        :type="canSeeTheConfirmPassword ? 'text' : 'password'"
                        color="blue"
                        label="Powtórz hasło"
                        icon
                        name="input_password_confirm"
                        right-icon
                        :error="errors && errors?.confirmPassword ? errors?.confirmPassword[0] : ''"
                    >
                        <template #icon>
                            <Icon name="teenyicons:password-solid" class="text-xl" />
                        </template>
        
                        <template #right-icon>
                            <div class="flex space-x-3">
                                <icon v-if="isCorrectConfirmPassword" name="clarity:success-line" class="duration-300 text-xl text-success-600" />
                                
                                <Icon v-if="canSeeTheConfirmPassword" @click="canSeeTheConfirmPassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
                                <Icon v-else @click="canSeeTheConfirmPassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
                            </div>
                        </template>
                    </x-input>
                </div>
                <div 
                    id="UpdateInfoButtons" 
                    class="flex items-center justify-end"
                >
                    <x-btn 
                        :disabled="!isUpdated"
                        color="primary-outline"
                        type="submit"
                        rounded
                        shadow
                    >
                        <span class="mx-4 font-medium text-[15px]">Save</span>
                    </x-btn>
                </div>
            </form>
        </template>
    </x-card-action>
</template>
