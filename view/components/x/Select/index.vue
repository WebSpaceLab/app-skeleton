<script setup>
const emits = defineEmits(['update:modelValue'])

const props = defineProps({
    modelValue: {
        type: Array,
        default: () => [],
        required: true
    },
    error: {
        type: String,
    },
    options: {
        type: Array,
        required: true
    },

    label: {
        type: String,
        default: 'Select'
    }
})

const isDropdown = ref(false)
const fields = ref([])
const options = ref(props.options)
const x = ref([])

const addField = (item) => {
    if (fields.value.includes(item)) return

    fields.value.push(item)
    options.value = options.value.filter(option => option !== item)
}

const removeField = (field) => {
    fields.value = fields.value.filter(item => item !== field)
    options.value.push(field)
}

function reset() {
    fields.value = []
    options.value = props.options
    x.value = []
}

function start() {
    if (props.modelValue.length === 0) return
    
    props.modelValue.forEach(item => {
        const option = props.options.find(option => option.value === item)

        x.value.push(option)
    })

    x.value.forEach(item => {
        addField(item)
    })
}

watch(fields, (value) => {
    const x = value.map(item => item.value)
    emits('update:modelValue', x)
}, { deep: true })

onUpdated(async () => {
    reset()
    start()
    await nextTick()
})
</script>

<template>
    <div v-if="isDropdown" @click="isDropdown = false" class="z-1 w-screen h-screen fixed inset-0"></div>

    <div @click="isDropdown = true" class="relative z-2 w-full p-3 flex flex-col bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus transition-all duration-500">
        

        <div 
            v-if="fields.length !== 0" 
            class="w-full flex justify-start items-center space-x-3 "
            :class="[
                fields.length !== 0 ? 'pt-3' : '',
            ]" 
        >
             <x-badge v-for="(field, index) in fields" :key="index" class="" :name="field.label" color="secondary-outline" >
                <template #action>
                    <x-btn @click="removeField(field)" color="secondary" size="sm" strip ring icon>
                        <template #icon>
                            <Icon name="material-symbols:cancel"  />
                        </template>
                    </x-btn>
                </template>
            </x-badge>
        </div>

        <div 
            :class="[
                fields.length !== 0 ? 'absolute scale-80 left-2 top-0' : '',
                error ? 'border border-error-600' : ''
            ]" 
            class="transition-all duration-500"
        >
            {{ label }}
        </div>

        
        <div v-if="isDropdown && options.length !== 0" class="relative z-auto left-0 top-0 w-full px-6 ">
            <div  class="w-full my-2 h-0 border-b border-1 border-solid border-blue-600"></div>
            
            <div v-for="(item, index) in options" :key="index" @click="addField(item)" class="w-full cursor-pointer hover:text-secondary-600 " >
                {{ item.label  }}
            </div>
        </div>
    </div>
</template>