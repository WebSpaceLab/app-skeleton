<script setup>
import { Cropper, CircleStencil } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css';

const { $account, $auth, $flash } = useNuxtApp()

let isMouseover = ref(false)
let file = ref(null)
let cropper = ref(null)
let uploadedImage = ref(null)
let userImage = ref(null)
let userName = ref(null)
let userDescription = ref(null)
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

        userImage.value = $account.avatar_url
        $flash.success(res.data.flash.message)
    }).catch((error) => {
        $flash.error( error.response.data.message)
    }).finally(() => {
        uploadedImage.value = null
        $account.progressImage = 0
    })
}

const updateUserInfo = async () => {
    try {
        await $account.updateUser(userName.value, userDescription.value)
        await $auth.getUser()
    } catch (error) {
        console.log(error)
    }
}

watch(() => userName.value, () => {
    if (!userName.value || userName.value === name.value) {
        isUpdated.value = false
    } else {
        isUpdated.value = true
    }
})

watch(() => userDescription.value, () => {
    if (!userName.value || userDescription.value.length < 1) {
        isUpdated.value = false
    } else {
        isUpdated.value = true
    }
})

onMounted(() => {
    userName.value = $account.user.username
    userDescription.value = $account.user.description
    userImage.value = $account.user.avatar_url
})
</script>

<template>
    <div 
        @mouseover="isMouseover = true" @mouseleave="isMouseover = false"
        class="relative flex flex-col justify-between bg-prime-light dark:bg-prime-dark w-full mx-3 p-4 rounded-lg mb-10 border-dashed border-muted-light dark:border-muted-dark"
        :class="[
            !uploadedImage ? 'h-[655px]' : 'h-[580px]',
            isMouseover ? 'shadow-xl shadow-black' : '',
        ]"
    >

        <div class="w-full  h-[calc(500px-200px)]" :class="!uploadedImage ? 'mt-16' : 'mt-[58px]'">
            <div v-if="!uploadedImage">
                <div 
                    id="ProfilePhotoSection" 
                    class="flex flex-col border-b sm:h-[118px] h-[145px] px-1.5 py-2 w-full"
                >
                    <div class="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                        Profile photo
                    </div>

                    <div class="flex items-center justify-center sm:-mt-6">
                        <label for="image" class="relative cursor-pointer">
                            <img 
                                class="rounded-full" 
                                width="95"
                                height="95" 
                                :src="userImage"
                                alt="userName"
                            >

                            <div class="absolute  w-5 h-5 bottom-0 right-0 rounded-full bg-white shadow-xl border p-1 border-gray-300 inline-block w-[32px] shadow-xl shadow-black">
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

                <div 
                    id="UsernameSectionSection" 
                    class="flex flex-col border-b sm:h-[118px]  px-1.5 py-2 mt-1.5  w-full"
                >
                    <div class="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                        Username
                    </div>

                    <div class="flex items-center justify-center sm:-mt-6">
                        <div class="sm:w-[60%] w-full max-w-md">
                            <x-input
                                v-model="userName"
                                color="blue"
                                label="@Full name"
                                icon
                                error=""
                            >
                                <template #icon>
                                    <Icon name="material-symbols:person-3-rounded" class="text-xl" />
                                </template>
                            </x-input>

                            <div class="text-[11px] text-gray-500 mt-4">
                                Usernames can only contain letters, numbers, underscores, and periods. 
                                Changing your username will also change your profile link.
                            </div>
                        </div>
                    </div>
                </div>

                <div 
                    id="BioSection" 
                    class="flex flex-col sm:h-[120px]  px-1.5 py-2 mt-2 w-full"
                >
                    <div class="font-semibold text-[15px] sm:mb-0 mb-1 text-gray-700 sm:w-[160px] sm:text-left text-center">
                        Bio
                    </div>

                    <div class="flex items-center justify-center sm:-mt-6">
                        <div class="sm:w-[60%] w-full max-w-md">
                            <x-textarea 
                                cols="30"
                                rows="4"
                                v-model="userDescription"
                                maxlength="80"
                            ></x-textarea>

                            <div v-if="userDescription" class="text-[11px] text-gray-500">{{ userDescription.length }}/80</div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="w-full h-[430px] box-border">
                
                <Cropper
                class="h-[430px]"
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
        
        <div class="relative p-5 box-border left-0 bottom-0 border-t-dashed border-t-muted-light dark:border-t-muted-dark w-full">
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
                id="CropperButtons" 
                v-else 
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