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
    target: String
})

const { classPositionText } = useClassPosition()

const classColor = computed(() => {
    return {
        'primary' : 'decoration-none text-primary-400 hover:text-primary-600',
        'secondary' : 'decoration-none text-secondary-400  hover:text-secondary-600',
        'basic' : 'decoration-none text-basic-light dark:text-basic-dark hover:text-hover-800 dark:hover:text-hover-400',
        'white' : 'decoration-none text-white  hover:text-secondary-600',
    } [props.color]
})


let activeHashRoute = ref(false)

watch(() => route.hash, (hash) => {
    if(hash) {
        activeHashRoute.value = true
    } else activeHashRoute.value = false 
})

onMounted(() => {
    if(route.hash) {
        activeHashRoute.value = true
    } else activeHashRoute.value = false 
})
</script>


<template>
    <NuxtLink
        class="relative flex justify-center items-center text-lg cursor-pointer"
        :activeClass="activeHashRoute ? '' : 'link-active'"
        :class="[
            classPositionText(textPosition),
            classColor,
            stress ? 'stress' : '',
        ]"
        :to="to"
        :href="href"
        :rel="rel"
        :target="target"
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

.link-active {

    @apply text-active-400 hover:text-active-400 font-medium cursor-default;
    
    &::after {
        @apply content-[''] bg-active-800 dark:bg-active-400 h-[3px] w-[100%] left-0 -bottom-[5px] rounded-xl absolute duration-300;
    }
}
// .link-hash-active {
//     @apply text-active-400 hover:text-active-400 font-medium;
    
//     &::after {
//         @apply content-[''] bg-active-800 dark:bg-active-400 h-[3px] w-[100%] left-0 -bottom-[5px] rounded-xl absolute duration-300;
//     }
// }
</style>