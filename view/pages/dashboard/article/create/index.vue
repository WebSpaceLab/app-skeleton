<script setup>
import { storeToRefs } from 'pinia';

const { $article, $auth, $categories } = useNuxtApp()
const {form } = storeToRefs($article)

const advertisementArticle = ref([])
const categoryArticle = ref(null)
const coverPhotoArticle = ref(null)
const isSowCoverPhoto = ref(false)

const addedToLibrary = (event) => {
    form.value.galleries.push(event)
}

const fileEdit = ref(null)
const previewImage = ref(null)

const addCoverPhoto = (photo) => {
    form.value.mediaId = photo.id
    coverPhotoArticle.value = photo
    isSowCoverPhoto.value = true
}

let isShowBar = ref(true)
let isShowTooltipAddFromGallery = ref(false)
let isShowModalPhotoGallery = ref(false)
let isShowModalPhotoDetails = ref(false)
let isShowFiledPhotoGallery = ref(false)
let isShowUploaderField = ref(false)
let isShowCategoriesField = ref(true)
let isShowModalCategoryCreate = ref(false)
let isShowModalAdvertisementCreate = ref(false)
let isShowModalArticleShow = ref(false)

function openEditFile(file) {
    fileEdit.value = file
    isShowModalPhotoDetails.value = true
}

definePageMeta({
    layout: "authorization",
    middleware: [ 'auth']
    
})

onMounted(() => {
    $auth.giveAccess($auth.accessGranted('ROLE_ADMIN'))
    
    $categories.getActiveCategories()
    
    if(form.value.galleries.length !== 0) {
        isShowFiledPhotoGallery.value = true
    }

})

watch(form.value.galleries , (photos) => {
    if (photos) {
       isShowFiledPhotoGallery.value = true
    }
})
</script>

<template>
    <x-section-dashboard v-if="$auth.accessGranted('ROLE_ADMIN')"  :container="false">
        <template #header-panel>
            <x-btn @click="isShowBar = !isShowBar" :color="isShowBar ? 'primary-outline' : 'warning-outline'" :tooltip="{text: 'Show article section preview'}"  icon shadow rounded>
                <Icon name="material-symbols-light:view-sidebar-rounded" class="text-2xl" />
            </x-btn>

            <x-btn @click="isShowModalArticleShow = true" color="primary-outline" :tooltip="{text: 'Show article section preview'}"  icon shadow rounded>
                <Icon name="icon-park-twotone:preview-open" class="text-2xl" />
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
                    <x-form-article-create 
                        :previewImage="previewImage" 
                    />
                </div>

                <div v-if="isShowBar" class="w-full lg:w-1/4 h-full flex flex-col space-y-6 box-border transition-all duration-500 rounded-xl">
                    <div v-if="isSowCoverPhoto" class="w-full h-100">
                        <NuxtImg :src="coverPhotoArticle?.previewUrl" :alt="coverPhotoArticle?.name" class="w-full h-full object-cover rounded-xl shadow-lg hover:shadow-xl shadow-black" />
                    </div>

                    <div class="w-full grid grid-cols-3 xl:grid-cols-6 gap-3 p-6  rounded-xl bg-prime-light dark:bg-prime-dark  shadow-lg hover:shadow-xl shadow-black">
         

                        <x-btn @click="$article.form.isPublished = !$article.form.isPublished"  :color="$article.form.isPublished ? 'primary' : 'warning'" :tooltip="{text: $article.form.isPublished ? 'Do not publish article' : 'Publish article'}" size="xl" strip icon shadow rounded>
                            <Icon :name="$article.form.isPublished ? 'material-symbols:published-with-changes-rounded' : 'material-symbols:unpublished-outline-rounded'" class="text-xl lg:text-2xl xl:text-3xl" />
                        </x-btn>
                        
                        <x-btn @click="isShowFiledPhotoGallery = !isShowFiledPhotoGallery" :color="isShowFiledPhotoGallery ? 'primary' : 'warning'" :tooltip="{text: isShowFiledPhotoGallery ? 'Close galleries to article' : 'Open galleries to the article'}" strip size="xl" icon shadow rounded>
                            <Icon :name="isShowFiledPhotoGallery ? 'solar:gallery-wide-outline' : 'solar:gallery-remove-outline'" class="text-xl lg:text-2xl xl:text-3xl" />
                        </x-btn>

                        <x-btn @click="isShowUploaderField = !isShowUploaderField" :color="isShowUploaderField ? 'primary' : 'warning'" :tooltip="{text: isShowUploaderField ? 'Close the adding photos from your computer box' : 'Add a photo from your computer' }" strip size="xl" icon shadow rounded>
                            <Icon :name="isShowUploaderField ? 'solar:gallery-send-outline' : 'solar:gallery-remove-linear'" class="text-xl lg:text-2xl xl:text-3xl" />
                        </x-btn>

                        <x-btn @click="isShowCategoriesField = !isShowCategoriesField" :color="isShowCategoriesField ? 'primary' : 'warning'" :tooltip="{text: isShowCategoriesField ? 'Close category select' : 'Open category select' }" strip size="xl" icon shadow rounded>
                            <Icon name="carbon:category-new-each" class="text-xl lg:text-2xl xl:text-3xl" />
                        </x-btn>

                        
                        <x-btn @click="isShowModalAdvertisementCreate = true" :color="advertisementArticle?.length != 0 ? 'primary' : 'warning'" :tooltip="{text: advertisementArticle?.length ? 'Usuń reklamę z tego artykułu' : 'Dodaj reklamę do artykułu' }" strip size="xl" icon shadow rounded>
                            <Icon name="ri:advertisement-fill" class="text-xl lg:text-2xl xl:text-3xl" />
                        </x-btn>

                        <x-btn @click.prevent="$article.create($article.form)"  type="submit" color="primary" :tooltip="{text: 'Save article'}" size="xl"   icon shadow rounded>
                            <Icon name="icon-park-twotone:save" class="text-xl lg:text-2xl xl:text-3xl" />
                        </x-btn>
                    </div>

                    <div v-if="isShowFiledPhotoGallery" class="w-full text-basic-light dark:text-basic-dark  transition-all duration-500 rounded-xl bg-prime-light dark:bg-prime-dark  shadow-lg hover:shadow-xl shadow-black">
                        <div class="relative px-6 pb-6 rounded-lg">
                            <div class="w-full">
                                <p class="text-md font-semibold ">Galeria zdjęć</p>
                            </div>
                        
                            <div class="w-full p-6 border-solid border-1 border-basic-light dark:border-basic-dark rounded-lg  grid grid-cols-3 gap-3 transition-all duration-500">   
                                <template v-for="(photo, index) in form.galleries" :key="index">
                                    <div class="group  w-full relative h-20 cursor-pointer rounded-xl shadow-lg hover:shadow-xl group transition-all duration-500 hover:scale-105 ">
                                        <div class="absolute top-0 right-0 w-full hidden group-hover:flex justify-center items-center transition-all duration-500 group-hover:bg-black/80 rounded-lb-xl rounded-rt-xl">
                                            <x-btn @click="addCoverPhoto(photo)" color="primary" :tooltip="{text: 'Dodaj zdjęcie na okładkę artykułu'}" strip size="md"  icon shadow rounded>
                                                <Icon name="material-symbols:photo-auto-merge-outline" class="text-xl" />
                                            </x-btn>

                                            <x-btn @click="event => previewImage = photo" color="primary" :tooltip="{text: 'Dodaj zdjęcie do artykułu'}" strip size="md"  icon shadow rounded>
                                                <Icon name="material-symbols:photo-auto-merge-outline" class="text-xl" />
                                            </x-btn>
                                            
                                            <x-btn @click="form.galleries.splice(index, 1)" color="danger" :tooltip="{text: 'Usuń zdjęcie z poczekalnii '}" strip size="md"  icon shadow rounded>
                                                <Icon name="material-symbols:delete-outline-rounded" class="text-xl" />
                                            </x-btn>
                                        </div>
                                        
                                        <NuxtPicture 
                                            @click="openEditFile(photo)"
                                            :src="photo.previewUrl" 
                                            :alt="photo.name" 
                                            :imgAttrs="{id:'my-id', class:'w-full h-full object-cover rounded-xl', style:'display:block', 'data-my-data': 'my-value'}" 
                                        />
                                    </div>
                                </template>

                                <div 
                                    @click="isShowModalPhotoGallery = true"
                                    @mouseenter="isShowTooltipAddFromGallery = true" 
                                    @mouseleave="isShowTooltipAddFromGallery = false" 
                                    class="w-20 h-20 relative flex justify-center items-center cursor-pointer box-border  shadow-lg hover:shadow-xl shadow-black text-slate-600 border-solid border-slate-600 rounded-xl"
                                >
                                    <Icon name="material-symbols:add-photo-alternate-outline-rounded" class="text-3xl" />

                                    <x-tooltip v-if="isShowTooltipAddFromGallery" position="top" text="Add image from gallery" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="isShowUploaderField" class="w-full p-6  rounded-xl bg-prime-light dark:bg-prime-dark  shadow-lg hover:shadow-xl shadow-black">
                        <x-photo-dropzone @addedToLibrary="event => addedToLibrary(event)" />
                    </div>

                    <div v-if="isShowCategoriesField" class="w-full text-basic-light dark:text-basic-dark  rounded-xl bg-prime-light dark:bg-prime-dark  shadow-lg hover:shadow-xl shadow-black">
                        <div class="relative px-6 pb-6 rounded-lg">
                            <div class="w-full flex justify-between items-center">
                                <p class="text-md font-semibold">Przypisz artykuł do kategorii</p>

                                <x-btn @click="isShowModalCategoryCreate = true" color="primary" :tooltip="{text: 'Add new category'}" strip size="md"  icon shadow rounded>
                                    <Icon name="carbon:category-new" class="text-xl" />
                                </x-btn>
                            </div>
                            
                            <div class="border-solid border-1 border-basic-light dark:border-basic-dark rounded-lg ">
                                <x-card-categories-select v-if="!$categories.isLoading" :categories="$categories.activeCategories" :selectedCategory="form.categoryId"  @update:category="event => form.categoryId = event" />
                                
                                <div v-else class="w-full h-full py-10">
                                    <spinner :loading="$categories.isLoading" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <x-modal-photo-gallery
                    :show="isShowModalPhotoGallery"
                    @close="(event) => isShowModalPhotoGallery = event"
                    @addedToLibrary="event => addedToLibrary(event)"
                    max-width="max"
                    title="Gallery"
                    :multiple="false"
                />

                <x-modal-photo-details
                    :show="isShowModalPhotoDetails"
                    :file="fileEdit"
                    @close="event => isShowModalPhotoDetails = false"
                    @addedToLibrary="event => addedToLibrary(event)"
                    title="Photo details"
                />

                <x-modal-category-create
                    :show="isShowModalCategoryCreate"
                    @close="event => isShowModalCategoryCreate = false"
                    @addedToLibrary="event => addedToLibrary(event)"
                    title="Category create"
                />

                <x-modal-advertisement-create
                    :show="isShowModalAdvertisementCreate"
                    @close="event => isShowModalAdvertisementCreate = false"
                    @addedToLibrary="event => addAdvertisement(event)"
                    title="Advertisement create"
                />

                <x-modal-article-show
                    :show="isShowModalArticleShow"
                    :article="form"
                    @close="event => isShowModalArticleShow = false"
                    title="Article details"
                />
            </div>
        </template>

        <template #sidebar>

        </template>
    </x-section-dashboard>
</template>