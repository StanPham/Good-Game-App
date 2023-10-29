
<script setup>
import { ref } from 'vue'
import { firebaseAppAuth } from '@/firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendEmailVerification, updateProfile } from 'firebase/auth'
import router from '../router'

const email = ref('')
const username = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const errorMessage = ref('')

const submitToLogin = () => router.push('/login');

const submitRegister = () => {
    if(password.value != passwordConfirmation.value) {
        return errorMessage.value = "Passwords do not match"
    }
    createUserWithEmailAndPassword(firebaseAppAuth, email.value, password.value)
        .then((data) => {
            if(username.value != '') {
                updateProfile(data.user,{
                    displayName:username.value
<<<<<<< HEAD
=======
                }).then(() => {
                    console.log("profile updated successfully")
>>>>>>> 84d3296 (Rebase From Main)
                })
            }
            sendEmailVerification(data.user)
                .then((data) => {
                    router.push('/')
                })
        }).catch((error) => {
            switch(error.code) {
                case "auth/email-already-in-use":
                    errorMessage.value = "Email is already in use"  
                    break
                case "auth/weak-password":
                    errorMessage.value = "Password is too weak"
                    break
                default:
                    errorMessage.value = "An error occured, please try again later"
            }
            console.log(error.code)
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
            
            <div class="error-text blink-bg" v-if="errorMessage">
                ⓘ {{ errorMessage }}
            </div>

            <div>
                <label for="emaill"></label>
                <input type = "email" v-model="email" id="emaill" placeholder="Email" required>
            </div>

            <div>
                <label for = "username"></label>
<<<<<<< HEAD
                <input type = "text" v-model="username" id="username" placeholder="Display Name(Optional)">
=======
                <input type = "text" v-model="username" id="username" placeholder="Username(Optional)">
>>>>>>> 84d3296 (Rebase From Main)
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
            <button type="button"  class="font-med grow">Sign Up With Google</button>
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