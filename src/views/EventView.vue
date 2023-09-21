<template>
  <div>
    <form @submit.prevent="addEvent">
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
</script>

