<template>
  <body>
 <div class="tab">
 <button class="tablinks" @click="setActiveTab('Events')">Events</button>
 <button class="tablinks" @click="setActiveTab('Shop')">Shop</button>
 <button class="tablinks" @click="setActiveTab('Table')">Table Reservations</button>
 <button class="tablinks" @click="setActiveTab('Account')">Accounts</button>
</div>

<!-- Tab content -->
<div v-show="activeTab === 'Events'" class="tabcontent">
 <div class="form-container">
   <form @submit.prevent="addEvent">
     <h2>Add New Event</h2>
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
       required>
      </textarea>
      <input type="text" name="product" list="productName" v-model="gameName" @change="gameChange()" />
        <datalist  id="productName">
          <option v-for="game in myGames" :key="game.id">{{ game.name }}</option>
        </datalist>
        <input
        v-model="gameFormat"
        class="we"
        placeholder="Format"
        list="formatName"
        @change="formatChange()">
        <datalist  id="formatName">
          <option v-for="format in selectedGameFormats" >{{ format }}</option>
        </datalist>
     
     <button type="submit" class="submit-btn">Submit</button>
   </form>
 </div>
 <table>
     <thead>
       <th scope="col">Name</th>
       
       <th scope="col">Desc</th>
       <th scope="col">Game</th>
       <th scope="col">Format</th>
       <th scope="col">Start Date</th>
       <th scope="col">End Time</th>
       <th scope="col">Actions</th>
     </thead>
     <tbody v-for="event in sortedEvents" :key="event.id">
       <tr >
         <td class="name">{{ event.name }}</td>
         <td class="scrollable-cell"><div class="scrollable-content">{{ event.desc }}</div></td>
         <td>{{ event.game }}</td>
          <td>{{ event.format }}</td>
         <td>{{ funkyDate(event.startDate) }}</td>
         <td>{{ funkyDateNumbaTwo(event.endDate) }}</td>
         <td >
           <button class="editBut"
            
           >edit</button>
           <button class="delBut"
             @click="deleteEvent(event.id)"
           >delete</button>
         </td>
         
       </tr>
       <tr class="filler-row"></tr>
     </tbody>
   </table>
</div>

<div v-show="activeTab === 'Shop'" class="tabcontent">
 sdfsdfsd
</div>

<div v-show="activeTab === 'Table'" class="tabcontent">
 <h3>Table Reservations</h3>
 <p>Tokyo is the capital of Japan.</p>
</div>
<div v-show="activeTab === 'Account'" class="tabcontent">
 <h3>Accounts</h3>
 <p>Tokyo is the capital of Japan.</p>
</div>
</body> 
</template>

<style scoped>
body{
  font-family:Arial, Helvetica, sans-serif
}
.we{
  color:black;
}
h2{
 margin-inline:auto;
}
th{
 font-size: 1.8rem;
 font-family:'Times New Roman', Times, serif;
 background-color: grey;

}
.filler-row{
 border-bottom: rgba(255, 255, 255, 0.356) .2rem solid;
 

 


}
.name{
 text-align: center;
 
 font-weight:bold;
}
td{
font-size:1.3rem;
min-height:100%;
width:100%;
border: grey 1px solid;
}
.scrollable-cell {
   position: relative;
   text-align:left;
}

.scrollable-content {
   max-height: 6rem; 
   overflow-y: auto;
  
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   padding: 1rem; /* to match the padding of other cells */
}
.editBut{
 background-color: rgb(24, 216, 56);
 padding: .4rem;
 font-weight:bold;
 border-radius: 4px;
}
.delBut{
 background-color: rgba(255, 18, 18, 0.678);
 padding: .4rem;
 font-weight:bold;
 border-radius: 4px;
 margin-left:5px;
 
}

th,
td {
 width: 150px;
 text-align: center;
 
 padding: 1rem;
 
}

table { 
   
   table-layout:fixed;
   width:100%;
   border-collapse:collapse;
  
   border-spacing:0 15px;
  
  
}

tr{
 padding:10rem;
}




.submit-btn{
  
  background-color: rgb(168, 41, 168);
  font-size: 20px;
  border-radius: 10px;
  padding:5px;
  border:none;
  color:white;
  width:30%;
  margin-inline:auto;
}
.form-container{
  
 margin-inline:auto;
  width: clamp(200px, 90vw,35rem);
 
  display:flex;
  
  background-color: rgb(66, 60, 63);
 
 
  border-radius: 10px;
  color:white;
  margin-top: 4rem;

}
form{
   width:clamp(23rem,100%,5000px);
   display:flex;
   flex-direction: column;
   padding: 1.25em;
   gap:.8rem;
   
   
}
input{
 padding-left:1rem;
}
textarea{
 color:black;
 padding-left:1rem;
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

 padding: 6px 12px;
 border: 1px solid #ccc;
 background-color: #312d2d;
 border-top: none;
}
</style>
<script setup>


import { onMounted, ref, computed } from 'vue'
import { collection, onSnapshot, addDoc, Timestamp, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db } from "@/firebase"

const newEvent = ref({
 name: '',
 startTime: '',
 endTime:'',
 desc: ''
})

const myGames = ref([])
const gameName = ref('')
const gameFormat = ref('')
const selectedGameFormats = ref([])
var newGame = false
var newFormat = false
const activeTab = ref('Events');


const myEvents = ref([])
const setActiveTab = (tabName) => {
  activeTab.value = tabName;
};

const addEvent = async () =>{
   await addDoc(collection(db, "events"), {
     name: newEvent.value.name,
     desc: newEvent.value.desc,
     startDate: Timestamp.fromDate(new Date(newEvent.value.startTime)),
     endDate: Timestamp.fromDate(new Date(newEvent.value.endTime)),
     game: gameName.value == "" ? null : gameName.value,
    format: gameFormat.value == "" ? null : gameFormat.value,
     creationDate: Timestamp.fromDate(new Date())
   });

   if(newGame) {
    await addDoc(collection(db, "game"), {
    name: gameName.value,
    format: []
  }).then(() =>{
    newGame = false
  }).catch(err => {
    console.log(err);
  })
  }
  if(newFormat){
    const i = myGames.value.findIndex(e => e.name === gameName.value);
    selectedGameFormats.value.push(gameFormat.value)
    console.log(myGames.value[i].id)
    var gameRef = doc(db, "game", myGames.value[i].id)
    await updateDoc(gameRef, {
      format: Array.from(selectedGameFormats.value)
    }).then(() =>{
    selectedGameFormats.value = Array.from(myGames.value[i].format)
    newFormat = false
  }).catch(err => {
    console.log(err);
  })
  }
  newEvent.value = {
     name: '',
     startTime: '',
     endTime: '',
     desc: ''
   };
   gameName.value = '';
   gameFormat.value = '';
}
 

const deleteEvent = async id => {
 if(confirm("you sure buddy?")) await deleteDoc(doc(db, "events", id));
}

const gameChange = () => {
  const i = myGames.value.findIndex(e => e.name === gameName.value);
  if (i > -1 && myGames.value[i].format) {
    newGame = false
    selectedGameFormats.value = Array.from(myGames.value[i].format)
  } else {
    newGame = true
    selectedGameFormats.value = []
  }
}

const formatChange = () => {
  const i = Array.from(selectedGameFormats.value).indexOf(gameFormat.value)
  if (i > -1) {
    newFormat = false
  } else {
    newFormat = true
  }
  if(gameFormat.value == ""){
    newFormat = false
  }
}
 
onMounted( () => {
 onSnapshot(collection(db, 'events'), (querySnapshot) => {
   const tmpEvents = [];
   querySnapshot.forEach((doc) => {
     const event = {
       id: doc.id,
       name: doc.data().name,
       desc: doc.data().desc,
       game: doc.data().game || "No Game Set In Database",
        format: doc.data().format || [],
       startDate: new Date(doc.data().startDate.seconds*1000),
       endDate: new Date(doc.data().endDate.seconds*1000)
     }
     tmpEvents.push(event)
   });
   myEvents.value = tmpEvents
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


const sortedEvents = computed(() => {
  return myEvents.value.slice().sort((a, b) => a.startDate - b.startDate);
});

function funkyDate(date) {
   let hours = date.getHours();
   hours = hours %12;
   const day = String(date.getDate()).padStart(2, '0');
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const someHours = String(hours).padStart(2, '0');
   const minutes = String(date.getMinutes()).padStart(2, '0'); // January is 0!
  
   return `${month}/${day} ${someHours}:${minutes} PM`;
}
function funkyDateNumbaTwo(date) {
 let hours = date.getHours();
   hours = hours %12;
 const someHours = String(hours).padStart(2, '0');
   const minutes = String(date.getMinutes()).padStart(2, '0');
   return `${someHours}:${minutes} PM`;
}

 



</script>