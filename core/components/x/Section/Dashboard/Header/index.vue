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

    if(splitLink.length == 4) {
        firstNamePath.value = splitLink[0] 
        secondNamePath.value = splitLink[0] + '.' + splitLink[1]
        thirdNamePath.value = splitLink[0] + '.' + splitLink[1] + '.' + splitLink[2]
        lastNamePath.value = splitLink[0] + '.' + splitLink[1] + '.' + splitLink[2]+ '.' + splitLink[3]

        x4(firstNamePath.value, secondNamePath.value, thirdNamePath.value, lastNamePath.value)
    }  else if (splitLink.length == 3 ) {
        firstNamePath.value = splitLink[0] 
        secondNamePath.value = splitLink[0] + '.' + splitLink[1]
        lastNamePath.value = splitLink[0] + '.' + splitLink[1] + '.' + splitLink[2]

        x3(firstNamePath.value, secondNamePath.value, lastNamePath.value)
    }   else if (splitLink.length == 2 ) {
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
    <header class="hidden z-20 w-full md:flex justify-between items-center px-6 box-border rounded-xl transition ease-in duration-300" :class="$navbar.isScroll ? 'absolute left-0 top-30' : 'relative'">
        <div class="h-full  -translate-x-2 translate-y-3">
            <x-breadcrumb :first-link="firstLink[0]" :second-link="secondLink[0]" :third-link="thirdLink[0]" :last-link="currentLink[0]" />
            <slot name="header"></slot>
        </div>

        <div class="h-full flex justify-center items-center px-3 py-2 rounded-lg  space-x-3" :class="$navbar.isScroll ? 'bg-second-light dark:bg-second-dark -translate-x-6' : ''">

            <slot name="panel"/>
        </div>
    </header>
</template>