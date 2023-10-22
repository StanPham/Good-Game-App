
<script setup>
import { ref } from 'vue'
import { firebaseAppAuth } from '@/firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification } from 'firebase/auth'
import router from '../router'

const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')

const submitToLogin = () => router.push('/login');

const submitRegister = () => {
    if(password.value != passwordConfirmation.value) return alert("Passwords Do Not Match!")
    createUserWithEmailAndPassword(firebaseAppAuth, email.value, password.value)
        .then((data) => {
            sendEmailVerification(data.user)
                .then((data) => {
                    console.log("email sent")
                    router.push('/')
                })
        }).catch((error) => {
            console.log(error.code)
            alert(error.message)
        })
}

const submitSignUpWIthGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAppAuth, provider)
        .then((result) => {
            console.log(result.user)
            
        }).catch((err) => {
            err
        })
}
</script>

<template>
    <div class="form-container" id="formContainer">
        
        <form @submit.prevent="submitRegister">
            <div class="form-header">
                <h2>Register</h2>
            </div>
            
            <div>
                <label for="emaill"></label>
                <input type = "email" v-model="email" id="emaill" placeholder="Email" required>
            </div>

            <div>
                <label for = "username"></label>
                <input type = "text" id="username" placeholder="Username" required>
            </div>

            <div>
                <label for = "password"></label>
                <input type = "password" v-model="password" id="password" placeholder="Password" required>
            </div>

            <div>
                <label for = "passwordC"></label>
                <input type = "password" v-model="passwordConfirmation" id="passwordC" placeholder="Confirm password" required>
            </div>
            
            <button type="submit" class="submit-btn main-btn">Submit</button>
            <div class="or">OR</div>

            <div class="google-container" @click="submitSignUpWIthGoogle">
                <img src="../images/google.png" alt="" class="google-image">
            <button type="button"  class="google-button">Sign Up With Google</button>
            </div>

            <button  type="button" class="swap-login" @click="submitToLogin">Have an account? Login.</button>
        </form>
        <div class="pika-contain">
            <img src="../images/pikachu.webp" alt="" class="pika">
        </div> 
    
</div>
    
</template>

<style scoped>
@import '@/assets/LoginSignup.css';

</style>