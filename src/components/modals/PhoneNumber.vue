<script setup>
import { ref } from 'vue';
const phone = ref('');
</script>


<template>
  <div class="form-container">
    <form @submit="">
      <div class="form-header">
        <h2>Phone Number Verification Required</h2>
      </div>
      <label for="phone">Enter Phone Number</label>
      <input type="tel" v-model="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required>
    </form>
  </div>
</template>

<style scoped>
@import '@/assets/LoginSignup.css';

form{
  width:auto;
}
</style>