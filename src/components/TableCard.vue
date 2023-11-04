<template>
  <div class="main-container rc">
    <h1 class="reverse-gradient pad rc-top-top text-center">Table Reservations</h1>
      <div class="text-wrapper flex-c-c column gap-big pad text-center">
        <p class="card-text title cool-font">Don't want your spot taken? Reserve a table by clicking the button below.</p>
        <button class="main-btn-full pad-top">Reserve</button>
      </div>
  </div>
</template>        
        
        
               
<style scoped>
.text-wrapper{
  position:relative;
}

.text-wrapper::before {
content: "";
position: absolute;
height:50%;
top: 0;
right: 0;
bottom: 0;
left: 0;

background: #0706069f;

filter: blur(10px);
z-index: -1;
}

.main-container{
position:relative;
width:100%;
height:100%;
}

.main-container::before{
width:100%;
content: "";
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
background-image: url('../images/table.webp');
filter:brightness(35%);
background-repeat:no-repeat;
background-size:cover;
z-index:-1;
border-radius: 1rem;
} 

</style>









