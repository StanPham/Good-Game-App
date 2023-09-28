<template>
    <div class="container">
        <div class="header">EVENTS</div>
        <main class="event-list" v-for="event in myEvents" :key="event.id">
            <div class="event-wrapper">
                <h1 class="event-day">{{ event.name }}</h1>
                <div class="title-wrapper">
                    <div class="start-time">{{ event.startDate }}</div>
                    <h2 class="event-title">{{ event.endDate }}</h2>
                </div>
                <p class="event-description">{{ event.desc }}</p>
                <br>
                <hr>
            </div>
        </main>
    </div>
</template>

<style scoped>
.container{
    margin-top:2.8rem;
  }
.title-wrapper{
    display:flex;
}
    .header{
        text-align: center;
        
        background-color: rgb(91, 19, 133);
        font-size: 2.2rem;
    }

.event-list{
    background-color: black;
    padding:10px;
}
.start-time{
    font-size:1.5rem;
    font-weight:800;
}
.title-wrapper{
    align-items: center;
    padding-top: 10px;

    
}
.event-title{
    padding-left:1rem;
    font-weight:inherit;
    font-style: italic;
    
   
}
</style>

<script setup>
import { onMounted, ref } from 'vue'
import { collection, onSnapshot, addDoc, Timestamp, doc, deleteDoc } from "firebase/firestore"; 
import { db } from "@/firebase"
const myEvents = ref([])
onMounted( () => {
  onSnapshot(collection(db, 'events'), (querySnapshot) => {
    const tmpEvents = [];
    querySnapshot.forEach((doc) => {
      const event = {
        id: doc.id,
        name: doc.data().name,
        desc: doc.data().desc,
        startDate: new Date(doc.data().startDate.seconds*1000),
        endDate: new Date(doc.data().endDate.seconds*1000)
      }
      tmpEvents.push(event)
    });
    myEvents.value = tmpEvents
  });
})




</script>