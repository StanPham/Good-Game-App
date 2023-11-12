<script setup>
import { collection, onSnapshot, addDoc, Timestamp, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db, storage } from "@/firebase"
import{ref as storageRef, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { onMounted, ref, computed } from 'vue'
import AdminSuccess from "../alerts/AdminSuccess.vue";

const keepData = ref(false);

const newEvent = ref({
 name: '',
 startTime: '',
 endTime:'',
 desc: ''
})

const showPopup = ref(false);
const showEditPopup = ref(false);
const myGames = ref([])
const gameName = ref('')
const gameFormat = ref('')
const selectedGameFormats = ref([])
const logoFlag = ref(false)
let gameImage = ref(null)
var newGame = false
var newFormat = false

const showEditModal = ref(false);
const editingEvent = ref({});

const myEvents = ref([])


const displayPopup = () => {
  showPopup.value = true;
  setTimeout(() => {
    showPopup.value = false;

  }, 50);
}

const displayEditPopup = () => {
  showEditPopup.value = true;
  setTimeout(() => {
    showEditPopup.value = false;

  }, 50);
}

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
    format: [],
    logo: gameImage.value
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
  if(gameImage.value){
    const i = myGames.value.findIndex(e => e.name === gameName.value);
    let gameRef = doc(db, "game", myGames.value[i].id)
    await updateDoc(gameRef, {
      logo: gameImage.value
    }).then(() => {
      gameImage.value = null;
    }).catch(err => {
      console.log(err);
    })
  }
  if (!keepData.value) { 
    newEvent.value = {
        name: '',
        startTime: '',
        endTime: '',
        desc: ''
    };
    gameName.value = '';
    gameFormat.value = '';
    logoFlag.value = false;
} else {
   
    const startTimeDate = new Date(newEvent.value.startTime);
    const endTimeDate = new Date(newEvent.value.endTime);
    startTimeDate.setDate(startTimeDate.getDate() + 7);
    endTimeDate.setDate(endTimeDate.getDate() + 7);
    startTimeDate.setMinutes(startTimeDate.getMinutes() - startTimeDate.getTimezoneOffset());
    endTimeDate.setMinutes(endTimeDate.getMinutes() - endTimeDate.getTimezoneOffset());

    newEvent.value.startTime = startTimeDate.toISOString().slice(0,16);
    newEvent.value.endTime = endTimeDate.toISOString().slice(0,16);
}
displayPopup();
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

const onImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const imageRef = storageRef(storage, 'game-images/' + file.name);
        await uploadBytesResumable(imageRef, file);
        
        gameImage.value = await getDownloadURL(imageRef);
  
    }
}

onMounted( () => {
 onSnapshot(collection(db, 'events'), (querySnapshot) => {
   const tmpEvents = [];
   querySnapshot.forEach((doc) => {
     const event = {
        id: doc.id,
        name: doc.data().name,
        desc: doc.data().desc || [],
        game: doc.data().game || "No Game Set In Database",
        format: doc.data().format || [],
        startDateObj: new Date(doc.data().startDate.seconds*1000),
        endDateObj: new Date(doc.data().endDate.seconds*1000),
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
  return myEvents.value.slice().sort((a, b) => a.startDateObj - b.startDateObj);
});

function fullDate(dateObj) {
   let hours = dateObj.getHours();
   hours = hours %12;
   const day = String(dateObj.getDate()).padStart(2, '0');
   const month = String(dateObj.getMonth() + 1).padStart(2, '0');
   const someHours = String(hours).padStart(2, '0');
   const minutes = String(dateObj.getMinutes()).padStart(2, '0'); // January is 0!
  
   return `${month}/${day} ${someHours}:${minutes} PM`;
}

function onlyTime(dateObj) {
 let hours = dateObj.getHours();
   hours = hours %12;
 const someHours = String(hours).padStart(2, '0');
   const minutes = String(dateObj.getMinutes()).padStart(2, '0');
   return `${someHours}:${minutes} PM`;
}

const startEditing = (event) => {
   editingEvent.value = { ...event };
   editingEvent.value.startTime = `${event.startDateObj.getFullYear()}-${String(event.startDateObj.getMonth() + 1).padStart(2, '0')}-${String(event.startDateObj.getDate()).padStart(2, '0')}T${String(event.startDateObj.getHours()).padStart(2, '0')}:${String(event.startDateObj.getMinutes()).padStart(2, '0')}`;
   editingEvent.value.endTime = `${event.endDateObj.getFullYear()}-${String(event.endDateObj.getMonth() + 1).padStart(2, '0')}-${String(event.endDateObj.getDate()).padStart(2, '0')}T${String(event.endDateObj.getHours()).padStart(2, '0')}:${String(event.endDateObj.getMinutes()).padStart(2, '0')}`;

   gameName.value = event.game || "";
   gameFormat.value = event.format || "";
   showEditModal.value = true;
}

const updateEvent = async () => {
   await updateDoc(doc(db, "events", editingEvent.value.id), {
     name: editingEvent.value.name,
     desc: editingEvent.value.desc,
     startDate: Timestamp.fromDate(new Date(editingEvent.value.startTime)),
     endDate: Timestamp.fromDate(new Date(editingEvent.value.endTime)),
     game: gameName.value == "" ? null : gameName.value,
     format: gameFormat.value == "" ? null : gameFormat.value,
   });

   showEditModal.value = false;
   gameName.value = '';
   gameFormat.value = '';
   editingEvent.value = {};
   displayEditPopup();
}

const closeEditModal = () => {
  showEditModal.value = false;
  gameName.value = '';
  gameFormat.value = '';
}

const deletePastEvents = async () => {
  const now = new Date();
  const pastEvents = myEvents.value.filter(event => event.endDateObj < now);

  for(const event of pastEvents){
    await deleteDoc(doc(db, "events", event.id));
  }
}

const addLogo = () => {
  logoFlag.value = true;
}
 </script>

<template>
<body>
<div class="form-container">
   <form @submit.prevent="addEvent">
      <h2>Add New Event</h2>
      <label for="eventName">Event Name</label>
      <input
      v-model="newEvent.name" 
      class="input"

      type="text"
      required>

      <label for="startTime">Start Time</label>
      <input 
      v-model="newEvent.startTime"
      type="datetime-local"
      id="startTime" 
      name="startTime"
      required>


      <label for="endTime">End Time</label>
      <input 
      v-model="newEvent.endTime"
      type="datetime-local"
      id="endTime" 
      name="endTime"
      required>

      <label for="Description">Description</label>
      <textarea
      v-model="newEvent.desc"
      class="input"

      type="textarea"
      >
      </textarea>

      <label for="game">Game</label>
      <input type="text" name="product" list="productName" v-model="gameName" @change="gameChange()" />
      <datalist  id="productName">
      <option v-for="game in myGames" :key="game.id">{{ game.name }}</option>
      </datalist>

      <label for="Format">Format (optional)</label>
      <input
      v-model="gameFormat"
      class="game-form"

      list="formatName"
      @change="formatChange()">
      <datalist  id="formatName">
      <option v-for="format in selectedGameFormats" >{{ format }}</option>
      </datalist>

      <button v-if="!logoFlag" type="button" class="variant-btn" @click="addLogo">Add Logo +</button>
      <div v-if="logoFlag" class="flex column gap">
        <label for="iamge">Logo</label>
          <input
            class="input"
            type="file"
            @change="onImageChange"
          >
      </div>
      <button type="submit" class="submit-btn">Submit</button>

      <label for="keepData" class="check-wrap">Keep Data:
      <input type="checkbox" id="keepData" class="checkbox" v-model="keepData">
      </label>

   </form>
 </div>
  <!-- editing form stuff -->
  <div v-if="showEditModal" class="overlay" @click="showEditModal = false"></div>
    <div v-if="showEditModal" class="form-container editing-container">
      <form @submit.prevent="updateEvent">
        <h2>Edit Event</h2>
        
        <label for="eventName">Event Name</label>
        <input
        v-model="editingEvent.name" 
        class="input"

        type="text"
        required>

        <label for="startTime">Start Time</label>
        <input 
        v-model="editingEvent.startTime"
        type="datetime-local"
        id="startTime" 
        name="startTime"
        required>


        <label for="endTime">End Time</label>
        <input 
        v-model="editingEvent.endTime"
        type="datetime-local"
        id="endTime" 
        name="endTime"
        required>

        <label for="Description">Description</label>
        <textarea
        v-model="editingEvent.desc"
        class="input"

        type="textarea"
        >
        </textarea>

        <label for="game">Game</label>
        <input type="text" name="product" list="productName" v-model="gameName" @change="gameChange()" />
        <datalist  id="productName">
        <option v-for="game in myGames" :key="game.id">{{ game.name }}</option>
        </datalist>

        <label for="Format">Format (optional)</label>
        <input
        v-model="gameFormat"
        class="game-form"

        list="formatName"
        @change="formatChange()">
        <datalist  id="formatName">
        <option v-for="format in selectedGameFormats" >{{ format }}</option>
        </datalist>
          
        <button type="submit" class="submit-btn">Save Changes</button>
        <img src="../../images/x.svg" @click="closeEditModal" class="cancel-btn icon-white click">
      </form>
    </div>
     <!-- end editing form -->
 <div class="delete-past-events-wrapper pad-bot">
  <button class="main-btn-full delete-past-events-btn" @click="deletePastEvents">Delete Past Events</button>
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
         <td>{{ fullDate(event.startDateObj) }}</td>
         <td>{{ onlyTime(event.endDateObj) }}</td>
         <td >
           <button class="edit-btn"
             @click="startEditing(event)"
           >edit</button>
           <button class="del-btn"
             @click="deleteEvent(event.id)"
           >delete</button>
         </td>
         
       </tr>
       <tr class="filler-row"></tr>
     </tbody>
  </table>
  <transition name="fade-translate">
    <AdminSuccess v-if="showPopup" message="Event Added" />
  </transition>
  <transition name="fade-translate">
    <AdminSuccess v-if="showEditPopup" message="Edit Success!" />
  </transition>
</body> 
</template>

<style scoped>
@import '@/assets/AdminTabs.css';
.game-form{
  color:black;
}

</style>