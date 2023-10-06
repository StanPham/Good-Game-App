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





</script>

<template>
  <div class="wilma-container">
   
    
 <TheCarousel  :image-src="[dragon,store,cards, yugioh]" :slideTexts="[{title:'Friday Night Magic Commander',
startdate: 'Oct 13',
btntext:'View Events'},
{title:'View a Wide Selection of Products', btntext:'Shop Now',},
{title:'Looking For Singles?', startdate:'Check out our TCGplayer',btntext: 'TCGplayer'},
{title:'Yu-Gi-Oh!',starttime:'Every Sunday',startdate: '5pm',btntext:'View Events'}]"
    
  
   
    
  />
<br>
 <TodaysEvent />
<br>
 <ShopCard />
 <br>
 <AnothaCard />
 <br>



</div>
</template>

<style scoped>
.wilma-container{
    margin-top:2.8rem;
    display:flex;
    flex-wrap:wrap;
    gap:1rem;
    
}
@media(min-width: 1500px)
{
  .wilma-container{
    margin-left: clamp(5vw,1rem,10vw);
  
    
   
  }
}

</style>