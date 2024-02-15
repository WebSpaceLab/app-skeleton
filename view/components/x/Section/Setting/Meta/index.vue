<script setup>
const { $metaTags } = useNuxtApp()

const form = ref({
    name: 'keywords',
    content: '',
    charset: '',
    http_equiv: ''
})

async function create( content) {
    await $metaTags.create(form.value)
}

async function update(id, content) {
    await $metaTags.update(id, {
        content: content,
        name: 'keywords',
        charset: "",
        http_equiv: ""
    })
}
</script>

<template>
    <section class="p-6">
        <div v-if="!$metaTags?.data?.length" class="flex flex-col space-y-6 bg-prime-light dark:bg-prime-dark hover:shadow-xl hover:shadow-black transition-all duration-300 p-4 mb-6 rounded-b-xl">
            <span class="m-0">
                <h3 class="p-0 m-0 ml-3"> Site keywords </h3>
                <x-border color="gray" yt="0" yb="0" class="w-full" />
            </span>
            
            <div  class="px-6 box-border" >
                <div  class="w-full flex flex-col justify-start items-start space-y-4">
                    <x-textarea v-model="form.content" label="Site keywords" :maxlength="150" />
                </div>
            </div>

            <div  class="w-full flex justify-end px-6 box-border">
                
                <x-btn  @click.prevent="create()" color="primary-outline" shadow rounded :loading="$metaTags.isLoading" >Create</x-btn>
            </div>
        </div>

        <x-section-setting-meta-create />
    </section>
</template>