<script setup>
const props = defineProps({
    gallery: {
        type: Object,
        required: true
    },

    to: {
        type: String,
        required: true
    },
    action: {
        type: Boolean,
        default: false
    },  
    footer: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits([
    'destroy', 'edit', 'show'
])

const data = ref([])
const count = ref(0)

function cover(media) {
    count.value = media.length

    if(count.value == 0) {
        data.value.push({
            previewUrl: `https://via.placeholder.com/300x300.png?text=No+Image`,
            name: `No Image`
        })
    }  else {
        media.forEach((value, key) => {
            if(key < 4) {
                data.value.push(value)
            } 
        })
    
    }   

}

let hover = ref(false)

onMounted(async () => {
    cover(props.gallery.media)
})
</script>

<template>
    <div             
        @mouseover="hover = true"
        @mouseleave="hover = false" 
        data-aos="zoom-in"  
        data-aos-duration="500" 
        class="w-full h-70 rounded-xl overflow-hidden decoration-none cursor-pointer shadow-lg shadow-black hover:shadow-xl"
    >
        <nuxt-link
            :to="to"
            class="w-full h-full"
        >
            <div 
                class="relative w-full h-full transition-all duration-500"
                :class="hover ? 'scale-110' : 'scale-100'"
            >
                <div class="w-full h-full grid " :class="[
                    count > 1 ? 'grid-cols-2' : 'grid-cols-1',
                    count == 2 ? 'grid-cols-2 grid-rows-1' : '',
                    count === 3 ? 'grid-cols-3 grid-rows-1' : '',
                    count >= 4 ? 'grid-cols-2 grid-rows-2' : '',
                ]">
                    <nuxt-img  v-for="(photo, index) in data" :key="index" :src="photo.previewUrl" :alt="photo.name" class="w-full h-full object-cover" />
                </div>
    
                <div class="absolute bottom-0 left-0 w-full h-full p-6 bg-black/10 flex justify-center items-center">
                    <p class="text-white font-bold uppercase bg-black/50 p-3 rounded-lg">
                        {{ gallery.title }}
                    </p>
                </div>
            </div>
    
    
        </nuxt-link>

        <transition 
            enter-active-class="ease-out duration-300"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-600"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="hover" class="w-full h-full flex flex-col justify-between z-20">
                <x-speed-dial v-if="action">
                    <slot name="action" />
                </x-speed-dial>
    
                <div v-if="footer" class="w-full h-10 absolute bottom-0 left-0  bg-black/50">
                    <slot name="footer" />
                </div>
            </div>
        </transition>
    </div>
</template>