<script setup>
const { $users } = useNuxtApp()

const emits = defineEmits(['close', 'addedToLibrary']);

const props = defineProps({
    show: {
        type: Boolean,
        default: false,
    },
    maxWidth: {
        type: String,
        default: '4xl',
    },
    closeable: {
        type: Boolean,
        default: true,
    },
    title: {
        type: String,
        default: 'Photo details'
    },
})

const form = reactive({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
})

const close = () => {
    emits('close', false)
}

const resetForm = () => {
    form.email = ''
    form.username = ''
    form.password = ''
    form.password_confirmation = ''
    $users.errors = null
}

const create = async () => {
    await $users.create(form)
 
    if($about.errors) {
       return
    }

    addedToLibrary()
    resetForm()
    close()
}

const addedToLibrary = async () => {
    emits('addedToLibrary', true)
}

watch(() => props.show, (value) => {
    if (value) {
        resetForm()
    }
})
</script>

<template>
    <x-modal-dialog
        :show="show"
        :max-width="maxWidth"
        :closeable="closeable"
        :overflowHidden="false"
        @close="close"
        :title="title"
    >
        <form class="w-full h-full flex flex-col justify-center items-start space-y-6 py-6">
            <div class="pt-5 w-full space-y-6">
                <x-input
                    v-model="form.username"
                    color="blue"
                    label="Nazwa"
                    icon
                    name="register_name"
                    :error="$users.errors && $users.errors?.username ? $users.errors?.username : ''"
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
                    :error="$users.errors && $users.errors?.email ? $users.errors?.email : ''"
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
                    :error="$users.errors && $users.errors?.password ? $users.errors?.password : ''"
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
                    :error="$users.errors && $users.errors?.password_confirmation ? $users.errors?.password_confirmation : ''"
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
            </div> 
        </form>

       <template #footer>
            <div class="flex space-x-3">
                <x-btn @click="create" @keydown.enter="create" type="submit" color="primary-outline" rounded :loading="$users.isLoading">Utwórz konto</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>