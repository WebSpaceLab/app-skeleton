<script setup>
import { storeToRefs } from 'pinia';

const { $galleries, $auth } = useNuxtApp()
const { form } = storeToRefs($galleries)

const addedToLibrary = (event) => {
    event.forEach(photo => {
        form.value.photos.push(photo)
    })
}

let isShowBar = ref(true)
let isShowModalPhotoGallery = ref(false)
let isShowFiledPhotoGallery = ref(false)
let isShowUploaderField = ref(false)

definePageMeta({
    layout: "authorization",
    middleware: [ 'auth']
    
})

function removePhotoFromGallery(event) {
    form.value.photos = form.value.photos.filter(photo => photo.id !== event)
}

onMounted(() => {
    $auth.giveAccess($auth.accessGranted('ROLE_EDITOR'))
    
    // if(form.value.galleries.length !== 0) {
    //     isShowFiledPhotoGallery.value = true
    // }

})

watch(form.value.galleries , (photos) => {
    if (photos) {
       isShowFiledPhotoGallery.value = true
    }
})
</script>

<template>
    <x-section-dashboard v-if="$auth.accessGranted('ROLE_EDITOR')"  :container="false">
        <template #header-panel>
            <x-btn @click="isShowBar = !isShowBar" :color="isShowBar ? 'primary-outline' : 'warning-outline'" :tooltip="{text: 'Pokaż podgląd sekcji gallerii'}"  icon shadow rounded>
                <Icon name="material-symbols-light:view-sidebar-rounded" class="text-2xl" />
            </x-btn>
        </template>

        <template #main>
            <div class="w-full h-full flex flex-col-reverse lg:flex-row justify-center items-center lg:justify-start lg:items-start space-y-6 lg:space-y-0 lg:space-x-6 p-6 lg:p-10  box-border transition-all duration-500 rounded-xl" >
                <div 
                    class=" h-full p-6 box-border transition-all duration-500  bg-prime-light dark:bg-prime-dark rounded-xl  shadow-lg hover:shadow-xl shadow-black"
                    :class="[
                        isShowBar ? 'w-full lg:w-3/4' : 'w-full'
                    ]"               
                >
                    <div class="w-full p-6  transition-all duration-500">   
                        <x-photo-gallery
                            :photos="form.photos"
                            action
                            class="w-full h-full"
                            @remove="event => removePhotoFromGallery(event)"
                        >
                        </x-photo-gallery>
                    </div>
                </div>

                <div v-if="isShowBar" class="w-full lg:w-1/4 h-full flex flex-col space-y-6 box-border transition-all duration-500 rounded-xl">
                    <div class="w-full grid grid-cols-3 xl:grid-cols-6 gap-3 p-6  rounded-xl bg-prime-light dark:bg-prime-dark  shadow-lg hover:shadow-xl shadow-black">
         

                        <x-btn @click="form.isPublished = !form.isPublished"  :color="form.isPublished ? 'primary' : 'warning'" :tooltip="{text: form.isPublished ? 'Nie publikuj galerii' : 'Publikuj galerię'}" size="xl" strip icon shadow rounded>
                            <Icon :name="form.isPublished ? 'material-symbols:published-with-changes-rounded' : 'material-symbols:unpublished-outline-rounded'" class="text-xl lg:text-2xl xl:text-3xl" />
                        </x-btn>
                        

                        <x-btn 
                            @click="isShowUploaderField = !isShowUploaderField" 
                            :color="isShowUploaderField ? 'primary' : 'warning'" 
                            :tooltip="{text: isShowUploaderField ? 'Zamknij dodawanie zdjęć z komputera' : 'Dodaj zdjęcie z komputera' }" 
                            strip size="xl" icon shadow rounded>
                            <Icon :name="isShowUploaderField ? 'solar:gallery-send-outline' : 'solar:gallery-remove-linear'" class="text-xl lg:text-2xl xl:text-3xl" />
                        </x-btn>

                        <x-btn
                            @click="isShowModalPhotoGallery = true"
                            :color="isShowModalPhotoGallery ? 'primary' : 'warning'" 
                            :tooltip="{text: isShowUploaderField ? 'Zamknij dodawanie zdjęć z komputera' : 'Dodaj zdjęcie z komputera' }"
                            strip size="xl" icon shadow rounded
                        >
                            <Icon name="material-symbols:add-photo-alternate-outline-rounded" class="text-3xl" />
                        </x-btn>


                        <x-btn @click.prevent="$galleries.create(form)"  type="submit" color="primary" :tooltip="{text: 'Zapisz gallerie'}" size="xl"   icon shadow rounded>
                            <Icon name="icon-park-twotone:save" class="text-xl lg:text-2xl xl:text-3xl" />
                        </x-btn>
                    </div>

                    <div class="w-full text-basic-light dark:text-basic-dark  transition-all duration-500 rounded-xl bg-prime-light dark:bg-prime-dark  shadow-lg hover:shadow-xl shadow-black">
                        <div class="relative px-6 pb-6 rounded-lg">
                            <div class="w-full">
                                <p class="text-md font-semibold ">Przypisz dane do galerii</p>
                            </div>

                            <div class="w-full p-6 border-solid border-1 border-basic-light dark:border-basic-dark rounded-lg">
                                <x-form-gallery-create />
                            </div>
                        </div>
                    </div>

                    <div v-if="isShowUploaderField" class="w-full p-6  rounded-xl bg-prime-light dark:bg-prime-dark  shadow-lg hover:shadow-xl shadow-black">
                        <x-photo-dropzone @addedToLibrary="event => addedToLibrary(event)" />
                    </div>
                </div>

                <x-modal-photo-gallery
                    :show="isShowModalPhotoGallery"
                    :currentImages="form.photos"
                    @close="(event) => isShowModalPhotoGallery = event"
                    @addedToLibrary="event => addedToLibrary(event)"
                    max-width="max"
                    title="Bibliteka zdjęć"
                    :multiple="true"
                />
            </div>
        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>