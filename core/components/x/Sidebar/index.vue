<script setup>
const props = defineProps({
    isShow: {
        type: Boolean,
    },
    isRightSide: {
        type: Boolean,
    },
    isRailSidebar: {
        type: Boolean,
    },
    links: {
        type: Array
    },
});

let openSubitems = ref(false);
const search = ref('')

function typeLinks(type) {
    const links = [];

    props.links.forEach(element => {
        if(element.type === type) {
            links.push(element);
        }
    });

    return links;
}
</script>

<template>
    <transition
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 -translate-x-64"
        enter-to-class="transform opacity-100 translate-x-0"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="transform opacity-100 translate-x-0"
        leave-to-class="transform opacity-0 -translate-x-64"
    >
        <div
            v-show="isShow"
            class="z-20 duration-300 transition-all h-screen top-20 px-4"
            :class="[
                isRightSide ? 'right-0' : 'left-0',
                isRailSidebar ? 'w-14' : 'w-64',
            ]"
        >
        
            <nav
                :class="[
                    isRailSidebar ? 'w-14' : 'w-60',
                    $navbar.isScroll ? 'fixed  top-45' : 'relative top-10'
                ]"
                class="overscroll-contain box-border  flex flex-col"
            >

                <div class="w-full relative">
                    <div class="w-full  shadow-lg shadow-black bg-gradient-to-r from-second-light/80 to-prime-light/80 dark:from-second-dark/80 dark:to-prime-dark/80 backdrop-blur rounded-lg">
                        <ul class="list-none overflow-y-auto flex flex-col justify-center items-start p-0 px-4 box-border" :class="[isRailSidebar ? 'w-10' : 'w-full']">
                            <template v-for="(link, index) in typeLinks('basic')" :key="index">
                                <x-sidebar-item :link="link" :isRailSidebar="isRailSidebar" />
                            </template>
                        </ul>
                    </div>
                </div>

                <div class="w-full relative">
                    <div class="shadow-lg shadow-black bg-gradient-to-r from-second-light/80 to-prime-light/80 dark:from-second-dark/80 dark:to-prime-dark/80 backdrop-blur rounded-lg">
                        <ul class="list-none overflow-y-auto flex flex-col justify-center items-start p-0 px-4 box-border" :class="[isRailSidebar ? 'w-10' : 'w-full']">
                            <template v-for="(link, index) in typeLinks('settings')" :key="index">
                                <x-sidebar-item :link="link" :isRailSidebar="isRailSidebar" />
                            </template>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>

    </transition>
</template>