
<template>
    <section class="w-full h-full pb-8 box-border bg-prime-light dark:bg-prime-dark rounded-lg hover:shadow-xl hover:shadow-black transition-all duration-300">
        <div class="w-full p-2 flex justify-end space-x-3 box-border">
            <slot name="action"></slot>
        </div>

        <div class="w-full h-full p-10 box-border">
            <slot name="main"></slot>
        </div>
    </section>
</template>