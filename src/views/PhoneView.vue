<script setup>
import { ref } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAppAuth } from '@/firebase'
const phoneNumber = ref('')
const user = ref(null)

const submitPhoneNumber = () => {
    console.log(phoneNumber.value)
}

onAuthStateChanged(firebaseAppAuth, currentUser => {
    user.value = currentUser
})
</script>

<template>
    <div class="phone-main">
        <div v-if="user">
            {{ user?.email }}
        </div>
        <form @submit.prevent="submitPhoneNumber">
            <h1>Phone Number</h1>
            
            <label for="phone">Enter your phone number:</label>
            <input style="color:black;" type="tel" v-model="phoneNumber" name="phone" pattern="[0-9]{10}" required> 
        
            <button type="submit" class="submit-btn main-btn">Submit</button>
        </form>
    </div>
</template>

<style scoped>
.phone-main{
    margin-top: 100px;
}
</style>