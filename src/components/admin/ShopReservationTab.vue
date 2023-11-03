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
        console.log("item:")
        console.log(item)
        tmpShopReservationList.push(item);
      }
    });
  console.log(tmpShopReservationList)
  shopReservationList.value = tmpShopReservationList;
  console.log(shopReservationList.value)
  });
})
 </script>

 <template>


 </template>