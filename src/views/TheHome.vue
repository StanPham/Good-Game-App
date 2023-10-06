<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { collection, onSnapshot, addDoc, Timestamp, doc, deleteDoc, orderBy, query} from "firebase/firestore"; 

import { db } from "@/firebase"
import warhammer from '../components/warhammer.jpg'
import yugioh from '../components/yugioh.jpg'
import store from '../components/store.jpg'
import dragon from '../components/dragon.jpg'
import bitter from '../components/bitter.jpg'
import poke from '../components/poke.webp'
import pika from '../components/pikachu.webp'
import TheCarousel from '../components/TheCarousel.vue'
import TodaysEvent from '../components/TodaysEvent.vue';
import ShopCard from '../components/ShopCard.vue';
import AnothaCard from '../components/AnothaCard.vue';

const selectedMonth = ref(new Date().getMonth());
const allEvents = ref([]);
const myEvents = ref([]);
const eventRef = collection(db, 'events');
const q = query(eventRef, orderBy("startDate"));



onMounted( () => {
  onSnapshot(q, (querySnapshot) => {
    const tmpEvents = [];
    querySnapshot.forEach((doc) => {
      const event = {
        id: doc.id,
        name: doc.data().name,
        desc: doc.data().desc,
        game: doc.data().game || "No Game Set In Database",
        format: doc.data().format,
        startDate: new Date(doc.data().startDate.seconds*1000),
        endDate: new Date(doc.data().endDate.seconds*1000)
      }
      tmpEvents.push(event)
    });
    allEvents.value = tmpEvents;
    filterEventsByMonth(); 
  });
 
});

function filterEventsByMonth() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current date's time to 00:00:00

    // Filter events for the selected month which are on or after today's date
    myEvents.value = allEvents.value
        .filter(event => 
            event.startDate.getMonth() === Number(selectedMonth.value) &&
            event.startDate >= currentDate
        )
        .sort((a, b) => a.startDate - b.startDate); // Order events by start date
}

function funkyDate(date) {
   
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
   const day = String(date.getDate()).padStart(2, '0');
   const month = date.toLocaleDateString('en-US', { month: 'short' });
   return `${dayName}, ${month} ${day}`;
    
       
   
}
function anothaFunkyDate(date){
   const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
   
 
   return `${dayName}`;
}
function funkyDateNumbaTwo(date) {
 let hours = date.getHours();
   hours = hours %12;
 const someHours = String(hours);
   const minutes = String(date.getMinutes()).padStart(2, '0');
   return `${someHours}:${minutes}pm`;
}
const slideTexts = computed(() => {
    return myEvents.value.map(event => {
        return {
            startday: anothaFunkyDate(event.startDate),
            startdate: funkyDate(event.startDate),
            title: event.name,
           
            starttime: funkyDateNumbaTwo(event.startDate),
            btntext: 'View Events',
            
        }
    });
});
</script>

<template>
  <div class="wilma-container">
   
    
 <TheCarousel v-if="slideTexts.length" :image-src="[dragon,yugioh,poke, warhammer]" :slideTexts="slideTexts"
    
  
   
    
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