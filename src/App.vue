<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
 
 <TheHeader />

 <router-view></router-view>

    
      

      
   
  


</template>

<style>
  *{
    box-sizing: border-box;
    margin:0;
    padding:0;
    
  }
  body{
    margin-top: 5rem;
  }
  html{
    background: rgb(46,0,102);
    background: linear-gradient(to top, rgba(46,0,102,1) 0%, rgba(142,100,192,1) 100%, rgba(107,10,133,1) 100%);
    height:100vh;
   
  }
  
  button, input[type="button"], input[type="submit"] {
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    font: inherit;
    color: inherit;
}



</style>
