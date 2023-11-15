<script setup>
import { 
  onAuthStateChanged, 
  RecaptchaVerifier, 
  PhoneAuthProvider, 
  updatePhoneNumber, 
  sendEmailVerification } from "firebase/auth";

import { db, firebaseAppAuth, firebaseFunctions } from '@/firebase'
import { ref, onMounted, watch, computed, onUnmounted } from "vue";
import { httpsCallable } from 'firebase/functions';
import { doc, collection, onSnapshot } from "firebase/firestore";
import UserReservations from '../components/userprofile/UserReservations.vue'
import UserInfoPopups from "../components/alerts/UserInfoPopups.vue";
import greencheck from '../images/green-check.png'

const shopReservationList = ref([])
const user = ref(null)

const userTableInfo = ref({
    displayName: '(Not Set)',
    email: '',
    phoneNumber: '+1'
})
const initialDisplayName = ref('');
const initialPhoneNumber = ref('');
const initialEmail = ref('');




onAuthStateChanged(firebaseAppAuth, currentUser => {
    user.value = currentUser
   
    console.log(user.value.email)
    if(currentUser){
        userTableInfo.value = {
            displayName: user?.value.displayName ? user?.value.displayName : '(Not Set)' ,
            email: user?.value.email,
            phoneNumber: user?.value.phoneNumber ? user?.value.phoneNumber : '+1',
            isTheirEmailVerified: user?.value.emailVerified
        }
        initialDisplayName.value = userTableInfo.value.displayName;
        initialPhoneNumber.value = userTableInfo.value.phoneNumber;
        initialEmail.value = userTableInfo.value.email;
        

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
    const applicationVerifier = new RecaptchaVerifier(firebaseAppAuth,'recaptcha-container');
    const provider = new PhoneAuthProvider(firebaseAppAuth);
    console.log(userTableInfo.value.phoneNumber)
    console.log(applicationVerifier)
    await provider.verifyPhoneNumber(userTableInfo.value.phoneNumber, applicationVerifier)
        .then((result) =>{
            applicationVerifier.clear()
            console.log("sms sent")
            var verifyCode = window.prompt("Please enter the verification \n code that was sent to your device")
            return PhoneAuthProvider.credential(result,verifyCode)
        }).then((phoneCredential) =>{
            return updatePhoneNumber(user.value, phoneCredential).then((result) => {
              showPhoneMessage();
                console.log("worked")
            })
        }).catch((err) => {
            console.log(err)
        })
}





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

const isNameUnchanged = computed(() => {
    return userTableInfo.value.displayName === initialDisplayName.value;
});

const isPhoneUnchanged = computed(() => {
    return userTableInfo.value.phoneNumber === initialPhoneNumber.value;
});

const isEmailUnchanged = computed(() => {
    return userTableInfo.value.email === initialEmail.value;
});

watch(user, (newValue) => {
  if (newValue) {
    fetchUserData();
  }
});



const updateNameButton = ref(true);
const theyUpdatedName = ref(false);

const updateEmailButton = ref(true);
const theyUpdatedEmail = ref(false);

const updatePhoneButton = ref(true);
const theyUpdatedPhone = ref(false);

const verifyEmailButton = ref(false);
const verifyPhoneButton = ref(false);

function verifyEmail(){
  verifyEmailButton.value = true;
  //needs logic to send the email
}

const submitUpdateEmail = () => {
  //needs logic to update email
  showEmailMessage();
}

const submitUpdateName = () => {
  //needs logic to update username
  showNameMessage();
}

const submitUpdatePhone = () => {
  //needs logic to update phone
  showPhoneMessage();
}


function showNameMessage(){
  updateNameButton.value = false;
  theyUpdatedName.value = true;
  setTimeout(() => {
    theyUpdatedName.value = false;

  }, 5000);
  setTimeout(() => {
    updateNameButton.value = true;

  }, 6000);
}

function showEmailMessage(){
  updateEmailButton.value = false;
  theyUpdatedEmail.value = true;
  setTimeout(() => {
    theyUpdatedEmail.value = false;

  }, 5000);
  setTimeout(() => {
    updateEmailButton.value = true;

  }, 6000);
}

function showPhoneMessage(){
  updatePhoneButton.value = false;
  theyUpdatedPhone.value = true;
  setTimeout(() => {
    theyUpdatedPhone.value = false;

  }, 5000);
  setTimeout(() => {
    updatePhoneButton.value = true;

  }, 6000);
}

</script>

<template>

  <div>
      <div class ="form-container">
          <form @submit.prevent="submitUpdateName">
              <h4>USER INFORMATION</h4>
              
              <label for="username">Username</label>
              <input type="text" id="username" name="username" v-model="userTableInfo.displayName">
              <button v-if="updateNameButton" type="submit" class="submit-btn main-btn" :disabled="isNameUnchanged">Update Name</button>
              <transition name="fade">
                <UserInfoPopups v-if="theyUpdatedName" message="Name Updated">
                  <img :src=greencheck alt="" class="margin-left">
                </UserInfoPopups>
              </transition>
          </form>

          <form @submit.prevent="submitUpdateEmail">
              <label for="email">Email</label>
              <div>
                  <input type="text" class="form-input" name="email" v-model="userTableInfo.email">
                  <button v-if="!user?.emailVerified" type="button" class="submit-btn main-btn" @click="verifyEmail">Verify Email</button>
                  <UserInfoPopups v-if="verifyEmailButton" :message="'Verification link sent to ' + userTableInfo.email"/>
                  <div v-if="user?.emailVerified && updateEmailButton" class="flex align-c gap">
                    <button  type="submit" class="submit-btn main-btn block" :disabled="isEmailUnchanged">Update Email</button>
                    <p class="italic">You're Verified</p>
                  </div>
                  <transition name="fade">
                    <UserInfoPopups v-if="theyUpdatedEmail" :message="'Email updated, verification link sent to ' + user.email">
                      <img :src=greencheck alt="" class="margin-left">
                    </UserInfoPopups>
                  </transition>
              </div>
          </form>

          <form @submit.prevent="submitUpdatePhone">
            <label for="phone">Phone Number</label>
            <div>
                <input type="tel" class="form-input" name="phone" pattern="[0-9]{10}" v-model="userTableInfo.phoneNumber">
                <button v-if="!user?.phoneNumber" type="button" class="submit-btn main-btn" @click="submitPhoneNumber">Add Phone</button>
                
                <button v-if="user?.phoneNumber && updatePhoneButton" type="submit" class="submit-btn main-btn" :disabled="isPhoneUnchanged">Update Phone</button>
                <transition name="fade">
                    <UserInfoPopups v-if="theyUpdatedPhone" message="Phone successfully updated">
                      <img :src=greencheck alt="" class="margin-left">
                    </UserInfoPopups>
                </transition>
            </div>
             
            <div id="recaptcha-container"></div>
          </form>
      </div>
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