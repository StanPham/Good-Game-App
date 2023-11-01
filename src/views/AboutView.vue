<script setup>
import GoogleMapVue from '../components/aboutviewcomponents/GoogleMap.vue';
</script>

<template>
  <div class="flex-c gap main-container">
    <div class="hours-container black rc">
      <h1 class="reverse-gradient pad rc-top-top cool-font text-center">Hours & Contact</h1>
      <article class="pad">
        <div class="contact-container pad-bot">
          <div class="flex">
            <div class="title grow">479-219-5162</div>
            <div class="flex gap">
              <img src="../images/discord.svg" alt="" class="icon-white icon-small">
              <img src="../images/facebook.svg" alt="" class="icon-white icon-small">
              <img src="../images/instagram.svg" alt="" class="icon-white icon-small">
            </div>
          </div>
          <div class="title">goodgame.rsvl.ar@gmail.com</div>
        </div>
        <hr>
        <div class="pad-top flex gap-big">
          <ul class="flex column gap title jockey days">
            <li class="days">Monday</li>
            <li class="days">Tuesdays</li>
            <li class="days">Wednesdays</li>
            <li class="days">Thursdays</li>
            <li class="days">Fridays</li>
            <li class="days">Saturdays</li>
            <li class="days">Sundays</li>
          </ul>
          <ul class="hours-list flex column gap title">
            <li class="hours">Closed</li>
            <li class="hours">Closed</li>
            <li class="hours">2-10PM</li>
            <li class="hours">2-10PM</li>
            <li class="hours">2-10PM</li>
            <li class="hours">12-10PM</li>
            <li class="hours">12-6PM</li>
          </ul>
        </div>
      </article> 
    </div>
    <div class="google-maps-container  rc black text-center">
      <h1 class="gradient pad rc-top-top cool-font">Our Location</h1>
      <GoogleMapVue />
    </div>
  </div>
</template>

<style scoped>
.hours-list{
  padding-top:2px;
}
ul{
  list-style-type:none;
}

.days{
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