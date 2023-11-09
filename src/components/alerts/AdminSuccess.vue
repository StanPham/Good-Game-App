<script setup>
import {defineProps} from 'vue'
import greencheck from '../../images/green-check.png'

defineProps({
  message: String
})
</script>
<template>
   
    <div class="popup grey flex align-c gap ">
      <img :src=greencheck alt="" class="green-check">
      <div class="font-med">{{ message }}</div>
    </div>
 
</template>

<style scoped>
.green-check{
  height:100%;
  padding:2px;
}

.popup{
  position:fixed;
  top:10%;
  left:45%;
  width:200px;
  height:50px;
 
}

.fade-translate-enter-active, .fade-translate-leave-active {
  transition: all 1s ease-in-out;
  opacity: 1;
  transform: translateY(0);
}

.fade-translate-enter, .fade-translate-leave-to {
  opacity: 0;
  transform: translateY(-50px); 
}
</style>