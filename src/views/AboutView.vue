<script setup>
import GoogleMapVue from '../components/aboutviewcomponents/GoogleMap.vue';
import TheHours from '../components/aboutviewcomponents/TheHours.vue'
</script>

<template>
  <div class="flex-c gap main-container">
    <div class="hours-container black rc">
      <TheHours />
    </div>

    <div class="google-maps-container  rc black text-center">
      <h1 class="gradient pad rc-top-top cool-font">Our Location</h1>
      <GoogleMapVue />
    </div>
  </div>
</template>

<style scoped>

.main-container{
  width:90%;
  margin-left:auto;
  margin-right:auto;
  margin-top:calc(var(--header-height) + 3rem);
}
.hours-container{
  width:clamp(350px, 35%, 35rem);
  
}
.google-maps-container{
  width:clamp(350px, 60%, 40rem);
  
}
</style>