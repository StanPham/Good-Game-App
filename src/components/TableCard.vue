<template>
  <div class="main-container rc rel">
    <div class="text-center title-container rel">
      <h1 class="pad cool-font">Looking for Singles?</h1>
    </div>
    
    <br><br><br><br>

    <div class="text-center rel pad content-wrapper">
      <div class="title-big italic bold">Visit Our</div>
      <br>
      <a class="main-btn-full" href="https://shop.tcgplayer.com/sellerfeedback/71c2420f" target="_blank">TCGplayer</a>
    </div>
  </div>
</template>        
        
<style scoped>
.main-container{
  width:100%;
  height:100%;
}

.main-container::before{
  content: "";
  position:absolute;
  inset:0;
  background-image: url('../images/cards.png');
  background-size:cover;
  background-repeat:no-repeat;
  filter:brightness(60%) saturate(1.25);
  z-index:-5;
  border-radius:1rem;
}

.title-container{
  height:20%;
}
.title-container::before{
  content: "";
  position:absolute;
  inset:0;
  background: linear-gradient(98.79deg, #BA76FF -8.25%, #180030 73.07%);
  border-radius: 1rem 1rem 0 0;
  z-index: -2;
}

</style>









