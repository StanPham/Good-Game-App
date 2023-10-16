<template>
    <form @submit.prevent="submitAdmin">
        <h2>Add Admin</h2>
        <input type="text" placeholder="Email" v-model="email" required>
        <button type="submit">Add Admin</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { firebaseFunctions } from '@/firebase';
import { httpsCallable } from 'firebase/functions';


const email = ref('test@test.com')

const submitAdmin = async () => {
    console.log(email.value);
    const addMessage = httpsCallable(firebaseFunctions, 'addAdminRole');
    await addMessage({ userEmail: email.value })
    .then((result) => {
        console.log(result.data);
    }).catch(err => {
        console.log(err);
    });
}
</script>