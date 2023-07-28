<script setup>
    const { $auth, $social, $navbar } = useNuxtApp()
    const bufferOfferId = ref(null)
    const setColorTheme = (newTheme) => {
        useColorMode().preference = newTheme
    }
    
    onMounted(() => {
        $navbar.scrollNavbar()
    }) 

    function activateDropdown(offerId) {
        if(offerId !== null) {
            bufferOfferId.value = offerId
            $navbar.activate()
        } else {
            bufferOfferId.value = offerId
            $navbar.close()
        }
    }


</script>

<template>
    <x-layout >
        <template #header>
            <div class="relative w-full">
                <Navbar >
                    <template #logo>
                        <div class="flex justify-center items-center transition-all duration-500 linear" :class="[ $navbar.isScroll ? 'lg:w-20 lg:h-20' : 'lg:w-30 lg:h-30']">
                            <div class=" w-full h-full transition-all duration-500 linear" :class="[$navbar.isScroll ? 'relative scale-30 lg:scale-60' : 'relative scale-30 lg:scale-100 lg:pl-6 ']">
                                <div class="w-full h-full flex items-center transition-all duration-500 linear lg:cursor-pointer" >
                                    <logo  />
                                </div>
                            </div>
                        </div>
                    </template>

                    <template  #content>
                        <ul class="flex flex-col lg:flex-row justify-start lg:justify-center items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-5 ">
                            <li class="list-none ">
                                <x-link @click="$navbar.closeMenuSm" :to="{path: '/'}" stress  @mousemove="activateDropdown(null)">Strona główna</x-link>
                            </li>

                            <li v-if="$about.activeAbout.length != 0" class="list-none ">
                                <x-link-hash @click="$navbar.closeMenuSm"  :to="{path: '/', hash: '#o-nas'}"  text="O nas"  stress hash="#o-nas" @mousemove="activateDropdown(null)"></x-link-hash>
                            </li>
                            
                            <li class="list-none ">
                                <x-link @click="$navbar.closeMenuSm" to="/kontakt" text="Kontakt" stress @mousemove="activateDropdown(null)"></x-link>
                            </li>
                        </ul>
                    </template>

                    <template #action>
                        <x-btn @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')" color="secondary" :tooltip="{text: `Zmień motyw na ${$colorMode.value == 'dark' ? 'jasny' : 'ciemny'}`}" ring strip icon class="mr-3">
                            <template #icon>
                                <Icon v-if="$colorMode.value == 'dark'" class="text-lg" name="line-md:moon-filled-loop" />
                                <Icon v-else class="text-lg" name="line-md:moon-filled-to-sunny-filled-loop-transition" />
                            </template>
                        </x-btn>

                        <!--
                            <template v-for="(item, index) in $social?.social" :key="index">
                                <x-link
                                    v-if="item.is_active == true"
                                    :to="item.to"
                                    class="w-8 h-8 flex items-center justify-center rounded-full text-basic-light dark:text-basic-dark mr-3 sm:mr-4 lg:mr-3 xl:mr-4"
                                    target="_blank"
                                >
                                    <Icon :name="item.icon" class="text-2xl" />
                                </x-link>
                            </template>
                        -->


                        <div v-if="!$auth.isLoggedIn"  class="h-full flex items-center justify-center" >                  
                            <x-btn @click="$navbar.showLogin()"  color="secondary" :tooltip="{text: 'Logowanie'}" ring strip icon class="mr-3">
                                <template #icon>
                                    <Icon name="bi:person-fill" class="text-2xl"/>
                                </template>
                            </x-btn>

                            <x-btn @click="$navbar.showRegister()"  color="secondary" :tooltip="{text: 'Rejestracja'}" ring strip icon class="mr-3">
                                <template #icon>
                                    <Icon name="bi:person-fill-add" class="text-2xl"/>
                                </template>
                            </x-btn>
                        </div>

                        <div v-if="$auth.isLoggedIn"  class="h-full flex items-center justify-center" >
                            <x-dropdown-manage-account :user="$auth.user" >
                                <template #links>
                                    <x-dropdown-link to="/dashboard" class="text-muted-light dark:text-muted-dark mb-2">
                                        Dashboard
                                    </x-dropdown-link>
                    
                                    <x-dropdown-link to="/dashboard/profile" class="text-muted-light dark:text-muted-dark mb-2"  >
                                        Profile
                                    </x-dropdown-link>

                                    <!-- Authentication -->
                                    <x-dropdown-link @click="$auth.logout()" class="mt-2 bg-danger-600 rounded">
                                        <span class="text-red-200 uppercase font-bold">Logout</span>
                                    </x-dropdown-link>
                                </template>
                            </x-dropdown-manage-account>
                        </div>
                    </template>

                    <template #dropdown-field>

                    </template>
                </Navbar>
            </div>
        </template>

        <template #main>
            <slot  />
        </template>

        <template #footer>
            <Footer />
        </template>

        <template #addons>
            <x-modal-auth-login
                :show="$navbar.isShowLogin"
                :minimization="null"
                :closeable="true"
                @close="(event) => $navbar.switchLogin(event)"
            /> 
            
            <x-modal-auth-register
                :show="$navbar.isShowRegister"
                :minimization="null"
                :closeable="true"
                @close="(event) => $navbar.switchRegister(event)"
            /> 
            
            <x-modal-auth-forgot-password
                :show="$navbar.isShowForgotPassword"
                :minimization="null"
                max-width="max"
                :closeable="true"
                @close="(event) => $navbar.switchForgotPassword(event)"
            />
        </template>
    </x-layout>
</template>