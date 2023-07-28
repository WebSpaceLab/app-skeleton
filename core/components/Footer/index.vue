<script setup> 
  const { $contact, $social } = useNuxtApp()
</script>

<template>
    <!-- ====== Footer Section Start -->
    <div class="w-full box-border flex justify-center items-center py-10 px-6 lg:pt-20  lg:pb-20 relative z-10 text-black dark:text-white">
        <img src="/images/logo.jpg" alt="Kwiaty cięte" class="absolute top-0 left-0 w-full h-full object-cover -z-2">

        <div class="absolute top-0 left-0 w-full h-full -z-1 bg-gradient-to-r from-prime-light/60 to-second-light/100 dark:from-prime-dark/60 dark:to-second-dark/100"></div>
        
        <div class="container box-border bg-gradient-to-r from-second-light/30 to-prime-light/40 dark:from-second-dark/30 dark:to-prime-dark/40 backdrop-blur rounded-lg p-6">
            <div class="flex flex-wrap -mx-4">
                <div class="w-full sm:w-2/3 lg:w-4/12 px-4">
                    <div class="w-full flex flex-col  space-y-3 mb-10">
                        <div class="flex items-center justify-start space-x-6 mb-5">
                            <span class="relative w-30 h-30">
                                <NuxtLink to="/" >
                                    <logo/>
                                </NuxtLink>
                            </span>

                            <p v-if="$contact?.description" class="w-full h-full text-base  mb-7">
                                {{ $contact.description }}
                            </p>
                        </div>

                        <div v-if="$contact?.address" class="w-full flex items-start justify-start text-sm font-medium">

                            <span class="w-full flex items-start justify-start space-x-2">
                                <span class="w-1/3 flex items-start justify-start space-x-2">
                                    <Icon name="entypo:address" class="text-xl" /> 
                                    <strong>Adres: </strong>
                                </span>

                                <span class="flex flex-col items-start justify-start" v-html="$contact?.address"></span>
                            </span>
                        </div>

                        <div v-if="$contact?.openingHours" class="w-full flex items-start justify-start text-sm font-medium">

                            <span class="w-full flex items-start justify-start space-x-2">
                                <span class="w-1/3 flex items-start justify-start space-x-2">
                                    <Icon name="eos-icons:hourglass" class="text-xl" /> 
                                    <strong>Godziny otwarcia: </strong>
                                </span>

                                <span class="flex flex-col items-start justify-start" v-html="$contact?.openingHours"></span>
                            </span>
                        </div>

                    <div v-if="$contact?.phone" class="w-full flex items-start justify-start text-sm font-medium">
                        <span class="w-full flex items-start justify-start space-x-2">
                                <span class=" w-1/3 flex items-start justify-start space-x-2">
                                    <Icon name="bytesize:telephone" class="text-xl " /> 
                                    <strong>Telefon: </strong>
                                </span>

                                <span v-html="$contact?.phone"></span>
                            </span>

                        </div>

                    </div>
                </div>

                <div class="w-full lg:w-4/12 flex flex-col md:flex-row justify-center md:justify-start px-4">
                    <div class="w-full flex flex-col justify-center md:justify-start items-center mb-10">
                        <div>
                            <h4 class="text-lg font-semibold px-4 mb-3">Przydatne linki:</h4>
            
                            <ul class="w-full flex flex-col justify-center items-start space-y-4">
                                <li class="list-none ">
                                    <x-link-hash :to="{path: '/', hash: '#offer'}"  text="Oferta"  stress hash="#offer"></x-link-hash>
                                </li>
            
                                <li v-if="$about?.activeAbout?.length != 0" class="list-none ">
                                    <x-link-hash :to="{path: '/', hash: '#o-nas'}"  text="O nas"  stress hash="#o-nas"></x-link-hash>
                                </li>
            
                                <li class="list-none ">
                                    <x-link to="/kontakt" text="Kontakt" stress></x-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="w-full lg:w-2/12 px-4">
                    <!--
                        <div v-if="$social?.length != 0" class="w-full flex flex-col justify-center items-center">
                            <div>
                                <h4 class="text-lg font-semibold mb-4">Śledź nas na:</h4>
                
                                <div class="flex items-center mb-6">
                                    <template v-for="(item, index) in $social" :key="index">
                                        <x-link
                                            :to="item.to"
                                            class="w-8 h-8 flex items-center justify-center rounded-full text-basic-light dark:text-basic-dark mr-3 sm:mr-4 lg:mr-3 xl:mr-4"
                                            target="_blank"
                                        >
                                            <Icon :name="item.icon" class="text-2xl" />
                                        </x-link>
                                    </template>
                                </div>
                            </div>
                        </div>
                    -->

                    <div v-if="$contact?.map" class="relative " v-html="$contact?.map"></div>
                </div>
            </div>
        </div>
    </div>
    <!-- ====== Footer Section End -->

</template>