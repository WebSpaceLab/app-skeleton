<script setup>
const props = defineProps({
    features : {
        type: Array,
        default: []
    }   
})
</script>

<template>
    <section id="features" ref="featureSection" class="snap-start scroll-mt-0 relative block w-screen  min-h-screen px-4 box-border">
        <div class="relative flex flex-col justify-center items-start w-full h-full ">
            <div class="relative text-center w-full my-3 md:my-12 z-10">
                <h2 class="font-extrabold tracking-tight mb-2 text-3xl xl:text-5xl lg:text-4xl">Zajęcia</h2>
            </div>

            <div class="relative w-full h-full container mx-auto relative grid grid-flow-row auto-rows-max grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                <template v-for="(item, index) in features" :key="index">
                    <div 
                        :data-aos="index === 1 || index === 3 || index === 5 ? 'zoom-out-up' : 'flip-left'"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="1500"
                        class="card-hover max-w-[350px] z-20 rounded-xl bg-gradient-to-tl from-slate-200 via-slate-600 bg-slate-200 hover:bg-transparent transition-all duration-500"
                    >
                        <div class="card-hover__content">
                            <h3 class="card-hover__title">
                                {{ item.name }}
                            </h3>

                            <p class="card-hover__text">{{ item.subtitle}}</p>

                            <span class="card-hover__link">
                                <span>Zobacz więcej</span>

                                <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>        
                            </span>
                        </div>

                        <div class="card-hover__extra">
                            <h4>{{ item.description}}</h4>
                        </div> 
                        
                        <img :src="item.media.previewUrl" :alt="item.media.name">
                    </div>
                </template>
            </div>
            
            <div class="overlay-6  -translate-x-4 -translate-y-20 lg:translate-y-0 hidden md:block overflow-hidden h-screen w-screen absolute left-0 top-0 bg-gradient-to-tl from-blue/20 via-blue bg-dark" ></div>
            <div class="overlay-7 hidden md:block overflow-hidden h-screen w-screen absolute bottom-0 right-0 bg-gradient-to-tl from-blue via-blue bg-dark"></div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.overlay-6 {
    clip-path: circle(50% at 103% 0);
}

.overlay-7 {
    clip-path: circle(20% at 3% 55%);
}

.card-hover {
    $root: &;
    width: 100%;
    height: 500px;
    position: relative;
    overflow: hidden;
    box-shadow: 0 0 32px -10px rgba(0,0,0,0.08);

    &:has(#{$root}__link:hover) {

        #{$root}__extra {
            transform: translateY(0);
            transition: transform 0.35s;
        }
    }

    &:hover {
    
        #{$root} {

            &__content {
                background-color: #3b82f6;
                bottom: 100%;
                transform: translateY(100%);
                padding: 50px 60px;
                transition: all 0.35s cubic-bezier(.1,.72,.4,.97);
            }

            &__link {
                opacity: 1;
                transform: translate(-50%, 0);
                transition: all 0.3s 0.35s cubic-bezier(.1,.72,.4,.97);
            }
        }

        img {
            width: 100%;
            height: 60%;
            transform: scale(1) translateY(70%);
            transition: all 0.5s 0.5s transform cubic-bezier(.1,.72,.4,.97);
        }
    }

    &__content {
        width: 100%;
        text-align: center;
        background-color: #334155;
        padding: 0 60px 50px;
        position: absolute;
        bottom: 0;
        left: 0;
        transform: translateY(0);
        transition: all 0.35s 0.35s cubic-bezier(.1,.72,.4,.97);
        will-change: bottom, background-color, transform, padding;
        z-index: 1;

        &::before,
        &::after {
            content: '';
            width: 100%;
            height: 120px;
            background-color: inherit;
            position: absolute;
            left: 0;
            z-index: -1;
        }

        &::before {
        top: -80px;
        clip-path: ellipse(60% 80px at bottom center);
        }

        &::after {
        bottom: -80px;
        clip-path: ellipse(60% 80px at top center);
        }
    }

    &__title {
        font-size: 1.5rem;
        margin-bottom: 1em;

        span {
            color: black;
        }
    }

    &__text {
        font-size: 0.75rem;
    }

    &__link {
        position: absolute;
        bottom: 1rem;
        left: 50%;
        transform: translate(-50%, 10%);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        text-decoration: none;
        color: black;
        opacity: 0;
        padding: 10px;
        transition: all 0.35s;

        &:hover {
        
            svg {
                transform: translateX(4px);
            }
        }

        svg {
            width: 18px;
            margin-left: 4px;
            transition: transform 0.3s;
        }
    }

    &__extra {
        height: 60%;
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 100%;
        font-size: 1.5rem;
        text-align: center;
        background-color: rgba(#0f172a,0.7);
        padding: 80px;
        bottom: 0;
        z-index: 0;
        color: white;
        transform: translateY(100%);
        will-change: transform;
        transition: transform 0.35s;

        span {
            color: #2d7f0b;
        }
    }

    img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
        z-index: -1;
        transform: scale(0.8);
        // transition-delay: 0.2s;
        transition: all 0.5s 0.5s transform cubic-bezier(.1,.72,.4,.97);
    }
}
</style>