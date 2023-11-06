<script setup>
import { onAuthStateChanged, RecaptchaVerifier, PhoneAuthProvider } from "firebase/auth";
import { db, firebaseAppAuth } from '@/firebase'
import { ref } from "vue";

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
    }
})
</script>

<template>

<div>
    <div class = "form-container">
        
        <form @submit.prevent="submitUserUpdate">
            <h4>USER INFORMATION</h4>
            
            <label for="username">Username</label>
            <input type="text" id="username" name="username" v-model="userTableInfo.displayName">

            <label for="email">Email</label>
            <input type="text" id="email" name="email" v-model="userTableInfo.email">

            <label for="fname">First Name</label>
            <input type="text" id="fname" name="fname" value="fname">

            <label for="lname">Last Name</label>
            <input type="text" id="lname" name="lname" value="lname">

            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone"  v-model="userTableInfo.phoneNumber">

            <button type="submit" class="submit-btn main-btn">Update</button>
        </form>
       
    </div>

    <!-- <div class="event-card">
        <div class="container">
            <h1 class="header">{{titleOfCard}}</h1>
            <div class="event-wrapper">
                <h1 class="event-day">{{ dayMonthDay(todaysEvent.startDate) }}</h1>
                <div class="title-wrapper title">
                    <h2 class="pink-italic">{{ todaysEvent.name }} </h2>
                    <h3 class="pink"> {{ todaysEvent.format}}</h3>
                    <div class="start-time bold title-scale">hi hello</div>
                </div>
                    
                <p class="event-description font-med">hi hello</p>
                <br>
                <button class="all-events-btn main-btn-full bold" @click="goEvent">All Events</button>
            </div>
        </div>
    </div> -->
</div>

</template>

<style scoped>
@import '@/assets/LoginSignup.css';
@import '@/assets/UserProfile.css';
     


   
</style>