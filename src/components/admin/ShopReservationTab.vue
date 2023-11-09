<script setup>
import { db, firebaseFunctions  } from "@/firebase"
import { collection, onSnapshot} from "firebase/firestore"; 
import { onMounted, ref } from 'vue'
import { httpsCallable } from 'firebase/functions';

const shopReservationList = ref([])


onMounted( () => {
  onSnapshot(collection(db, 'shopReservation'), (querySnapshot) => {
    const tmpShopReservationList = [];
    let counter = 0;
    querySnapshot.forEach((doc) => {
      const reservationArr = doc.data().reservations;
      console.log("here")
      console.log(reservationArr.length)
      const arrayLength = reservationArr.length
      
      for(var i = 0; i <= arrayLength - 1; i++){
        
        const item = {
          id: counter,
          docID: doc.id,
          productId: reservationArr[i].productID,
          productName: reservationArr[i].productName,
          creationDate: new Date(reservationArr[i].creationDate.seconds*1000),
          quantity: reservationArr[i].quantity
        }
        
        tmpShopReservationList.push(item);
        counter++;
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

const deleteReservation = async (index, uid) => {
  console.log("this button")
  console.log(index)
  const deleteReservation = httpsCallable(firebaseFunctions, 'deletereservation');
  await deleteReservation({ 
    uid: uid,
    index: index,
    state: "accept"
  })
  .then((result) => {
      console.log(result.data.message)
  }).catch(err => {
      console.log(err);
  });
}
 </script>

 <template>
  <table>
     <thead>
       <th scope="col">Person</th>
       <th scope="col">Item ID</th>
       <th scope="col">Item Name</th>
       <th scope="col">Quantity</th>
       <th scope="col">Time of Reservation</th>
       <th scope="col">Actions</th>
     </thead>
       
     <tbody v-for="reservation in shopReservationList" :key="reservation.id">
       <tr >
         <td class="name">[[person]]</td>
         <td class="scrollable-cell"><div class="scrollable-content">{{ reservation.productId }}</div></td>
         <td>{{ reservation.productName }}</td>
         <td>{{ reservation.quantity }}</td>
         <td>{{ fullDate(reservation.creationDate) }}</td>
         
         <td >
      
           <button class="del-btn"
             @click="deleteReservation(reservation.id,reservation.docID)"
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
