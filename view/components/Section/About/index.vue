<script setup>
    const {$about } =  useNuxtApp()
    
    onMounted(async () => {
        await $about.get()
    })
</script>

<template>
    <section v-if="$about.activeAbout" id="about" class="w-screen h-screen relative scroll-mt-50 snap-start mb-20 lg:mb-0 box-border">
        <div class="overlay-1  -translate-y-30 xl:translate-y-0 xl:-translate-x-26 2xl:-translate-x-14 block overflow-hidden h-screen w-screen absolute bottom-0 right-0 bg-blue"></div>
        <div class="overlay-2 hidden md:block overflow-hidden h-screen w-screen absolute top-0 left-0 bg-gradient-to-tr from-dark via-blue " ></div>

        <div class="container mx-auto w-full h-full flex flex-col justify-center items-center space-y-10">
            <h1 class="font-extrabold tracking-tight mb-0 text-3xl xl:text-5xl lg:text-4xl">Informacje</h1>
            
            <div v-if="$about.activeAbout" class="w-full h-200 p-10 flex flex-col lg:flex-row  justify-center items-center space-y-4 lg:space-x-10 box-border">
                <template v-for="(info, index) in $about.activeAbout" :key="index">
                    <div                                                 
                        :data-aos="index === 1 ? 'fade-right' : 'fade-up'"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="1500"
                        class="card w-full h-80"
                    >
                        <div class="card-inner w-full h-full ">
                            <div class="card-front absolute  w-full h-full overflow-hidden rounded-xl">
                                <div class="absolute left-0 top-0 w-full h-full  p-8 flex justify-start items-end bg-gradient-to-tr from-dark via-blue via-20%  to-dark/10 to-90% box-border rounded-xl">
                                    <span class="text-3xl font-bold  text-white box-border">{{ info.name }}</span>
                                </div>
                                
                                <img :src="info.media.previewUrl" :alt="info.media.name" class="w-full h-full object-cover  rounded-xl">
                            </div>

                            <div class="card-back absolute  w-full h-full flex justify-center items-center  bg-gradient-to-tr from-dark via-blue to-dark px-8 rounded-xl box-border">
                                <span class="text-sm md:text-md lg:text-lg xl:text-xl text-white">
                                    {{ info.description }}
                                </span>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

        </div>
    </section>
</template>

<style lang="scss" scoped>
.overlay-1 {
    clip-path: circle(50% at 3% -44%);
}

.overlay-2 {
    clip-path: circle(50% at 103% 100%);
}

.card {
  perspective: 1000px;
}

.card-inner {
  transform-style: preserve-3d;
  transition: transform 0.999s;
}

.card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front,
.card-back {
  backface-visibility: hidden;
}

.card-front {
  transform: rotateY(0deg);
}

.card-back {
    transform: rotateY(180deg);
}
</style>