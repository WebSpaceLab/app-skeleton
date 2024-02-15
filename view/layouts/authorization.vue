<script setup >
const setColorTheme = (newTheme) => {
    useColorMode().preference = newTheme
}
</script>

<template>
    <x-layout >
        <template #header>
            <div class="w-screen flex justify-end">
                <NavbarDashboard >
                    <template  #bar>
                        <div
                            class="flex justify-start px-4 "
                            :class="[$dashboard.sidebar.isRail ? '' : 'w-64']"
                        >
                            <x-btn @click="$dashboard.sidebar.isShow = !$dashboard.sidebar.isShow" class=" bg-slate-400/80 hover:bg-slate-600/80" color="secondary-outline" rounded icon>
                                <Icon v-if="$dashboard.sidebar.isShow" class="text-2xl" name="mdi:close" />
                                <Icon v-else class="text-2xl" name="material-symbols:menu-rounded" />
                            </x-btn>
    
                            <x-btn v-if="$dashboard.sidebar.isShow" @click="$dashboard.sidebar.isRail = !$dashboard.sidebar.isRail" color="secondary-outline" class="ml-3 bg-slate-400/80 hover:bg-slate-600/80" rounded icon>
                                <Icon class="text-2xl transition-all duration-300 ease-in" name="material-symbols:swap-horizontal-circle-rounded" :class="{'rotate-180' : $dashboard.sidebar.isRail}"/>
                            </x-btn>

                            <x-btn v-if="$dashboard.sidebar.isShow" @click="$dashboard.sidebar.isRightSide = !$dashboard.sidebar.isRightSide" color="secondary-outline" class="ml-3 bg-slate-400/80 hover:bg-slate-600/80" rounded icon>
                                <Icon v-if="$dashboard.sidebar.isRightSide" class="text-2xl transition-all duration-300 ease-in" name="streamline:interface-layout-5-column-header-layout-layouts-masthead-sidebar" />
                                <Icon v-else class="text-2xl transition-all duration-300 ease-in" name="streamline:interface-layout-4-column-header-layout-layouts-masthead-sidebar"/>
                            </x-btn>

                            <x-btn @click="$dashboard.sidebar.isShowHelperBar = !$dashboard.sidebar.isShowHelperBar" class="ml-3 bg-slate-400/80 hover:bg-slate-600/80" color="secondary-outline" rounded icon>
                                <Icon class="text-2xl" name="octicon:sidebar-expand-16" :class="$dashboard.sidebar.isShowHelperBar ? 'rotate-90' : 'rotate-270'" />
             
                            </x-btn>
                        </div>
                    </template>
    
                    <template  #content>
                        <ul class="flex flex-col lg:flex-row justify-start lg:justify-center items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-5 ">

                        </ul>
                    </template>
    
                    <template #action>
<!--
                        <div v-if="$auth.accessGranted('ROLE_USER')" class="w-20 h-full flex justify-center items-center p-2 space-x-3 mr-8">
                            <template v-for="(role, index) in $account.roles" :key="index">
                                <div>{{ role }}</div>
                            </template>
                        </div>
-->

                        <x-btn @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')" color="secondary" :tooltip="{text: `Zmień motyw na ${$colorMode.value == 'dark' ? 'jasny' : 'ciemny'}`}" ring strip icon class="mr-3">
                            <template #icon>
                                <Icon v-if="$colorMode.value == 'dark'" class="text-lg" name="line-md:moon-filled-loop" />
                                <Icon v-else class="text-lg" name="line-md:moon-filled-to-sunny-filled-loop-transition" />
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
    
                        <div class="h-full flex items-center justify-center" v-if="$auth.isLoggedIn" >
                            <x-dropdown-manage-account :user="$auth.user" >
                                <template #links>
                                    <x-dropdown-link to="/dashboard" class="text-muted-light dark:text-muted-dark mb-2">
                                        Panel główny
                                    </x-dropdown-link>
                    
                                    <x-dropdown-link to="/dashboard/profile" class="text-muted-light dark:text-muted-dark mb-2"  >
                                        Profil
                                    </x-dropdown-link>
    
                                    <!-- Authentication -->
                                    <x-dropdown-link @click="$auth.logout()" class="mt-2 bg-danger-600 rounded">
                                        <span class="text-red-200 uppercase font-bold">Logout</span>
                                    </x-dropdown-link>
                                </template>
                            </x-dropdown-manage-account>
                        </div>
                    </template>
                </NavbarDashboard>
            </div>
        </template>
        
        <template #main>
            <x-sidebar />
            

            <x-container >
                <slot/>
            </x-container>
        </template>

        <template #footer>
        </template>
    </x-layout>
</template>