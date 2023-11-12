<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { collection, onSnapshot, orderBy, query} from "firebase/firestore"
import { db } from "@/firebase"

const selectedMonth = ref(new Date().getMonth());
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];
const allEvents = ref([]);
const myEvents = ref([]);
const eventRef = collection(db, 'events');
const q = query(eventRef, orderBy("startDate"));
const myGames = collection(db, 'game')
const logoMap = ref({})


async function fetchGameLogos() {
  
  return new Promise((resolve) => {
    onSnapshot(myGames, (gamesSnapshot) => {
      gamesSnapshot.forEach((gameDoc) => {
        const gameData = gameDoc.data();
        logoMap.value[gameData.name] = gameData.logo;
        
      });
      resolve(); // Resolve the promise once all logos are fetched
    });
  });
}
onMounted(async () => {
  await fetchGameLogos();
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
        endDate: doc.data().endDate == null ? null : new Date(doc.data().endDate.seconds*1000),
        logo: logoMap.value[doc.data().game]
      }
      console.log(event.logo)
      tmpEvents.push(event)
    });
    allEvents.value = tmpEvents;
    filterEventsByMonth(); 
  });
 
})

watch(selectedMonth, () => {
  filterEventsByMonth();
});

function filterEventsByMonth() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); 

   
    myEvents.value = allEvents.value
        .filter(event => 
            event.startDate.getMonth() === Number(selectedMonth.value) &&
            event.startDate >= currentDate
        )
        .sort((a, b) => a.startDate - b.startDate); 
}

const currentMonthName = computed(() => {
    return monthNames[selectedMonth.value].toUpperCase();
});

function dateWithNameMonthDay(date) {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    
    return `${dayName}, ${month} ${day}`;
}

function dateWithNameDay(date){
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${dayName}, ${day}`;
}
function dateWithHoursMinutes(date) {
    if(date){
        let hours = date.getHours();
        hours = hours %12;
        const someHours = String(hours);
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${someHours}:${minutes}pm`;
    }
}

const currentMonth = ref(new Date().getMonth());

const getNextMonth = computed(() => {
    return selectedMonth.value === currentMonth.value + 1;
});

const getCurrentMonth = computed(() => {
    return selectedMonth.value === currentMonth.value;
});
</script>

<template>
    <div class="view-top-margin">
        <div class="header-container flex-c">
            <img v-if="getNextMonth" src="../images/arrow.svg" @click="selectedMonth--" alt="" class="arrow-left">
            <div class="header text-center cool-font">{{ currentMonthName }}</div>
            <img v-if="getCurrentMonth" src="../images/arrow.svg" @click="selectedMonth++" alt="" class="arrow">
        </div>

        <main class="event-list" v-for="event in myEvents" :key="event.id">
            <div class="event-wrapper black rc rel">
                <h1 class="event-day">{{ dateWithNameMonthDay(event.startDate) }}</h1>

                <img :src="event.logo" alt="" class="logo">
                <div class="stop-flex">
                    <div class="title">
                        <h2 class="pink-italic">{{ event.name }} </h2>
                        <h3 class="pink"> {{ event.format }}</h3>
                        <div class="start-time bold">{{ dateWithHoursMinutes(event.startDate) }} <span v-if="event.endDate">-</span> {{ dateWithHoursMinutes(event.endDate) }}</div>
                    </div>
                    <p class="event-description font-med">{{ event.desc }}</p>
                    <br>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped>
.arrow-left{
    rotate:180deg;
}

.arrow,
.arrow-left{
    width:50px;
    filter: invert(100%) sepia(1%) saturate(7418%) hue-rotate(290deg) brightness(105%) contrast(98%);
    cursor: pointer;
    padding-left:1rem;
}

.logo{
    width:15%;
    height:50px;
    position:absolute;
    top:5px;
    right:16px;
}

.event-wrapper{
    padding: clamp(20px,1.2rem, 2%);
    width:clamp(12rem, 100vw, 65rem);
    margin-left:auto;
    margin-right:auto;
}

.header-container{
    background-color: rgb(91, 19, 133);
}

.header{
    font-size: 2.2rem;
}

.event-day{
    font-size:1.5em;
    font-family:jockey;
}

.event-list{
    padding:.6rem;
}

.start-time{
    font-size:1.4rem;
    padding-top:.3rem;
}

.title-wrapper{
    padding-top: .5rem;
}
    
.event-description{
    padding-top: .3rem;
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
        position:static;
        width:10%;
        height:auto;
        min-height:60px;
    }
    .event-day{
        font-size:2em;
    }
}
</style>

