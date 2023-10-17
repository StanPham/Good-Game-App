<script setup>
import { ref } from 'vue';
import { firebaseFunctions } from '@/firebase';
import { httpsCallable } from 'firebase/functions';

const email = ref('')
const addAdminResponse = ref('')

const submitAdmin = async () => {
    console.log(email.value);
    const addMessage = httpsCallable(firebaseFunctions, 'addadminrole');
    await addMessage({ userEmail: email.value })
    .then((result) => {
        addAdminResponse.value = result.data.message
    }).catch(err => {
        console.log(err);
    });
}
</script>

<template>
    <div class="form-container">
        <form @submit.prevent="submitAdmin">
            <h2>Add New Admin</h2>
            <label for="eventName">Enter Email:</label>
            <input
                v-model="email" 
                class="input"
                type="text"
                required>
            <button type="submit" class="submit-btn">Submit</button>
            <h3> {{ addAdminResponse }}</h3>
        </form>
        
    </div>
</template>

<style scoped>
.submit-btn{
    background-color: rgb(168, 41, 168);
    font-size: 20px;
    border-radius: 10px;
    padding:5px;
    border:none;
    color:white;
    width:30%;
    margin-inline:auto;
}
.form-container{
    margin-inline:auto;
    width: clamp(200px, 90vw,35rem);
    display:flex; 
    background-color: rgb(66, 60, 63);
    border-radius: 10px;
    color:white;
    margin-top:2rem;
    margin-bottom:2rem;
}
form{
    width:clamp(23rem,100%,5000px);
    display:flex;
    flex-direction: column;
    padding: 1.25em;
    gap:.5rem;
}
input{
    padding-left:1rem;
    margin-bottom:1rem;
}
textarea{
    color:black;
    padding-left:1rem;
    margin-bottom:1rem;
}
form input[type="text"]{
    color:black;
}
form input[type="datetime-local"]{
    color:black;
}
</style>