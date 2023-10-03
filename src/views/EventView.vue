<template>
  <div>
    <form @submit.prevent="addEvent" autocomplete="off">
      <h2>Add New Event:</h2>
      <input
        v-model="newEvent.name"
        class="input"
        placeholder="Event Name"
        type="text"
        required>
      <br>
        <label for="startTime">Start Time: </label>
      <input 
        v-model="newEvent.startTime"
        type="datetime-local"
        id="startTime" 
        name="startTime"
        required>
      <br>
      <label for="endTime">End Time: </label>
      <input 
        v-model="newEvent.endTime"
        type="datetime-local"
        id="endTime" 
        name="endTime"
        required>
      <br>
      <textarea
        v-model="newEvent.desc"
        class="input"
        placeholder="Event Description"
        type="textarea"
        required></textarea>
      <br>
      <input type="text" name="product" list="productName" v-model="gameName" @change="gameChange()" />
        <datalist  id="productName">
          <option v-for="game in myGames" :key="game.id">{{ game.name }}</option>
        </datalist>
      <button type="submit">Submit</button>
      <br>
      <input
        v-model="gameFormat"
        placeholder="Format"
        list="formatName"
        @change="formatChange()">
        <datalist  id="formatName">
          <option v-for="format in selectedGameFormats" >{{ format }}</option>
        </datalist>
    </form>
  </div>
    <table>
      <thead>
        <th scope="col">Name</th>
        <th scope="col">Desc</th>
        <th scope="col">Start Date</th>
        <th scope="col">End Date</th>
        <th scope="col">Game</th>
        <th scope="col">Format</th>
        <th scope="col">Actions</th>
      </thead>
      <tbody>
        <tr v-for="event in myEvents" :key="event.id">
          <td>{{ event.name }}</td>
          <td>{{ event.desc }}</td>
          <td>{{ event.startDate }}</td>
          <td>{{ event.endDate }}</td>
          <td>{{ event.game }}</td>
          <td>{{ event.format }}</td>
          <td>
            <button
              @click="deleteEvent(event.id)"
            >delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { collection, onSnapshot, addDoc, Timestamp, doc, deleteDoc, updateDoc } from "firebase/firestore"; 
import { db } from "@/firebase"

const newEvent = ref({
  name: '',
  startTime: '',
  endTime:'',
  desc: ''
})

const myEvents = ref([])
const myGames = ref([])
const gameName = ref('')
const gameFormat = ref('')
const selectedGameFormats = ref([])
var newGame = false
var newFormat = false

const addEvent = async () =>{
  console.log("Value of newGame")
  console.log(newGame)
  console.log("Value of newFormat")
  console.log(newFormat)
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
    console.log("new Game added")
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
    console.log("new format added")
    newFormat = false
  }).catch(err => {
    console.log(err);
  })
  }
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
  console.log("formatChange called")
  console.log("Value of selectGameFormats:")
  console.log(Array.from(selectedGameFormats.value))
  const i = Array.from(selectedGameFormats.value).indexOf(gameFormat.value)
  console.log("Value of i")
  console.log(i)
  if (i > -1) {
    newFormat = false
    console.log("format in database")
  } else {
    newFormat = true
    console.log("format not in database")
  }
  if(gameFormat.value == ""){
    newFormat = false
  }
}
  

onMounted(() => {
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
</script>

