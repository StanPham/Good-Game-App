
<template>
    <div class="container">
        
        <div class="event-wrapper">
            
           <div class="text-wrapper">
                <h1 class="event-day">COMING SOON!</h1>
              
                
                    <h2 class="event-title"> </h2>
           </div>
                <br><br><br>
                <button class="main-btn-full" @click="goEvent">coming soon</button>
                <br> <br> <br><br> <br> <br>
        </div>
       

    </div>
    

</template>        
                
<style scoped>
.text-wrapper{
    position:relative;
}
.text-wrapper::before {
  content: "";
  position: absolute;
  
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
 
  background: #0706065d;
  
filter: blur(10px);
  z-index: -1;
}


.event-wrapper{
    padding-top: 1rem;
    font-size: clamp(1.3vw,1rem, 10vw);
    text-align: center;
    

    
}


.container{
   
  /* background: linear-gradient(98.79deg, #4517c4 -8.25%, #1d0220 73.07%); */
  position:relative;
   
   border-radius: 1rem;
  width:100%;
   
   
   
   
    
  }

   .container::before{
    width:100%;
    content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
   background-image: url('../images/cardshop.jpg');
   filter:brightness(35%);
 background-repeat:no-repeat;
 background-size:cover;

   z-index:-1;
     border-radius: 1rem;
  } 
    
.event-title{
    /* padding-left:1rem; */
    font-weight:inherit;
    font-style: italic;
    
    padding-top:2rem;
   
}
.event-description{
    padding-top: 5px;
}


</style>

<script setup>

import { onMounted, ref, watch, computed } from 'vue'













function goEvent() {
  this.$router.push('/shop');
}


</script>








