<template>
    <div>
        <form @submit.prevent="submitRegister">
            <h2>Register</h2>
            <input type="text" placeholder="Email" v-model="email" required><br>
            <input type="text" placeholder="Password" v-model="password" required><br>
            <button type="submit">Sign Up</button>
            <button type="button" @click="submitSignUpWIthGoogle">Sign Up With Google!</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { firebaseAppAuth } from '@/firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, onAuthStateChanged, sendEmailVerification } from 'firebase/auth'
import router from '../router'

const user = ref(null)
const email = ref('')
const password = ref('')

const submitRegister = () => {
    createUserWithEmailAndPassword(firebaseAppAuth, email.value, password.value)
        .then((data) => {
            sendEmailVerification(data.user)
                .then((data) => {
                    console.log("email sent")
                })
            console.log(data)
        }).catch((error) => {
            console.log(error.code)
            alert(error.message)
        })
    router.push('/login')
}

const submitSignUpWIthGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAppAuth, provider)
        .then((result) => {
            console.log(result.user)
            router.push('/events')
        }).catch((err) => {
            err
        })
}

</script>