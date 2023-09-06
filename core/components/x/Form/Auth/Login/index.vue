<script setup>
const canSeeThePassword = ref(false)

const form = ref({
    email: '',
    password: ''
})
</script>

<template>
    <ClientOnly>
        <form class="relative w-full h-full flex flex-col" @submit.prevent="$auth.login(form)">
            <span class="w-full h-full text-basic-light dark:text-basic-dark lg:h-35 flex flex-col justify-center items-center">
                <Icon name="bi:person-fill" class="w-20 h-20  lg:w-30 lg:h-30" />
    
                <div class="text-center text-2xl md:text-4xl mb-4 font-bold">Login</div>
            </span>
    
            <transition
                enter-active-class="transition ease-in duration-500"
                enter-from-class="transform opacity-0"
                enter-to-class="transform opacity-100"
                leave-active-class="transition ease-in duration-500"
                leave-from-class="transform opacity-0"
                leave-to-class="transform opacity-100"
            >
                <span v-if="$auth.response" class="w-full p-4 box-border text-center text-bold bg-success-300 text-success-900 rounded-lg">
                    {{ $auth.response?.status }}
                </span>
            </transition>
    
            <transition
                enter-active-class="transition ease-in duration-500"
                enter-from-class="transform opacity-0"
                enter-to-class="transform opacity-100"
                leave-active-class="transition ease-in duration-500"
                leave-from-class="transform opacity-0"
                leave-to-class="transform opacity-100"
            >
                <span v-if="typeof $auth.errors === 'string'" class="w-full p-4 box-border text-center text-bold bg-danger-300 text-danger-900 rounded-lg">
                    {{ $auth.errors }}
                </span>
            </transition>
    
            <div class="pt-5 space-y-6">
                <x-input
                    v-model="form.email"
                    color="blue"
                    label="Email"
                    type="email"
                    icon
                    name="email_login"
                    :error="$auth.errors && $auth.errors?.email ? $auth.errors.email[0] : ''"
                    autofocus
                >
                    <template #icon>
                        <Icon name="material-symbols:mark-email-unread-sharp" class="text-xl" />
                    </template>
                </x-input>
    
                <div>
                    <x-input
                        v-model="form.password"
                        :type="canSeeThePassword ? 'text' : 'password'"
                        color="blue"
                        label="Hasło"
                        icon
                        right-icon
                        name="password_login"
                        :error="$auth.errors && $auth.errors?.password ? $auth.errors?.password[0] : ''"
                    >
                        <template #icon>
                            <Icon name="teenyicons:password-solid" class="text-xl" />
                        </template>
        
                        <template #right-icon>
                            <Icon v-if="canSeeThePassword" @click="canSeeThePassword = false" name="mdi:eye-off-outline" class="text-xl text-blue-600 hover:text-green-600 cursor-pointer" />
                            <Icon v-else @click="canSeeThePassword = true" name="mdi:eye-outline" class="text-xl hover:text-red-600 cursor-pointer" />
                        </template>
                    </x-input>
        
          
                        <x-btn
                            @click="$navbar.showForgotPassword()"
                            color="primary" strip
                            class="px-3 text-[12px]"
                        >
                            Zapomniałeś hasła?
                        </x-btn>
                </div>
    
                <div class="w-full space-y-6">
                    <x-btn
                        :disabled="(!form.email || !form.password)"
                        type="submit"
                        class="w-full"
                        color="success-outline"
                        :loading="$auth.isLoading"
                        rounded
                        shadow
                    >
                        Zaloguj się
                    </x-btn>
                </div>
            </div>        
        </form>
    </ClientOnly>
</template>