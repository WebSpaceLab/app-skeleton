<script setup>
const props = defineProps({
    personal: Object,
    index: Number,
});

let isActive = ref(false);
let isShowModalTeamPersonal = ref(false);
</script>


<template>
 <div  class="flex tilt-card w-full justify-center items-center rounded-lg hover:bg-dark hover:border-2 hover:border-blue md:px-4 md:py-14 snap-center hover:shadow-xl box-border" :class="`tilt-card-${index}`">
    <nuxt-img :src="personal.media.previewUrl" :alt="personal.media.name" class="tilt-card__image2 absolute inset-0 opacity-0 h-full w-full object-cover object-bottom"/>
    
    <h2 class="tilt-card__title text-gray text-center text-xl font-medium uppercase transition-all duration-500 opacity-0 z-10 absolute top-0 left-0 w-full">
        {{ personal.name }}
    </h2>

    <span @click="isShowModalTeamPersonal = true" class="tilt-card--action bottom-10 absolute text-blue hover:text-orange bg-dark  px-2 py-2 font-medium rounded-full transition-all duration-500 opacity-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-14 w-14" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
        </svg>
    </span>
    
    <div class="tilt-card__box relative flex-shrink-0 max-w-[240px]  overflow-hidden rounded-3xl" :class="`box-image-${index}`">

        <img :src="personal.media.previewUrl" :alt="personal.media.name" class="tilt-card__image absolute inset-0  h-[350px] w-[250px] object-cover object-bottom transition-all duration-300" />

        <div class="absolute inset-0 h-full w-full bg-gradient-to-br from-blue opacity-25"></div>

        <div class="relative h-[300px] w-[200px] p-12 flex flex-col justify-between items-start"></div>
    </div>

    <x-modal-team-personal
        :show="isShowModalTeamPersonal"
        :personal="personal"
        @close="event => isShowModalTeamPersonal = false"
        :title="personal.name"
        :footer="false"
    />
</div>
</template>

<style lang="scss" scoped>

.tilt-card {
    // transform-style: preserve-3d;
    // margin-top: 200px;

    &__title {
        // transform: translate3d(0, 0, 50px);
        // transform-style: preserve-3d;
    }

    &:hover .tilt-card__title {
        top: 1rem;
        opacity: 1;
    }

    &--action {
        left: 50%;
        transform: translate3d(-50%, 0, 50px);
        // transform-style: preserve-3d;
    }

    &:hover .tilt-card--action {
        bottom: 1.5rem;
        opacity: .8;
    }

    &__image {
        // transform-style: preserve-3d;
    }

    &:hover .tilt-card__image {
        // transform: translate3d(0, 0, 50px);
        // transform-style: preserve-3d; 
    }

    .tilt-card__image2 {
        border-radius: 0.25rem;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        transition: all 0.5s ease;
    }

    &:hover .tilt-card__image2 {
        opacity: .2;
    }
}

.isActive{
    transform: scale(1.1);
    z-index: 100;
}

</style>