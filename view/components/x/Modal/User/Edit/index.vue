<script setup>
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const { $users, $flash } = useNuxtApp()

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
    preview: Object,
    roles: Array,
})

const form = reactive({
    id: '',
    email: '',
    roles: '',
    username: '',
    bio: '',
    isActiveAccount: false,
})

const avatarUrl = computed(() => {
    return props.preview?.avatarUrl ? props.preview.avatarUrl : '/images/avatar.png'
})  

const close = () => {
    emits('close', false)
}

const resetForm = () => {
    form.id = ''
    form.email = ''
    form.roles = ''
    form.username = ''
    form.bio = ''
    form.isActiveAccount = false
    $users.errors = null
}

const update = async () => {
    try {
        await $users.update(props.preview.id, form)
    } finally {
        addedToLibrary()
        resetForm()
        close()
    }
}

const addedToLibrary = async () => {
    emits('addedToLibrary', true)
}

let uploadedImage = ref(null)
let file = ref(null)
let cropper = ref(null)

const getUploadedImage = (e) => {
    file.value = e.target.files[0]
    uploadedImage.value = URL.createObjectURL(file.value)
}

const cropAndUpdateImage = async () => {
    $users.progressImage = 0
    const { coordinates } = cropper.value.getResult()
    let data = new FormData();

    data.append('image', file.value || '')
    data.append('height', coordinates.height || '')
    data.append('width', coordinates.width || '')
    data.append('left', coordinates.left || '')
    data.append('top', coordinates.top || '')   

    await $users.updateUserAvatar(props.preview.id, data).then(async (res) => {
        $flash.success(res.data.flash.message)
        
        addedToLibrary()
    }).catch((error) => {
        $flash.error( error.response.data.message)
    }).finally(() => {
        uploadedImage.value = null
        $users.progressImage = 0
    })
}

watch(() => props.show, () => {
    if (props.show) {
        form.id = props.preview.id
        form.email = props.preview.email
        form.roles = props.preview.roles
        form.username = props.preview.username
        form.bio = props.preview.bio
        form.isActiveAccount = props.preview.isActiveAccount
    }
})

watch(() => $users.progressImage, () => {
    if ($users.progressImage == 100) {
        uploadedImage.value = null
        $users.progressImage = 0
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
        <form v-if="!uploadedImage" class="w-full h-full flex flex-col justify-center items-start space-y-6 py-6">
            <div  class="w-full h-full flex justify-start items-start space-y-6">
                <div class="w-50 p-6 flex items-start justify-center">
                    <label for="image" class="relative cursor-pointer">
                        <img 
                            class="rounded-full" 
                            width="95"
                            height="95" 
                            :src="avatarUrl"
                            alt="userName"
                        >

                        <div class="absolute  w-6 h-6 flex justify-center items-center bottom-0 right-0  rounded-full bg-white  border  border-gray-300  shadow-xl shadow-black">
                            <Icon name="ph:pencil-simple-line-bold" size="17" class="-mt-1 ml-0.5 text-gray-600"/>
                        </div>
                    </label>
                    
                    <input
                        class="hidden"
                        type="file"
                        id="image"
                        @input="getUploadedImage"
                        accept="image/png, image/jpeg, image/jpg"
                    >
                </div>
       

                <div class="w-full flex flex-col space-y-3">
                    <x-input
                        v-model="form.username"
                        color="blue"
                        label="Nazwa użytkownika"
                        :error="$users.errors && $users.errors.username ? $users.errors.username: ''"
                    />

                    <x-input
                        v-model="form.email"
                        color="blue"
                        label="Email"
                        :error="$users.errors && $users.errors.email ? $users.errors.email: ''"
                    />
                </div>
            </div>

            <div class="w-full">
                <x-textarea
                    v-model="form.bio"
                    label="Opis"
                    :error="$users.errors && $users.errors.bio ? $users.errors.bio : ''"
                    :rows="5"
                />
            </div>

            <div class="w-full flex justify-start items-center space-x-7">
                <div class="flex w-full justify-end items-center ">
                    <span v-if="form.isActiveAccount" class="mr-3 text-sm font-medium text-green-500">active status</span>
                    <span v-else class="mr-3 text-sm font-medium text-red-500">status not active</span>

                    <label  for="toggle-user-active-edit" class="inline-flex relative items-center mr-5 cursor-pointer">
                        <input  @click="form.isActiveAccount = !form.isActiveAccount" v-model="form.isActiveAccount" type="checkbox" :value="form.isActiveAccount" id="toggle-user-active-edit" class="sr-only peer" checked>
                        
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                </div>

                <div class="w-full">
                    <x-select v-model="form.roles" :options="roles" label="Role"></x-select>
                </div>
            </div>
        </form>

        <div v-else class="w-full box-border">
            
            <Cropper
                class="h-[430px] w-full "
                ref="cropper"
                :stencil-component="CircleStencil"
                :src="uploadedImage"
            />

            <div v-if="uploadedImage && $users.progressImage != 0"  class="w-full bg-gray-400/60 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center">

                <div class="inline-block h-full bg-indigo-600 absolute top-0 left-0" :style="`width: ${$users.progressImage}%`"></div>

                <div class="relative z-10 text-xs font-semibold text-center text-white drop-shadow text-shadow">{{ $users.progressImage}}%</div>

            </div>

            <div class="relative p-5 box-border left-0 bottom-0 w-full">
                <div 
                    id="UpdateInfoButtons" 
                    v-if="!uploadedImage" 
                    class="flex items-center justify-end"
                >
                    <x-btn 
                        @click="updateUserInfo()"
                        color="primary-outline"
                        rounded
                        shadow
                    >
                        <span class="mx-4 font-medium text-[15px]">Save</span>
                    </x-btn>
                </div>

                <div 
                    v-else 
                    id="CropperButtons" 
                    class="flex items-center justify-end space-x-3"
                >
                        
                    <x-btn
                        @click="uploadedImage = false"
                        color="danger"
                        rounded
                        shadow
                    >
                        <span class="mx-4 font-medium text-[15px]">Close</span>
                    </x-btn>

                    <x-btn
                        @click="cropAndUpdateImage()"
                        color="primary-outline"
                        rounded
                        shadow
                    >
                        <span class="mx-4 font-medium text-[15px]">Apply</span>
                    </x-btn>
                </div>
            </div>
        </div>

       <template #footer>
            <div class="flex space-x-3">
                <x-btn @click="update" @keydown.enter="update" type="submit" color="primary-outline" rounded :loading="$users.isLoading">Update</x-btn>
            </div>
       </template>
    </x-modal-dialog>
</template>