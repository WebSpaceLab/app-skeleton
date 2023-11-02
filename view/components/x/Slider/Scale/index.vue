<script setup>
    const props = defineProps({
        items: Object
    })

    const indexSelected = ref(0);
    const difference = ref(0);
    const prev = ref(false);
    const next = ref(true);
    // const config = useRuntimeConfig();
    const urls = ref([]);
    const videos =  ref([]);

    props.items.forEach(item => {
        // urls.value.push(config.API_URL + item.attributes.movie.data.attributes.url);
        urls.value.push(item.video.url);
    });

    function selectSlide(index) {
        difference.value += indexSelected.value - index;
        indexSelected.value = index;

        if(indexSelected.value < props.items.length - 1 ) {
            next.value = true;
        } else {
            next.value = false;
        }

        if(indexSelected.value > 0) {
            prev.value = true;
        } else {
            prev.value = false;
        }

        PlayPauseVideo(indexSelected.value);
    }

    function positionNoSelectedSlide(index) {
        if(index > indexSelected.value) {
            // Right side
            return ( 105 * (index + difference.value)) + 50;
        } else {
            // left side
            return ( 105 * (index + difference.value)) - 150;
        }
    }

    function prevSlide () {    
        const index = indexSelected.value -1;
        if(index >= 0) {            
            selectSlide(index);
            positionNoSelectedSlide(index);
        }
    }

    function nextSlide () {
        const index = indexSelected.value +1;
        // difference.value += indexSelected.value - index;
        if(props.items.length - 1 >= index) {
            selectSlide(index);
            positionNoSelectedSlide(index);
        }
    }

    function PlayPauseVideo(index) {
        const videoMain = document.getElementById(`slider-video-${index}`);
        videos.value.forEach(video => {
            if(video == videoMain) {
                if(videoMain.pause()) {
                    videoMain.play();
                } else {
                    videoMain.pause()
                }
            } else {
                video.pause()
            }
        })
    }

    function getVideos() {
        props.items.forEach((items, index) => {
            videos.value.push(
                document.getElementById(`slider-video-${index}`)
            );
        })
    }

    onMounted(() => {
        getVideos();
        PlayPauseVideo(0);
    })
</script>

<template>
    <!-- Container -->
    <div class="relative flex-col h-full w-full">
        <!-- Wrapper -->
        <div class="relative flex flex-row flex-wrap justify-center items-end pb-16 w-full h-full ">

            <div class="relative mx-2 md:w-[208px] md:h-[117px] lg:w-[266px] lg:h-[149px] rounded-md">
                <!-- Arrow Prev -->
                <div v-if="prev" @click="prevSlide" class="absolute bg-blue w-16 h-16 rounded-full z-40 top-[0] left-[0] cursor-pointer translate-x-[-660%] translate-y-[-150%] hover:translate-x-[-665%] transition-all duration-150">
                    <span class="flex flex-wrap justify-center items-center w-full h-full rounded-full font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </span>
                </div>
                <!-- Arrow Next-->
                <div v-if="next" @click="nextSlide" class="absolute bg-blue w-16 h-16 rounded-full z-40 top-[0] right-[0] cursor-pointer translate-x-[250%] translate-y-[-150%] hover:translate-x-[255%] transition-all duration-150">
                    <span class="flex flex-wrap justify-center items-center w-full h-full rounded-full font-extrabold">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </span>
                </div>

                <!-- Main Content -->
                <div v-for="(item, index) in items" :key="index"
                    class="absolute w-full h-full rounded-md transition-all duration-300 "
                    :class="index == indexSelected ? `main-slide` : ``"
                    :style="index == indexSelected ? `transform:translate(-50%, -100%) scale(3); display:block` : `transform: translate(${positionNoSelectedSlide(index)}%) scale(1); cursor: pointer`"
                    @click="index != indexSelected ? selectSlide(index) : ``"
                >

                    <!-- Content -->
                    <div class="w-full h-full rounded-md overflow-hidden">
                        <video :id="`slider-video-${index}`" :src="urls[index]" class="w-full h-full" muted loop ></video>
                        <span :class="index == indexSelected ? 'scale-100 opacity-100': 'scale-0 opacity-0'"  class="transition-all delay-100 duration-300 absolute w-full h-[25%] left-0 bottom-0 flex flex-wrap flex-row justify-center items-center text-[0.5rem] bg-opacity-30 bg-blue-dark rounded-lg">
                            <p class="font-Lato p-1 text-gray-light" v-html="item.quote"></p>
                        </span>
                    </div>
                </div>
            </div>

                <!-- Outer Content -->
                    <!-- Content -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.main-slide {
    // &::before {
    //     content: '<';
    //     color: #000;
    //     width: 25px;
    //     height: 25px;
    //     position: absolute;
    //     top: 40%;
    //     left: -5%;
    //     border-radius: 50%;
    //     // overflow: hidden;
    //     display: flex;
    //     flex-wrap: wrap;
    //     justify-content: center;
    //     align-items: center;
    //     background-color: aquamarine;
    //    z-index: 30;
    //    cursor: pointer;
    // }

    // &::before:hover {
    //     transform: scale(1.05);
    // }

    // &::after {
    //     content: '>';
    //     color: #000;
    //     width: 25px;
    //     height: 25px;
    //     position: absolute;
    //     top: 40%;
    //     right: -5%;
    //     border-radius: 50%;
    //     // overflow: hidden;
    //     display: flex;
    //     flex-wrap: wrap;
    //     justify-content: center;
    //     align-items: center;
    //     background-color: aquamarine;
    //    z-index: 30;
    //    cursor: pointer;
    // }
}
</style>