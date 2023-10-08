<script setup>
const props = defineProps({
    isShowPreviewImage: Boolean,
    photos: Array,
    preview: Object
});

const emits = defineEmits([
    'close', 'preview'
]);

const viewPhotos = ref([]);

let prevImage = ref(0);
let nextImage = ref(6);
let numberOfPhotos = ref(6);
let isShowAllImages = ref(true)
let isShowPreview = ref(false)
let right = ref(false)
let isShowDescription = ref(true)
let isShowDescriptionAll = ref(true)
let isFullScreen = ref(false)
let isShowHeader = ref(false)

function openPreview(item) {
    emits( 'preview', item)
}

function next(index) {
    right.value = false
    if(index + 1 < props.photos.length) {
        index ++;
    } else {
        index = 0;
    }

    props.photos.forEach(item => {
        if(item.index === index) {
            openPreview(item);
        }
    });
}

function previous(index) {
    right.value = true
    if(index > 0) {
        index --;
    } else {
        index = props.photos.length - 1;
    }

    props.photos.forEach(item => {
        if(item.index === index) {
            openPreview(item);
        }
    });
}

function close() {
    viewPhotos.value = []
    emits('close', false)
}

function allPhotos() {
    const photos = [];

    if(props.photos.length >= numberOfPhotos.value) {
        props.photos.forEach((item , index) => {
            if(index >= prevImage.value && index <= nextImage.value) {
                photos.push(item);
            }
        })

       viewPhotos.value = photos
    } else {
        viewPhotos.value = props.photos;
    }
}

function prevImages() {
    if(nextImage.value >= numberOfPhotos.value + 1) {
        prevImage.value--;
        nextImage.value--;

    } else {
        if(prevImage.value === 0) {
            prevImage.value = props.photos.length-1;
        } else if(nextImage.value === 0) {
            prevImage.value --;

            nextImage.value = props.photos.length
        } else {
            prevImage.value --;
        }
        nextImage.value--;
    }

    viewPhotos.value.pop();
    viewPhotos.value.unshift(props.photos[prevImage.value])
}

function nextImages() {
    if(nextImage.value <= props.photos.length-2 ) {
        if(prevImage.value === props.photos.length -1) {
            prevImage.value = 0;
        } else {
            prevImage.value++;
        }
        nextImage.value++;
    } else {
        if( nextImage.value === props.photos.length -1) {
            nextImage.value = 0;
        }else if(prevImage.value === props.photos.length -1) {
            prevImage.value = 1;
            nextImage.value++;
        } else {
            nextImage.value ++;
        }

        prevImage.value++;
    }

    viewPhotos.value.shift();
    viewPhotos.value.push(props.photos[nextImage.value]);
}


const showDescription = () => {
    isShowDescriptionAll.value = !isShowDescriptionAll.value

    isShowDescription.value = isShowDescriptionAll.value
}

watch(() => props.isShowPreviewImage, () => {
    allPhotos()
})

watch(() => props.preview, (preview) => {
    isShowPreview.value = false
    setTimeout(() => {
        isShowPreview.value = true

        if(isShowDescriptionAll.value) {

            isShowDescription.value = false
    
            if(preview.description) {
            
                setTimeout(() => {
                    isShowDescription.value = true
                }, 300)
            }
        }
    }, 50)
})


function onTouchmove(touch) {
    if(150 > touch.changedTouches[0].clientX) { 
        previous(props.preview.index)
    } else {
        next(props.preview.index)
    }
}
</script>

<template>
    <teleport to="body">
        <transition
           enter-active-class="transition ease-in duration-300"
           enter-from-class="transform scale-0"
           enter-to-class="transform scale-100"
           leave-active-class="transition ease-in duration-300"
           leave-from-class="transform translate-x-0"
           leave-to-class="transform translate-x-[100vw]"
       >
           <div v-if="isShowPreviewImage" class="fixed w-screen h-screen top-0 left-0 bg-black/90 backdrop-blur z-100 flex flex-col justify-start items-center">
                <div v-if="isFullScreen" class="absolute top-0 left-0 h-10 w-screen z-40" @mouseover="isShowHeader = true" @mouseleave="isShowHeader = false"></div>
            
                <header @mouseover="isShowHeader = true" @mouseleave="isShowHeader = false" class="h-20 w-screen px-8  box-border" :class="isFullScreen ? isShowHeader ? 'absolute top-0 left-0 z-50 bg-black/60' : 'hidden' : 'relative mb-6 bg-black'">
                    <div class="w-full h-full flex justify-between items-center px-5 box-border">
                        <h2 v-if="viewPhotos.length > 1" class="flex text-lg text-blue-300 space-x-4">
                            <span class=" text-gray-600 flex uppercase truncate ">{{ preview.name }}</span>
                            
                            <div class="flex space-x-1">
                                <span class="text-gray-600">[</span>
                                <span class="text-gray-600">{{ preview.index + 1 }}</span> 
                                <span class="text-gray-600"> / </span> 
                                <span class="text-gray-600">{{ viewPhotos.length }} </span>
                                <span class="text-gray-600">]</span>
                            </div>
                        </h2>
        
                        <div class="w-full flex justify-end space-x-3 px-1 md:px-3 lg:px-6" >
                            <x-btn
                                @click="isShowDescription = !isShowDescription"
                                @dblclick="showDescription"
                                :tooltip="{text: isShowDescription ? 'Ukryj opis. Double-clik wyłacza opisy' : isShowDescriptionAll ? 'Pokaż opis. Double-clik wyłacza opisy' : 'Double-clik wyłącz opisy'}"
                                icon
                                strip
                            >
                                <Icon
                                    :class="isShowDescription ? 'text-active-600 hover:text-hover-600' : 'text-gray-600 hover:text-hover-600' "
                                    :name="isShowDescriptionAll ? 'material-symbols:content-paste' : 'material-symbols:content-paste-off-sharp'"
                                    class="text-3xl  duration-500"
                                />
                            
                            </x-btn>

                            <x-btn class="hidden lg:block" @click="isShowAllImages = !isShowAllImages" :tooltip="{text: isShowAllImages ? 'Wyłącz pasek boczny' : 'Pasek boczny'}" strip icon>
                                <Icon name="material-symbols:gallery-thumbnail-outline" class="text-3xl" :class="isShowAllImages ? 'text-active-600 hover:text-hover-600' : 'text-gray-600 hover:text-hover-600' "></Icon>
                            </x-btn>

                            <x-btn @click="isFullScreen = !isFullScreen" :tooltip="{text: isFullScreen ? 'Wyłącz fullscreen' : 'Fullscreen'}"  strip icon>
                                <Icon :name="isFullScreen ? 'ic:outline-fullscreen-exit' : 'ic:baseline-fullscreen'" class="text-3xl text-gray-600 hover:text-hover-600"></Icon>
                            </x-btn>

                            <x-btn @click="close()" :tooltip="{text: 'Zamknij'}" strip icon>
                                <Icon name="ion:ios-close-circle-outline" class="text-3xl text-red-500 hover:text-red-300"></Icon>
                            </x-btn>
                        </div>
                    </div>
                </header>
    
                <div
                    v-if="preview"
                    class="flex justify-center items-center overflow-hidden md:px-6 box-border duration-300"
                    :class="isFullScreen ? 'absolute top-0 left-0 h-screen w-screen' : 'relative md:container md:mx-auto md:max-w-full h-[80%]'"
                >
                    <!--
                        
                    -->
                    
                    <div class="relative w-screen md:h-full flex justify-center items-center bg-black overflow-hidden">
                        <div
                            @click="previous(preview.index)"
                            v-if="preview.index != 0"
                            class="absolute left-0 top-0 z-20 w-10 h-full flex justify-center items-center cursor-pointer hover:bg-black/30 bg-gray-900/2 group duration-500"
                        >
                            <Icon name="material-symbols:arrow-back-ios-new" class="text-3xl text-gray-600/30 group-hover:text-gray-400 duration-500"></Icon>
                        </div>

                        <transition
                            enter-active-class="transition ease duration-300"
                            :enter-from-class="right ? 'transform translate-x-[100%] blur-100' : 'transform -translate-x-[100%] blur-100'"
                            enter-to-class="transform translate-x-0 blur-0"
                            leave-active-class="transition ease duration-800"
                            leave-from-class="transform translate-x-0"
                            :leave-to-class="right ? 'transform -translate-x-[100%] blur-100' : 'transform translate-x-[100%] blur-100'"
                        >
                                <div v-if="preview && isShowPreview" class="relative w-full md:w-auto md:h-full">
                                    <img v-if="preview.mimeType === 'image/jpeg' || preview.mimeType === 'image/png'" @touchend="onTouchmove" class="w-full md:w-auto md:h-full" :src="preview.previewUrl" :alt="preview.name" />
                                    
                                    <video v-if="preview.mimeType === 'video/mp4'" class="w-screen h-full px-20 box-border" controls>
                                        <source :src="preview.previewUrl" :type="preview.mimeType">
                                    </video>

                                    <iframe 
                                        v-if="preview.movieUrl" 
                                        :src="preview.movieUrl" 
                                        class="w-screen h-full px-20 box-border aspect-video"
                                        frameborder="0"
                                        allowfullscreen
                                    ></iframe>

                                    <transition
                                        enter-active-class="transition ease-in duration-300"
                                        enter-from-class="transform scale-0"
                                        enter-to-class="transform scale-100"
                                        leave-active-class="transition ease-in duration-300"
                                        leave-from-class="transform scale-100"
                                        leave-to-class="transform scale-0"
                                    >
                                        <div v-if="preview?.description && isShowDescription"  class="absolute top-10 left-10 right-10 z-10 border-solid border-info-900 bg-info-300/50 rounded-xl h-auto">
                                            <div class="flex justify-end p-1">
                                                <x-btn @click="isShowDescription = false"  strip icon>
                                                    <Icon name="ion:ios-close-circle-outline" class="text-xl text-red-500 hover:text-red-300"></Icon>
                                                </x-btn>
                                            </div>

                                            <p class="text-info-900 px-6" v-html="preview?.description"></p>
                                        </div>
                                    </transition>
                                </div>
                        </transition>

                        <div
                            v-if="preview.index + 1  != viewPhotos.length"
                            @click="next(preview.index)"
                            class="absolute right-0 top-0 z-20 w-10 h-full flex justify-center items-center cursor-pointer hover:bg-black/30 bg-gray-900/2 group duration-500"
                        >
                            <Icon name="material-symbols:arrow-forward-ios" class="text-3xl text-gray-600/30 group-hover:text-gray-400 duration-500"></Icon>
                        </div>
                    </div>

                    
                    <!--
                        
                    -->
                </div>

                <transition
                    enter-active-class="transition ease-in duration-300"
                    enter-from-class="transform translate-y-[100%]"
                    enter-to-class="transform translate-y-0"
                    leave-active-class="transition ease-in duration-300"
                    leave-from-class="transform translate-y-0"
                    leave-to-class="transform translate-y-[100%]"
                >
                    <div v-if="isShowAllImages && viewPhotos.length > 1" class="absolute bottom-0 -translate-y-4 p-6 mx-auto h-40 hidden lg:flex flex-row justify-center items-center space-x-3 bg-black/30 rounded-xl">
                        <div v-if="viewPhotos.length > 6" @click="prevImages()" class="h-full p-3 flex justify-center items-center cursor-pointer bg-black/30 hover:bg-hover-600/30 rounded-l-xl">
                            <Icon name="material-symbols:arrow-back-ios-new" class="text-3xl text-white"></Icon>
                        </div>
        
                        <div v-for="(photo, index) in viewPhotos" :key="photo.index = index" class="h-full flex justify-center items-center my-4 rounded-lg duration-300 ">
                            <img
                                v-if="photo.mimeType === 'image/jpeg' || photo.mimeType === 'image/png'"
                                :alt="photo.name"
                                :class="[photo.index === preview.index ? 'border border-active scale-100 transition-all duration-300 ease-linear shadow-xl shadow-black' : 'scale-80 transition-all duration-300 ease-linear']"
                                :src="photo.previewUrl"
                                @click="openPreview(photo)"
                                class="h-full w-30 cursor-pointer object-cover rounded-lg"
                            />

                            <video 
                                v-if="photo.mimeType === 'video/mp4'"
                                :class="[photo.index === preview.index ? 'border border-active scale-100 transition-all duration-300 ease-linear shadow-xl shadow-black' : 'scale-80 transition-all duration-300 ease-linear']"
                                @click="openPreview(photo)"
                                class="h-full w-30 cursor-pointer object-cover rounded-lg"
                            >
                                <source :src="photo.previewUrl" :type="photo.mimeType">
                            </video>

                            <iframe 
                                v-if="photo.movieUrl" 
                                :src="photo.movieUrl" 
                                :class="[photo.index === preview.index ? 'border border-active scale-100 transition-all duration-300 ease-linear shadow-xl shadow-black' : 'scale-80 transition-all duration-300 ease-linear']"
                                class="h-full w-30 cursor-pointer object-cover rounded-lg aspect-video"
                                frameborder="0"
                                allowfullscreen
                            ></iframe>
                        </div>
        
                        <div v-if="viewPhotos.length > 6" @click="nextImages()" class="h-full p-3 flex justify-center items-center cursor-pointer bg-black/30 hover:bg-hover-600/30 rounded-r-xl">
                            <Icon name="material-symbols:arrow-forward-ios" class="text-3xl text-white"></Icon>
                        </div>
                    </div>
                </transition>
           </div>
       </transition>
    </teleport>
</template>
