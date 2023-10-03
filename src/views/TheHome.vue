<script setup>
import poke from '../components/poke.webp'
import pika from '../components/pikachu.webp'
import TheCarousel from '../components/TheCarousel.vue'
import TodaysEvent from '../components/TodaysEvent.vue';
import ShopCard from '../components/ShopCard.vue';
import AnothaCard from '../components/AnothaCard.vue'


</script>

<template>
  <div class="wilma-container">
    
 <TheCarousel :image-src="[poke,pika,poke,pika]"/>
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

</style>