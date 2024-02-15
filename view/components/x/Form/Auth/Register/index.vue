<script setup>
let canSeeThePassword = ref(false)
let canSeeTheConfirmPassword = ref(false)

const form = ref({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
    isAgree: false
})

</script>

<template>
    <ClientOnly>
        <form v-if="!$auth.response" class="relative flex flex-col w-full h-full" @submit.prevent="$auth.register(form)">
            <div class="w-full h-full lg:h-35 flex flex-col justify-center items-center text-basic-light dark:text-basic-dark">
                <Icon name="bi:person-fill-add" class="w-20 h-20 lg:w-30 lg:h-30" />
                
                <p class="text-center text-2xl md:text-[28px] mb-4 font-bold ">Rejestracja</p>
            </div>
    
            <div class="pt-5 space-y-6">
                <x-input
                    v-model="form.username"
                    color="blue"
                    label="Nazwa"
                    icon
                    name="register_name"
                    :error="$auth.errors && $auth.errors?.username ? $auth.errors?.username : ''"
                    autofocus
                >
                    <template #icon>
                        <Icon name="material-symbols:person-3-rounded" class="text-xl" />
                    </template>
                </x-input>
    
                <x-input
                    v-model="form.email"
                    color="blue"
                    label="Email"
                    icon
                    type="email"
                    name="register_email"
                    :error="$auth.errors && $auth.errors?.email ? $auth.errors?.email : ''"
                >
                    <template #icon>
                        <Icon name="material-symbols:mark-email-unread-sharp" class="text-xl" />
                    </template>
                </x-input>
    
                <x-input
                    v-model="form.password"
                    :type="canSeeThePassword ? 'text' : 'password'"
                    color="blue"
                    label="Hasło"
                    icon
                    name="register_password"
                    right-icon
                    :error="$auth.errors && $auth.errors?.password ? $auth.errors?.password : ''"
                >
                    <template #icon>
                        <Icon name="teenyicons:password-solid" class="text-xl" />
                    </template>
    
                    <template #right-icon>
                        <div class="flex space-x-3">
                            <Icon v-if="canSeeThePassword" @click="canSeeThePassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
                            <Icon v-else @click="canSeeThePassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
                        </div>
                    </template>
                </x-input>
    
                <x-input
                    v-model="form.password_confirmation"
                    :type="canSeeTheConfirmPassword ? 'text' : 'password'"
                    color="blue"
                    label="Powtórz hasło"
                    icon
                    name="register_password_confirm"
                    right-icon
                    :error="$auth.errors && $auth.errors?.password_confirmation ? $auth.errors?.password_confirmation : ''"
                >
                    <template #icon>
                        <Icon name="teenyicons:password-solid" class="text-xl" />
                    </template>
    
                    <template #right-icon>
                        <div class="flex space-x-3">
                            <Icon v-if="canSeeTheConfirmPassword" @click="canSeeTheConfirmPassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
                            <Icon v-else @click="canSeeTheConfirmPassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
                        </div>
                    </template>
                </x-input>

                <div class="flex flex-col">
                    <div class="flex items-center">
                        <input id="link-checkbox" type="checkbox" v-model="form.isAgree" class="w-4 h-4 text-blue-600 bg-blue-300 border-blue-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        
                        <label for="link-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">terms and conditions</a>.</label>
                    </div>

                    <div v-if="$auth.errors && $auth.errors?.isAgree" class="w-full text-center text-error-900 text-[14px] font-semibolds bg-error-300 p-2 box-border mt-1 rounded">{{ $auth.errors?.isAgree }}</div>
                </div>
    
                <div class="w-full space-y-6">
                    <x-btn
                        :loading="$auth.isLoading"
                        type="submit"
                        text="Rejestracja"
                        class="w-full"
                        color="success-outline"
                        rounded
                        shadow
                        :disabled="!form.isAgree || form.password !== form.password_confirmation || form.password.length < 8 || form.password_confirmation.length < 8 || form.username.length < 3 || form.email.length < 3 || form.username.length > 20 || form.email.length > 50"
                    /> 
                </div>
            </div>        
        </form>
    
        <div v-else class="px-10 py-20 text-xl text-bold text-info-900 bg-info-300 rounded-xl shadow-2xl shadow-black transition-all duration-500">
            {{ $auth.response?.status }}
        </div>
    </ClientOnly>
       
</template>