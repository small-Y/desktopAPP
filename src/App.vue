<template>
  <div class="app">
    <router-view> </router-view>
    <SoundData />
  </div>
</template>

<script>
import SoundData from "@/components/SoundData.vue";
export default {
  name: 'app',
  components:{
    SoundData
  }
}
</script>

<style>
  html {
      width: 100%;
      height: 100%;
  }
  body {
      width: 100%;
      height: 100%;
      margin: 0px;
      position: absolute;
      z-index: 10;
  }
  input{
    outline: none;
  }
</style>
