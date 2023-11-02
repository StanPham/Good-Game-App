<script setup>
import { ref } from "vue";
import { updatePhoneNumber } from "firebase/auth";
import { onAuthStateChanged, RecaptchaVerifier, PhoneAuthProvider } from "firebase/auth";
import { firebaseAppAuth } from '@/firebase'
const phoneNumber = ref('')
const verification = ref(null)
const user = ref(null)

const submitPhoneNumber = async () => {
    console.log(phoneNumber.value)
    const countryCode = '+1'
    const applicationVerifier = new RecaptchaVerifier(firebaseAppAuth,'recaptcha-container');
    const provider = new PhoneAuthProvider(firebaseAppAuth);
    const fullPhoneNumber = countryCode + phoneNumber.value;
    verification.value = await provider.verifyPhoneNumber(fullPhoneNumber, applicationVerifier)
        .then((result) =>{
            console.log("sms sent")
            var verifyCode = window.prompt("Please enter the verification \n code that was sent to your device")
            return PhoneAuthProvider.credential(result,verifyCode)
        }).then((phoneCred) =>{
            return updatePhoneNumber(user.value, phoneCred).then((result) => {
                console.log("worked")
            })
        })
}
onAuthStateChanged(firebaseAppAuth, currentUser => {
    user.value = currentUser
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
    </div>

</template>

<style scoped>
.phone-main{
    margin-top: 100px;
}
</style>