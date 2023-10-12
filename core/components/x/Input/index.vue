<script setup>
const props = defineProps({
    type: {
        type: String,
        default: 'text'
    },
    label: {
        type: String,
        default: 'Label'
    },
    color: {
        type: String,
        default: 'blue'
    },
    placeholder: {
        type: Boolean,
        default: false
    },
    icon: {
        type: Boolean,
        default: false
    },
    rightIcon: {
        type: Boolean,
        default: false
    },
    iconPosition: {
        type: String,
        default: 'left'
    },
    required: {
        type: Boolean,
        default: false
    },
    autofocus: {
        type: Boolean,
        default: false
    },
    autocomplete: {
        type: Boolean,
        default: false
    },
    validatedType: Object,
    modelValue: {
        type: String,
        required: true
    },
    error: {
        type: String,
    },
    name: {
        type: String,
        default: 'floating_outlined'
    }
})

const emits = defineEmits([
    'update:modelValue'
])

let inputColor = computed(() => {
    return {
        'blue' : 'text-blue-500 focus:text-blue-600 border-solid border-blue-500 focus:border-blue-600 placeholder-blue-600',
        'red' : 'text-red-500 focus:text-red-600 border-solid border-red-500 focus:border-red-600 placeholder-red-600',
        'green' : 'text-green-500 focus:text-green-600 border-solid border-green-500-600 focus:border-green-600 placeholder-green-600',
        'info' : 'text-info-600 focus:text-info-600 border-solid border-info-600 focus:border-info-600 placeholder-info-600',
        'error' : 'text-error-600 focus:text-error-600 border-solid border-error-600 focus:border-error-600 placeholder-error-600',
        'success' : 'text-success-600 focus:text-success-600 border-solid border-success-600 focus:border-success-600 placeholder-success-600',
    } [ props.color]
})

let labelColor = computed(() => {
    return {
        'blue' : 'peer-focus:text-blue-600 peer-focus:dark:text-blue-500',
        'red' : 'peer-focus:text-red-600 peer-focus:dark:text-red-500',
        'green' : 'peer-focus:text-green-600 peer-focus:dark:text-green-500',
        'info' : 'text-info-600  peer-focus:text-info-600',
        'error' : 'text-error-600 peer-focus:text-error-600',
        'success' : 'text-success-600 peer-focus:text-success-600',
    } [ props.color ]
})
</script>

<template>
    <ClientOnly class="relative w-full">
        <div class="relative w-full">
            <div
                v-if="icon"
                :class="[iconPosition === 'left' ? 'left-0' : 'right-0']"
                class="absolute inset-y-0 flex items-center p-3 text-slate-500"
            >
                <slot name="icon"/>
            </div>
    
            <div
                v-if="rightIcon"
                class="absolute inset-y-0 right-0 flex items-center p-3 text-slate-500"
            >
                <slot name="right-icon"></slot>
            </div>
    
            <input
                :value="modelValue"
                @input="event => emits('update:modelValue', event.target.value)"
                :class="[inputColor, icon & iconPosition === 'left' ? 'pl-10' : 'pl-3', validatedType ? validatedType : '']"
                :placeholder="placeholder ? label : ''"
                :id="name"
                :name="name"
                class="block rounded-lg box-border px-2.5 pb-2.5 pt-5 w-full text-sm bg-black/10 border-0 border-b-2 appearance-none border-basic-light  text-basic-light  dark:border-basic-dark  dark:text-basic-dark focus:outline-none focus:ring-0 peer"
                :type="type"
                :required="required"
                :autocomplete="autocomplete ? 'on' : 'off'"
                :autofocus="autofocus ? 'autofocus' : false"
            />
    
           <label
                :for="name"
                :class="[labelColor, icon & iconPosition === 'left' ? 'translate-x-8 peer-focus:translate-x-8' : '', validatedType ? validatedType : '']"
                class="absolute text-sm text-gray-800 dark:text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 "
            >
                {{ label }}
            </label>
        </div>

        <div v-if="error" class="w-full text-center text-error-300 text-[14px] font-semibolds bg-error-900 p-1 box-border mt-1 rounded">
            {{ error }}
        </div>
    </ClientOnly>
</template>