<script setup>
    const { justifyContent } = useClassPosition()

    const props = defineProps({
        items: Object,
        justifyButtons: {
            type: String,
            default: 'center'
        },
    })

    const slides = ref([])
    const slidesLength = computed(() => props.items.length)
    
    let index = ref(0)
    let buffer = ref(null)
    let interval = ref(null)

    function getSlides() {
        slides.value = props.items.map((item, i) => {
            return {
                ...item,
                index: i
            }
        })
    }


    function switchTab(i) {        
        if(i < 0) {
            buffer.value = null
        } 
        
        if(i + 1 <= slidesLength.value) {
            index.value = i
        } else {
            index.value = 0
        }

        buffer.value = index.value
        clearTimeout(interval.value)
        changeSliderAfterTime(index.value)
    }

    function changeSliderAfterTime(i) {
        i++
        interval.value =setTimeout(() => {
            switchTab(i)
        }, 5000)
    }
    
    onMounted(() => {
        getSlides()
        changeSliderAfterTime(index.value)
    })
</script>

<template>
    <div v-if="slides" class="relative w-full h-full z-10">
        <div  class="absolute bottom-10 right-0 w-full h-20 flex space-x-3 bg-transparent p-2 box-border"
            :class="[
                justifyContent(justifyButtons)
            ]"
        >  
            <div 
                class="relative w-full flex"            
                :class="[
                    justifyContent(justifyButtons)
                ]"
            >
                <div class="w-auto flex ">
                    <template v-for="slide in slides" :key="slide.index">
                        <div class="h-25 w-20 flex flex-col justify-end items-center relative">
                            <span 
                                v-if="slide.index === buffer" 
                                class="absolute top-0 left-0 w-20 h-20"
                            >
                                <img :src="slide.media.previewUrl" :alt="`Hero small image ${index}`" class="w-full h-full object-cover">
                            </span>
            
                            <span 
                                v-if="slide"
                                @mouseover="buffer = slide.index"
                                @mouseleave="buffer = null"
                                @click="switchTab(slide.index)"
                                class="h-3 w-3 rounded-full bg-white cursor-pointer" 
                            />
            
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <div class="w-full h-full overflow-hidden box-border">
            <template v-for="slide in slides" :key="slide.index">
                <transition
                    enter-active-class="ease-in duration-500"
                    :enter-from-class="`${index > buffer ? 'translate-x-[-100%]' : 'translate-x-[100%]' } skaw-20 blur-700`"
                    enter-to-class="opacity-100 translate-x-0 blur-0 skaw-0"
                    leave-active-class="ease-in duration-500"
                    leave-from-class="translate-x-0 blur-0 skew-0"
                    :leave-to-class="`${index < buffer ? 'translate-x-[-100%]' : 'translate-x-[100%]' } skew-20 blur-700`"
                >
                    <div v-if="slide.index === index" class="w-full h-full">
                        <slot :name="`slide-${index}`"></slot>
                    </div>
                </transition>
            </template>
        </div>
    </div>
</template>