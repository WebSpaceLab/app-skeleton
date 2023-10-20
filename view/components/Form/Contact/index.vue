<script setup>
const { $inbox } = useNuxtApp()

const data = ref({
    subject: '',
    sender: '',
    email: '',
    phone: '',
    content: ''
})

const reset = () => {
    data.value = {
        subject: '',
        sender: '',
        email: '',
        phone: '',
        content: ''
    }
}

const onSubmit = () => {
    $inbox.send(data.value)
    reset()
}

</script>

<template>
    <form>
        <div class="mb-6">
            <input
                v-model="data.subject"
                type="text"
                placeholder="Temat"
                class="
                w-full
                rounded
                py-3
                px-[14px]
                text-body-color text-base
                border border-[f0f0f0]
                outline-none
                focus-visible:shadow-none
                focus:border-primary
                "
            />

            <span v-if="$inbox.errors && $inbox.errors.subject" class="text-danger-600 text-[14px] font-semibold ml-4">{{ $inbox.errors.subject }}</span>
        </div>

        <div class="mb-6">
            <input
                v-model="data.sender"
                type="text"
                placeholder="Imię i Nazwisko"
                class="
                w-full
                rounded
                py-3
                px-[14px]
                text-body-color text-base
                border border-[f0f0f0]
                outline-none
                focus-visible:shadow-none
                focus:border-primary
                "
            />

            <span v-if="$inbox.errors && $inbox.errors.sender" class="text-danger-600 text-[14px] font-semibold ml-4">{{ $inbox.errors.sender }}</span>
        </div>

        <div class="mb-6">
            <input
                v-model="data.email"
                type="email"
                placeholder="Email"
                class="
                w-full
                rounded
                py-3
                px-[14px]
                text-body-color text-base
                border border-[f0f0f0]
                outline-none
                focus-visible:shadow-none
                focus:border-primary
                "
            />

            <span v-if="$inbox.errors && $inbox.errors.email" class="text-danger-600 text-[14px] font-semibold ml-4">{{ $inbox.errors.email }}</span>
        </div>

        <div class="mb-6">
            <input
                v-model="data.phone"
                type="text"
                placeholder="Numer telefonu"
                class="
                w-full
                rounded
                py-3
                px-[14px]
                text-body-color text-base
                border border-[f0f0f0]
                outline-none
                focus-visible:shadow-none
                focus:border-primary
                "
            />

            <span v-if="$inbox.errors && $inbox.errors.phone" class="text-danger-600 text-[14px] font-semibold ml-4">{{ $inbox.errors.phone }}</span>
        </div>

        <div class="mb-6">
            <textarea
                v-model="data.content"
                rows="6"
                placeholder="Wiadomość"
                class="
                w-full
                rounded
                py-3
                px-[14px]
                text-body-color text-base
                border border-[f0f0f0]
                resize-none
                outline-none
                focus-visible:shadow-none
                focus:border-primary
                "
            ></textarea>

            <span v-if="$inbox.errors && $inbox.errors.content" class="text-danger-600 text-[14px] font-semibold ml-4">{{ $inbox.errors.content }}</span>
        </div>

        <div>
            <x-btn @click.prevent="onSubmit()" type="submit" class="w-full" color="primary" shadow rounded uppercase >Wyślij widomość</x-btn>
        </div>
    </form>
</template>