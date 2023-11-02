<script setup>
    const { $auth,  $navbar } = useNuxtApp()
    const setColorTheme = (newTheme) => {
        useColorMode().preference = newTheme
    }
    
    onMounted(() => {
        $navbar.scrollNavbar()
    }) 

    function activateDropdown(active) {
        if(active) {

            $navbar.activate()
        } else {
            $navbar.close()
        }
    }
</script>

<template>
    <x-layout >
        <template #header>
            <div class="relative w-full ">
                <Navbar container>
                    <template #logo>
                        <div class="flex justify-center items-center transition-all duration-500 linear" :class="[ $navbar.isScroll ? 'lg:w-20 lg:h-20' : 'lg:w-30 lg:h-30']">
                            <div class=" w-full h-full transition-all duration-500 linear" :class="[$navbar.isScroll ? 'relative scale-30 lg:scale-60' : 'relative scale-30 lg:scale-100 lg:pl-6 ']">
                                <NuxtLink href="https://movementarena.pl/suwalki/" stress  class="w-full h-full flex items-center transition-all duration-500 linear lg:cursor-pointer" >
                                    <logo  />
                                </NuxtLink>
                            </div>
                        </div>
                    </template>

                    <template  #content>
                        <ul class="flex  flex-col lg:flex-row justify-start lg:justify-center items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-5 ">
                            <!--
                            -->
                            <li class="list-none ">
                                <x-link @click="$navbar.closeMenuSm" href="https://movementarena.pl/suwalki/" stress  @mousemove="activateDropdown(true)">Movement</x-link>
                            </li>

                            <li v-if="$about.activeAbout.length != 0" class="list-none ">
                                <x-link-hash @click="$navbar.closeMenuSm"  :to="{path: '/', hash: '#about'}"  text="Informacja"  stress hash="#about" @mousemove="activateDropdown(null)"></x-link-hash>
                            </li>

                            <li  class="list-none ">
                                <x-link-hash @click="$navbar.closeMenuSm"  :to="{path: '/', hash: '#features'}"  text="Zajęcia"  stress hash="#features" @mousemove="activateDropdown(null)"></x-link-hash>
                            </li>

                            
                            <li  class="list-none">
                                <x-link-hash @click="$navbar.closeMenuSm"  :to="{path: '/', hash: '#team'}"  text="Trenerzy"  stress hash="#team" @mousemove="activateDropdown(null)"></x-link-hash>
                            </li> 

                            
                            <li  class="list-none">
                                <x-link-hash @click="$navbar.closeMenuSm"  :to="{path: '/', hash: '#price-list'}"  text="Cennik"  stress hash="#price-list" @mousemove="activateDropdown(null)"></x-link-hash>
                            </li> 
                            <!--
                                <li  class="list-none ">
                                    <x-link-hash @click="$navbar.closeMenuSm"  :to="{path: '/', hash: '#movie'}"  text="Filmy"  stress hash="#movie" @mousemove="activateDropdown(null)"></x-link-hash>
                                </li> 

                                <li  class="list-none">
                                    <x-link-hash @click="$navbar.closeMenuSm"  :to="{path: '/', hash: '#contact'}"  text="Kontakt"  stress hash="#contact" @mousemove="activateDropdown(null)"></x-link-hash>
                                </li> 
                            -->
                            <li class="list-none ">
                                <x-link @click="$navbar.closeMenuSm" to="/kontakt" text="Kontakt" stress @mousemove="activateDropdown(null)"></x-link>
                            </li>
                        </ul>
                    </template>

                    <template #action>
                        <div class="flex ">
                            <x-btn @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')" color="secondary" :tooltip="{text: `Zmień motyw na ${$colorMode.value == 'dark' ? 'jasny' : 'ciemny'}`}" ring strip icon class="mr-3">
                                <template #icon>
                                    <div>
                                        <Icon v-if="$colorMode.value == 'dark'" class="text-lg" name="line-md:moon-filled-loop" />
                                        <Icon v-else class="text-lg" name="line-md:moon-filled-to-sunny-filled-loop-transition" />
                                    </div>
                                </template>
                            </x-btn>
    
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
                        </div>
                    </template>

                    <template #dropdown-field>
                       <navbar-dropdown >
                            <div class="w-auto py-4 flex justify-between items-start space-x-15">
                                <div class="flex flex-col items-between space-y-2">
                                    <x-link @click="$navbar.closeMenuSm" href="https://movementarena.pl/suwalki/strefa-skokow/" uppercase stress>Strefa skoków</x-link>
                                    <x-link @click="$navbar.closeMenuSm" href="https://movementarena.pl/suwalki/strefa-dziecka/" uppercase stress>Strefa dziecka</x-link>
                                    <x-link @click="$navbar.closeMenuSm" href="https://movementarena.pl/suwalki/squash-3/" uppercase stress>Squash</x-link>
                                    <x-link @click="$navbar.closeMenuSm" href="https://movementarena.pl/suwalki/cennik-wejscia/" uppercase stress>Cennik</x-link>
                                    <x-link @click="$navbar.closeMenuSm" :to="{path: '/'}" uppercase stress>Strefa siły</x-link>
                                </div>

                                <div class="flex flex-col items-between space-y-2">
                                    <x-link @click="$navbar.closeMenuSm" href="https://movementarena.pl/suwalki/urodziny-dla-dziecka-suwalki/" uppercase stress>Urodziny</x-link>
                                    <x-link @click="$navbar.closeMenuSm" href="https://movementarena.pl/suwalki/wycieczki/" uppercase stress>Wycieczki grupy</x-link>
                                    <x-link @click="$navbar.closeMenuSm" href="https://movementarena.pl/suwalki/oferta/imprezy-integracyjne/" uppercase stress>Imprezy integracyjne</x-link>
                                    <x-link @click="$navbar.closeMenuSm" href="https://movementarena.pl/suwalki/karta-podarunkowa-suwalki/" uppercase stress>Karta podarunkowa</x-link>
                                </div>

                                <div class="flex flex-col items-between space-y-2">
                                    <x-link @click="$navbar.closeMenuSm" uppercase href="https://movementarena.pl/suwalki/zajecia-zorganizowane-pozalekcyjne/" stress>Zajęcia</x-link>
                                    <x-link @click="$navbar.closeMenuSm" uppercase href="https://movementarena.pl/suwalki/info/pierwszawizyta/" stress>Pierwsza wizyta</x-link>
                                    <x-link @click="$navbar.closeMenuSm" href="https://movementarena.pl/suwalki/movement-arena-suwalki-jusu-veiklos-ir-pramogu-centras/" uppercase stress>LIETUVIŲ 🇱🇹</x-link>
                                </div>

                                <div class="f-full flex flex-col  items-between space-y-4">
                                    <x-btn to="https://movementarenasuwalki.gymmanager.com.pl/ZoneReservation/Date" link color="secondary-outline" target="_blank" rounded>Kup bilet</x-btn>
                                    <x-btn to="https://movementarenasuwalki.gymmanager.com.pl/user/login?returnUrl=/Dashboard/Index" target="_blank" link color="secondary-outline" rounded>Zaloguj się</x-btn>
                                </div>
                            </div>

                       </navbar-dropdown>
                    </template>
                </Navbar>
            </div>
        </template>

        <template #main>
            <div class="fixed bottom-5 right-10 z-50 flex justify-center items-center space-x-5">
                <x-btn to="https://movementarenasuwalki.gymmanager.com.pl/Buypass/Passes" link color="secondary" target="_blank" rounded>Kup bilet online</x-btn>

                <x-btn-scroll-page />
            </div>
            <slot  />
        </template>

        <template #footer>
            <Footer />
        </template>

        <template #addons>
            <div>
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
            </div>
        </template>
    </x-layout>
</template>