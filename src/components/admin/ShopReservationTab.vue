<script setup>
import { db } from "@/firebase"
import { collection, onSnapshot} from "firebase/firestore"; 
import { onMounted, ref } from 'vue'

const shopReservationList = ref([])


onMounted( () => {
  onSnapshot(collection(db, 'shopReservation'), (querySnapshot) => {
    const tmpShopReservationList = [];
    querySnapshot.forEach((doc) => {
      const reservationArr = doc.data().reservations;
      console.log("here")
      console.log(reservationArr.length)
      const arrayLength = reservationArr.length
      
      for(var i = 0; i <= arrayLength - 1; i++){
        const item = {
          productId: reservationArr[i].productID,
          creationDate: new Date(reservationArr[i].creationDate.seconds*1000),
          quantity: reservationArr[i].quantity
        }
        tmpShopReservationList.push(item);
      }
    });
  console.log(tmpShopReservationList)
  shopReservationList.value = tmpShopReservationList;
  console.log(shopReservationList.value)
  });
})

function fullDate(dateObj) {
   let hours = dateObj.getHours();
   hours = hours %12;
   const day = String(dateObj.getDate()).padStart(2, '0');
   const month = String(dateObj.getMonth() + 1).padStart(2, '0');
   const someHours = String(hours).padStart(2, '0');
   const minutes = String(dateObj.getMinutes()).padStart(2, '0'); // January is 0!
  
   return `${month}/${day} ${someHours}:${minutes} PM`;
}
 </script>

 <template>
  <table>
     <thead>
       <th scope="col">Person</th>
       <th scope="col">Items</th>
       <th scope="col">Quantity</th>
       <th scope="col">Time of Reservation</th>
       <th scope="col">Actions</th>
     </thead>
       
     <tbody v-for="reservation in shopReservationList" :key="reservation.id">
       <tr >
         <td class="name">[[person]]</td>
         <td class="scrollable-cell"><div class="scrollable-content">{{ resevation.productID }}</div></td>
         <td>{{ reservation.quantity }}</td>
         <td>{{ fullDate(reservation.creationDate) }}</td>
         
         <td >
           <button class="edit-btn"
             @click="startEditing(reservation)"
           >edit</button>
           <button class="del-btn"
             @click="deleteReservation(reservation.id)"
           >delete</button>
         </td>
         
       </tr>
       <tr class="filler-row"></tr>
     </tbody>
  </table>
</template>

<style scoped>
@import '@/assets/AdminTabs.css';
</style>
