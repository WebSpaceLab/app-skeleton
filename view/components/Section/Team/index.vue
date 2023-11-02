
<script setup>

// onMounted(() => {
//     const teamCart = new Splide('#team-cart', {
//         type: 'loop',
//         perPage: 1,
//         perMove: 1,
//         gap: '1rem',
//         autoplay: true,
//         pauseOnHover: false,
//         pauseOnFocus: false,
//         arrows: false,
//         pagination: false,
//         breakpoints: {
//             640: {
//                 perPage: 2,
//             },
//             768: {
//                 perPage: 3,
//             },
//         },
//     });

//     teamCart.mount();

// });
</script>

<template>
    <section id="team" ref="teamSection" class="snap-start scroll-mt-0 relative w-screen box-border" >
        <div  class="container mx-auto h-full w-full  py-8 md:py-16 px-8 lg:px-10 relative box-border">
            <div class="text-center w-full my-3 md:my-12">
                <h2 class="font-extrabold tracking-tight mb-2 text-3xl xl:text-5xl lg:text-4xl">Nasi trenerzy</h2>
            </div>

            <div class="mt-10 w-full flex justify-center items-center flex-col lg:flex-row space-y-6 lg:space-y-0box-border">
                <!-- Coach cards -->
                <card-team v-for="(coach, index) in $team.activeTeam" :key="index" :personal="coach" :index="index" 
                    data-aos="zoom-out-up"
                    data-aos-easing="ease-out-cubic"
                    data-aos-duration="1500" 
                />
            </div>
        </div>
    </section>
</template>