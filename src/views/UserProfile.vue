<!-- <script setup>
import TodaysEvent from '../components/TodaysEvent.vue';
</script> -->

<template>

<div>
    <div class = "form-container">
        
        <form action="">
            <h4>USER INFORMATION</h4>
            
            <label for="username">Username</label>
            <input type="text" id="username" name="username" value="current username">

            <label for="email">Email</label>
            <input type="text" id="email" name="email" value="name@example.com">

            <label for="fname">First Name</label>
            <input type="text" id="fname" name="fname" value="fname">

            <label for="lname">Last Name</label>
            <input type="text" id="lname" name="lname" value="lname">

            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{4}" value="(xxx) xxx-xxxx">


            <button type="button" class="submit-btn main-btn">Update</button>
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