<template>
    <section class="flex w-screen min-h-screen lg:p-6 box-border">
        <div class="absolute w-full h-full  top-0 left-0  w-0  z-1">
         
        </div>

        <div class="w-1/2 h-full flex flex-col justify-center flex-1 px-4 lg:py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div class="h-full flex items-center w-full h-full max-w-sm mx-auto lg:w-96">
               <slot></slot>
            </div>
        </div>
    </section>
</template>