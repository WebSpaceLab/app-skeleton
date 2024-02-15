<script setup>
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const { $account, $auth, $flash } = useNuxtApp()

let isMouseover = ref(false)
let file = ref(null)
let cropper = ref(null)
let uploadedImage = ref(null)
let userName = ref('')
let firstName = ref('')
let lastName = ref('')
let userDescription = ref('')
let isUpdated = ref(false)

const getUploadedImage = (e) => {
    file.value = e.target.files[0]
    uploadedImage.value = URL.createObjectURL(file.value)
}

const cropAndUpdateImage = async () => {
    $account.progressImage = 0
    const { coordinates } = cropper.value.getResult()
    let data = new FormData();

    data.append('image', file.value || '')
    data.append('height', coordinates.height || '')
    data.append('width', coordinates.width || '')
    data.append('left', coordinates.left || '')
    data.append('top', coordinates.top || '')   

    await $account.updateUserImage(data).then(async (res) => {
        await $auth.getUser()

        $flash.success(res.data.flash.message)
    }).catch((error) => {
        $flash.error( error.response.data.message)
    }).finally(() => {
        uploadedImage.value = null
        $account.progressImage = 0
    })
}

const updateUserInfo = async () => {

    const {status, data, error } = await $account.updateUser(userName.value, userDescription.value, firstName.value, lastName.value)

    if(error.value) {
        $flash.error(error.value.data.error)
    } else {
        if(status.value == 'success') {
            $flash.success(data.value.massage)
            await $auth.getUser()
        }
    }
}

watch(() => userName.value, () => {
    if (!userName.value || userName.value === $account.user.username) {
        isUpdated.value = false
    } else {
        isUpdated.value = true
    }
})

watch(() => firstName.value, () => {
    if (!firstName.value || firstName.value === $account.user.firstName) {
        isUpdated.value = false
    } else {
        isUpdated.value = true
    }
})

watch(() => lastName.value, () => {
    if (!lastName.value || lastName.value === $account.user.lastName) {
        isUpdated.value = false
    } else {
        isUpdated.value = true
    }
})

watch(() => userDescription.value, () => {
    if (!userName.value || !userDescription.value && !userDescription.value === $account.user.bio) {
        isUpdated.value = false
    } else {
        isUpdated.value = true
    }
})

onMounted(() => {
    userName.value = $account.user.username
    firstName.value = $account.user.firstName
    lastName.value = $account.user.lastName
    userDescription.value = $account.user.bio
})
</script>

<template>
    <div 
        @mouseover="isMouseover = true" @mouseleave="isMouseover = false"
        class="relative w-full flex flex-col  bg-prime-light dark:bg-prime-dark rounded-lg  box-border"
        :class="[
            !uploadedImage ? 'h-full' : 'h-full',
            isMouseover ? 'shadow-xl shadow-black' : '',
        ]"
    >
        <div class="w-full py-8 px-6 box-border" :class="!uploadedImage ? 'mt-16' : 'mt-[58px]'">
            <div v-if="!uploadedImage" class="flex flex-col space-y-8">
                <div  class="w-full flex flex-col lg:h-[118px] h-[145px] px-1.5 py-6 box-border">
                    <div class="font-semibold lg:mb-0 mb-1 lg:text-left text-center">
                        Zdjęcie profilowe
                    </div>

                    <div class="flex items-center justify-center lg:-mt-6">
                        <label for="image" class="relative cursor-pointer">
                            <img 
                                class="rounded-full" 
                                width="95"
                                height="95" 
                                :src="$account.user.avatarUrl"
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
                </div>

                <div class="w-full lg:h-full flex flex-col px-1.5 py-2 box-border">
                    <div class="font-semibold lg:mb-0 mb-1 lg:w-[300px] lg:text-left text-center">
                        Nazwa użytkownika

                    </div>

                    <div class="flex items-center justify-center lg:-mt-6">
                        <div class="lg:w-[60%] w-full max-w-lg">
                            <x-input
                                v-model="userName"
                                color="blue"
                                label="Nazwa użytkownika"
                                icon
                                error=""
                                name="input_username"
                            >
                                <template #icon>
                                    <Icon name="material-symbols:person-3-rounded" class="text-xl" />
                                </template>
                            </x-input>
                                                
                            <p class="text-[11px] text-gray-500 mt-2">
                                Nazwy użytkowników mogą zawierać tylko litery, cyfry, podkreślenia i kropki.
                                Zmiana nazwy użytkownika spowoduje również zmianę linku do profilu.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="w-full lg:h-full flex flex-col px-1.5 py-2 box-border">
                    <div class="font-semibold lg:mb-0 mb-1 lg:w-[300px] lg:text-left text-center">
                        Imię
                    </div>

                    <div class="flex items-center justify-center lg:-mt-6">
                        <div class="lg:w-[60%] w-full max-w-lg">
                            <x-input
                                v-model="firstName"
                                color="blue"
                                label="Imię"
                                icon
                                error=""
                                name="input_first-name"
                            >
                                <template #icon>
                                    <Icon name="material-symbols:person-3-rounded" class="text-xl" />
                                </template>
                            </x-input>

                        </div>
                    </div>
                </div>


                <div class="w-full lg:h-full flex flex-col  px-1.5 py-2 box-border">
                    <div class="font-semibold lg:mb-0 mb-1 lg:w-[300px] lg:text-left text-center">
                        Nazwisko
                    </div>

                    <div class="flex items-center justify-center lg:-mt-6">
                        <div class="lg:w-[60%] w-full max-w-lg">
                            <x-input
                                v-model="lastName"
                                color="blue"
                                label="Nazwisko"
                                icon
                                error=""
                                name="input_last-name"
                            >
                                <template #icon>
                                    <Icon name="material-symbols:person-3-rounded" class="text-xl" />
                                </template>
                            </x-input>

                        </div>
                    </div>
                </div>

                <div 
                    id="BioSection" 
                    class="w-full lg:h-full flex flex-col px-1.5 py-2 box-border"
                >
                    <div class="font-semibold lg:mb-0 mb-1 lg:w-[300px] lg:text-left text-center">
                        Opis
                    </div>

                    <div class="flex items-center justify-center lg:-mt-6">
                        <div class="lg:w-[60%] w-full max-w-lg">
                            <x-textarea 
                                :cols="30"
                                :rows="4"
                                v-model="userDescription"
                                :maxlength="80"
                                label="Opis "
                                name="textarea_user-description"
                            ></x-textarea>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="w-full h-[430px] box-border">
                
                <Cropper
                class="h-[430px] w-full "
                ref="cropper"
                :stencil-component="CircleStencil"
                :src="uploadedImage"
                />

                <div v-if="uploadedImage && $account.progressImage != 0"  class="w-full bg-gray-400/60 rounded-full h-5 shadow-inner overflow-hidden relative flex items-center justify-center">

                    <div class="inline-block h-full bg-indigo-600 absolute top-0 left-0" :style="`width: ${$account.progressImage}%`"></div>

                    <div class="relative z-10 text-xs font-semibold text-center text-white drop-shadow text-shadow">{{ $account.progressImage}}%</div>

                </div>
            </div>

        </div>
        
        <div class="relative p-5 box-border left-0 bottom-0 w-full">
            <div 
                id="UpdateInfoButtons" 
                v-if="!uploadedImage" 
                class="flex items-center justify-end"
            >
                <x-btn 
                    :disabled="!isUpdated"
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
</template>