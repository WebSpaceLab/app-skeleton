<script setup>
const route = useRoute()

const props = defineProps({
    color: {
        type: String,
        default: 'basic'
    },
    text: String,
    to: String | Object,
    href: String,
    icon: {
        type: Boolean,
        default: false
    },
    textPosition: {
        type: String,
        default: 'center'
    },
    theme: {
        type: String,
        default: 'default'
    },
    rel: String,
    stress: Boolean,
    hash: String,
})

const classPositionText = computed(() => {
    return {
        'start' : 'justify-start',
        'center' : 'justify-center',
        'end' : 'justify-end',
        'between' : 'justify-between' 
    } [props.textPosition]
})

const classColor = computed(() => {
    return {
        'primary' : 'decoration-none text-primary-400 hover:text-primary-600',
        'secondary' : 'decoration-none text-secondary-400  hover:text-secondary-600',
        'basic' : 'decoration-none text-basic-light dark:text-basic-dark hover:text-hover-800 dark:hover:text-hover-400',
        'white' : 'decoration-none text-white  hover:text-secondary-600',
    } [props.color]
})

const classActiveColor = computed(() => {
    return {
        'primary' : 'underline underline-offset-3 text-primary-800 hover:text-primary-800 cursor-not-allowed',
        'secondary' : ' underline underline-offset-3 text-secondary-800 hover:text-secondary-800 cursor-not-allowed',
        'basic' : 'underline underline-offset-3 text-active-800 dark:text-active-400 hover:text-active-800 dark:hover:text-active-400 cursor-not-allowed',
    } [props.color]
})

const classTheme = computed(() => {
    return {
        'default' : ''
    } [props.theme]
})

const activeHashRoute = ref(false)

watch(() => route.hash, (hash) => {
    if(hash === props.hash) {
        activeHashRoute.value = true
    } else activeHashRoute.value = false 
})

onMounted(() => {
    if(route.hash === props.hash) {
        activeHashRoute.value = true
    } else activeHashRoute.value = false 
})
</script>


<template>
    <NuxtLink
        class="relative flex justify-center items-center space-x-3 text-lg cursor-pointer"
   
        :class="[
            classTheme,
            classPositionText,
            classColor,
            activeHashRoute ? 'link-hash-active' : '',
            
            stress ? 'stress' : '',
        ]"
        :to="to"
        :href="href"
        :rel="rel"
    >
        <slot :name="icon ? icon : null" />
        <slot>{{ text }}</slot>
    </NuxtLink>
</template>

<style lang="scss" scoped>
.stress {
    &::after {
        @apply content-[''] bg-blue-500 h-[3px] w-[0] left-0 -bottom-[5px] rounded-xl absolute duration-300;
    }

    &:hover::after {
        @apply w-[100%];
    }
}

.link-hash-active {
    @apply text-active-400 hover:text-active-400 font-medium;
    
    &::after {
        @apply content-[''] bg-active-800 dark:bg-active-400 h-[3px] w-[100%] left-0 -bottom-[5px] rounded-xl absolute duration-300;
    }
}
</style>