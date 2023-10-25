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
@import '@/assets/AdminTabs.css';

</style>