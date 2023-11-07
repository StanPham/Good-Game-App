<script setup>
import { onAuthStateChanged, RecaptchaVerifier, PhoneAuthProvider } from "firebase/auth";
import { db, firebaseAppAuth } from '@/firebase'
import { ref, onMounted, watch, computed } from "vue";
import { doc, collection, onSnapshot } from "firebase/firestore";
import UserReservations from '../components/userprofile/UserReservations.vue'

const shopReservationList = ref([])

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

        fetchUserData(currentUser.uid);
    }
})

const fetchUserData = () => {
  if (user.value) {
    const docRef = doc(db, 'shopReservation', user.value.uid);
    onSnapshot(docRef, (doc) => {
      if (doc.exists) {
        const reservations = doc.data().reservations;
        const tmpShopReservationList = [];
        for (let i = 0; i < reservations.length; i++) {
          tmpShopReservationList.push({
            id: i + 1,
            productId: reservations[i].productID,
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
      creationDate: item.creationDate,
      quantity: item.quantity
    }
  });
});

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
            <button type="submit" class="submit-btn main-btn">Verify</button>
            </div>

            <label for="phone">Phone Number</label>
            <div>
            <input type="tel" class="form-input" name="phone"  v-model="userTableInfo.phoneNumber">
            <button type="submit" class="submit-btn main-btn">Verify</button>
            </div>

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
    <UserReservations v-if="myReservations.length" :reservations = "myReservations" />
</div>
</template>

<style scoped>
@import '@/assets/LoginSignup.css';
@import '@/assets/UserProfile.css';
     
.reservations-card-wrap{
    width: clamp(200px, 90vw,50rem);
    margin-inline:auto;
}

   
</style>