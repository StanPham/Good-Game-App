<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { collection, onSnapshot} from "firebase/firestore"; 
import { db } from "@/firebase"

import TheCarousel from '../components/TheCarousel.vue'
import TodaysEvent from '../components/TodaysEvent.vue';
import TableCard from '../components/TableCard.vue'
import FacebookCard from '../components/FacebookCard.vue';


const mySlides = ref([]);


function preloadImages(arrayOfImages) {
  arrayOfImages.forEach(imageUrl => {
    const img = new Image();
    img.src = imageUrl;
  });
}

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
       order: doc.data().order,
       img: doc.data().img,

       
     }
     tmpSlides.push(slide)
   });
   mySlides.value = tmpSlides;
   const imageUrls = mySlides.value.map(slide => slide.img);
    preloadImages(imageUrls);
 });
})


const sortedSlides = computed(() => {
  return mySlides.value.slice().sort((a, b) => a.order - b.order);
});

const slideContents = computed(() => {
    return sortedSlides.value.map(slide => {
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
  <div class="main-home-container flex-c wrap"> 
    <div class="car-card"> 
      <TheCarousel v-if="slideContents.length" :slideContents="slideContents"/>
    </div>

    <div class="event-card">
      <TodaysEvent />
    </div>

    <div class="table-card">
      <TableCard />
    </div>

    <div class="facebook-card">
      <FacebookCard />
    </div>
  </div>
</template>

<style scoped>

.facebook-card,
.table-card{
  width:clamp(1000px,80vw,80vw);
  min-height:400px;
}
.car-card{
  width: 100vw;
}

.event-card{
  width:clamp(490px,30%,30%);
}
.main-home-container{
  gap:2rem;
  margin-left:auto;
  margin-right:auto;
  margin-top: calc(var(--header-height) + 1rem)
}


@media(max-width:1047px){
  .event-card,
  .table-card,
  .facebook-card{
    width:clamp(700px,30%,30%);
  }
}

@media(min-width:1450px){
   .car-card{
    width: calc(80% - 15rem - 1vmax);
  }

  .facebook-card,
  .table-card{
    width:45%;
  }
}

@media(min-width:1700px){
  .main-home-container{
    width:min(90vw,2400px);
  }
}
</style>