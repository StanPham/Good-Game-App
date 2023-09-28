
<template>
   <body>
  <div class="tab">
  <button class="tablinks" @click="openCity(event, 'London')">Events</button>
  <button class="tablinks" @click="openCity(event, 'Paris')">Shop Reservations</button>
  <button class="tablinks" @click="openCity(event, 'Tokyo')">Table Reservations</button>
  <button class="tablinks" @click="openCity(event, 'Accounts')">Accounts</button>
</div>

<!-- Tab content -->
<div id="London" class="tabcontent">
  <div class="form-container">
    <form @submit.prevent="addEvent">
      <h2>Add New Event:</h2>
      <input
      v-model="newEvent.name" 
        class="input"
        placeholder="Event Name"
        type="text"
        required>
      
        <label for="startTime">Start Time: </label>
      <input 
        v-model="newEvent.startTime"
        type="datetime-local"
        id="startTime" 
        name="startTime"
        required>
     
      <label for="endTime">End Time: </label>
      <input 
        v-model="newEvent.endTime"
        type="datetime-local"
        id="endTime" 
        name="endTime"
        required>
      
      <textarea
        v-model="newEvent.desc"
        class="input"
        placeholder="Event Description"
        type="textarea"
        required></textarea>
      
      <button type="submit" class="submit-btn">Submit</button>
    </form>
  </div>
  <table>
      <thead>
        <th scope="col">Name</th>
        <th scope="col">Desc</th>
        <th scope="col">Start Date</th>
        <th scope="col">End Date</th>
        <th scope="col">Actions</th>
      </thead>
      <tbody v-for="event in myEvents" :key="event.id">
        <tr >
          <td>{{ event.name }}</td>
          <td>{{ event.desc }}</td>
          <td>{{ event.startDate }}</td>
          <td>{{ event.endDate }}</td>
          <td class="delButContainer">
            <button class="delBut"
              @click="deleteEvent(event.id)"
            >delete</button>
          </td>
          
        </tr>
      </tbody>
    </table>
</div>

<div id="Paris" class="tabcontent">
  
</div>

<div id="Tokyo" class="tabcontent">
  <h3>Table Reservations</h3>
  <p>Tokyo is the capital of Japan.</p>
</div>
<div id="Accounts" class="tabcontent">
  <h3>Accounts</h3>
  <p>Tokyo is the capital of Japan.</p>
</div>
</body> 
</template>

<style scoped>
.delButContainer{
  display:flex;
  justify-content: center;
  align-items: center;
  margin:auto;
  padding-top:1rem;
}
.delBut{
  background-color: red;
  padding: .2rem;
  
}
 

 table { 
    border-collapse: collapse; 
    table-layout:fixed;
    width:100%;
    border-collapse:separate;
    border-spacing:0 15px;
   
   
}
tr{
  border-bottom: rgba(255, 255, 255, 0.11) 20px solid;
  
 
  
 

}
td{
 
  word-wrap:break-word;
  width:100px;
}


.submit-btn{
   
   background-color: rgb(168, 41, 168);
   font-size: 20px;
   border-radius: 10px;
   padding:5px;
   border:none;
   color:white;
}
.form-container{
   
  
   width: clamp(200px, 90vw,40rem);
  
   display:flex;
   
   background-color: rgb(66, 60, 63);
  
  
   border-radius: 10px;
   color:white;
   margin-top: 4rem;

}
form{
    width:clamp(23rem,80%,5000px);
    display:flex;
    flex-direction: column;
    padding: 1.25em;
    gap:.8rem;
    
    
}
textarea{
  color:black;
}
form input[type="text"]{
  color:black;
}
form input[type="datetime-local"]{
  color:black;
}


body{
    margin-top:5rem;
}
    .tab {
  overflow: hidden;
  border: 1px solid #ccc;
  background-color: #000000;
}

/* Style the buttons that are used to open the tab content */
.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
  background-color: #ddd;
}

/* Create an active/current tablink class */


/* Style the tab content */
.tabcontent {
  display: none;
  padding: 6px 12px;
  border: 1px solid #ccc;
  background-color: #312d2d;
  border-top: none;
}
</style>
<script setup>


import { onMounted, ref } from 'vue'
import { collection, onSnapshot, addDoc, Timestamp, doc, deleteDoc } from "firebase/firestore"; 
import { db } from "@/firebase"

const newEvent = ref({
  name: '',
  startTime: '',
  endTime:'',
  desc: ''
})

const myEvents = ref([])

const addEvent = async () =>{
    await addDoc(collection(db, "events"), {
      name: newEvent.value.name,
      desc: newEvent.value.desc,
      startDate: Timestamp.fromDate(new Date(newEvent.value.startTime)),
      endDate: Timestamp.fromDate(new Date(newEvent.value.endTime)),
      creationDate: Timestamp.fromDate(new Date())
    });
  }

const deleteEvent = async id => {
  if(confirm("you sure buddy?")) await deleteDoc(doc(db, "events", id));
}
  
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

  

 function openCity(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
} 


</script>
