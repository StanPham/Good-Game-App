<script setup>
import { onMounted, ref, watch, computed } from 'vue'

import { collection, onSnapshot} from "firebase/firestore"; 

import { db } from "@/firebase"

import router from '../router'

import TheCarousel from '../components/TheCarousel.vue'
import TodaysEvent from '../components/TodaysEvent.vue';
import ShopCard from '../components/MobileShopCard.vue';
import AnothaCard from '../components/UnusedShopCard.vue';
import ShopComp from '../components/DtopShopComp.vue';
import TableCard from '../components/TableCard.vue'
import MiniGame from '../components/MiniGame.vue';


const mySlides = ref([]);

onMounted( () => {
 onSnapshot(collection(db, 'carousel'), (querySnapshot) => {
   const tmpSlides = [];
   querySnapshot.forEach((doc) => {
     const slide = {
       id: doc.id,
       title: doc.data().title,
       subtitle: doc.data().subtitle,
       subsubtitle: doc.data().subsubtitle,
       btntxt: doc.data().btntxt,
       link: doc.data().link,
       img: doc.data().img,

       
     }
     tmpSlides.push(slide)
   });
   mySlides.value = tmpSlides;
   
 });
 
})

const slideContents = computed(() => {
    return mySlides.value.map(slide => {
        return {
            title: slide.title,
            subtitle: slide.subtitle,
            subsubtitle: slide.subsubtitle,
           
            btntxt: slide.btntxt,
            link: slide.link,
            img: slide.img,
            
        }
    });
});

</script>

<template>
  <div class="main-home-container view-top-margin"> 
    <div class="car-card"> 
      <TheCarousel v-if="slideContents.length" :slideContents="slideContents"/>
         
    </div>

    <div class="event-card">
      <TodaysEvent />
    </div>

    <div class="shop-card">
      <ShopCard />
    </div>

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
.main-home-container{
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
  .main-home-container{
    width:90vw;
  }
}
</style>