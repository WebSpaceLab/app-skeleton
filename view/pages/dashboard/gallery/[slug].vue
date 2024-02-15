<script setup>
import { storeToRefs } from 'pinia';

const { $galleries, $auth } = useNuxtApp()
const { show, isLoading } = storeToRefs($galleries)
const route = useRoute()

const addedToLibrary = (event) => {
    if(Array.isArray(event)) {
        event.forEach(photo => {
            show.value.photos.push(photo)
        })
    } else {
        show.value.photos.push(event)
    }
}

let isShowBar = ref(true)
let isShowModalPhotoGallery = ref(false)
let isShowUploaderField = ref(false)

const slug = ref(route.params.slug)

definePageMeta({
    layout: "authorization",
    middleware: [ 'auth']
    
})

function removePhotoFromGallery(event) {
    try {
        $galleries.removePhotoFromGallery(show.value.slug, event)
        show.value.photos = show.value.photos.filter(photo => photo.id !== event)
        
    } catch (error) {
        console.log(error)
    }
}

function getGallery() {
    $galleries.edit(route.params.slug)
}

onMounted(() => {
    $auth.giveAccess($auth.accessGranted('ROLE_EDITOR'))
    getGallery()
    // if(data.value.galleries.length !== 0) {
    //     isShowFiledPhotoGallery.value = true
    // }

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
                    <div  v-if="!isLoading"  class="w-full h-full p-6  transition-all duration-500">   
                        <x-photo-gallery
                            v-if="show.photos.length != 0"
                            :photos="show.photos"
                            action
                            class="w-full h-full"
                            @remove="event => removePhotoFromGallery(event)"
                            @addedToLibrary="getGallery()"
                            isPhotosName
                            isDate
                            :container="false"
                        >
                        </x-photo-gallery>

                        <div v-else>
                            <div class="w-full h-full flex justify-center items-center">
                                <p class="text-xl uppercase font-semibold text-basic-light dark:text-basic-dark">Brak zdjęć w galerii</p>
                            </div>
                        </div>
                    </div>
                    
                    <div v-else class="w-full h-full flex justify-center items-center"> 
                        <spinner :loading="isLoading"/>
                    </div>
                </div>

                <div v-if="isShowBar" class="w-full lg:w-1/4 h-full flex flex-col space-y-6 box-border transition-all duration-500 rounded-xl">
                    <div class="w-full grid grid-cols-3 xl:grid-cols-6 gap-3 p-6  rounded-xl bg-prime-light dark:bg-prime-dark shadow-lg hover:shadow-xl shadow-black">
                        <x-btn to="/dashboard/gallery" color="secondary-outline" :tooltip="{text: 'Cofnij do gallerii'}" size="xl"  link  icon shadow rounded>
                            <template #icon>
                                <Icon name="material-symbols:undo-rounded" class="text-xl lg:text-2xl xl:text-3xl" />
                            </template>
                        </x-btn>

                        <x-btn @click="$galleries.show.isPublished = !$galleries.show.isPublished"  :color="$galleries.show.isPublished ? 'primary' : 'warning'" :tooltip="{text: $galleries.show.isPublished ? 'Nie publikuj galerii' : 'Publikuj galerię'}" size="xl" strip icon shadow rounded>
                            <Icon :name="$galleries.show.isPublished ? 'material-symbols:published-with-changes-rounded' : 'material-symbols:unpublished-outline-rounded'" class="text-xl lg:text-2xl xl:text-3xl" />
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


                        <x-btn @click.prevent="$galleries.update(slug, show)"  type="submit" color="primary" :tooltip="{text: 'Zapisz zmiany'}" size="xl"   icon shadow rounded>
                            <Icon name="icon-park-twotone:save" class="text-xl lg:text-2xl xl:text-3xl" />
                        </x-btn>
                    </div>

                    <div class="w-full text-basic-light dark:text-basic-dark  transition-all duration-500 rounded-xl bg-prime-light dark:bg-prime-dark  shadow-lg hover:shadow-xl shadow-black">
                        <div class="relative px-6 pb-6 rounded-lg">
                            <div class="w-full">
                                <p class="text-md font-semibold ">Przypisz dane do galerii</p>
                            </div>

                            <div class="w-full p-6 border-solid border-1 border-basic-light dark:border-basic-dark rounded-lg">
                                <x-form-gallery-edit v-if="!isLoading"  />

                                <div v-else> 
                                    <spinner :loading="isLoading" class="w-full h-full flex justify-center items-center" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="isShowUploaderField" class="w-full p-6  rounded-xl bg-prime-light dark:bg-prime-dark  shadow-lg hover:shadow-xl shadow-black">
                        <x-photo-dropzone @addedToLibrary="event => addedToLibrary(event)" />
                    </div>
                </div>

                <x-modal-photo-gallery
                    :show="isShowModalPhotoGallery"
                    :currentImages="show.photos"
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