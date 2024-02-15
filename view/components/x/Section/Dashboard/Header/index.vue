<script setup>
const { $dashboard } = useNuxtApp()
const route = useRoute()

const splitLink = route.name.split('-')

const firstNamePath = ref('')
const secondNamePath = ref('')
const thirdNamePath = ref('')
const lastNamePath = ref('')

const firstLink = ref({})
const secondLink = ref({})
const thirdLink = ref('')
const currentLink = ref({})

function x4(first, second, third, last) {
    firstLink.value = $dashboard.sidebar.links.filter((link) => link.name == first)
    const x = $dashboard.sidebar.links.filter((link) => link.name == second)
    secondLink.value = x
    const y = x[0].children.filter((link) => link.name == third)
    thirdLink.value = y
    currentLink.value = y[0].children.filter((link) => link.name == last)
} 

function x3(first, second, last) {
    firstLink.value = $dashboard.sidebar.links.filter((link) => link.name == first)
    const x = $dashboard.sidebar.links.filter((link) => link.name == second)
    secondLink.value = x
    currentLink.value = x[0].children.filter((link) => link.name == last)
}   


function x2(first,  last) {
    firstLink.value = $dashboard.sidebar.links.filter((link) => link.name == first)

    currentLink.value = $dashboard.sidebar.links.filter((link) => link.name == last)
}  


function x1(current) {
    currentLink.value =  $dashboard.sidebar.links.filter((link) => link.name == current)
}   

function creatingNameLinks() {

    if(splitLink?.length == 4) {
        firstNamePath.value = splitLink[0] 
        secondNamePath.value = splitLink[0] + '.' + splitLink[1]
        thirdNamePath.value = splitLink[0] + '.' + splitLink[1] + '.' + splitLink[2]
        lastNamePath.value = splitLink[0] + '.' + splitLink[1] + '.' + splitLink[2]+ '.' + splitLink[3]

        x4(firstNamePath.value, secondNamePath.value, thirdNamePath.value, lastNamePath.value)
    }  else if (splitLink?.length == 3 ) {
        firstNamePath.value = splitLink[0] 
        secondNamePath.value = splitLink[0] + '.' + splitLink[1]
        lastNamePath.value = splitLink[0] + '.' + splitLink[1] + '.' + splitLink[2]

        x3(firstNamePath.value, secondNamePath.value, lastNamePath.value)
    }   else if (splitLink?.length == 2 ) {
        firstNamePath.value = splitLink[0] 
        lastNamePath.value = splitLink[0] + '.' + splitLink[1]

        x2(firstNamePath.value, lastNamePath.value)
    } else {
        x1(route.name)
    }

    firstNamePath.value = '' 
    secondNamePath.value = ''
    lastNamePath.value = ''
}

onMounted(() => {
    creatingNameLinks()
}) 
</script>

<template>
    <transition
        enter-active-class="transition ease-out duration-500"
        enter-from-class="transform -translate-y-12"
        enter-to-class="transform  translate-y-0"
        leave-active-class="transition ease-in duration-500"
        leave-from-class="transform translate-y-0"
        leave-to-class="transform -translate-y-12"
    >
        <header
            v-if="$dashboard.sidebar.isShowHelperBar"
            :class="[
                // $navbar.isScroll ? 'fixed top-20' : 'relative w-full',
                $dashboard.sidebar.isShow ?
                    $dashboard.sidebar.isRail ? 
                        'md:w-[calc(100%-110px)] fixed top-20' : 'md:w-[calc(100%-280px)] fixed top-20' 
                        : '',
                $dashboard.sidebar.isRightSide ? 'left-0' : 'right-0',
            ]"
            class="z-20 fixed top-20 w-full flex flex-col md:flex-row pl-4 pr-6 space-y-2 justify-between items-end box-border rounded-xl transition-all duration-500"
        >
            <div class="h-full hidden md:block  -translate-x-2 translate-y-3">
                <x-breadcrumb :first-link="firstLink[0]" :second-link="secondLink[0]" :third-link="thirdLink[0]" :last-link="currentLink[0]" />
                <slot name="header"></slot>
            </div>

            <div class="h-full flex justify-center items-center p-2 transition-all duration-500 rounded-lg  space-x-3 box-border" :class="$navbar.isScroll ? 'bg-second-light/70 dark:bg-second-dark/90' : ''">
                <slot name="panel"/>
            </div>
        </header>
    </transition>
</template>