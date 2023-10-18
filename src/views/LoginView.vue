<script setup>
import { ref} from 'vue'
import { firebaseAppAuth } from '@/firebase'
import { signInWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import router from '../router'

const user = ref(null)
const isAdmin = ref(false)
const email = ref('')
const password = ref('')

const submitToSignUp = () => router.push('/signup');
const submitLogin = async () => {
    await signInWithEmailAndPassword(firebaseAppAuth, email.value, password.value)
        .then((data) => {
            console.log("Login Successful")
            router.push('/');
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
            
            <div>
                <input type = "email" v-model="email" placeholder="Email" required>
            </div>
            
            <div>
                <input type = "password" v-model="password" placeholder="Password" required>
            </div>

            <button type="submit" class="submit-btn main-btn" >Submit</button>
           
            <div class="google-container" @click="submitSignInWIthGoogle">
                <img src="../images/google.png" alt="" class="google-image">
                <button type="button"  class="google-button">Sign In With Google</button>
            </div>

            <button  type="button" class="swap-signup" @click="submitToSignUp">No account? Signup.</button>
        </form>
        
        <div class="pikachu-image-container">
            <img src="../images/pikachu.webp" alt="" class="pikachu-image">
        </div> 
    </div>
</template>

<style scoped>
.google-container:hover{
    background-color: rgb(46, 44, 44);
}

.or{
    flex-grow:1;
    margin:auto;
    padding:.5rem;
    font-weight:100;
}

.swap-signup{
    font-size:1.1rem;
}

.google-image{
    width:1.6rem;
}

.google-button{
    flex-grow:1;
    font-size:1.2rem;
}

.google-container{
    display:flex;
    border: black 1px solid;
    background: rgb(37, 37, 37);
    padding:.5rem;
    border-radius:1rem;
}
 
.pikachu-image{
    max-width: 50%;
    display: block;
    margin-left: auto;
    margin-right: auto;
}

.form-container{
    margin-inline: auto;
    width: clamp(200px, 90vw,50rem);
    display:flex;
    background-color: rgb(66, 60, 63);
    border-radius: 10px;
    color:white;
    margin-top:4rem;
}
   
h2{
    margin-bottom:1.3rem;
}

form{
    width:clamp(23rem,50%,5000px);
    display:flex;
    flex-direction: column;
    padding: 1.25em;
    gap:15px;
}

.form-header{
    display:flex;
    justify-content: space-between;
}

input{
    border-radius: 5px;
    border: 1px solid rgb(24, 23, 22);
    width:100%;
    height: 2rem;
    margin-bottom: 10px;
    padding-left:1.25rem;
    background-color: rgb(53, 55, 56);
    color:white;
}

input:focus{
    outline:none;   
}

.submit-btn{
    font-size: 20px;
    padding:5px;
    border:none;
}

@media(max-width: 750px){
    .pikachu-image-container{
        display:none;
    }
}
</style>