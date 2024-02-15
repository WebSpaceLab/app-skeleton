<script setup>
const {  $contact } = useNuxtApp()

const emits = defineEmits(['close'])

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
    file: {
        type: Object
    },
    title: {
        type: String,
        default: 'Create'
    }
});

const form = reactive({
    name: '',
    description: '',
    address: '',
    openingHours: '',
    phone: '',
    map: '',
});

async function onSubmit() {
    $contact.errors = null
    $contact.isLoading = true

    try {
        await $contact.create(form)
    } finally {
        $contact.isLoading = false
        close()
    }
}

function close () {
    reset()
    emits('close', false)
}

function reset() {
    form.name = ''
    form.description = ''
    form.address = ''
    form.openingHours = ''
    form.phone = ''
    form.map = ''
}
</script>

<template>
    <x-modal-dialog
        :show="show"
        :max-width="maxWidth"
        :closeable="closeable"
        @close="close"
        :title="title"
    >
        <div class="w-full h-full box-border py-6">
            <form  class="w-full">
                <div class="flex flex-col w-full justify-start items-center space-y-3" >
                    <div class="flex w-full justify-start items-center">
                        <x-input
                            v-model="form.name"
                            type="text"
                            label="Title"
                            :error="$contact.errors && $contact.errors.name ? $contact.errors.name : ''"
                        />
                    </div>
      
                    <div class="flex w-full justify-start items-center">
                        <x-textarea
                            v-model="form.description"
                            :error="$contact.errors && $contact.errors.description ? $contact.errors.description : ''"
                            label="Description"
                        />
                    </div>

                    <div class="flex w-full justify-start items-center space-x-4">
                        <x-textarea
                            v-model="form.address"
                            label="Address"
                            :error="$contact.errors && $contact.errors.address ? $contact.errors.address : ''"
                            :rows="5"
                        />

                        <x-textarea
                            v-model="form.openingHours"
                            label="Opening hours"
                            :error="$contact.errors && $contact.errors.openingHours ? $contact.errors.openingHours : ''"
                            :rows="5"
                        />
                    </div>

                    <div class="flex w-full justify-start items-center ">
                        <x-input
                       
                            v-model="form.phone"
                            type="tel"
                            label="Phone"
                            :error="$contact.errors && $contact.errors.phone ? $contact.errors.phone : ''"
                        />
                    </div>

                    <div class="flex w-full justify-start items-center">
                        <x-textarea
                            v-model="form.map"
                            label="Google map URL"
                            :error="$contact.errors && $contact.errors.map ? $contact.errors.map  : ''"
                            :rows="3"
                        />
                    </div>

                </div>

                <div class="w-full flex justify-end items-center mb-2 space-x-6">
                </div>
            </form>

            <div v-if="form.map" class="w-full flex justify-center h-70" v-html="form.map"></div>
        </div>
        
        <template #footer>
            <div class="flex space-x-3">
                <x-btn @click.prevent="onSubmit()"  @keydown.enter="onSubmit()" color="primary-outline" :loading="$contact.loading" rounded shadow>
                   Create
                </x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>