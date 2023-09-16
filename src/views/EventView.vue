<template>
    <table>
      <thead>
        <th scope="col">Name</th>
        <th scope="col">Desc</th>
      </thead>
      <tbody>
        <tr v-for="event in myEvents" :key="event.id">
          <td>{{ event.name }}</td>
          <td>{{ event.desc }}</td>
        </tr>
      </tbody>
    </table>
    <div>
  </div>
</template>

<script setup>
import { onMounted, ref} from 'vue'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "@/firebase"

const myEvents = ref([])

onMounted(async () => {
const querySnapshot = await getDocs(collection(db, "events"));
  let tmpEvents = []
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    const event = {
      id: doc.id,
      name: doc.data().name,
      desc: doc.data().desc
    }
    tmpEvents.push(event)
  });
  myEvents.value = tmpEvents
})
</script>

