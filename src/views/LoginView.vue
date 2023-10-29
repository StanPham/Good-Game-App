<script setup>
import { ref } from 'vue'
import { firebaseAppAuth } from '@/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import router from '../router'

const user = ref(null)
const isAdmin = ref(false)
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const submitToSignUp = () => router.push('/signup');
const submitLogin = async () => {
    email.value = email.value.trim()
    await signInWithEmailAndPassword(firebaseAppAuth, email.value, password.value)
        .then((data) => {
            console.log("Login Successful")
            router.push('/')
        }).catch((error) => {
            if(error.code == "auth/invalid-login-credentials") {
                errorMessage.value = "Wrong Email or Password";
                password.value = "";
            }
            console.log(error.code)
        })
}
const submitSignInWIthGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAppAuth, provider)
        .then((result) => {
            console.log(result.user)
            router.push('/')
        }).catch((err) => {
            err
        })
}

onAuthStateChanged(firebaseAppAuth, currentUser => {
    user.value = currentUser
    if(currentUser) {
        currentUser.getIdTokenResult().then(idTokenResult => {
            isAdmin.value = idTokenResult.claims.admin ? true : false
        })
    }
})
</script>

<template>
    <div class="form-container" id="formContainer">
        <form @submit.prevent="submitLogin">
            <div class="form-header">
                <h2>Login</h2>  
            </div>

            <div class="error-text" v-if="errorMessage">
                ⓘ  {{ errorMessage }}
            </div>
            
            <div>
                <input type = "email" v-model="email" placeholder="Email" required>
            </div>
            
            <div>
                <input type = "password" v-model="password" placeholder="Password" required>
            </div>

            <button type="submit" class="submit-btn main-btn" >Submit</button>
           
            <div class="google-container" @click="submitSignInWIthGoogle">
                <img src="../images/google.png" alt="" class="google-image">
                <button type="button"  class="font-med grow">Sign In With Google</button>
            </div>

            <button  type="button" class="swap-signup" @click="submitToSignUp">No account? Signup.</button>
        </form>
        
        <div class="pika-contain">
            <img src="../images/pikachu.webp" alt="" class="pika">
        </div> 
    </div>
</template>

<style scoped>
@import '@/assets/LoginSignup.css';
</style>