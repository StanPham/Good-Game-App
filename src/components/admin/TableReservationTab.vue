<script setup>
import { db, firebaseFunctions  } from "../../firebase.js"
import { collection, onSnapshot} from "firebase/firestore"; 
import { onMounted, ref, computed } from 'vue'
import { httpsCallable } from 'firebase/functions';

const tableReservationList = ref([])
const searchQuery = ref('')

onMounted( () => {
  onSnapshot(collection(db, 'tableReservations'), (querySnapshot) => {
    const tmpTableReservationList = [];
    let counter = 0;
    querySnapshot.forEach((doc) => {
      const reservationArr = doc.data().userReservations;
      const arrayLength = reservationArr.length
      
      for(var i = 0; i <= arrayLength - 1; i++){
        
        const item = {
          id: counter,
          docID: doc.id,
          email: reservationArr[i].email,
          username: reservationArr[i].name,
          date: reservationArr[i].date,
          tableType: reservationArr[i].tableType,
          numTables: reservationArr[i].numberOfTables,
          startTime: reservationArr[i].startTime,
          endTime: reservationArr[i].endTime  
        }
        
        tmpTableReservationList.push(item);
        counter++;
      }
    });
    tableReservationList.value = tmpTableReservationList;
  });
})


// const deleteReservation = async (index, uid, state) => {
//   console.log("this button")
//   console.log(index)
//   const deleteReservation = httpsCallable(firebaseFunctions, 'deletereservation');
//   await deleteReservation({ 
//     uid: uid,
//     index: index,
//     state: state
//   })
//   .then((result) => {
//       console.log(result.data.message)
//   }).catch(err => {
//       console.log(err);
//   });
// }

const filteredReservations = computed(() => {
    return tableReservationList.value.filter(item => 
        item.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});
 </script>

 <template>
  <body>
    <div class="search">
      <div class="search-container">
        <img src="../../images/search.svg" alt="deez" class="search-icon">
        <input type = "text" class="input-box" placeholder="Search" v-model="searchQuery">
      </div>
    </div>
    <table>
      <thead>
        <th scope="col">Email</th>
        <th scope="col">Username</th>
        <th scope="col">Quantity</th>
        <th scope="col">Time of Reservation</th>
        <th scope="col">Actions</th>
      </thead>
        
      <tbody v-for="reservation in filteredReservations" :key="reservation.id">
        <tr>
          <td class="name">{{ reservation.email }}</td>
          <td>{{ reservation.username }}</td>
          <td>{{ reservation.date }}</td>
          <td>{{ reservation.tableType }}</td>
          
          <td>{{ reservation.numTables }}</td>
          <td>{{ reservation.startTime }}</td>
          <td>{{ reservation.endTime }}</td>
          
        </tr>
        <tr class="filler-row"></tr>
      </tbody>
    </table>
  </body>
</template>

<style scoped>
@import '@/assets/AdminTabs.css';

@media(max-width:1000px){
  th,td{
    font-size:.5rem;
  }

}
</style>
