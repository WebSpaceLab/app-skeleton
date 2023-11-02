<script setup>
    const props = defineProps({
        pack: Object,
        index: Number,
        action: {
            type: Boolean,
            default: false
        }
    })

    let isHover = ref(false)
</script>

<template>
        <div 
            @mouseleave="isHover = false"
            @mouseover="isHover = true"
            class="w-full  h-full flex flex-col md:flex-row flex-wrap justify-center items-center  relative box-border" 
            :class="[pack.isHighlighted ? '' : '']"
        >       
        <!-- Price card basic -->
            <div 
                data-aos="zoom-in-up"
                :class="pack.isHighlighted ? ' shadow-primary-600 bg-primary-800/20 hover:shadow-lg' : 'hover:shadow-lg bg-secondary-800/20 shadow-secondary-600 hover:shadow-secondary-200'"  
                class="w-full h-full min-w-[240px] max-w-[320px] relative flex flex-col  shadow rounded-xl   transition duration-100 ease-in-out pt-4 px-8 box-border"
            >
                <div v-if="action" class="absolute top-0 right-0 w-full h-10  py-1">
                    <div class="w-auto flex justify-start items-center space-x-3 px-2 bg-blueGray/30 rounded-t-xl box-border">
                        <slot name="action"></slot>
                    </div>
                </div>
                
                <h2 class="mx-auto  text-2xl text-bold text-center my-4" :class="pack.isHighlighted ? 'text-primary-600' : 'text-secondary-600'">{{ pack.title }}</h2>

                <p class="text-center font-bold light:text-basic-light dark:text-basic-dark text-3xl mb-4">{{ pack.price }}</p>

                <div v-if="pack.information.length" class="flex flex-col justify-center items-center text-lg text-dark mb-16 px-6">
                    <h3 class="text-muted-light dark:text-muted-dark text-center">Pakiet składa się </h3>
                    <slot name="information"></slot>
                </div>

                <div v-if="pack.actionUrl && pack.nameBtn" class="absolute bottom-3 left-3 right-3 flex justify-center items-center">
                    <x-btn 
                        class="hover:shadow-xl transition duration-150 ease-in-out w-full" 
                        :color="pack.isHighlighted ? 'primary-outline' : 'secondary-outline'" 
                        rounded shadow link
                        :to="pack.actionUrl"
                        target="_blank"
                    >
                        {{ pack.nameBtn  }}
                    </x-btn>
                </div>
            </div>
        </div>
</template>