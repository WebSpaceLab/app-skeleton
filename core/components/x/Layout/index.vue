<script setup></script>

<template>
    <div class="w-screen relative min-h-screen box-border">
        <div class="flex flex-col justify-start items-center">
            <header id="main-header" class="relative z-50 lg:relative box-border transition-all duration-[0.4s] ease ">
                <slot name="header" />
            </header>
    
            <main class="w-full min-h-screen box-border relative flex justify-center items-start duration-300">
                <slot name="main" />
            </main>
    
            <footer class="relative w-full">
                <slot name="footer" />
            </footer>
        </div>
        
        <slot name="addons" />
    </div>
</template>