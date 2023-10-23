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
        EmailVerified: {{ user?.emailVerified }}
        <button type="button" @click="submitSignOut">Sign Out</button>
    <div v-if="isAdmin">
        Is Admin
    </div>
    <div v-else>
        Not Admin
    </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { firebaseAppAuth } from '@/firebase'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const user = ref(null)
const isAdmin = ref(false)

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
    const provider = new GoogleAuthProvider();
    signInWithPopup(firebaseAppAuth, provider)
        .then((result) => {
            console.log(result.user)
            router.push('/events')
        }).catch((err) => {
            err
        })
}

const submitSignOut = async () => {
    await signOut(firebaseAppAuth).then((res) => {}).catch((error) =>{
        console.log(error.code)
        alert(error.message)
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