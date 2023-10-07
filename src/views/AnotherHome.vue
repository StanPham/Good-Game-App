<script setup>
import { onMounted, ref, watch, computed } from 'vue'


import cards from '../components/cards.jpg'
import yugioh from '../components/yugioh.jpg'
import store from '../components/store.jpg'
import dragon from '../components/dragon.jpg'
import TheCarousel from '../components/TheCarousel.vue'
import TodaysEvent from '../components/TodaysEvent.vue';
import ShopCard from '../components/ShopCard.vue';
import AnothaCard from '../components/AnothaCard.vue';
import ShopComp from '../components/ShopComp.vue';





</script>

<template>
  <div class="wilma-container">
   
   <div class="car-card"> 
 <TheCarousel  :image-src="[dragon,store,cards, yugioh]" :slideTexts="[{title:'Friday Night Magic Commander',
startdate: 'Oct 13',
btntext:'View Events'},
{title:'View a Wide Selection of Products', btntext:'Shop Now',},
{title:'Looking For Singles?', startdate:'Check out our TCGplayer',btntext: 'TCGplayer'},
{title:'Yu-Gi-Oh!',starttime:'Every Sunday',startdate: '5pm',btntext:'View Events'}]"
    
  
   
    
  />
   </div>
  <div class="event-card">
 <TodaysEvent />
</div>
<div class="shop-card">
 <ShopCard />
</div>

 
 <!-- <AnothaCard /> -->

 <div class="shop-comp">
<ShopComp />
 </div>

</div>
</template>

<style scoped>
.car-card{
  width: 65%;
}
.event-card{
  /* width: clamp(10vw,100vw,32rem); */
  width:clamp(500px,30%,30%);
}
.wilma-container{
    margin-top:2.8rem;
    display:flex;
    flex-wrap:wrap;
   justify-content:center;
    gap:2rem;
    margin-left:auto;
    margin-right:auto;
   
    
}
.shop-comp{
  display:none;
  width:clamp(80vw,96%,1000rem);
}
@media(max-width:1521px){
  .car-card{
    width:100vw;
  }
}
@media(min-width:1521px){
  .shop-comp{
    display:block;
  }
  .shop-card{
    display:none;
  }
  
}

@media(min-width:1700px){
  .wilma-container{
    
    width:90vw;
  }
}




</style>