<script setup>

</script>

<template>
   <section id="contact" class=" relative z-10 ">
      <div class="container mx-auto h-full relative ">
         <div  class="h-full flex flex-wrap  space-y-20 text-black dark:text-white lg:justify-between items-center p-8 rounded-lg bg-gradient-to-r from-second-light/30 to-prime-light/40 dark:from-second-dark/30 dark:to-prime-dark/40 backdrop-blur-sm">
            <div v-if="$contact.data.name" class="w-full lg:w-1/2 xl:w-6/12 h-full flex flex-col justify-center px-4">
               <div data-aos-delay="400"  data-aos="fade-left" data-aos-duration="1000" class="relative max-w-[570px] mb-12 lg:mb-0">

                  <h1 v-if="$contact.data.name" class="text-4xl lg:text-5xl  uppercase font-bold  mt-8 mb-8 lg:mb-2 p-3 dark:text-white ">
                     {{ $contact.data.name }}
                  </h1>
               
                  <div v-if="$contact.data.description" class="w-full flex flex-col space-y-3 mb-10 p-8">
                     <div class="flex items-center justify-start space-x-6 mb-5">

                           <p class="w-full h-full text-base  mb-7">
                              {{ $contact.data.description }}
                           </p>
                     </div>

                     <div v-if="$contact.data.address" class="w-full flex items-start justify-start text-sm font-medium">

                           <span class="w-full flex items-start justify-start space-x-2">
                              <span class="w-1/3 flex items-start justify-start space-x-2">
                                 <Icon name="entypo:address" class="text-xl" /> 
                                 <strong>Adres: </strong>
                              </span>

                              <span class="flex flex-col items-start justify-start" v-html="$contact.data.address"></span>
                           </span>
                     </div>

                     <div v-if="$contact.data.openingHours" class="w-full flex items-start justify-start text-sm font-medium">

                           <span class="w-full flex items-start justify-start space-x-2">
                              <span class="w-1/3 flex items-start justify-start space-x-2">
                                 <Icon name="eos-icons:hourglass" class="text-xl" /> 
                                 <strong>Godziny otwarcia: </strong>
                              </span>

                              <span class="flex flex-col items-start justify-start" v-html="$contact.data.openingHours"></span>
                           </span>
                     </div>

                  <div v-if="$contact.data.phone" class="w-full flex items-start justify-start text-sm font-medium">
                     <span class="w-full flex items-start justify-start space-x-2">
                              <span class=" w-1/3 flex items-start justify-start space-x-2">
                                 <Icon name="bytesize:telephone" class="text-xl " /> 
                                 <strong>Telefon: </strong>
                              </span>

                              <span v-html="$contact.data.phone"></span>
                           </span>

                     </div>

                     <div v-if="$social.data?.length !== 0">
                           <h4 class="text-lg font-semibold mb-4">Śledź nas na:</h4>
         
                           <div class="flex items-center">
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

            <div data-aos-delay="400"  data-aos="fade-down-right" data-aos-duration="1000" class="w-full lg:w-1/2 xl:w-5/12 px-4">
               <div class="bg-white relative rounded-lg p-8 sm:p-12 shadow-lg">
                  <form-contact />

                  <div>
                     <span class="absolute top-0 right-0 ">
                       
                     </span>

                     <span class="absolute -right-10 top-[90px] z-[-1]">

                     </span>
                     
                     <span class="absolute -left-7 -bottom-7 z-[-1]">

                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </section>
<!-- ====== Contact Section End -->
</template>