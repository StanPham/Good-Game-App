<script setup>
import { 
  onAuthStateChanged, 
  RecaptchaVerifier, 
  PhoneAuthProvider, 
  updatePhoneNumber, 
  sendEmailVerification } from "firebase/auth";

import { db, firebaseAppAuth, firebaseFunctions } from '@/firebase'
import { ref, onMounted, watch, computed } from "vue";
import { httpsCallable } from 'firebase/functions';
import { doc, collection, onSnapshot } from "firebase/firestore";
import UserReservations from '../components/userprofile/UserReservations.vue'

const shopReservationList = ref([])
const phoneNumber = ref('')
const user = ref(null)
const userTableInfo = ref({
    displayName: '(Not Set)',
    email: '',
    phoneNumber: '+1'
})

const submitUserUpdate = () => {
    //TODO
}

onAuthStateChanged(firebaseAppAuth, currentUser => {
    user.value = currentUser
    if(currentUser){
        userTableInfo.value = {
            displayName: user?.value.displayName ? user?.value.displayName : '(Not Set)' ,
            email: user?.value.email,
            phoneNumber: user?.value.phoneNumber ? user?.value.phoneNumber : '+1'
        }

        fetchUserData();
    }
})

const fetchUserData = () => {
  if (user.value) {
    const docRef = doc(db, 'shopReservation', user.value.uid);
    onSnapshot(docRef, (doc) => {
      console.log("here")
      console.log(doc.exists())
      if (!doc.exists()) {

        shopReservationList.value = []
        
      } else {
        const reservations = doc.data().reservations;
        const tmpShopReservationList = [];
        for (let i = 0; i < reservations.length; i++) {
          tmpShopReservationList.push({
            id: i,
            productId: reservations[i].productID,
            productName: reservations[i].productName,
            creationDate: new Date(reservations[i].creationDate.seconds * 1000),
            quantity: reservations[i].quantity
          });
        }
        shopReservationList.value = tmpShopReservationList;
        console.log(shopReservationList.value)
      }
    });
  }
};

const submitPhoneNumber = async () => {
    console.log(userTableInfo.value.phoneNumber)
    const countryCode = '+1'
    const applicationVerifier = new RecaptchaVerifier(firebaseAppAuth,'recaptcha-container');
    const provider = new PhoneAuthProvider(firebaseAppAuth);
    const fullPhoneNumber = countryCode + phoneNumber.value;
    await provider.verifyPhoneNumber(fullPhoneNumber, applicationVerifier)
        .then((result) =>{
            applicationVerifier.clear()
            console.log("sms sent")
            var verifyCode = window.prompt("Please enter the verification \n code that was sent to your device")
            return PhoneAuthProvider.credential(result,verifyCode)
        }).then((phoneCredential) =>{
            return updatePhoneNumber(user.value, phoneCredential).then((result) => {
                console.log("worked")
            })
        }).catch((err) => {
            console.log(err)
        })
}

watch(user, (newValue) => {
  if (newValue) {
    fetchUserData();
  }
});

onMounted(fetchUserData);

const myReservations = computed(() => {
  return shopReservationList.value.map(item => {
    return {
      id: item.id,
      productName: item.productName,
      creationDate: item.creationDate,
      quantity: item.quantity
    }
  });
});

const deleteReservation = async (index) => {
  console.log("this button")
  console.log(index)
  const deleteReservation = httpsCallable(firebaseFunctions, 'deletereservation');
  await deleteReservation({ 
    uid: user.value.uid,
    index: index,
    state: "delete"
  })
  .then((result) => {
      console.log(result.data.message)
  }).catch(err => {
      console.log(err);
  });
}

               
</script>

<template>

<div>
    <div class = "form-container">
        
        <form @submit.prevent="submitUserUpdate">
            <h4>USER INFORMATION</h4>
            
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="userTableInfo.displayName">

            <label for="email">Email</label>
            <div>
                <input type="text" class="form-input" name="email" v-model="userTableInfo.email">
                <button v-if="!user?.emailVerified" type="button" class="submit-btn main-btn">Verify Email</button>
            </div>

            <label for="phone">Phone Number</label>
            <div>
                <input type="tel" class="form-input" name="phone" pattern="[0-9]{10}" v-model="userTableInfo.phoneNumber">
                <button v-if="!user?.phoneNumber" type="button" class="submit-btn main-btn" @click="submitPhoneNumber">Verify Phone</button>
            </div>
                
            <div id="recaptcha-container"></div>

            <button type="submit" class="submit-btn main-btn">Update</button>
        </form>
       
    </div>

    <!-- <div class="profile-container">
        <div class="container">
            <h1 class="profile-header">header</h1>
            <div class="profile-body-container">
                <h1 class="body-header">event header</h1>
                <div class="profile-body">
                    <h2 class="pink-italic">todays event name </h2>
                    <h3 class="pink"> todays event format</h3>
                    <div class="bold title-scale">start time div</div>
                </div>
                    
                <p class="profile-description font-med">hi hello</p>
                <br>
                <button class="all-events-btn main-btn-full bold" @click="goEvent">All Events</button>
            </div>
        </div>
    </div> -->
</div>

  <br><br>
  <div class="reservations-card-wrap rc black">
      <UserReservations @delete-reservation="deleteReservation" v-if="myReservations.length" :reservations = "myReservations" />
  </div>
</template>

<style scoped>
/* @import '@/assets/LoginSignup.css'; */
@import '@/assets/UserProfile.css';
     
.reservations-card-wrap{
    width: clamp(200px, 90vw,50rem);
    margin-inline:auto;
}

   
</style>