<template>
  <h1 class="reverse-gradient pad rc-top-top cool-font text-center">Hours & Contact</h1>
  <article class="pad">
    <div class="contact-container pad-bot">
      <div class="flex">
        <div class="title grow">479-219-5162</div>
        <div class="flex gap">
          <a href="https://discord.com/invite/AmCadcysE4">
            <img src="../../images/discord.svg" alt="" class="icon-white icon-small">
          </a>
          <a href="https://www.facebook.com/GoodGameRsvlAR/">
            <img src="../../images/facebook.svg" alt="" class="icon-white icon-small">
          </a>
          <a href="https://www.instagram.com/goodgamersvl">
            <img src="../../images/instagram.svg" alt="" class="icon-white icon-small">
          </a>
          
        </div>
      </div>
      <a href="mailto:goodgame.rsvl.ar@gmail.com" class="title link-hover">goodgame.rsvl.ar@gmail.com</a>
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
</style>