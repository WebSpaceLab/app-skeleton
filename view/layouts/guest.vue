<script setup>
    const setColorTheme = (newTheme) => {
        useColorMode().preference = newTheme
    }
</script>

<template>
   <x-layout >
        <template #header>
            <div class="fixed w-full flex justify-between item-center top-0 left-0 p-6">
                <logo />

                <div class="h-full w-50 flex justify-center items-center">
                    <x-btn @click="setColorTheme($colorMode.preference == 'dark' ? 'light' : 'dark')" color="secondary" :tooltip="{text: `Zmień motyw na ${$colorMode.value == 'dark' ? 'jasny' : 'ciemny'}`}" ring strip icon class="mr-3">
                        <template #icon>
                            <Icon v-if="$colorMode.value == 'dark'" class="text-lg" name="line-md:moon-filled-loop" />
                            <Icon v-else class="text-lg" name="line-md:moon-filled-to-sunny-filled-loop-transition" />
                        </template>
                    </x-btn>

                    <template v-for="(item, index) in $social.social" :key="index">
                        <x-link
                            v-if="item.is_active == true"
                            :to="item.to"
                            class="w-8 h-8 flex items-center justify-center rounded-full text-basic-light dark:text-basic-dark mr-3 sm:mr-4 lg:mr-3 xl:mr-4"
                            target="_blank"
                        >
                            <Icon :name="item.icon" class="text-2xl" />
                        </x-link>
                    </template>
                </div>
            </div>
        </template>

        <template #main>
            <slot  />
        </template>

        <template #footer>

        </template>

        <template #addons>
        </template>
    </x-layout>
</template>