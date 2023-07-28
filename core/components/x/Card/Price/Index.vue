<script setup>
    const props = defineProps({
        pack: Object,
        index: Number
    })
</script>

<template>
        <div class="flex flex-col md:flex-row flex-wrap w-full justify-center items-center bg-background-light dark:bg-background-dark relative" :class="[pack.main ? '' : '']">
            <!-- Price card basic -->
            <div :class="pack.main ? 'shadow shadow-primary-600 hover:shadow-lg' : 'hover:shadow-lg hover:shadow-secondary-200'"  class="relative flex flex-col w-full md:min-w-[240px] md:max-w-[320px] rounded-xl   transition duration-100 ease-in-out py-6 px-8 md:mr-4 mb-10 md:mb-0">
                <h2 class="mx-auto  text-5xl text-bold text-center my-4" :class="pack.main ? 'text-primary-600' : 'text-secondary-600'">{{ pack.title }}</h2>

                <p class="text-center font-bold text-white text-3xl mb-4">{{ pack.price }}</p>

                <div class="flex flex-col justify-center items-center text-lg text-dark mb-16">
                    <h3 class="text-primary-200 text-center">Pakiet składa się </h3>
                    <p v-for="(info, index) in pack.package" :key="index" class="px-5 relative flex flex-wrap flex-row  text-sm" :class="info.highlight ? 'py-2 text-secondary-600 border-solid border-secondary-600 items-center justify-center rounded-lg' : 'text-gray'">
                        <span v-if="info.highlight" class="absolute -top-5 -left-6 rounded-full bg-background-dark p-2">
                            <Icon name="mdi:book-multiple-plus" class="text-3xl" />
                        </span>

                        <span v-else class="absolute top-0 -left-3">
                            <Icon name="clarity:success-line" class="text-xl text-success-600" />
                        </span>

                        {{ info.info }}
                    </p>
                </div>

                <div class="price-card__action absolute bottom-3 left-3 right-3 flex justify-center items-center">
                    <x-btn class="hover:shadow-xl transition duration-150 ease-in-out w-full" :color="pack.main ? 'primary-outline' : 'secondary-outline'" rounded shadow>
                        Skontaktuj się
                    </x-btn>
                </div>
            </div>
        </div>
</template>