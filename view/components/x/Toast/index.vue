<script setup>

    const {$flash} = useNuxtApp()
// const page = usePage();

// let removeFinishEventListener = Inertia.on('finish', () => {
//     if(page.props.value.session.flash) {
//         flash.add({
//             type: page.props.value.session.flash?.type,
//             message: page.props.value.session.flash?.message
//         });
//     }
// });

// onUnmounted(() => removeFinishEventListener());

function remove(event) {
    $flash.remove(event);
}
</script>

<template>
    <TransitionGroup
        tag="div"
        enter-active-class="transition ease-out duration-300"
        enter-from-class="transform opacity-0 translate-x-full"
        enter-to-class="transform opacity-100 translate-x-0"
        leave-active-class="transition ease-in duration-300"
        leave-from-class="transform opacity-100 translate-x-0"
        leave-to-class="transform opacity-0 translate-x-full"
        class="fixed top-20 right-5 z-50 space-y-4 w-full max-w-xs z-120"
    >
        <template v-for="item in $flash.items" :key="item.id">
           <x-toast-item
                :item="item"
                @remove="remove"
            />
        </template>
    </TransitionGroup>
</template>