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

let isSwitch = ref(false);

const form = reactive({
    title: '',
    description: '',
    logo: '/images/png/logo.png',
    address: '',
    openingHours: '',
    phone: '',
    map: '',
});

async function onSubmit() {
    $contact.errors = null
    $contact.loading = true

    try {
       const response =  await $contact.update($contact.id, form)
    } catch (error) {
        console.error(error)
        $contact.errors = error.response.data.errors
    } finally {
        $contact.loading = false
        close()
    }
}

function close () {
    reset()
    emits('close', false)
}

function reset() {
    form.title = ''
    form.description = ''
    form.logo = '/images/png/logo.png',
    form.address = ''
    form.openingHours = ''
    form.phone = ''
    form.map = ''
}

watch(() => props.show, () => {
    form.title = $contact.title
    form.description = $contact.description
    form.logo = $contact.logo,
    form.address = $contact.address
    form.openingHours = $contact.openingHours
    form.phone = $contact.phone
    form.map = $contact.map
})
</script>

<template>
    <x-modal-dialog
        :show="show"
        :max-width="maxWidth"
        :closeable="closeable"
        @close="close"
        :title="title"
    >
        <div class="w-full h-full flex flex-col justify-center items-start space-x-6">

            <form  class="relative w-full py-6 px-6 flex flex-col space-y-6" enctype="multipart/form-data">
                <div class="flex flex-col w-full justify-start items-center space-y-3" >
                    <div class="w-full h-30  flex justify-start items-start space-x-6">
                        <div class="w-1/4 h-full">


                            <img :src="form.logo"  alt="logo" class="w-30 h-full object-cover" />
                        </div>
                        
                        <div class="w-3/4 h-full flex flex-col justify-end items-end">
                            <div>

                            </div>

                            <div class="flex w-full justify-start items-center">
                                <x-input
                                    v-model="form.title"
                                    type="text"
                                    label="Title"
                                    :error="$contact.errors && $contact.errors.title ? $contact.errors.title[0] : ''"
                                />
                            </div>
                        </div>
                    </div>

                    <div class="flex w-full justify-start items-center">
                        <x-textarea
                            v-model="form.description"
                            :error="$contact.errors && $contact.errors.description ? $contact.errors.description[0] : ''"
                            label="Description"

                        />
                    </div>

                    <div class="flex w-full justify-start items-center space-x-4">
                        <x-textarea
                            v-model="form.address"
                            label="Address"
                            :error="$contact.errors && $contact.errors.address ? $contact.errors.address[0] : ''"
                            :rows="5"
                        />

                        <x-textarea
                            v-model="form.openingHours"
                            label="Opening hours"
                            :error="$contact.errors && $contact.errors.openingHours ? $contact.errors.openingHours[0] : ''"
                            :rows="5"
                        />
                    </div>

                    <div class="flex w-full justify-start items-center ">
                        <x-input
                       
                            v-model="form.phone"
                            type="tel"
                            label="Phone"
                            :error="$contact.errors && $contact.errors.phone ? $contact.errors.phone[0] : ''"
                        />
                    </div>

                    <div class="flex w-full justify-start items-center">
                        <x-textarea
                            v-model="form.map"
                            label="Google map URL"
                            :error="$contact.errors && $contact.errors.map ? $contact.errors.map[0] : ''"
                            :rows="3"
                        />
                    </div>

                </div>

                <div class="w-full flex justify-end items-center mb-2 space-x-6">
                </div>
            </form>

            <div v-if="form.map" class="w-full flex justify-center h-70" v-html="form.map">

            </div>
        </div>
        
        <template #footer>
            <div class="flex space-x-3">
                <x-btn @click.prevent="onSubmit()"  @keydown.enter="onSubmit()" color="primary-outline" :loading="$contact.loading" rounded shadow>
                   Update
                </x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>