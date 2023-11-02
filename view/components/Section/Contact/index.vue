<script setup>
    const {$contact } =  useNuxtApp()
    
    onMounted(async () => {
        await $contact.get()
    })
</script>

<template>
   <section id="contact" class="snap-start scroll-mt-0 relative w-screen h-full  lg:min-h-screen mb-10 lg:mb-20 flex justify-center items-center  box-border">
      <div class="container mx-auto w-full h-full relative">
         <div class="relative text-center w-full my-3 z-10">
                <h2 class="font-extrabold tracking-tight text-3xl xl:text-5xl lg:text-4xl">Kontakt</h2>
         </div>

         <div  class="w-full h-full flex  space-y-20 lg:justify-between items-center p-8 rounded-lg bg-gradient-to-r from-second-light/30 to-prime-light/40 dark:from-second-dark/30 dark:to-prime-dark/40 backdrop-blur shadow-lg shadow-black box-border">
            <div v-if="$contact.data.name" class="w-full lg:w-1/2 xl:w-6/12 flex flex-col justify-center px-4 box-border">
                <div data-aos-delay="400"  data-aos="fade-left" data-aos-duration="1000" class="relative max-w-[570px] mb-12 lg:mb-0 box-border">
                    <logo class="w-full lg:w-90" />
               
                    <div v-if="$contact.data.description" class="w-full flex flex-col space-y-3 mb-10 p-8 box-border">
                        <div class="w-full flex items-center justify-start space-x-6 mb-5 box-border">

                            <p class="w-full h-full text-base  mb-7">
                                {{ $contact.data.description }}
                            </p>
                        </div>

                        <div v-if="$contact.data.address" class="w-full flex items-start justify-start text-sm font-medium box-border">
                            <span class="w-full flex items-start justify-start space-x-2">
                                <span class="w-1/3 flex items-start justify-start space-x-2">
                                    <Icon name="entypo:address" class="text-xl" /> 
                                    <strong>Adres: </strong>
                                </span>

                                <span class="flex flex-col items-start justify-start" v-html="$contact.data.address"></span>
                            </span>
                        </div>

                        <div v-if="$contact.data.openingHours" class="w-full flex items-start justify-start text-sm font-medium box-border">

                            <span class="w-full flex items-start justify-start space-x-2">
                                <span class="w-1/3 flex items-start justify-start space-x-2">
                                    <Icon name="eos-icons:hourglass" class="text-xl" /> 
                                    <strong>Godziny otwarcia: </strong>
                                </span>

                                <span class="flex flex-col items-start justify-start" v-html="$contact.data.openingHours"></span>
                            </span>
                        </div>

                        <div v-if="$contact.data.phone" class="w-full flex items-start justify-start text-sm font-medium box-border">
                            <span class="w-full flex items-start justify-start space-x-2">
                            <span class=" w-1/3 flex items-start justify-start space-x-2">
                                <Icon name="bytesize:telephone" class="text-xl " /> 
                                <strong>Telefon: </strong>
                            </span>

                            <span v-html="$contact.data.phone"></span>
                            </span>
                        </div>

                        <div v-if="$social.data?.length !== 0">
                           <h4 class="w-full text-lg font-semibold mb-4">Śledź nas na:</h4>
         
                           <div class="w-full flex items-center">
                                <template v-for="(item, index) in $social.data" :key="index">
                                    <x-link
                                        v-if="item.isActive"
                                        :to="item.path"
                                        class="w-8 h-8 flex items-center justify-center rounded-full text-basic-light dark:text-basic-dark mr-3 sm:mr-4 lg:mr-3 xl:mr-4"
                                        target="_blank"
                                    >
                                        <Icon :name="item.icon" class="text-2xl" />
                                    </x-link>
                                </template>
                           </div>
                        </div>
                    </div>
               </div>

               <div v-if="$contact.data.map" class="w-full h-100" >
                  <div class="relative w-full h-full" v-html="$contact.data.map"></div>
               </div>
            </div>

            <div data-aos-delay="400"  data-aos="fade-down-right" data-aos-duration="1000" class="hidden lg:block w-full lg:w-1/2 xl:w-5/12 px-4">
               <div class="relative rounded-lg  shadow-lg">
                  <!--
                     <form-contact />
                  -->
                  <img src="/images/MG_0530-1024x683.webp" alt="movement" class="h-full w-full object-cover rounded-lg">
               </div>
            </div>
         </div>

      </div>
      
      <div class="overlay-6 -z-1  hidden md:block overflow-hidden h-screen w-screen absolute left-0 top-0 bg-gradient-to-tl from-blue/20 via-blue bg-dark" ></div>
      <div class="overlay-7 -z-1 hidden md:block overflow-hidden h-screen w-screen absolute bottom-0 right-0 bg-gradient-to-tl from-blue via-blue bg-dark"></div>
   </section>
<!-- ====== Contact Section End -->
</template>

<style lang="scss" scoped>
.overlay-6 {
    clip-path: circle(50% at 103% 0);
}

.overlay-7 {
    clip-path: circle(30% at 3% 55%);
}
</style>