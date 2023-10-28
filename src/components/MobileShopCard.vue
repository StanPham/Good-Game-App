<script setup>
import router from '../router'

// const goEvent = () =>  router.push('/shop');
</script>

<template>
    <div class="container flex rel rc">
        <div class="card-picture">
                <img src="../images/booster.png" alt="" class="shop-card-picture"> 
        </div>
        <div class="text-wrapper pad-top font-med">
            <h1 class="">SHOP</h1>
            <h2 class="description">Coming soon!</h2>
            <br>
            <button class="main-btn-full" @click="goEvent">SHOP</button>
            <br> <br> <br><br> <br> <br>
        </div>
    </div>
</template>        
                
            
<style scoped>
.card-picture{
    width:45%;
    height:90%;
    border-radius: 2rem;
    transform: rotate(-10deg);
}

.shop-card-picture{
    height:100%;
    max-height:450px;
}

.text-wrapper{
    text-align: center;
    width:45%;
}

.container{
    height:100%;
    min-width:100%;
    width: clamp(10vw,100vw,32rem);
    background: linear-gradient(-98.79deg, #BA76FF -8.25%, #180030 73.07%);
    align-items: center;
}

.description{
    font-weight:inherit;
    font-style: italic;
    padding-top:2rem;
}
    
</style>
   




























