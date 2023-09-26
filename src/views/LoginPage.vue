

<template>
    <div class="form-container" id="formContainer">
        
        <form @submit.prevent="submitLogin">
            <div class="form-header">
                <h2>Login</h2>
                
            </div>
            
            <div>
                
                <input type = "email" v-model="email" placeholder="Email">
            </div>
            
            <div>
                
                <input type = "password" v-model="password" placeholder="Password">
            </div>
            
            
            <button type="submit" class="submit-btn" @click=" $emit('user-logged-in', { name: 'John Doe', avatar: '../components/nami.png' })">Submit</button>
            <button  type="button" class="swap-signup" @click="$emit('some-event')">No account? Signup.</button>
        </form>
        <div class="pika-contain">
            <img src="../components/pikachu.webp" alt="" class="pika">
        </div> 
        {{ user?.email }}
        <button type="button" class="signout" @click="submitSignOut">Sign Out</button> 
       
</div>
    
</template>

<style scoped>

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

}
h2{
    margin-bottom:1.3rem;
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
   
    background-color: rgb(168, 41, 168);
    font-size: 20px;
    border-radius: 10px;
    padding:5px;
    border:none;
    color:white;
}
.submit-btn:hover{
    cursor:pointer;
    background-color: rgb(32, 32, 32);
    transform: scale(1.01);
}

@media(max-width: 750px){
    .pika-contain{
        display:none;
    }
}


</style>


<script setup>
import { ref} from 'vue'
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