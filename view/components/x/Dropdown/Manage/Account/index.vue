<script setup>
const props  = defineProps({
    user: Object
})
</script>

<template>
    <x-dropdown align="right" width="64">
        <template #trigger>
            <x-btn ring strip class="flex text-sm border-2 border-transparent  focus:outline-none focus:border-gray-300 transition">
                <img v-if="user?.avatarUrl" class="h-8 w-8 rounded-full object-cover" :src="user.avatarUrl" :alt="user.username">
            </x-btn>
        </template>

        <template #content>
            <div class="w-full p-2">
                <x-dropdown-link to="/dashboard/profile"  class="bg-gradient-to-r from-prime-light/80 to-second-light/80 dark:from-prime-dark/80 dark:to-second-dark/80 rounded-xl  w-full h-20 my-4 justify-start items-center rounded-l-full rounded-r-none pl-2">
                    <div class=" h-16 w-16 flex justify-center items-center">
                        <img v-if="user?.avatarUrl" class="h-16 w-16  rounded-full" :src="user.avatarUrl" :alt="user.username">
                    </div>

                    <div  class="ml-8 w-44 flex flex-col justify-center items-start">
                        <div class="text-sm mb-3 font-medium text-basic-light dark:text-basic-dark">{{ user?.username }}</div>

                        <div class="text-xs text-muted-light dark:text-muted-dark font-bold">
                            <span>{{ user?.email }}</span>
                        </div>
                    </div>
                </x-dropdown-link>

                <div class="border-t border-tertiary dark:border-tertiary-dark" />

                <div class="w-full box-border">
                    <!-- Account Management -->
                    <div class="flex justify-center items-center py-2 mb-2 text-xs bg-second-light dark:bg-second-dark text-muted-light dark:text-dark rounded">
                        Manage Account
                    </div>

                    <div class="w-full flex flex-col justify-center items-center">
                        <slot name="links"></slot>
                    </div>
                </div>
            </div>
        </template>
    </x-dropdown>
</template>