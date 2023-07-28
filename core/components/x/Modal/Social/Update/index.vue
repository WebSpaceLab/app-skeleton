<script setup>
const {  $social } = useNuxtApp()

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
    },
    item: Object
});

let isSwitch = ref(false);

const form = reactive({
    id: null,
    name: '',
    to: '',
    icon: '',
    is_active: false,
    loading: false,
    errors: []
});

async function onSubmit() {
    form.errors = null
    form.loading = true


    await $social.updatedSocialMedia(form.id, form) .then(async ({data}) => {
        if(data) {
            await $social.getSocialMedia()
        }
    }).catch((error) => {
        console.error(error)
        form.errors = error
    }).finally(() => {
        form.loading = false
        close()
    })
}

function close () {
    reset()
    emits('close')
}

function reset() {
    form.id = null
    form.name = ''
    form.to = ''
    form.icon = ''
    form.is_active = false
    form.loading = false
    form.errors = []
}

watch(() => props.show, () => {
    form.id = props.item.id
    form.name = props.item.name
    form.to = props.item.to
    form.icon = props.item.icon
    isSwitch.value = props.item.is_active ? true : false 
    form.is_active = props.item.is_active
})

watch(() => isSwitch.value, (event) => {
    form.is_active = event
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
        <div class="w-full h-full flex flex-row justify-center items-start space-x-6">
            <form  class="relative w-full py-6 px-6 flex flex-col space-y-6" enctype="multipart/form-data">
                <div class="flex flex-col w-full justify-start items-center space-y-3" >
                    <div class="flex w-full justify-start items-center">
                        <x-input
                            v-model="form.name"
                            type="text"
                            label="Name"
                            :error="form.errors && form.errors.name ? form.errors.name[0] : ''"
                        />
                    </div>

                    <div class="flex w-full justify-start items-center">
                        <x-input
                            v-model="form.to"
                            :error="form.errors && form.errors.to ? form.errors.to[0] : ''"
                            type="text"
                            label="Social media URL"
                        />
                    </div>

                    <div class="flex w-full justify-start items-center">
                        <x-input
                            v-model="form.icon"
                            label="Icon Name"
                            type="text"
                            :error="form.errors && form.errors.icon ? form.errors.icon[0] : ''"
                        />
                    </div>

                    <p class="w-full text-muted-light dark:text-muted-dark font-sm">
                        Icon names can be found <a href="https://icones.js.org/collection/all?" target="_blanck" class=" ml-2 text-sm text-red">here</a> !
                    </p>

                    <div class="flex w-full justify-end items-center ">
                        <span v-if="isSwitch" class="mr-3 text-sm font-medium text-green-500">active link</span>
                        <span v-else class="mr-3 text-sm font-medium text-red-500">link not active</span>

                        <label for="toggle-social-create" class="inline-flex relative items-center mr-5 cursor-pointer">
                            <input @click="isSwitch = !isSwitch" v-model="isSwitch" type="checkbox"  id="toggle-social-create" class="sr-only peer" checked>
                            
                            <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        </label>
                    </div>
                </div>

                <div class="w-full flex justify-end items-center mb-2 space-x-6">
                </div>
            </form>
        </div>
        
        <template #footer>
            <div class="flex space-x-3">
                <x-btn @click.prevent="onSubmit()"  @keydown.enter="onSubmit()" color="primary-outline" :loading="form.loading" rounded shadow>
                   Update
                </x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>