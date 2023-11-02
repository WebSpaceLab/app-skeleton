<script setup>
// ID sekcji na stronie w kolejności ich występowania
const sectionIds = ['hero', 'about', 'features', 'team', 'price-list', ''];
const currentSectionIndex = ref(0);

const isLastSection = computed(() => currentSectionIndex.value >= sectionIds.length - 1);
let isBottom = ref(false)
let isShow = ref(false)

const checkCurrentSection = () => {
const scrollPosition = window.scrollY + window.innerHeight / 2; // Sprawdzamy środek ekranu

for (let i = 0; i < sectionIds.length; i++) {
    const section = document.getElementById(sectionIds[i]);
    if(section) {
        isShow.value = true
        
        if (section.offsetTop <= scrollPosition && section.offsetTop + section.offsetHeight > scrollPosition) {
            currentSectionIndex.value = i;
            break;
        }
    } else {
        isShow.value = false
    }
}
};

const scrollToNextSection = () => {
    currentSectionIndex.value++
    isBottom.value = false

    if (currentSectionIndex.value < sectionIds.length - 1) {
        const nextSection = document.getElementById(sectionIds[currentSectionIndex.value]);
        window.scrollTo({ top: nextSection.offsetTop, behavior: 'smooth' });

        if(currentSectionIndex.value === sectionIds.length - 2) {
            isBottom.value = true
        }
    } else {
        currentSectionIndex.value = 0
        const nextSection = document.getElementById(sectionIds[currentSectionIndex.value]);
        window.scrollTo({ top: nextSection.offsetTop, behavior: 'smooth' });
    }
};

onMounted(() => {
    window.addEventListener('scroll', checkCurrentSection);
});

onUnmounted(() => {
    window.removeEventListener('scroll', checkCurrentSection);
});
</script>

<template>
    <button v-if="isShow" @click="scrollToNextSection" :disabled="isLastSection" class="w-9 h-9 animate-bounce rounded-full cursor-pointer hover:bg-secondary-800 bg-secondary-600 border-solid border-1 border-secondary-200 flex justify-center" :class="isBottom ? 'items-center' : 'items-end'">
      <Icon v-if="!isBottom" name="ic:baseline-keyboard-double-arrow-down" class="animate-bounce text-xl text-secondary-200" />

      <Icon v-else name="ic:baseline-keyboard-double-arrow-up" class="animate-bounce text-xl text-secondary-200" />
    </button>
</template>
  


  