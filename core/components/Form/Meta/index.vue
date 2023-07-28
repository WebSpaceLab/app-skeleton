<script setup>
const {  $metaStore } = useNuxtApp()

const form = ref({
    name: '',
    content: '',
    charset: '',
    http_equiv: ''
})

const allName = computed(() => {
    return [
        { value: '', label: 'none' },
        { value: 'application-name', label: 'application-name' },
        { value: 'author', label: 'author' },
        // { value: 'description', label: 'description' },
        { value: 'generator', label: 'generator' },
        // { value: 'keywords', label: 'keywords' },
        { value: 'viewport', label: 'viewport' },
    ]
})

const allCharset = computed(() => {
    return [
        { value: '', label: 'none' },
        { value: 'character_set', label: 'character_set' },
    ]
})

const allHttpEquiv = computed(() => {
    return [
        { value: '', label: 'none' },
        { value: 'content-security-policy', label: 'content-security-policy' },
        { value: 'content-type', label: 'content-type' },
        { value: 'default-style', label: 'default-style' },
        { value: 'refresh', label: 'refresh' },
    ]
})

function resetForm() {
    form.value = {
        name: '',
        content: '',
        charset: '',
        http_equiv: ''
    }
}

async function createdMetaTag() {
    try {
        await $metaStore.createdMetaTag(form.value)

        resetForm()
    } catch (error) {
        console.log(error)
    } 
}

</script>

<template>
    <form class="w-full flex flex-col justify-start items-start space-y-6">
        <x-adding-fields :action="true" >
            <template #action>
                <div class="">
                   <x-btn @click="createdMetaTag()" color="primary-outline" shadow rounded>Create</x-btn>
                </div>
            </template>

            <div class="w-full flex flex-col justify-start items-start space-y-6">
                <div class="w-full flex justify-between items-center space-x-6 mb-3">
                    <div class="w-full flex flex-col ">
                        <label class="w-full" for="meta_name">Meta name</label>
    
                        <select v-model="form.name" aria-label="Meta name" id="meta_name" class="w-full bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option v-for="item in allName" :key="item.value" :value="item.value">{{ item.label }}</option>
                        </select>
                    </div>
        
                    <div class="w-full flex flex-col ">
                        <label class="w-full" for="meta_name">Meta charset</label>
    
                        <select v-model="form.charset" aria-label="Meta charset" id="meta_charset" class="w-full bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option v-for="item in allCharset" :key="item.value" :value="item.value">{{ item.label }}</option>
                        </select>
                    </div>
        
                    <div class="w-full flex flex-col ">
                        <label class="w-full" for="meta_name">Meta http_equiv</label>
    
                        <select v-model="form.http_equiv" aria-label="Meta charset" id="meta_charset" class="w-full bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                            <option v-for="item in allHttpEquiv" :key="item.value" :value="item.value">{{ item.label }}</option>
                        </select>
                    </div>
                </div>
    
                <div class="w-full">
                    <x-textarea v-model="form.content" label="Site Description" name="meta_description" :rows="3" />
                </div>
            </div>
        </x-adding-fields>
    </form>
</template>