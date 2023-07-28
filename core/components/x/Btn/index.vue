<script setup>

const props = defineProps({
    text: {
        type: String,
        default: 'Click'
    },
    link: {
        type: Boolean,
        default: false
    },
    to: {
        type: String,
        required: false,
    },
    rounded: {
        type: Boolean,
        default: false,
    },
    icon: {
        type: Boolean,
        default: false,
    },
    iconRight: {
        type: Boolean,
        default: false,
    },
    iconLeft: {
        type: Boolean,
        default: false,
    },
    type: {
        type: String,
        default: 'button'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    position: {
        type: String,
        default: 'relative',
    },
    target: String,
    ring: {
        type: Boolean,
        default: false
    },
    rel: String,
    tooltip: Object,
    strip: {
        type: Boolean,
        default: false
    },
    outline: {
        type: Boolean,
        default: false
    },
    basic: {
        type: Boolean,
        default: false
    },
    dashed: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    },
    shadow: {
        type: Boolean,
        default: false
    },
    size: {
        type: String,
        default: 'md'
    },
    color: {
        type: String,
        default: ''
    },
});

let ripple = ref(false);
let isTooltip = ref(false);

function rippleClick () {
    ripple.value = !ripple.value;

    setTimeout(() => {
    ripple.value = !ripple.value;
    }, 300);
}
</script>

<template>
    <button
        @click="rippleClick"
        @mouseover="isTooltip = true"
        @mouseleave="isTooltip = false"
        :type="type"
        class="relative transition duration-150 ease-out font-bold cursor-pointer tracking-wider focus:ring-focus"
        :class="[
            color !== '' && !strip ? disabled ? 'btn-disabled' : `btn-${color}` : '',
            basic ? 'hover:bg-hover-800 hover:text-hover-400 hover:border-hover-800' : '',
            shadow ? 'shadow-lg' : '',
            dashed ? 'border-dashed' : '',
            ring ? 'rounded-full' : '',
            strip ?  
                color !== '' ? `border-none bg-transparent btn-${color}-text` : 'border-none bg-transparent hover:text-hover-400' 
                : '',
            icon ? 'w-8 h-8' : `btn-size-${size}`,
            rounded ? `rounded-lg`: '',
            position ? position : '',
            ripple ? 'overflow-hidden' : '',
        ]"
        :disabled="disabled"
    >
   
        <NuxtLink v-if="link" class="bold no-underline flex justify-center item-center p-1" :to="to" :rel="rel" :target="target">
            <span :class="ripple ? color !== '' ? `btn-ripple btn-ripple-${color}`: 'btn-ripple bg-white/70' : ''"></span>

            <span v-if="icon && ring" >
                <slot :name="icon ? true : false"></slot>
            </span>

            <span v-else class="flex justify-center items-center space-x-2">
                <span v-if="iconLeft">
                    <slot name="icon-left"></slot>
                </span>

                <span>
                    <slot >{{ text }}</slot>
                </span>

                <Icon v-if="loading" name="eos-icons:bubble-loading" />

                <span v-if="iconRight">
                    <slot name="icon-right"></slot>
                </span>
            </span>
        </NuxtLink>

        <div v-else >
            <span :class="ripple ? color !== '' ? `btn-ripple btn-ripple-${color}`: 'btn-ripple bg-white/70' : ''" ></span>

            <span v-if="icon && ring">
                <slot :name="icon ? 'icon' : false"></slot>
            </span>

            <span v-else class="flex justify-center items-center space-x-2">
                <span v-if="iconLeft">
                    <slot name="icon-left"></slot>
                </span>

                <span>
                    <slot >{{ text }}</slot>
                </span>

                <Icon v-if="loading" name="eos-icons:bubble-loading" />

                <span v-if="iconRight">
                    <slot name="icon-right"></slot>
                </span>
            </span>
        </div>

        <x-tooltip
            v-if="tooltip && isTooltip"
            :position="tooltip.position"
            :text="tooltip.text"
        />
    </button>
</template>

<style  scoped>
.btn-disabled {
    @apply bg-gray-600 text-white border-none hover:bg-gray-600  shadow-gray-600/50 dark:hover:shadow-gray-600/50 hover:shadow-grey-600/50 cursor-none;
}
.btn-primary {
    @apply bg-primary-600 text-white border-none hover:bg-primary-800 hover:text-primary-200 shadow-primary-600/50 dark:hover:shadow-primary-400/50 hover:shadow-primary-800/50;
}

.btn-secondary {
    @apply bg-secondary-600 text-white border-none hover:bg-secondary-800 hover:text-secondary-200 shadow-secondary-600/50 dark:hover:shadow-secondary-400/50 hover:shadow-secondary-800/50;
}

.btn-success {
    @apply bg-success-600 text-white border-none hover:bg-success-900 hover:text-success-300 shadow-success-600/50 hover:shadow-success-300/50 dark:hover:shadow-success-300/50 hover:shadow-success-900/50;
}
.btn-info {
   @apply bg-info-600 text-white border-none hover:bg-info-900 hover:text-info-300 shadow-info-600/50 dark:hover:shadow-info-300/50 hover:shadow-info-900/50;
}

.btn-warning {
    @apply bg-warning-600 text-white border-none hover:bg-warning-900 hover:text-warning-300 shadow-warning-600/50 dark:hover:shadow-warning-300/50 hover:shadow-warning-900/50;
}

.btn-danger {
    @apply bg-danger-600 text-white border-danger-600 hover:bg-danger-900 hover:text-danger-300 shadow-danger-600/50 dark:hover:shadow-danger-300/50 hover:shadow-danger-900/50;
}

.btn-primary-outline {
    @apply bg-primary-800/80 hover:bg-primary-800/80 dark:bg-primary-800/20 text-primary-400 border-primary-400  hover:border-primary-200 hover:text-primary-200 shadow-primary-600/50 dark:hover:shadow-primary-400/50 hover:shadow-primary-800/50;
}

.btn-secondary-outline {
    @apply bg-secondary-800/80 hover:bg-secondary-800/80 dark:bg-secondary-800/20 text-secondary-400 border-secondary-400  hover:border-secondary-200 hover:text-secondary-200 shadow-secondary-600/50 dark:hover:shadow-secondary-400/50 hover:shadow-secondary-800/50;
}

.btn-success-outline {
    @apply bg-success-900/80 hover:bg-success-900/60 dark:bg-success-900/20 text-success-600 border-success-600  hover:border-success-300 hover:text-success-300 shadow-success-600/50 dark:hover:shadow-success-300/50 hover:shadow-success-900/50;
}

.btn-info-outline {
   @apply bg-info-900/40 hover:bg-info-900/60 dark:bg-info-900/20 text-info-600 border-info-600 hover:border-info-300 hover:text-info-300 shadow-info-600/50 dark:hover:shadow-info-300/50 hover:shadow-info-900/50;
}

.btn-warning-outline {
    @apply bg-warning-900/40 hover:bg-warning-900/60 dark:bg-warning-900/20 text-warning-600 border-warning-600  hover:border-warning-300 hover:text-warning-300 shadow-warning-600/50 dark:hover:shadow-warning-300/50 hover:shadow-warning-900/50;
}

.btn-danger-outline {
    @apply bg-danger-900/40 hover:bg-danger-900/60 dark:bg-danger-900/20 text-danger-600 border-danger-600  hover:border-danger-300 hover:text-danger-300 shadow-danger-600/50 dark:hover:shadow-danger-300/50 hover:shadow-danger-900/50;
}

.btn-size-sm {
    @apply text-xs h-7 px-2;
}

.btn-size-md {
    @apply text-sm h-9 px-3;
}

.btn-size-lg {
    @apply text-md h-11 px-4;
}
.btn-ripple {
    position: absolute;
    transform: translate(-50%, -50%);
    pointer-events: none;
    border-radius: 50%;
    animation: ripple-btn 0.3s linear infinite;
    z-index: 7;
    top: 50%;
    left: 50%;
}

.btn-ripple-primary {
    @apply bg-primary-400/50;
}

.btn-ripple-secondary {
    @apply bg-secondary-400/50;
}
.btn-ripple-success {
    @apply bg-success-300/50;
}

.btn-ripple-info {
    @apply bg-info-300/50;
}

.btn-ripple-warning {
    @apply bg-warning-300/50;
}

.btn-ripple-danger {
    @apply bg-danger-300/50;
}

.btn-ripple-primary-outline {
    @apply bg-primary-400/50;
}

.btn-ripple-secondary-outline {
    @apply bg-secondary-400/50;
}
.btn-ripple-success-outline {
    @apply bg-success-300/50;
}

.btn-ripple-info-outline {
    @apply bg-info-300/50;
}

.btn-ripple-warning-outline {
    @apply bg-warning-300/50;
}

.btn-ripple-danger-outline {
    @apply bg-danger-300/50;
}

.btn-primary-text {
    @apply text-primary-600 hover:text-primary-400;
}

.btn-secondary-text {
    @apply text-secondary-600 hover:text-secondary-400;
}
.btn-success-text {
    @apply text-success-600 hover:text-success-300;
}

.btn-info-text {
    @apply text-info-600 hover:text-info-300;
}

.btn-warning-text {
    @apply text-warning-600 hover:text-warning-300;
}

.btn-danger-text {
    @apply text-danger-600 hover:text-danger-300;
}

@keyframes ripple-btn {
    0% {
        width: 0;
        height: 0;
        opacity: 1;
    }
    25% {
        width: 50%;
        height: 100%;
        opacity: 0.8;
    }
    50% {
        width: 100%;
        height: 200%;
        opacity: 0.6;
    }
    75% {
        width: 150%;
        height: 300%;
        opacity: 0.4;
    }
    100% {
        width: 200%;
        height: 400%;
        opacity: 0.2;
    }
}
</style>
