<script setup>
    const isShowContactCreate = ref(false)
    const isShowContactUpdate = ref(false)
    const isShowFooter = ref(true)
</script>

<template>
    <section class="p-6">
        <div class="p-4 bg-prime-light dark:bg-prime-dark rounded-b-xl hover:shadow-xl hover:shadow-black">
            <header class="flex flex-col mb-6 z-20">
                <h3 class="m-0 flex items-end space-x-4">
                    <span> 
                        <span v-if="isShowFooter">
                            Footer
                        </span>
                        
                        <span v-else>
                            Contact
                        </span>
                        
                        information
                    </span>
                </h3>
                
                <x-border color="gray" yt="0" yb="2" class="w-full" />
                
                <div class="w-full h-10 flex justify-end items-center px-1 box-border space-x-3">
                    <x-btn
                        :tooltip="{text: isShowFooter ? 'change the view to footer information' : 'change the view to contact information'}"
                        @click="isShowFooter = !isShowFooter"
                        class="z-30"
                        color="primary-outline"
                        icon
                        rounded
                        shadow
                    >
                        <Icon name="material-symbols:cameraswitch-outline-sharp" class="text-xl" />
                    </x-btn>
                    
                    <x-btn
                        v-if="!$contact.data.name && !$contact.data.description && !$contact.data.address && !$contact.data.openingHours && !$contact.data.phone && !$contact.data.map"
                        :tooltip="{text: 'create'}"
                        @click="isShowContactCreate = !isShowContactCreate"
                        color="primary-outline"
                        icon
                        rounded
                    >
                        <Icon name="material-symbols:add-circle" class="text-xl" />
                    </x-btn>

                    <x-btn
                        v-else
                        :tooltip="{text: 'update'}"
                        @click="isShowContactUpdate = true"
                        color="primary-outline"
                        icon
                        rounded
                    >
                        <Icon name="material-symbols:sync-rounded" class="text-xl" />
                    </x-btn>
                </div>
            </header>
                
            <div> 
                <div v-if="!$contact.data.name" class="w-full flex justify-center items-center">
                    <p class="text-xl text-muted-light dark:text-muted-dark">
                        Complete the footer and contact details
                    </p>
                </div>

                <div class="p-10 box-border" v-else> 
                    <transition
                        enter-active-class="transition ease-in duration-500"
                        enter-from-class="transform opacity-0 scale-95"
                        enter-to-class="transform opacity-100 scale-100"
                    >
                        <Footer v-if="isShowFooter" />

                        <section-contact v-else />
                    </transition>
                </div>
            </div>
        </div>

        <x-modal-contact-information-create :show="isShowContactCreate" title="Footer and Contact information created"  @close="event => isShowContactCreate = event " />
        <x-modal-contact-information-update :show="isShowContactUpdate" title="Footer and Contact information updated"  @close="event => isShowContactUpdate = event " />
    </section>
</template>