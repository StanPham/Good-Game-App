<template>
  <div>
    <form @submit.prevent="addEvent">
      <h2>Add New Event:</h2>
      <input
        v-model="newEventName"
        class="input"
        placeholder="Event Name"
        type="text"
        required>
      <br>
        <label for="startTime">Start Time: </label>
      <input 
        v-model="newEventStartTime"
        type="datetime-local"
        id="startTime" 
        name="startTime"
        required>
      <br>
      <label for="endTime">End Time: </label>
      <input 
        v-model="newEventEndTime"
        type="datetime-local"
        id="endTime" 
        name="endTime"
        required>
      <br>
      <textarea
        v-model="newEventDesc"
        class="input"
        placeholder="Event Description"
        type="textarea"
        required></textarea>
      <br>
      <button type="submit">Submit</button>
    
    
    
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
      <tbody>
        <tr v-for="event in myEvents" :key="event.id">
          <td>{{ event.name }}</td>
          <td>{{ event.desc }}</td>
          <td>{{ event.startDate }}</td>
          <td>{{ event.endDate }}</td>
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
import { onMounted, ref} from 'vue'
import { collection, onSnapshot, addDoc, Timestamp, doc, deleteDoc } from "firebase/firestore"; 
import { db } from "@/firebase"

// gotta figure out if you need these refs
const newEventStartTime = ref('')
const newEventEndTime = ref('')
const newEventName = ref('')
const newEventDesc = ref('')

const myEvents = ref([])

const addEvent = async () =>{
    console.log("i made it here")
    await addDoc(collection(db, "events"), {
      name: newEventName.value,
      desc: newEventDesc.value,
      startDate: Timestamp.fromDate(new Date(newEventStartTime.value)),
      endDate: Timestamp.fromDate(new Date(newEventEndTime.value)),
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
</script>

