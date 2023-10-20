<script setup>
const props  = defineProps({
    user: Object
})
</script>

<template>
    <x-dropdown align="right" width="64">
        <template #trigger>
            <x-btn ring strip class="flex text-sm border-2 border-transparent  focus:outline-none focus:border-gray-300 transition">
                <img v-if="user?.avatarUrl" class="h-8 w-8 rounded-full object-cover" :src="user.avatarUrl" :alt="user.name">
            </x-btn>
        </template>

        <template #content>
            <div class="w-full mt-2 px-3 pb-2">
                <x-dropdown-link  class="bg-gradient-to-r from-prime-light/80 to-second-light/80 dark:from-prime-dark/80 dark:to-second-dark/80 rounded-xl  w-full h-16 my-4 justify-start items-center">
                    <div class="absolute -left-2 top-2 h-16 w-16 flex justify-center items-center">
                        <img v-if="user?.avatar_url" class="h-16 w-16 rounded-full" :src="user.avatar_url" :alt="user.name">
                    </div>

                    <div  class="ml-8 w-44 flex flex-col justify-center items-center">
                        <div class="text-sm mb-3 font-medium text-basic-light dark:text-basic-dark">{{ user?.name }}</div>

                        <div class="text-xs text-muted-light dark:text-muted-dark font-bold">See your profile</div>
                    </div>
                </x-dropdown-link>

                <div class="border-t border-tertiary dark:border-tertiary-dark" />

                <div class="w-full pr-5 box-border">
                    <!-- Account Management -->
                    <div class="flex justify-center items-center py-2 mb-2 text-xs bg-second-light dark:bg-second-dark text-muted-light dark:text-muted-dark rounded">
                        Manage Account
                    </div>

                    <div class="w-full">
                        <slot name="links"></slot>
                    </div>
                </div>
            </div>
        </template>
    </x-dropdown>
</template>