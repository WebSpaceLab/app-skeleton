<script setup>
const props = defineProps({
    loading: Boolean
})
</script>

<template>
    <div class="w-screen h-screen flex flex-col justify-center items-center">
        <span v-if="loading" class="loader">
        </span>
        <span class="loader-2">
            Loading
            <span class="loader-uploading"></span>
        </span>
    </div>
</template>

<style lang="scss"  scoped>
.loader {
  width: 160px;
  height: 185px;
  position: relative;
  background: #fff;
  border-radius: 100px 100px 0 0;
}
.loader:after {
  content: "";
  position: absolute;
  width: 100px;
  height: 125px;
  left: 50%;
  top: 25px;
  transform: translateX(-50%);
  background-image: radial-gradient(circle, #000 48%, transparent 55%),
    radial-gradient(circle, #000 48%, transparent 55%),
    radial-gradient(circle, #fff 30%, transparent 45%),
    radial-gradient(circle, #000 48%, transparent 51%),
    linear-gradient(#000 20px, transparent 0),
    linear-gradient(#cfecf9 60px, transparent 0),
    radial-gradient(circle, #cfecf9 50%, transparent 51%),
    radial-gradient(circle, #cfecf9 50%, transparent 51%);
  background-repeat: no-repeat;
  background-size: 16px 16px, 16px 16px, 10px 10px, 42px 42px, 12px 3px,
    50px 25px, 70px 70px, 70px 70px;
  background-position: 25px 10px, 55px 10px, 36px 44px, 50% 30px, 50% 85px,
    50% 50px, 50% 22px, 50% 45px;
  animation: faceLift 3s linear infinite alternate;
}
.loader:before {
  content: "";
  position: absolute;
  width: 140%;
  height: 125px;
  left: -20%;
  top: 0;
  background-image: radial-gradient(circle, #fff 48%, transparent 50%),
    radial-gradient(circle, #fff 48%, transparent 50%);
  background-repeat: no-repeat;
  background-size: 65px 65px;
  background-position: 0px 12px, 145px 12px;
  animation: earLift 3s linear infinite alternate;
}

@keyframes faceLift {
  0% {
    transform: translateX(-60%);
  }
  100% {
    transform: translateX(-30%);
  }
}
@keyframes earLift {
  0% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0px);
  }
}

.loader-2{
    font-size: 48px;
    color: #FFF;
    display: inline-block;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 400;
    position: relative;
}
    // .loader-2:after{
    //   content: 'Loading';
    //   position: relative;
    //   z-index: 5;
    // }
.loader-uploading{
    transform: translateX(-120%);
    height: 6px;
    border: 1px solid;
    border-radius: 10px;
    width: 80%;
    position: absolute;
    bottom: 0px;
    background: linear-gradient(#FF3D00 100%, transparent 0) no-repeat;
    background-size: 0% auto;
    animation: 10s lineGrow linear infinite;
}

@keyframes lineGrow {to {  background-size: 100% auto}}
  
</style>