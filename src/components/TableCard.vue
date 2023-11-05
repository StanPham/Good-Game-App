<script setup>
import router from '../router';

const goTable = () => router.push('/table')
</script>

<template>
  <div class="main-container rc text-center rel">
    <div class="header-wrapper gradient rc-top-top">
      <h1 class=" pad cool-font">Table Reservations</h1>
    </div>
    <br><br><br><br><br>
    <button class="main-btn-full" @click="goTable">Reserve Tables</button>
  </div>
</template>        
        
    
<style scoped>

.main-container::before{
  width:100%;
  content: "";
  position: absolute;
  inset: 0;
  background-image: url('../images/cat.webp');
  filter:brightness(35%);
  background-repeat:no-repeat;
  background-size:cover;
  z-index:-1;
  border-radius: 1rem;
} 

.header-wrapper{
  height:20%;
}
.main-container{
  height:100%;
}

</style>









