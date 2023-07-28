<template>
    <div id="app" class="w-screen overflow-hidden box-border font-sans ">
        <slot />
    </div>
</template>

<style>
    body {
        @apply bg-background-light dark:bg-background-dark text-basic-light dark:text-basic-dark box-border overflow-x-hidden m-0 p-0;
    }
</style>