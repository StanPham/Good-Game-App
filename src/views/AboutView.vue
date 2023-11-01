<script setup>
import GoogleMapVue from '../components/aboutviewcomponents/GoogleMap.vue';
</script>

<template>
  <div class="flex-c gap main-container">
    <div class="hours-container text-center black rc">
      <h1 class="reverse-gradient pad rc-top-top cool-font">Hours</h1>
      <ul class="flex column gap title test">
        <li>Monday: Closed</li>
        <li>Tuesday: Closed</li>
        <li>Wednesday: 2-10 PM</li>
        <li>Thursday: 2-10 PM</li>
        <li>Friday: 2-10 PM</li>
        <li>Saturday: 12-10 PM</li>
        <li>Sunday: 12-6 PM</li>
      </ul>
    </div>
    <div class="google-maps-container  rc black text-center">
      <h1 class="gradient pad rc-top-top cool-font">Our Location</h1>
      <GoogleMapVue />
    </div>
  </div>
</template>

<style scoped>
.test{
  text-align:left;
}
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