<template>
    <div class="container">
        <div class="header-container">
            <img v-if="dude" src="../images/arrow.svg" @click="selectedMonth--" alt="" class="arrow-left">
            <div class="header">{{ currentMonthName }}</div>
          
            <img v-if="sup" src="../images/arrow.svg" @click="selectedMonth++" alt="" class="arrow">
           
       
        </div>

        
            
        <main class="event-list" v-for="event in myEvents" :key="event.id">
            <div class="event-wrapper">
                <h1 class="event-day">{{ funkyDate(event.startDate) }}</h1>
                <img :src="getImageForGame(event.game)" alt="" class="logo">
                <div class="stop-flex">
                <h1 class="event-day-copy">{{ anothaFunkyDate(event.startDate) }}</h1>
                <div class="title-wrapper">
                    <h2 class="event-title">{{ event.name }} </h2>
                    <h3 class=" ya"> {{event.format}}</h3>
                    <div class="start-time">{{ funkyDateNumbaTwo(event.startDate) }} - 11:00pm</div>
                    
                </div>
               
                <p class="event-description">{{ event.desc }}</p>
                <br class="xd">
                </div>
               
            </div>
        </main>
    </div>
   
 
</template>

<style scoped>
.arrow-left{
    width:50px;
    filter: invert(100%) sepia(1%) saturate(7418%) hue-rotate(290deg) brightness(105%) contrast(98%);
    cursor: pointer;
    padding-left:1rem;
    rotate:180deg;
}
.arrow{
    width:50px;
    filter: invert(100%) sepia(1%) saturate(7418%) hue-rotate(290deg) brightness(105%) contrast(98%);
    cursor: pointer;
    padding-left:1rem;
}
.logo{
    width:10%;
    min-height:60px;
   display:none;
   
}

.event-wrapper{
    background:black;
        border-radius:1rem;
    padding: clamp(20px,1.2rem, 2%);
   width:clamp(12rem, 100vw, 65rem);
    margin-left:auto;
    margin-right:auto;
}
.event-day-copy{
    display:none;
}
.header-container{
    display:flex;
    background-color: rgb(91, 19, 133);
    justify-content: center;
}
.day-title{
    text-align: right;
    font-size: 1.5rem;
    margin-right:.5rem;
    display:none;
}
.ya{
    color:rgb(214, 110, 214);
}
.container{
    margin-top:2.8rem;
    
}
.title-wrapper{
    font-size:1.5rem;
}
    .header{
        text-align: center;
        font-family: var(--cool-font);
       
        font-size: 2.2rem;
    }

.event-list{
    padding:10px;

   
}
.start-time{
    font-size:1.4rem;
    font-weight:800;
    padding-top:5px;
  
}
.title-wrapper{
    align-items: center;
    padding-top: 8px;

    
}
.event-title{
    /* padding-left:1rem; */
    font-weight:inherit;
    font-style: italic;
    color:rgb(214, 110, 214);
    
   
}
.event-description{
    padding-top: 5px;
    font-size:1.2rem;
}
@media(min-width:768px){
    .event-list{
        text-align: center;
        
    }
    .event-wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
       
    }
    
    .event-day,
    .stop-flex{
        width:40%;
    }
    .logo{
        display:block;
    }
 
}

</style>

<script setup>

import { onMounted, ref, watch, computed } from 'vue'
import { collection, onSnapshot, addDoc, Timestamp, doc, deleteDoc, orderBy, query} from "firebase/firestore"; 

import { db } from "@/firebase"
import cardback from '../images/cardback.png'
import pokeball from '../images/pokeball.png'
import warhammer from '../images/warhammer.jpg'
import myhero from '../images/MHA.webp'
import yugioh from '../images/yugioh.png'

const selectedMonth = ref(new Date().getMonth());
const allEvents = ref([]);
const myEvents = ref([]);
const eventRef = collection(db, 'events');
const q = query(eventRef, orderBy("startDate"));
const daysOfWeek = [ "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
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
    filterEventsByMonth(); 
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
watch(selectedMonth, () => {
  filterEventsByMonth();
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



const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const currentMonthName = computed(() => {
    return monthNames[selectedMonth.value].toUpperCase();
});



function funkyDate(date) {
   
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    return `${dayName}, ${month} ${day}`;
     
        
    
}
function anothaFunkyDate(date){
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${dayName}, ${day}`;
}
function funkyDateNumbaTwo(date) {
  let hours = date.getHours();
    hours = hours %12;
  const someHours = String(hours);
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${someHours}:${minutes}pm`;
}

// ... other methods ...

function getImageForGame(gameName) {
    const gameImageMap = {
        'Magic The Gathering': cardback,
        'Pokemon': pokeball,
        'Warhammer': warhammer,
        'My Hero': myhero,
        'Yugioh': yugioh,

       
    };

    return gameImageMap[gameName]; // default.png is a fallback image if the game's image isn't defined
}

const currentMonth = ref(new Date().getMonth());


const dude = computed(() => {
    return selectedMonth.value === currentMonth.value + 1;
});


const sup = computed(() => {
    return selectedMonth.value === currentMonth.value;
});



</script>