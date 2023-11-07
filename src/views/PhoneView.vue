<script setup>
import { ref } from "vue";
import { httpsCallable } from 'firebase/functions';
import { updatePhoneNumber } from "firebase/auth";
import { onAuthStateChanged, RecaptchaVerifier, PhoneAuthProvider } from "firebase/auth";
import { db, firebaseAppAuth, firebaseFunctions } from '@/firebase'
import { doc, onSnapshot} from "firebase/firestore"; 
const phoneNumber = ref('')
const user = ref(null)

const shopReservationList = ref([])

const submitPhoneNumber = async () => {
    console.log(phoneNumber.value)
    const countryCode = '+1'
    const applicationVerifier = new RecaptchaVerifier(firebaseAppAuth,'recaptcha-container');
    const provider = new PhoneAuthProvider(firebaseAppAuth);
    const fullPhoneNumber = countryCode + phoneNumber.value;
    await provider.verifyPhoneNumber(fullPhoneNumber, applicationVerifier)
        .then((result) =>{
            applicationVerifier.clear()
            console.log("sms sent")
            var verifyCode = window.prompt("Please enter the verification\ncode that was sent to your device")
            return PhoneAuthProvider.credential(result,verifyCode)
        }).then((phoneCredential) =>{
            return updatePhoneNumber(user.value, phoneCredential).then((result) => {
                console.log("worked")
            })
        }).catch((err) => {
            console.log(err)
        })
}

const submitDeleteReservation = async () => {
    console.log("button pressed")

    console.log("uid:")
    console.log(user.value.uid)
    console.log("Index:")
    console.log(0)
    // const createReservation = httpsCallable(firebaseFunctions, 'addreservation');
    // await createReservation({ 
    //     productID: productID,
    //     quantity: amount.value
    // })
    // .then((result) => {
    //     createReservationResponse.value = result.data.message
    // }).catch(err => {
    //     console.log(err);
    // });

    const deleteReservation = httpsCallable(firebaseFunctions, 'deletereservation');
    await deleteReservation({ 
      uid: user.value.uid,
      index: 0,
      state: "delete"
    })
    .then((result) => {
        console.log(result.data.message)
    }).catch(err => {
        console.log(err);
    });
}


onAuthStateChanged(firebaseAppAuth, currentUser => {
    user.value = currentUser
    onSnapshot(doc(db, 'shopReservation', user.value.uid), (doc) => {
    if(doc.exists()){
        const tmpShopReservationList = [];
        const reservationArr = doc.data().reservations;
        reservationArr.splice(0,1)
        console.log("here")
        console.log(reservationArr.length)
        const arrayLength = reservationArr.length
        
        for(var i = 0; i <= arrayLength - 1; i++){
            const item = {
                productId: reservationArr[i].productID,
                creationDate: new Date(reservationArr[i].creationDate.seconds*1000),
                quantity: reservationArr[i].quantity,
                index: i
            }
            tmpShopReservationList.push(item);
        }
        console.log(tmpShopReservationList)
        shopReservationList.value = tmpShopReservationList;
        console.log(shopReservationList.value)
    }
  });
})
</script>

<template>
    <div class="phone-main">
        <div v-if="user">
            email: {{ user?.email }}
            phone number: {{ user?.phoneNumber }}
        </div>
        <form @submit.prevent="submitPhoneNumber">
            <h1>Phone Number</h1>
            
            <label for="phone">Enter your phone number:</label>
            <input style="color:black;" type="tel" v-model="phoneNumber" name="phone" pattern="[0-9]{10}" required> 
            <div id="recaptcha-container"></div>
            <button type="submit" class="submit-btn main-btn">Send Code</button>
        </form>
        <button @click="submitDeleteReservation()" class="submit-btn main-btn">Don't press this</button>
    </div>

</template>

<style scoped>
.phone-main{
    margin-top: 100px;
}
</style>