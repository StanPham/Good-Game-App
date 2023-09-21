<template>
    
    <div>
        <form @submit.prevent="submitLogin">
            <h2>Login</h2>
            <input type="text" placeholder="Email" v-model="email" required><br>
            <input type="text" placeholder="Password" v-model="password" required><br>
            <button type="submit">Sign In</button>
            <button type="button" @click="submitSignInWIthGoogle">Sign In With Google!</button>
        </form>
    </div>
    <div v-if="user">
        {{ user?.email }}
        <button type="button" @click="submitSignOut">Sign Out</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { firebaseAppAuth } from '@/firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const user = ref(null)

const email = ref('')
const password = ref('')

const submitLogin = async () => {
    await signInWithEmailAndPassword(firebaseAppAuth, email.value, password.value)
        .then((data) => {
            console.log("Login Successful")
        }).catch((error) => {
            console.log(error.code)
            alert(error.message)
        })
}

const submitSignInWIthGoogle = () => {
    //TODO
}

const submitSignOut = async () => {
    await signOut(firebaseAppAuth).then((res) => {}).catch((error) =>{
        console.log(error.code)
        alert(error.message)
    })
}

onAuthStateChanged(firebaseAppAuth, currentUser => {
    user.value = currentUser
})
</script>