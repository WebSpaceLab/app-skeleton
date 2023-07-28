<script setup>
const props = defineProps({
    color: {
        type: String,
        default: 'basic'
    },
    text: String,
    to: String,
    active: {
        type: Boolean,
        default: false
    },
    icon: {
        type: Boolean,
        default: false
    },
    textPosition: {
        type: String,
        default: 'center'
    },
    rel: String,
    stress: Boolean 
})

let isGlitch = ref(false)

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
        'basic' : 'decoration-none text-basic-light dark:text-basic-dark',
        'muted' : 'decoration-none text-muted-light dark:text-muted-dark hover:text-basic-light dark:hover:text-basic-dark'
    } [props.color]
})

const classActiveColor = computed(() => {
    return {
        'basic' : 'underline underline-offset-3 text-active-800 dark:text-active-400 hover:text-active-800 dark:hover:text-active-400 cursor-not-allowed',
        'muted' : 'underline underline-offset-3 text-active-800 dark:text-active-400 hover:text-active-800 dark:hover:text-active-400 cursor-not-allowed',
    } [props.color]
})
</script>

<template>
    <NuxtLink class="relative flex justify-center items-center cursor-pointer" @mouseleave="isGlitch = false" @mouseover="isGlitch = true" :class="[
            classPositionText,
            classColor,
            stress ? 'stress' : ''
        ]"
        :to="to"
        :rel="rel"
    >
        <slot :name="icon ? icon : null" />
        <p :data-glitch="text" class=" text-lg font-bold m-0 p-0 " :class="active ? '' : 'glitch'">
            {{ text }}
        </p>
    </NuxtLink>
</template>

<style lang="scss" scoped>
.glitch {
    letter-spacing: 1px;
    position: relative;

    &:hover {
        // animation: glitch .3s cubic-bezier(.25, .46, .45, .94) both 5;
    }

    &:before, &:after {
        display:block;
        content: attr(data-glitch);
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        opacity: .8;
    } 
    
    &:after {
        color: #3B82F6;
        z-index: -2;
    }
    
    &:before {
        color: #ef4444;
        z-index: -1;
    }

    &:hover {
        &:before {
            animation: glitch .3s cubic-bezier(.25, .46, .45, .94) both 5;
        }
        
        &:after {
            animation: glitch .3s cubic-bezier(.25, .46, .45, .94) reverse both 5;
        }
    }
}

@media only screen and (max-width: 400px) {
	.glitch {
		font-size: 3em;
	}
}


@keyframes glitch {
	0% {
		transform: translate(0);
        z-index: 1;
	}
	20% {
		transform: translate(-5px, 5px);
        z-index: -1;
	}
	40% {
		transform: translate(-5px, -5px);
		// transform: scale(120%);

        z-index: 1;
	}
	60% {
		transform: translate(5px, 5px);
        z-index: -1;
	}
	80% {
		transform: translate(5px, -5px);
        z-index: 1;
	}
	to {
		transform: translate(0);
        z-index: -1;
	}

    // 0%,40%, 44%, 58%, 61%, 65%,69%,73%,100%{
    //     transform: skewX(0deg)
    // }
    // 41%{
    //     transform:skewX(10deg);
    // }
    // 42%{
    //     transform:skewX(-10deg);
    // }
    // 59%{
    //     transform:skewX(40deg) skewY(10deg);
    // }
    // 60%{
    //     transform:skewX(-40deg) skewY(-10deg);
    // }
    // 63%{
    //     transform:skewX(10deg) skewY(-5deg);
    // }
    // 70%{
    //     transform:skewX(-50deg) skewY(-20deg);
    // }
    // 71%{
    //     transform:skewX(10deg) skewY(-10deg);
    // }
}


.stress {
    &::after {
        @apply content-[''] bg-blue-500 h-[3px] w-[0] left-0 -bottom-[5px] rounded-xl absolute duration-300;
    }

    &:hover::after {
        @apply w-[100%];
    }
}
</style>