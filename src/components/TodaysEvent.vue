<script setup>

import { onMounted, ref, watch, computed } from 'vue'
import { collection, onSnapshot, addDoc, Timestamp, doc, deleteDoc, orderBy, query} from "firebase/firestore"; 
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { db } from "@/firebase"

const today = ref(new Date());
today.value.setHours(0,0,0,0);
const allEvents = ref([]);
const eventRef = collection(db, 'events');
const q = query(eventRef, orderBy("startDate"));
const myGames = ref([])


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
   
  });
  onSnapshot(collection(db, 'game'), (querySnapshot) => {
    const tmpGames = [];
    querySnapshot.forEach((doc) =>{
      const game = {
        id: doc.id,
        name: doc.data().name,
        format: doc.data().format
      }
      tmpGames.push(game)
    })
    myGames.value = tmpGames
  })
})


console.log(today.value.toDateString())
const todaysEvent = computed(() => {
  const upcomingEvents = allEvents.value.filter(event => 
    event.startDate >= today.value
  );
  return upcomingEvents.length ? upcomingEvents[0] : { startDate: new Date(), endDate: new Date() };
});

const titleOfCard = computed(() => {
  if (todaysEvent.value.startDate.toDateString() === today.value.toDateString()) {
    return "TODAY'S EVENT";
  } else {
    return "NEXT EVENT";
  }
});

function dayMonthDay(date) {
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
  const day = String(date.getDate()).padStart(2, '0');
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  return `${dayName}, ${month} ${day}`;
}
   
function hoursMinutes(date) {
    let hours = date.getHours();
    hours = hours %12;
    const someHours = String(hours);
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${someHours}:${minutes}pm`;
}

const router = useRouter();
const goEvent = () => {
  router.push('/event');
};

</script>

<template>
  <div class="container">
      <h1 class="header">{{titleOfCard}}</h1>
      <div class="event-wrapper">
        <h1 class="event-day">{{ dayMonthDay(todaysEvent.startDate) }}</h1>
          <div class="title-wrapper title">
              <h2 class="pink-italic">{{ todaysEvent.name }} </h2>
              <h3 class="pink"> {{ todaysEvent.format}}</h3>
              <div class="start-time bold title-scale">{{ hoursMinutes(todaysEvent.startDate) }} - {{hoursMinutes(todaysEvent.endDate) }}</div>
          </div>
            
          <p class="event-description font-med">{{ todaysEvent.desc }}</p>
          <br>
          <button class="all-events-btn main-btn-full bold" @click="goEvent">All Events</button>
      </div>
  </div>
</template>

<style scoped>
.header{
  text-align: center;
  padding-top:.7rem;
  text-decoration: underline;
}



.event-wrapper{
  padding: 1rem;
  text-align: center;
}

.container{
  background: linear-gradient(98.79deg, #a45aee -8.25%, #180030 30.07%); 
  border-radius: 1rem;
  height:100%;
}
    
.title-wrapper{
  padding-top: .5rem;
}

.event-description{
  padding: 1.5rem 0;
}

</style>










