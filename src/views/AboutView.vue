<script setup>
import GoogleMapVue from '../components/aboutviewcomponents/GoogleMap.vue';
import TheHours from '../components/aboutviewcomponents/TheHours.vue'
</script>

<template>
  <div class="flex-c wrap gap main-container">
    <div class="hours-container black rc">
      <TheHours />
    </div>

    <div class="google-maps-container  rc black text-center">
      
      <GoogleMapVue />
    </div>
  </div>
</template>

<style scoped>

.main-container{
  
  margin-left:auto;
  margin-right:auto;
  margin-top:calc(var(--header-height) + 3rem);
}

.hours-container,
.google-maps-container{
  width: 95%;

}

@media(min-width: 1200px){
  .hours-container{
    width: calc(35% - 2vmax);
  }
  .google-maps-container{
    width: calc(60% - 2vmax);
  }
}
</style>