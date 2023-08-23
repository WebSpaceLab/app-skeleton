<script setup>
let canSeeThePassword = ref(false)
let canSeeTheConfirmPassword = ref(false)

const form = ref({
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
})
</script>

<template>
    <div>

        <form v-if="!$auth.response" class="relative flex flex-col w-full h-full" @submit.prevent="$auth.register(form)">
            <span class="w-full h-full lg:h-35 flex flex-col justify-center items-center">
                <Icon name="bi:person-fill-add" class="w-20 h-20 lg:w-30 lg:h-30" />
                <div class="text-center text-2xl md:text-[28px] mb-4 font-bold">Rejestracja</div>
            </span>
    
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
                    :type="email"
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
    
                <div class="w-full space-y-6">
                    <x-btn
                        :loading="$auth.isLoading"
                        type="submit"
                        text="Rejestracja"
                        class="w-full"
                        color="success-outline"
                        rounded
                        shadow
                    /> 
                </div>
            </div>        
        </form>
    
        <div v-else class="px-10 py-20 text-xl text-bold text-info-900 bg-info-300 rounded-xl shadow-2xl shadow-black transition-all duration-500">
            {{ $auth.response?.status }}
        </div>
    </div>
       
</template>