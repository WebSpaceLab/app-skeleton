<script setup>
const passwordInput = ref(null)
const currentPasswordInput = ref(null)

const form = ref({
    current_password: '',
    password: '',
    password_confirmation: '',
})

const errors = ref({
    current_password: '',
    password: '',
    password_confirmation: '',
})


const updatePassword = () => {
    // form.put(route('user-password.update'), {
    //     errorBag: 'updatePassword',
    //     preserveScroll: true,
    //     onSuccess: () => form.reset(),
    //     onError: () => {
    //         if (form.errors.password) {
    //             form.reset('password', 'password_confirmation');
    //             passwordInput.value.focus();
    //         }

    //         if (form.errors.current_password) {
    //             form.reset('current_password');
    //             currentPasswordInput.value.focus();
    //         }
    //     },
    // });
}
</script>

<template>
    <x-card-action >
        <template #title>
            Update Password
        </template>

        <template #description>
            Ensure your account is using a long, random password to stay secure.
        </template>

        <template #content>
            <form class="px-4 py-5 sm:p-6 bg-secondary dark:bg-secondary-dark shadow sm:rounded-lg space-y-6" @submit.prevent="$auth.resetPassword(form)">
                <div class="w-full col-span-6 sm:col-span-4">
                    <x-input
                        v-model="form.current_password"
                        type="password"
                        color="blue"
                        label="Obecne hasło"
                        :error="errors.current_password"
                    />
                </div>
    
                <div class="w-full col-span-6 sm:col-span-4">
                    <x-input
                        v-model="form.password"
                        type="password"
                        color="blue"
                        label="Hasło"
                        :error="errors.password"
                    />
                </div>
    
                <div class="w-full col-span-6 sm:col-span-4">
                    <x-input
                        v-model="form.password_confirmation"
                        type="password"
                        color="blue"
                        label="Powtórz hasło"
                        :error="errors.password_confirmation"
                    />
                </div>
            </form>
        </template>

        <template #actions>
            <x-btn  class="mr-3">
                Saved.
            </x-btn>

            <x-btn >
                Save
            </x-btn>
        </template>
    </x-card-action>
</template>
