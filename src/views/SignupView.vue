
<script setup>

import { ref } from 'vue'
import { firebaseAppAuth } from '@/firebase'
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import router from '../router'

const email = ref('')
const password = ref('')

const submitRegister = () => {
    createUserWithEmailAndPassword(firebaseAppAuth, email.value, password.value)
        .then((data) => {
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

const theyWannaLogin = () => router.push('/login');

</script>
<template>
    <div class="form-container" id="formContainer">
        
        <form>
            <div class="form-header">
                <h2>Register</h2>
                
            </div>
            
            <div>
                <label for = "emaill"></label>
                <input type = "email" id="emaill" placeholder="Email" required>
            </div>
            <div>
                <label for = "username"></label>
                <input type = "text" id="username" placeholder="Username" required>
            </div>
            <div>
                <label for = "password"></label>
                <input type = "password" id="password" placeholder="Password" required>
            </div>
            <div>
                <label for = "passwordC"></label>
                <input type = "password" id="passwordC" placeholder="Confirm password" required>
            </div>
            
            <button type="submit" class="submit-btn">Submit</button>
            <div class="or">OR</div>
            <div class="google-container" @click="submitSignUpWIthGoogle">
                <img src="../images/google.png" alt="" class="google-image">
            <button type="button"  class="google-button">Sign Up With Google</button>
        </div>
            <button  type="button" class="swap-login" @click="theyWannaLogin" >Have an account? Login.</button>
        </form>
        <div class="pika-contain">
            <img src="../images/pikachu.webp" alt="" class="pika">
        </div> 
    
</div>
    
</template>

<style scoped>
.or{
    flex-grow:1;
    margin:auto;
    padding:.5rem;
   
    font-weight:100;
   
}
.swap-login{
    font-size:1.1rem;
}
.google-image{
    width:1.6rem;
    
}
.google-button{
    flex-grow:1;
    font-size:1.2rem;
}
.google-container:hover{
    background-color: rgb(46, 44, 44);
}
.google-container{
    display:flex;
 border: black 1px solid;
 background: rgb(37, 37, 37);
 
    padding:.5rem;
    border-radius:1rem;
}
.pika-contain{
    display:flex;
    align-items: center;
}
.pika{
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
    margin-top: 4rem;

}


form{
    width:clamp(23rem,50%,5000px);
    display:flex;
    flex-direction: column;
    padding: 1.25em;
    gap:10px;
    
    
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
   
    background-color: var(--btn-color);
    font-size: 20px;
    border-radius: 10px;
    padding:5px;
    border:none;
    color:white;
}
.submit-btn:hover{
    cursor:pointer;
    background-color: rgb(180, 70, 202);
    transform: scale(1.01);
}

@media(max-width: 750px){
    .pika-contain{
        display:none;
    }
}


</style>



