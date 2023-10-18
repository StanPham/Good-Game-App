
<script setup>
import router from '../router'

// const goEvent = () =>  router.push('/shop');
</script>

<template>
    <div class="container">
        <div class="card-picture">
                <img src="../images/booster.png" alt="" class="shop-card-picture"> 
        </div>
        <div class="event-wrapper">
            <h1 class="event-day">SHOP</h1>
            <h2 class="event-title">Coming soon! </h2>
            <br>
            <button class="all-events-btn" @click="goEvent">SHOP</button>
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
}

.allEvents:hover{
    color:#bb76ffa1;
    background-color: white;
    border-color: #bb76ffa1;
}

.all-events-btn{
    background: var(--btn-color);
    font-size:1.1rem;
    font-weight:bold;
    border-radius: 2rem;
    padding:.8rem 2rem;

}

.event-wrapper{
    padding-top: 1rem;
    font-size: clamp(1.3vw,1rem, 10vw);
    text-align: center;
    width:45%;
}

.container{
    height:100%;
    position:relative;
    min-width:100%;
    border-radius: 1rem;
    width: clamp(10vw,100vw,32rem);
    background: linear-gradient(-98.79deg, #BA76FF -8.25%, #180030 73.07%);
    display:flex;
    align-items: center;
}

.event-title{
    font-weight:inherit;
    font-style: italic;
    padding-top:2rem;
}
    
.event-description{
    padding-top: 5px;
}
    
</style>
   




























