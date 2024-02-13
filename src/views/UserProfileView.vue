<script setup>
import { 
  onAuthStateChanged, 
  RecaptchaVerifier, 
  PhoneAuthProvider, 
  updatePhoneNumber, 
  sendEmailVerification, 
  updateProfile} from "firebase/auth";

import { db, firebaseAppAuth, firebaseFunctions } from '@/firebase'
import { ref, onMounted, watch, computed, onUnmounted } from "vue";
import { httpsCallable } from 'firebase/functions';
import { doc, collection, onSnapshot } from "firebase/firestore";
import UserInfoPopups from "../components/alerts/UserInfoPopups.vue";
import greencheck from '../images/green-check.png'
import TheSpinner from '../components/alerts/TheSpinner.vue'


const user = ref(null)
const userTableInfo = ref({
    displayName: '(Not Set)',
    email: '',
    phoneNumber: '+1'
})
const initialPhoneNumber = ref('');
const initialEmail = ref('');



onAuthStateChanged(firebaseAppAuth, currentUser => {
    user.value = currentUser
   
    console.log(user.value.email)
    if(currentUser){
        console.log(currentUser.providerData)
        userTableInfo.value = {
            displayName: user?.value.displayName ? user?.value.displayName : '(Not Set)' ,
            email: user?.value.email,
            phoneNumber: user?.value.phoneNumber ? user?.value.phoneNumber : '+1',
            isTheirEmailVerified: user?.value.emailVerified
        }
        initialPhoneNumber.value = userTableInfo.value.phoneNumber;
        initialEmail.value = userTableInfo.value.email;
        
    }
})



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
            })
        }).catch((err) => {
            console.log(err)
        })
}




const isNameUnchanged = computed(() => {
    return userTableInfo.value.displayName === user.value.displayName;
});

const isPhoneUnchanged = computed(() => {
    return userTableInfo.value.phoneNumber === initialPhoneNumber.value;
});

const isEmailUnchanged = computed(() => {
    return userTableInfo.value.email === user.value.email;
});


const updateNameButton = ref(true);
const theyUpdatedName = ref(false);

const updatePhoneButton = ref(true);
const theyUpdatedPhone = ref(false);

const verifyEmailButton = ref(false);


function verifyEmail(){
  verifyEmailButton.value = true;
  sendEmailVerification(user.value).then(() => {}).catch((err) => {
    console.log(err)
  })
}


const submitUpdateName = () => {

  updateProfile(user.value, {
  displayName: userTableInfo.value.displayName
  }).then(() => {
    // Profile updated!
    // ...
  }).catch((error) => {
    // An error occurred
    // ...
    console.log(error)
  });
  showNameMessage();
}

const submitUpdatePhone = () => {
  submitPhoneNumber();
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
                  <div v-if="user?.emailVerified" class="flex align-c gap">
                    <p class="italic">You're Verified</p>
                  </div>
              </div>
          </form>

          <form @submit.prevent="submitUpdatePhone">
            <label for="phone">Phone Number</label>
            <div>
                <input type="tel" class="form-input" name="phone" v-model="userTableInfo.phoneNumber">
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

</template>

<style scoped>
@import '@/assets/UserProfile.css';
     
.reservations-card-wrap{
    width: clamp(200px, 90vw,50rem);
    margin-inline:auto;
}
 
</style>


