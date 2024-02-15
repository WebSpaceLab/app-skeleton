<script setup>
const { $dashboard, $auth} = useNuxtApp()

function typeLinks(type) {
    const links = [];

    $dashboard.sidebar.links.forEach(link => {
        if(link.type === type) {
            $auth.roles.forEach(role => {
            if(link.access === role) {
                links.push(link)
            }
        })
        }
    });

    return links;
}
</script>

<template>
    <transition
        enter-active-class="transition ease-out duration-500"
        :enter-from-class="`transform ${ $dashboard.sidebar.isRightSide ? 'translate-x-64' : '-translate-x-64'}`"
        enter-to-class="transform  translate-x-0"
        leave-active-class="transition ease-in duration-500"
        leave-from-class="transform translate-x-0"
        :leave-to-class="`transform  ${ $dashboard.sidebar.isRightSide ? 'translate-x-64' : '-translate-x-64'}`"
    >
        <div
            v-show="$dashboard.sidebar.isShow"
            class="fixed w-full z-30 h-screen top-0 transition-all duration-500"
            :class="[
                $dashboard.sidebar.isRightSide ? 'right-0' : 'left-0',
                $dashboard.sidebar.isRail ? 'w-24' : ' w-64'
            ]"
        >
        
            <nav
                :class="[
                    $dashboard.sidebar.isRail ? 'w-24' : 'w-64',
                ]"
                class="w-full h-screen transition-all duration-500 top-0 box-border flex justify-center shadow-black shadow-lg rounded-xl p-4 bg-background-light dark:bg-background-dark"
            >

                <div 
                    class="h-full pt-20 flex flex-col justify-between transition-all duration-500  box-border"
                    :class="[
                        $dashboard.sidebar.isRail ? 'w-14' : 'w-60',
                    ]"
                > 

                    <div class="w-full h-full flex flex-col justify-between  overscroll-contain overflow-y-hidden hover:overflow-y-auto overflow-x-hidden scrollbar scrollbar-left scrollbar-blue-600 scrollbar-rounded scrollbar-w-2px scrollbar-radius-2 scrollbar-track-radius-2 scrollbar-thumb-radius-2">
                        <div class="w-full flex flex-col">
                            <div class="w-full">
                                <div class="w-full  ">
                                    <logo />
                                </div>
                            </div>
        
                            <div class="w-full">
                                <div class="w-full  shadow-lg shadow-black bg-gradient-to-r from-second-light/80 to-prime-light/80 dark:from-second-dark/80 dark:to-prime-dark/80 backdrop-blur rounded-lg">
                                    <ul class="list-none overflow-y-auto flex flex-col justify-center items-start p-0 px-4 box-border" :class="[$dashboard.sidebar.isRail ? 'w-10' : 'w-full']">
                                        <template v-for="(link, index) in typeLinks('basic')" :key="index">
                                            <x-sidebar-item :link="link" />
                                        </template>
                                    </ul>
                                </div>
                            </div>
                        </div>
    
                        <div class="w-full relative">
                            <div class="shadow-lg shadow-black bg-gradient-to-r from-second-light/80 to-prime-light/80 dark:from-second-dark/80 dark:to-prime-dark/80 backdrop-blur rounded-lg">
                                <ul class="list-none overflow-y-auto flex flex-col justify-center items-start p-0 px-4 box-border" :class="[$dashboard.sidebar.isRail ? 'w-10' : 'w-full']">
                                    <template v-for="(link, index) in typeLinks('settings')" :key="index">
                                        <x-sidebar-item :link="link" />
                                    </template>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

            </nav>
        </div>
    </transition>
</template>