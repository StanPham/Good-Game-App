<script setup>
import { onMounted, ref, watch, computed } from 'vue'

import morecards from '../images/cards.png'
import cards from '../images/cards.jpg'
import yugioh from '../images/yugioh.jpg'
import store from '../images/store.jpg'
import dragon from '../images/dragon.jpg'
import TheCarousel from '../components/TheCarousel.vue'
import TodaysEvent from '../components/TodaysEvent.vue';
import ShopCard from '../components/MobileShopCard.vue';
import AnothaCard from '../components/UnusedShopCard.vue';
import ShopComp from '../components/DtopShopComp.vue';
import TableCard from '../components/TableCard.vue'
import MiniGame from '../components/MiniGame.vue';





</script>

<template>
  <div class="wilma-container">
   
   <div class="car-card"> 
 <TheCarousel  :image-src="[dragon,store,morecards, yugioh]" :slideTexts="[{title:'Friday Night Magic Commander',
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

 <div class="table-card">
  <TableCard />
 </div>

 <div class="minigame-card">
  <MiniGame />
 </div>

</div>
</template>

<style scoped>
.shop-card{
  max-height:400px;
}
.minigame-card{
  min-height:300px;
}
.minigame-card,
.table-card{
   width:clamp(1000px,80vw,80vw);
}
.car-card{
  width: 100vw;
}
.shop-card,
.event-card{
 
  width:clamp(490px,30%,30%);
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
@media(max-width:1047px){
  .shop-card,
  .event-card,
  .table-card,
  .minigame-card{
 
  width:clamp(700px,30%,30%);
}
}

@media(min-width:1550px){
   .car-card{
    width: 65%;
  }
  .shop-comp{
    display:block;
  }
  .shop-card{
    display:none;
  }
  .minigame-card,
  .table-card{
    width:45%;
  }
 
  
}






@media(min-width:1700px){
  .wilma-container{
    
    width:90vw;
  }
}




</style>