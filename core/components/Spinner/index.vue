<script setup>
const props = defineProps({
    loading: Boolean
})
</script>

<template>
    <div v-if="loading" class="loader">
      <div ></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
</template>

<style lang="scss"  scoped>
.loader {
  position: relative;
  width: 100px;
  height: 100px;
}



.loader div {
  position: absolute;
  background-image: url("/images/png/logo.png");
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  animation: pulsar 1.6s ease-out ;
  animation-delay: 1.6s;
}

.loader div:nth-child(2) {
    background-image: url("/images/vector/wianek.webp");
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  animation: pulsar 1.6s ease-out ;
  animation-delay: 1.4s;
}

.loader div:nth-child(3) {
    background-image: url("/images/vector/wianek.webp");
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  animation: pulsar 1.6s ease-out ;
  animation-delay: 1.2s;
}
.loader div:nth-child(4) {
  position: absolute;
    background-image: url("/images/vector/wianek.webp");
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  animation: pulsar 1.6s ease-out ;
  animation-delay: 1s;
}
.loader div:nth-child(5) {
  position: absolute;
    background-image: url("/images/vector/wianek.webp");
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  animation: pulsar 1.6s ease-out ;
  animation-delay: 0.8s;
}
.loader div:nth-child(6) {
    background-image: url("/images/vector/wianek.webp");
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  animation: pulsar 1.6s ease-out ;
  animation-delay: 0.6s;
}

.loader div:nth-child(7) {
    background-image: url("/images/vector/wianek.webp");
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  animation: pulsar 1.6s ease-out ;
  animation-delay: 0.4s;

}

.loader div:nth-child(8) {
  position: absolute;
    background-image: url("/images/vector/wianek.webp");
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  animation: pulsar 1.6s ease-out ;
  animation-delay: 0.2s;
}

.loader div:nth-child(9){
  background-image: url("/images/vector/wianek.webp");
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  animation: pulsar 1.6s ease-out ;
  animation-delay: 0;
}


@keyframes pulsar {
  0% {
    top: 50px;
    left: 50px;
    width: 0;
    height: 0;
    opacity: 1;
    transform: rotate(0deg) scale(1);
  }

  100% {
    top: 0;
    left: 0;
    width: 100px;
    height: 100px;
    opacity: 0;
    
    transform: rotate(0deg) scale(6);
  }
}

</style>