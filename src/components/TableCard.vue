<script setup>
import router from '../router';

const goTable = () => router.push('/table')
</script>

<template>
  <div class="main-container rc text-center rel reverse-gradient">
    <div class="header-wrapper rc-top-top">
      <h1 class=" pad cool-font">Looking for Singles?</h1>
    </div>
    <br><br><br><br><br>
    <a class="main-btn-full" href="https://shop.tcgplayer.com/sellerfeedback/71c2420f" target="_blank">TCGplayer</a>
  </div>
</template>        
        
    
<style scoped>

.main-container::before{
  width:50%;
  content: "";
  position: absolute;
  inset:75px 0 0 0;
  background-image: url('../images/testcards.png');
  background-repeat:no-repeat;
  background-size:cover;
  overflow:hidden;
  transform: scale(1.1);
  border-radius: 1rem;
} 


.header-wrapper{
  height:20%;
}
.main-container{
  height:100%;
}

</style>









