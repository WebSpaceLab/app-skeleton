<script setup>
let props = defineProps({
    firstLink: Object,

    secondLink: Object,

    thirdLink: Object,

    lastLink: Object
})

</script>


<template>
    <nav class="flex pl-5 pr-15 py-2  z-40 shadow-xl shadow-black rounded-lg bg-gradient-to-r from-prime-light/80 to-second-light/80 dark:from-prime-dark/60 dark:to-second-dark/60 backdrop-blur-sm" aria-label="Breadcrumb">
        <ol class="flex justify-center items-center space-x-1 md:space-x-3 list-none list-outside">
            <li v-if="firstLink" class="inline-flex items-center list-none">
                
                <NuxtLink :to="firstLink.path" class="inline-flex items-center text-sm font-medium text-basic-light dark:text-basic-dark hover:text-blue-600 dark:hover:text-white">
                    <Icon :name="firstLink.icon" class="text-2xl mr-2" />

                    <span class="first-letter:uppercase">
                        {{ firstLink.name }}
                    </span> 
                </NuxtLink>
            </li>
            
            <li v-if="secondLink" class="list-none">
                <div class="flex items-center ">
                    <Icon name="ic:baseline-arrow-forward-ios" class="w-4 h-4 text-muted-light dark:text-muted-dark " />

                    <NuxtLink :to="secondLink.path" class="ml-1 text-sm font-medium text-basic-light dark:text-basic-dark  hover:text-blue-600 md:ml-2 dark:hover:text-white">
                        <Icon :name="secondLink.icon" class="text-2xl mr-2" />

                        <span class="first-letter:uppercase">
                            {{ secondLink.title }}
                        </span>
                    </NuxtLink>
                </div>
            </li>

            <li v-if="thirdLink" class="list-none">
                <div class="flex items-center ">
                    <Icon name="ic:baseline-arrow-forward-ios" class="w-4 h-4 text-muted-light dark:text-muted-dark " />

                    <NuxtLink :to="thirdLink.path" class="ml-1 text-sm font-medium text-basic-light dark:text-basic-dark  hover:text-blue-600 md:ml-2 dark:hover:text-white">
                        <Icon :name="thirdLink.icon" class="text-2xl mr-2" />

                        <span class="first-letter:uppercase">
                            {{ thirdLink.title }}
                        </span>
                    </NuxtLink>
                </div>
            </li>
            
            <li v-if="lastLink" class="list-none" aria-current="page">
                <div class="flex items-center">
                    <Icon v-if="firstLink" name="ic:baseline-arrow-forward-ios" class="w-4 h-4 text-muted-light dark:text-muted-dark" />

                    
                    <span class="ml-1 text-sm font-medium  md:ml-2  text-muted-light dark:text-muted-dark first-letter:uppercase">
                        <Icon v-if="lastLink.icon" :name="lastLink.icon" class="text-2xl text-muted-light dark:text-muted-dark mr-2" />
                        
                        <span class="first-letter:uppercase text-sm font-medium ">
                            {{ lastLink.title }}
                        </span>
                    </span>
                </div>
            </li>
        </ol>
    </nav>
</template>