<script setup>
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
        { value: 'description', label: 'description' },
        { value: 'generator', label: 'generator' },
        { value: 'keywords', label: 'keywords' },
        { value: 'viewport', label: 'viewport' },
    ]
})


const allCharset = computed(() => {
    return [
        { value: null, label: 'none' },
        { value: 'character_set', label: 'character_set' },
    ]
})

const allHttpEquiv = computed(() => {
    return [
        { value: null, label: 'none' },
        { value: 'content-security-policy', label: 'content-security-policy' },
        { value: 'content-type', label: 'content-type' },
        { value: 'default-style', label: 'default-style' },
        { value: 'refresh', label: 'refresh' },
    ]
})

</script>

<template>
    <section>
        <h3 class="m-0">
           Meta tagi na stronie
            <x-border color="gray" yt="0" yb="0" class="w-full" />
        </h3>

        <div class="w-full grid md:grid-cols-2 lg:grid-cols-3 gap-6 my-6">
            <template v-for="(item, index) in $metaTags.data" :key="index">
                <transition
                    enter-active-class="transition ease-in duration-500"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-800"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                >
                    <div  class="flex flex-col space-y-6 bg-prime-light dark:bg-prime-dark p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-black">
                        <div class="w-full flex flex-col justify-between items-center space-y-6 mb-3">
                            <div class="w-full flex flex-col ">
                                <label class="w-full" for="meta_name">Meta name</label>
            
                                <select v-model="item.name" aria-label="Meta name" id="meta_name" class="w-full bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                    <option v-for="i in allName" :key="i.value" :value="i.value">{{ i.label }}</option>
                                </select>
                            </div>
                            
                            <div class="w-full flex flex-col ">
                                <label class="w-full" for="meta_name">Meta charset</label>
            
                                <select v-model="item.charset" aria-label="Meta charset" id="meta_charset" class="w-full bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                    <option v-for="i in allCharset" :key="i.value" :value="i.value">{{ i.label }}</option>
                                </select>
                            </div>
                
                            <div class="w-full flex flex-col ">
                                <label class="w-full" for="meta_name">Meta http_equiv</label>
            
                                <select v-model="item.httpEquiv" aria-label="Meta charset" id="meta_charset" class="w-full bg-background-light dark:bg-background-dark rounded-lg text-muted-light dark:text-muted-dark  dark:border-muted-dark shadow-sm lg:text-sm focus:outline-none focus:ring-focus focus:border-focus">
                                    <option v-for="i in allHttpEquiv" :key="i.value" :value="i.value">{{ i.label }}</option>
                                </select>
                            </div>

                            <div  class="w-full flex flex-col justify-start items-start space-y-4">
                                <x-textarea v-model="item.content" label="Site Description" />
                            </div>
                        </div>

                        <div  class="w-full flex justify-end space-x-4">
                            <x-btn
                                @click.prevent="$metaTags.deleted(item.id)"
                                color="danger-outline"
                                rounded
                                shadow
                                :loading="$metaTags.isLoading && item.id == $metaTags.buffer.id && $metaTags.buffer.type == 'delete' ? $metaTags.isLoading : false"
                            >
                                Deleted
                            </x-btn>
                           
                            <x-btn
                                @click.prevent="$metaTags.update(item.id, {
                                        name: item.name, 
                                        content: item.content, 
                                        charset: item.charset,
                                        http_equiv: item.httpEquiv
                                    })"
                                color="primary-outline"
                                rounded
                                shadow
                                :loading="$metaTags.isLoading && item.id == $metaTags.buffer.id && $metaTags.buffer.type == 'update' ? $metaTags.isLoading : false"
                            >
                                Update
                            </x-btn>
                        </div>
                    </div>
                </transition>
            </template>
        </div>

        <div >
            <x-border color="gray" yb="0" class="w-full mb-2" />
            <x-form-meta-create  />
        </div>
    </section>
</template>