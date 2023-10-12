<script setup></script>

<template>
    <div class="w-full relative min-h-screen box-border">
        <div class="flex flex-col justify-start items-center ">
            <header id="main-header" class="relative z-50 lg:relative box-border transition-all duration-500">
                <slot name="header" />
            </header>
    
            <main class="w-full h-full box-border relative flex justify-center items-start duration-500">
                <slot name="main" />
            </main>
    
            <footer class="relative w-full">
                <slot name="footer" />
            </footer>
        </div>
        
        <slot name="addons" />
    </div>
</template>