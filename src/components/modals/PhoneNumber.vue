<script setup>
import { ref, onMounted } from 'vue';
const phone = ref('');


onMounted(() => {

  const firstInput = document.querySelector('.square-input');
  if (firstInput) {
    firstInput.focus();
  }
  
  document.getElementById('auto-tab').addEventListener('keyup', function(e) {
    let target = e.target;
    let maxLength = target.getAttribute('maxlength');
    let myLength = target.value.length;
    
    if (myLength >= maxLength) {
      let next = target;
      while (next = next.nextElementSibling) {
        if (next == null)
          break;
        if (next.tagName.toLowerCase() === "input") {
          next.focus();
          break;
        }
      }
    }
  });
})
</script>


<template>
  <div class="form-container">
    <form @submit="" v-if="false">
      <div class="form-header">
        <h2>Phone Number Verification Required</h2>
      </div>
      <label for="phone">Enter Phone Number</label>
      <input type="tel" v-model="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required>
    </form>

    <form @submit="">
      <div class="form-header">
        <h2>Code Sent To [phone number]</h2>
      </div>

      <div class="flex gap" id="auto-tab">
        <input type="text" class="square-input" maxlength="1">
        <input type="text" class="square-input" maxlength="1">
        <input type="text" class="square-input" maxlength="1">
        <input type="text" class="square-input" maxlength="1">
        <input type="text" class="square-input" maxlength="1">
        <input type="text" class="square-input" maxlength="1">
      </div>
    </form>
  </div>
</template>

<style scoped>
@import '@/assets/LoginSignup.css';
.form-container{
  width:clamp(350px, 35rem, 100% );
}
form{
  width:auto;
}
.square-input{
  height:50px;
  width:50px;
  font-size:2rem;
  padding-left:1rem;
}
.square-input:focus{
 border:white 1px solid;

}
</style>